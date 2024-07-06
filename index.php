<?php
// Define the path to the batch file
$batchFilePath = 'server_app\\app.bat';

// Execute the batch file in the background
pclose(popen("start /B " . $batchFilePath, "r"));

// Output JavaScript redirection
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <script type="text/javascript">
        // JavaScript to redirect to app.html after a delay (adjust timing as needed)
        setTimeout(function() {
            window.location.href = 'app.html';
        }, 2000); // 2000 milliseconds (2 seconds) delay
    </script>
</head>
<body>
    <p>Redirecting to the application...</p>
</body>
</html>
