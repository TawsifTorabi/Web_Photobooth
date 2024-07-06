
# Web Photobooth (Rebuild)
It is simple and fun project by [@isotoan.](https://github.com/istoan/) 
But I wanted to make a practical photobooth for a booth stall in a festival.
So I worked on this project based on the [main git](https://github.com/istoan/HTML5-Webcam-Photobooth), I made my version of the Web Photobooth.

![image](https://user-images.githubusercontent.com/19222272/212495851-9dd81b13-8259-43b9-b400-f713d9b304f4.png)

## Features I added:
1. Added Keyboard Controls, now **Shutter**, **Timer** and **Save** operation can be done by keyboard shortcuts. </br>
-- **Space Bar**  -  Shutters </br>
-- **Enter** - Shutter with Timer </br>
-- **S** - Save to Server </br>
-- **1-9** - Set Timer </br>
2. Customized Frames to Overlay Images. </br>
3. Random Frames each time user loads the app. </br>
-- Remove all the frames except one from the **FileList.json** to enable only one frame. </br>
-- Add Your PNG Square Size overlay inside the SVG file using Illustrator or just encode your PNG Image file into base64 and paste it inside one of the SVG files from the **assets** directory. </br>
-- Users can change filters after page load. </br>
4. Timer Shutter </br>
5. Dynamic Image Gallery Area Showing Latest 20 Images from server. </br>



### Why Websocket Server using Python?
This feature is optional, I made it because I wanted to control the web app remotely using a remote made on ESP8266 Wifi Microcontroller with a websocket client backend.  
Yes I could have hosted the websocket server on the ESP32 itself but it was too much power consuming and eating up the battery real fast.  
So I made the ESP32 remote a client to the python websocket server.  

This websocket server is running on Python. So you need to install 'websockets' package on your Python environment.  
<code>pip install websockets</code>  
You can compile the python code to an executable file for Windows using <code>'auto-py-to-exe'</code>  
then it will be a lot easier to handle or execute the file with PHP <code>exec()</code> and run the websocket server in the backend.  
It would be helpful if you were running this app for a kiosk booth or a photo booth.  
  
If you don't need the websocket remote controller, then just follow these steps,
1. Remove <code>'websocket.js'</code> from <code>app.html</code>
2. Rename <code>index.php</code> to anything you like, it's just to disable the index file, you can just delete it.
2. rename <code>app.html</code> to <code>index.html</code>

## Issues:
#### Webcam Connected But Not Working:
This web app requires an active webcam connected; it makes sense 😜</br>
And if you are running this of your local server (Localhost:8080), you might not have SSL. And most of the browsers requires websites to have Secured Connection to give secure access to webcam. </br>
So just add an **https://** before **localhost** and it'll work just fine. </br>
It might ask that **Unsafe Website Ahead** because we are forcing our browser to load that non-valid SSL connection of our localhost. </br>
We have to click that little **Procced to Unsafe (localhost)** button at the bottom of that page. 



