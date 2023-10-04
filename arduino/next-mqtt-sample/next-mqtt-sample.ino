#include "EspMQTTClient.h"
#include <ArduinoJson.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h> 

// https://RandomNerdTutorials.com/esp32-mpu-6050-web-server/

Adafruit_MPU6050 mpu;
DynamicJsonDocument readings(1024);
sensors_event_t a, g, temp;

//Gyroscope sensor deviation
float gyroXerror = 0.07;
float gyroYerror = 0.03;
float gyroZerror = 0.01;

float gyroX, gyroY, gyroZ;
float accX, accY, accZ;
float temperature;

unsigned long timer = 0;

EspMQTTClient client(
  "WIFI_SSID",
  "WIFI_PASSWORD", // wifi password
  "BROKER_IP",  // MQTT Broker server ip
  "MQTTUsername",   // Can be omitted if not needed
  "MQTTPassword",   // Can be omitted if not needed
  "feather_esp8266",     // Client name that uniquely identify your device
  1883              // The MQTT port, default to 1883. this line can be omitted
);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  while (!Serial)
    delay(10); // will pause Zero, Leonardo, etc until serial console opens
  Serial.println("Hello from feather");

  initMPU();

  char payload[100];
  readings["value"] = "disconnected";
  readings.clear();
  serializeJson(readings, payload);

  client.enableDebuggingMessages(); // Enable debugging messages sent to serial output
  client.enableOTA();
  client.enableLastWillMessage("devices/feather/connected", payload, true);
}

void loop() {
  client.loop();
  mpu.getEvent(&a, &g, &temp);

  if ((millis() - timer) > 100) { // print data every 10ms
    client.publish("canvas/cube/rotation", getGyroReadings().c_str());
    timer = millis();
   }
}

void initMPU(){
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Found!");
}

void onConnectionEstablished() {
  Serial.print("on Connection Estabilished...");
  char payload[100];
  readings["value"] = "connected";
  readings.clear();
  serializeJson(readings, payload);
  client.publish("devices/feather/connected", payload);
  client.subscribe("devices/feather/+", [] (const String &payload)  {
    Serial.println(payload);
  });

}

String getGyroReadings(){
  mpu.getEvent(&a, &g, &temp);

  float gyroX_temp = g.gyro.x;
  if(abs(gyroX_temp) > gyroXerror)  {
    gyroX += gyroX_temp/50.00;
  }
  
  float gyroY_temp = g.gyro.y;
  if(abs(gyroY_temp) > gyroYerror) {
    gyroY += gyroY_temp/70.00;
  }

  float gyroZ_temp = g.gyro.z;
  if(abs(gyroZ_temp) > gyroZerror) {
    gyroZ += gyroZ_temp/90.00;
  }

  readings["gyroX"] = gyroX;
  readings["gyroY"] = gyroY;
  readings["gyroZ"] = gyroZ;

  String jsonString;
  serializeJson(readings, jsonString);
  return jsonString;
}

String getAccReadings() {
  mpu.getEvent(&a, &g, &temp);
  // Get current acceleration values
  accX = a.acceleration.x;
  accY = a.acceleration.y;
  accZ = a.acceleration.z;

  readings["accX"] = accX;
  readings["accY"] = accY;
  readings["accZ"] = accZ;

  String jsonString;
  serializeJson(readings, jsonString);
  return jsonString;
}

String getTemperature(){
  mpu.getEvent(&a, &g, &temp);
  temperature = temp.temperature;
  readings["temperature"] = String(temperature);

  String jsonString;
  serializeJson(readings, jsonString);
  return jsonString;
}
