
# Web Photobooth (Rebuild)
It is simple and fun project by [@isotoan.](https://github.com/istoan/) 
But I wanted to make a practical photobooth for a booth stall in a festival.
So I worked on this project based on the [main git](https://github.com/istoan/HTML5-Webcam-Photobooth), I made my version of the Web Photobooth.

![image](https://user-images.githubusercontent.com/19222272/212495851-9dd81b13-8259-43b9-b400-f713d9b304f4.png)

## Features I added:
1. Added Keyboard Controls, now **Shutter**, **Timer** and **Save** operation can be done by keyboard shortcuts. 
-- **Space Bar**  -  Shutters
-- **Enter** - Shutter with Timer
-- **S** - Save to Server
-- **1-9** - Set Timer
2. Customized Frames to Overlay Images.
3. Random Frames each time user loads the app.
-- Remove all the frames except one from the **FileList.json** to enable only 	  one frame.
-- Add Your PNG Square Size overlay inside the SVG file using Illustrator or just encode your PNG Image file into base64 and paste it inside one of the SVG files from the **assets** directory.
-- Users can change filters after page load.
4. Timer Shutter
5. Dynamic Image Gallery Area Showing Latest 20 Images from server. 


## Issues:
#### Webcam Connected But Not Working:
This web app requires an active webcam connected; it makes sense 😜
And if you are running this of your local server (Localhost:8080), you might not have SSL. And most of the browsers requires websites to have Secured Connection to give secure access to webcam.
So just add an **https://** before **localhost** and it'll work just fine. It might ask that **Unsafe Website Ahead** because we are forcing our browser to load that non-valid SSL connection of our localhost. We have to click that little **Procced to Unsafe (localhost)** button at the bottom of that page. 



