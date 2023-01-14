var buttonCapture = document.getElementById("buttonCapture");
var buttonSave = document.getElementById("buttonSave");
var buttonTimerSave = document.getElementById("buttonTimerSave");
var savedImages = document.getElementById("savedImages");
var canvas = document.getElementById("canvas");
var video = document.getElementById("video");
var selectTimer = document.getElementById("selectTimer");
var svgImage = document.getElementById("svgImage");
var switchFilter = document.getElementById("switch");


var framelist = "assets/fileList.json";
var randomFrameBool = true;

var context;
var width = 675; //set width of the video and image
var height;

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer, Inc/.test(navigator.vendor);

video.width = width;

var canvas = canvas;
canvas.style.width = width + "px";
canvas.width = width;

context = canvas.getContext("2d");

if((isChrome || isSafari) && window.location.protocol == "http:") {
    savedImages.innerHTML = "<h1>This browser only supports camera streams over https:</h1>";
    startWebcam();
} else {
    startWebcam();
}

function startWebcam() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.mediaDevices){
        navigator.mediaDevices.getUserMedia({video: true}, handleVideo, videoError).then(function(stream){
            video.onloadedmetadata = setHeight;
            buttonCapture.disabled = false;
            return video.srcObject = stream;
        }).catch(function(e) {
            console.log(e.name + ": "+ e.message);
            
            buttonCapture.disabled = true;
            
            switch(e.name) {
                case "NotAllowedError":
                    savedImages.innerHTML = "<h3>You can't use this app because you denied camera access. Refresh the page and allow the camera to be used by this app.</h3>";
                    break;
                case "NotReadableError":
                    savedImages.innerHTML = "<h3>Camera not available. Your camera may be used by another application.</h3>";
                    break;
                case "NotFoundError":
                    savedImages.innerHTML = "<h3>Camera not available. Please connect a camera to your device.</h3>";
                    break;
            }
        });
    } else {
        savedImages.innerHTML = "<h3>Camera not supported.</h3>";
    }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
        savedImages.innerHTML = "<h3>" + e +"</h3>";
    }
    
    function setHeight() {
        var ratio = video.videoWidth / video.videoHeight;
        height = width/ratio;
        canvas.style.height = height + "px";
        canvas.height = height;
    }


    //add event listener and handle the capture button
    buttonCapture.addEventListener("mousedown", handleButtonCaptureClick);

	handleButtonCaptureClick();

    function handleButtonCaptureClick() {
        if(canvas.style.display == "none" || canvas.style.display == ""){
            canvas.style.display = "block";
            buttonCapture.innerHTML = "Retake";
			buttonTimerSave.disabled = true;
			selectTimer.disabled = true;
            
            setHeight();
            context.drawImage(video, 0, 0, width, height);

            buttonSave.innerHTML = "Save";
            buttonSave.disabled = false;
        } else {
            makeCaptureButton();
			buttonTimerSave.disabled = false;
			selectTimer.disabled = false;
        }
    }
    
    function makeCaptureButton() {
        canvas.style.display = "none";
        buttonCapture.innerHTML = "Capture";
        buttonSave.innerHTML = "Save";
        buttonSave.disabled = true;
    }



