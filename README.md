# NEXTJS MQTT Example

## Author

Minjoo Cho (minjoolisa.cho@gmail.com)

## About

This is a MQTT.js example implemented for NextJs based on [emqx MQTT example](<(https://github.com/emqx/MQTT-Client-Examples)>).

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

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
