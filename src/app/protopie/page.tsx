"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Portal } from "@/components/_ui/Portal";
import { MQTT } from "@/components/MQTTConnector/MQTT";
import { useState } from "react";
import { Button } from "@/components/_ui/Button";
import { IFrame } from "@/components/_ui/IFrame";
import Map from "@/components/_ui/Map";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-12-showing-user-location-on-embedded-google-maps-with-geolocation-api-and-react-a8ea40d1e891

const coord = {
  lat: 51.5473108,
  lng: -0.0239515,
};
export default function Home() {
  const [showMQTT, setShowMQTT] = useState(false);
  return (
    <main className="relative w-full min-h-full z-10">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="absolute z-20 top-5" style={{ right: "500px" }}>
          <Button
            className="border border-white text-black border-none text-white p-5 hover:bg-slate-500/50"
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
      </ThemeProvider>
      <IFrame
        className="z-0"
        src="https://cloud.protopie.io/p/fbb1f5fbfcf05178cd208d99?ui=false&scaleToFit=true&enableHotspotHints=false&cursorType=touch&mockup=false&bgColor=%23F5F5F5&playSpeed=1&handoff=true"
        targetDisplay="system"
      />
      <div
        className="absolute z-20 w-[1536px] h-[745px] bg-yellow-300/90"
        style={{ top: "95px" }}
      >
        <Map width="1536px" height="745px" coord={coord} />
      </div>
    </main>
  );
}
