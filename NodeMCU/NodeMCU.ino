#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h> 
#include <SoftwareSerial.h>
#include <string.h>

long BPM;
long SPO2;
long BPSys;
long BPDia;
long Temp;

void setup() {

  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);                                  //Serial connection
  WiFi.begin("vivo 1818", "mini09876");   //WiFi connection

  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion

    delay(500);
    Serial.println("Waiting for connection");

  }

}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(500);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(500);                       // wait for a second

  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    HTTPClient http;    //Declare object of class HTTPClient

    http.begin("http://us-central1-dscdata-c56fb.cloudfunctions.net/addData");      //Specify request destination
    http.addHeader("Content-Type", "text/plain");  //Specify content-type header

    String str= "$uid_a$BPM_"+String(BPM)+"$SPO2_"+String(SPO2)+"$BPSys_"+String(BPSys)+"$BPDia_"+String(BPDia)+"$Temp_"+String(Temp);
    Serial.println(str);
    int httpCode = http.POST(str);   //Send the request
    String payload = http.getString();                  //Get the response payload

    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload

    http.end();  //Close connection

  } else {

    Serial.println("Error in WiFi connection");

  }

  
  //BPM
  BPM = random(70, 80);
  
  //SPO2
  SPO2 = random(90, 100);
  
  //BPSys
  BPSys = random(100, 120);
  
  //BPDia
  BPDia = random(80, 90);
  
  //Temp
  Temp = random(95, 28);


  
  delay(5000);  //Send a request every 5 seconds

}
