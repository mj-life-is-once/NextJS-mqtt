"use client";
import { ReactNode } from "react";
import { MQTTProvider } from "@/contexts/MQTTProvider";
import { Subscriber } from "./Subscriber";
import { Publisher } from "./Publisher";
import { Receiver } from "./Receiver";
import { Connection } from "./Connection";
import { Popup } from "../Popup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const MQTT = ({
  children,
  show,
  onClose,
}: {
  children?: ReactNode;
  show: boolean;
  onClose: () => void;
}) => {
  return (
    <MQTTProvider>
      {show && (
        <Popup
          className="bg-slate-800 w-full h-full"
          title="MQTT Tools"
          onClose={onClose}
        >
          <div className="flex flex-col  gap-5 h-[35rem] overflow-auto">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h1 className="font-extrabold">Connector</h1>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <Connection />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <h1 className="font-extrabold">Subscriber</h1>
              </AccordionSummary>
              <AccordionDetails>
                <Subscriber />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <h1 className="font-extrabold">Publisher</h1>
              </AccordionSummary>
              <AccordionDetails>
                <Publisher />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <h1 className="font-extrabold">Receiver</h1>
              </AccordionSummary>
              <AccordionDetails>
                <Receiver />
              </AccordionDetails>
            </Accordion>
          </div>
        </Popup>
      )}
      {children}
    </MQTTProvider>
  );
};
