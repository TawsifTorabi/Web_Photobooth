// Create a new WebSocket connection
const socket = new WebSocket('ws://localhost:8765');

// Event listener for when the WebSocket connection is opened
socket.addEventListener('open', function (event) {
    console.log('WebSocket connection opened.');
    // Optionally, you can send a message to the server upon connection
    socket.send('Hello Server!');
});

// Event listener for incoming messages from the WebSocket
socket.addEventListener('message', function (event) {
    console.log('Message from server:', event.data);
    // Check if the message is "capture"
    if (event.data === 'capture') {
        // Call the capture function
        handleButtonCaptureClick();
    }
    if (event.data === 'save') {
        // Call the save function
        handleButtonSaveClick();
    }
    if (event.data === 'timer') {
        // Call the timer function
        handleTimerCaptureClick();
    }
    if (event.data === 'filter') {
        // Call the filter function
        switchFrameFilter();
    }
});

// Event listener for errors
socket.addEventListener('error', function (event) {
    console.error('WebSocket error:', event);
});

// Event listener for when the WebSocket connection is closed
socket.addEventListener('close', function (event) {
    console.log('WebSocket connection closed.');
});
