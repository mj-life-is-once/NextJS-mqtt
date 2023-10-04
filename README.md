# NEXTJS MQTT Example

## Author

Minjoo Cho (minjoolisa.cho@gmail.com)

## About

This is a MQTT.js example implemented for NextJs based on [emqx MQTT example](<(https://github.com/emqx/MQTT-Client-Examples)>).

## Folder Structure

```
.
├── /arduino
├── /mosquitto
└── /next-app
```

## How to run

This program requires `docker-compose` command to run examples.

### STEP 1 : Install `docker-compose`

Please install `docker-compose` from the [official documentation](https://docs.docker.com/compose/install/).

### STEP2 : Run docker service

Run the following command from the root of the directory

```
docker-compose up -d
# -d is needed to run docker in a detached mode
```

This command will run local MQTT broker on a port `1883` and `9001` (for websocket), and run NEXTJS app on a port `3000``

### STEP3: MQTT messaging to talk to ThreeJS Canvas

Open `localhost:3000` to check the application.

1. Click on the `MQTT Tools` to open the toolbox
2. Connect to the local MQTT broker
3. Subscribe to the `canvas/cube/+` topic
4. Publish the color payload to `canvas/cube/color` topic to change the color of the cube.

![](/media/next-mqtt.gif)

### STEP4: Use any microcontroller to interact with the cube!

I added a simplied arduino code example under `/arduino` folder. With the code, you can control the rotation
![](/media/esp-mqtt.gif)