/*	function generateNew(){
		html2canvas(document.querySelector("#capture")).then(canvasNew => {
			console.log(canvasNew);
			savedImages.appendChild(canvasNew);
		});
	}
*/

    //add event listener and handle the save button
    buttonSave.addEventListener("mousedown", handleButtonSaveClick);
    buttonTimerSave.addEventListener("mousedown", handleTimerCaptureClick);
	

	function handleTimerCaptureClick(){
		if(buttonTimerSave.disabled != true){
			ProgressCountdown(selectTimer.value, "timer", 	handleButtonCaptureClick);
		}
	}
	
    
    function handleButtonSaveClick() {
		if(buttonSave.disabled != true){
			html2canvas(document.querySelector("#capture")).then(canvasNew => {
				var dataURL = canvasNew.toDataURL("image/jpg");
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "save.php");
				xhr.onload = function() {
					if (xhr.readyState == 4 ) {
						if(xhr.status == 200) {
							var image = new Image();
							image.src = "images/" + xhr.responseText;
							image.height = 150;
							image.width = 150;
							savedImages.insertAdjacentElement('afterbegin', image);
							buttonSave.innerHTML = "Saved";
							buttonSave.disabled = true;
							buttonTimerSave.disabled = false;
							selectTimer.disabled = false;
							makeCaptureButton();
						}
					}
				};
				var form = new FormData();
				form.append("image", dataURL);
				xhr.send(form);
			});
		}
    }


	LoadImages();
    function LoadImages(){
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			if(this.readyState == 4 && this.status == 200) {
				var RetJson = JSON.parse(this.responseText);

				RetJson.forEach((fileDir, index) => {
					var image = new Image();
					image.src = fileDir;
					image.height = 150;
					image.width = 150;
					savedImages.insertAdjacentElement('afterbegin', image);
				});
			}
		};
		xhr.open("GET","files.php", true);
		xhr.send();		
	}


    
	
	
	function ProgressCountdown(timeleft, text, callbackFn){
		buttonCapture.disabled = true;
		timeleft = parseInt(timeleft)+1;
		selectTimer.disabled = true;
		buttonTimerSave.disabled = true;
		return new Promise((resolve, reject) => {
		  var countdownTimer = setInterval(() => {
			timeleft--;
			
			document.getElementById(text).textContent = timeleft;

			if (timeleft <= 0) {
				document.getElementById(text).textContent = '';
				clearInterval(countdownTimer);
				resolve(true);
				selectTimer.disabled = false;
				buttonTimerSave.disabled = false;
				buttonCapture.disabled = false;
				if(callbackFn != null){
				  callbackFn();
				}
			}
		  }, 1000);
		});
	}
	
	
	
	
	
	//Dynamic Multiple FrameList
	var FrameListArray;
	var randFrame;
	
	switchFrameFilter();
	
	function switchFrameFilter(){
		let xhrFrameList = new XMLHttpRequest();
		xhrFrameList.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				FrameListArray = JSON.parse(this.responseText);
				loadFilterImage(FrameListArray[(Math.random() * FrameListArray.length) | 0].file);
			}
		};
		xhrFrameList.open("GET", framelist, true);
		xhrFrameList.send();
	}

	switchFilter.addEventListener("mousedown", switchFrameFilter);
	
	function loadFilterImage(filenameIn){
		let filename;
		if(randomFrameBool == false){
			filename = 'Frame.svg';
		}else{
			filename = filenameIn;
		}
			
		let xmlhttpFile = new XMLHttpRequest();
		let url = 'assets/'+filename;
		xmlhttpFile.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				var data = this.responseText;
				svgImage.innerHTML = data;
				let svgImage1 = document.getElementById("svgImage").firstChild;
				svgImage1.style.height = '592px';
				svgImage1.style.position = 'inherit';
				svgImage1.style.marginLeft = '-296px';
				svgImage1.style.zIndex = '9999';
				svgImage1.style.position = 'absolute';
				//style="height: 592px;position: inherit;margin-left: -296px; z-index: 9999;position: absolute;"
			}
		};
		xmlhttpFile.open("GET", url, true);
		xmlhttpFile.send();
	}
		
	
	

	document.onkeydown=function(e){
		if(e.key >= 1 && e.key <= 10) {
			selectTimer.selectedIndex = e.key-1;
			return false;
		}

		if(e.key == " ") {
			handleButtonCaptureClick();
			return false;
		}		
		
		if(e.key == "Enter") {
			handleTimerCaptureClick();
			return false;
		}

		if(e.key == "s") {
			handleButtonSaveClick();
			return false;
		}
	}
	
}