# NEXTJS MQTT Example

## Author

Minjoo Cho (minjoolisa.cho@gmail.com)

## About

This is a MQTT.js example implemented for NextJs based on [emqx MQTT example](<(https://github.com/emqx/MQTT-Client-Examples)>).

## How to run

This program requires `docker-compose` command to run examples.

### STEP 1

Please install `docker-compose` from the [official documentation](https://docs.docker.com/compose/install/).

### STEP2

Run the following command from the root of the directory

```
docker-compose up -d
# -d is needed to run docker in a detached mode
```

This command will run local MQTT broker on a port `1883` and `9001` (for websocket), and run NEXTJS app on a port `3000``

### STEP3
