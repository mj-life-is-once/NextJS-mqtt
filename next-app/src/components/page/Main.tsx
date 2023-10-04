import { Button } from "@/components/Button";
import CssBaseline from "@mui/material/CssBaseline";
// import { Portal } from "@/components/Portal";
import { MQTT } from "@/components/MQTTConnector/MQTT";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode, useState } from "react";
import { useMQTT } from "@/contexts/MQTTProvider";
import { FocusProvider } from "@/contexts/FocusProvider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const MainPage = ({ children }: { children?: ReactNode }) => {
  const [showMQTT, setShowMQTT] = useState(false);
  const { connectionStatus } = useMQTT();

  return (
    <main
      className={`relative w-full py-10 min-h-full ${
        connectionStatus === "connected" ? "bg-emerald-500" : "bg-slate-800"
      }`}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="relative flex flex-col h-full max-w-3xl m-auto px-4 py-4 sm:px-6">
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
          </div>
          {children}
        </div>
        <FocusProvider>
          <div
            className={`absolute top-0 text-left z-20 w-full h-full pointer-events-none`}
          >
            <MQTT
              show={showMQTT}
              onClose={() => {
                setShowMQTT(false);
              }}
            />
          </div>
        </FocusProvider>
      </ThemeProvider>
    </main>
  );
};
