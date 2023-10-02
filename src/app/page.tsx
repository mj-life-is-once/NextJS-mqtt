"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Portal } from "@/components/Portal";
import { MQTT } from "@/components/MQTTConnector/MQTT";
import { useState } from "react";
import { Button } from "@/components/Button";
import { MQTTProvider } from "@/contexts/MQTTProvider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-12-showing-user-location-on-embedded-google-maps-with-geolocation-api-and-react-a8ea40d1e891

export default function Home() {
  const [showMQTT, setShowMQTT] = useState(false);
  return (
    <MQTTProvider>
      <main className="relative w-full py-10 min-h-full bg-emerald-500">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div className="container h-full max-w-3xl m-auto px-4 py-4 sm:px-6">
            <div className="text-center text-neutral-50 pb-12 md:pb-16">
              <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                NextJS MQTT Toolbox
              </h1>
              <Button
                className="bg-yellow-500 text-black border-none text-white p-3 hover:bg-yellow-500/50"
                onClick={() => {
                  setShowMQTT((prev) => !prev);
                }}
              >
                MQTT Tools
              </Button>
              <Portal showModal={showMQTT}>
                <div className="w-3/4 h-full m-auto">
                  <MQTT
                    show={showMQTT}
                    onClose={() => {
                      setShowMQTT(false);
                    }}
                  />
                </div>
              </Portal>
            </div>
          </div>
        </ThemeProvider>
      </main>
    </MQTTProvider>
  );
}
