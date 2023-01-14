<?php 
//https://stackoverflow.com/questions/11923235/scandir-to-sort-by-date-modified
function scan_dir($dir) {
    $ignored = array('.', '..', '.svn', '.htaccess');

    $files = array();    
    foreach (scandir($dir) as $file) {
        if (in_array($file, $ignored)) continue;
        $files[$file] = filemtime($dir . '/' . $file);
    }

    arsort($files);
    $files = array_keys($files);

    return ($files) ? $files : false;
}


// Image extensions
$image_extensions = array("png","jpg","jpeg","gif");
// Target directory
$dir = 'images/';
$ImgArr=array();
if (is_dir($dir)){
	if($dh = opendir($dir)){
		$count = 1;
		
		// Read files
		$files = scan_dir($dir);
		
		$filesLength;
		
		if(count($files) < 20){
			$filesLength = count($files);
		}else{
			$filesLength = 20;
		}
		
		//Read Last 20 Files
		for($i = $filesLength-1; $i >= 0; $i--){
				$file = $files[$i];
				if($file != '' && $file != '.' && $file != '..'){
					
					// Thumbnail image path
					$thumbnail_path = "images/".$file;

					// Image path
					$image_path = "images/".$file;
					
					$thumbnail_ext = pathinfo($thumbnail_path, PATHINFO_EXTENSION);
					$image_ext = pathinfo($image_path, PATHINFO_EXTENSION);

					// Check its not folder and it is image file
					if(!is_dir($image_path) && 
						in_array($thumbnail_ext,$image_extensions) && 
						in_array($image_ext,$image_extensions)){
							array_push($ImgArr,$thumbnail_path);					
							$count++;
						}
				}
				
		}
		
		
		echo json_encode($ImgArr);
		closedir($dh);
	}
}
?>