#include <Wire.h>
#include <Adafruit_BME280.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFiMulti.h>
#include <ArduinoJson.h>

ESP8266WiFiMulti wifi;
Adafruit_BME280 sensor;

#define I2C_ADDR 0x76
#define SSID "Pixel_3"
#define PASSWD "88888888"
#define IP "http://192.168.43.251:3001/api/newreading"

void setup() {
  Serial.begin(115200);
  Wire.begin(); //Aktivoi I2C väylän käyttöön
  if(!sensor.begin(I2C_ADDR)){
    Serial.println("Error: Sensor not found!");
  }
  WiFi.mode(WIFI_STA);
  wifi.addAP(SSID, PASSWD);
}

void loop() {
  printSensors();
  dataToPOST(makeJSON());
  Serial.println("-------------------------");
  delay(5000);
}

void printSensors(){
  Serial.print("Temperature: ");
  Serial.print(sensor.readTemperature());
  Serial.println("*C");
  Serial.print("Humidity: ");
  Serial.print(sensor.readHumidity());
  Serial.println("%");
  Serial.print("Pressure: ");
  Serial.print(sensor.readPressure()/100.0F);
  Serial.println("hPa");
  Serial.print("Approx. altitude: ");
  Serial.print(sensor.readAltitude(1013.25));
  Serial.println("m");
}

void dataToPOST(String output){
  if (wifi.run() == WL_CONNECTED){
    Serial.println("");
    Serial.print("Wifi OK! IP: ");
    Serial.println(WiFi.localIP());
    HTTPClient http;
    http.begin(IP);
    http.addHeader("Content-Type", "application/json");
    int httpcode = http.POST(output);
    if (httpcode == HTTP_CODE_OK){
      Serial.println("POST - OK");
    }
    else{
      Serial.print("POST - Error: ");
      Serial.println(httpcode);
    }
  }
}

String makeJSON(){
  String tmp = "";
  StaticJsonBuffer<JSON_OBJECT_SIZE(4)> jbuffer;
  JsonObject& data = jbuffer.createObject();

  data["name"] = "YEET";
  data["temperature"] = sensor.readTemperature();
  data["humidity"] = sensor.readHumidity();
  data["pressure"] = sensor.readPressure()/100.0F;
  data.printTo(tmp);
  return tmp;
}