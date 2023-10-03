"use client";

import { MQTTProvider } from "@/contexts/MQTTProvider";
import { MainPage } from "@/components/page/Main";
import { ThreeCanvas } from "@/components/page/ThreeJS/Canvas";

// https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-12-showing-user-location-on-embedded-google-maps-with-geolocation-api-and-react-a8ea40d1e891

export default function Home() {
  return (
    <MQTTProvider>
      <MainPage>
        <ThreeCanvas />
      </MainPage>
    </MQTTProvider>
  );
}
