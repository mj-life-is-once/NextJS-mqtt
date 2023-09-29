import { IFrame } from "@/components/IFrame";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Portal } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-12-showing-user-location-on-embedded-google-maps-with-geolocation-api-and-react-a8ea40d1e891

export default function Home() {
  return (
    <main className="relative min-h-screen w-full h-full">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Portal>
          <div className="absolute top-0 left-0 z-10">
            <IFrame src="https://cloud.protopie.io/p/fbb1f5fbfcf05178cd208d99?ui=false&scaleToFit=true&enableHotspotHints=false&cursorType=touch&mockup=false&bgColor=%23F5F5F5&playSpeed=1&handoff=true" />
          </div>
          <div className="absolute flex flex-col z-20 top-5 right-1/3">
            <button
              className="block bg-neutral-200 text-black rounded p-4 font-bold"
              onClick={() => {
                setShowMQTT((prev) => !prev);
              }}
            >
              MQTT Connection
            </button>
          </div>
        </Portal>
      </ThemeProvider>
    </main>
  );
}
