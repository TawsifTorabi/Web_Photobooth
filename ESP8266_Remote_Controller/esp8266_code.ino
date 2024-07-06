#include <ArduinoWebsockets.h>
#include <ESP8266WiFi.h>

const char* ssid = "your_ssid"; //Enter SSID
const char* password = "your_password"; //Enter Password
const char* websockets_server_host = "websocket_server_address"; //Enter server address
const uint16_t websockets_server_port = 8765; // Enter server port

using namespace websockets;

WebsocketsClient client;

//These are the Buttons
const int button1Pin = 14; // GPIO14, D5
const int button2Pin = 12; // GPIO12, D6
const int button3Pin = 13; // GPIO13, D7
const int button4Pin = 2;  // GPIO2, D4

volatile bool button1Pressed = false;
volatile bool button2Pressed = false;
volatile bool button3Pressed = false;
volatile bool button4Pressed = false;

unsigned long lastPressTime1 = 0;
unsigned long lastPressTime2 = 0;
unsigned long lastPressTime3 = 0;
unsigned long lastPressTime4 = 0;

const unsigned long debounceDelay = 200; // 200 ms debounce time

void ICACHE_RAM_ATTR handleButton1Press() {
    if (millis() - lastPressTime1 > debounceDelay) {
        button1Pressed = true;
        lastPressTime1 = millis();
    }
}

void ICACHE_RAM_ATTR handleButton2Press() {
    if (millis() - lastPressTime2 > debounceDelay) {
        button2Pressed = true;
        lastPressTime2 = millis();
    }
}

void ICACHE_RAM_ATTR handleButton3Press() {
    if (millis() - lastPressTime3 > debounceDelay) {
        button3Pressed = true;
        lastPressTime3 = millis();
    }
}

void ICACHE_RAM_ATTR handleButton4Press() {
    if (millis() - lastPressTime4 > debounceDelay) {
        button4Pressed = true;
        lastPressTime4 = millis();
    }
}

void setup() {
    Serial.begin(115200);

    // Connect to wifi
    WiFi.begin(ssid, password);
    for(int i = 0; i < 10 && WiFi.status() != WL_CONNECTED; i++) {
        Serial.print(".");
        delay(1000);
    }

    if(WiFi.status() != WL_CONNECTED) {
        Serial.println("No Wifi!");
        return;
    }

    Serial.println("Connected to Wifi, Connecting to server.");
    bool connected = client.connect(websockets_server_host, websockets_server_port, "/");
    if(connected) {
        Serial.println("Connected!");
        client.send("Hello Server");
    } else {
        Serial.println("Not Connected!");
    }
    
    client.onMessage([&](WebsocketsMessage message) {
        Serial.print("Got Message: ");
        Serial.println(message.data());
    });

    // Setup buttons as input pull-up
    pinMode(button1Pin, INPUT_PULLUP);
    pinMode(button2Pin, INPUT_PULLUP);
    pinMode(button3Pin, INPUT_PULLUP);
    pinMode(button4Pin, INPUT_PULLUP); // Consider adding an external pull-up resistor here

    // Attach interrupts
    attachInterrupt(digitalPinToInterrupt(button1Pin), handleButton1Press, FALLING);
    attachInterrupt(digitalPinToInterrupt(button2Pin), handleButton2Press, FALLING);
    attachInterrupt(digitalPinToInterrupt(button3Pin), handleButton3Press, FALLING);
    attachInterrupt(digitalPinToInterrupt(button4Pin), handleButton4Press, FALLING);
}

void loop() {
    if(client.available()) {
        client.poll();
    }

    if(button1Pressed) {
        button1Pressed = false;
        client.send("capture");
    }

    if(button2Pressed) {
        button2Pressed = false;
        client.send("save");
    }

    if(button3Pressed) {
        button3Pressed = false;
        client.send("timer");
    }

    if(button4Pressed) {
        button4Pressed = false;
        client.send("filter");
    }

    delay(100);
}
