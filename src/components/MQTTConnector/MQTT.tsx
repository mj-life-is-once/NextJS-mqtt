import { ReactNode } from "react";
import { MQTTProvider } from "@/contexts/MQTTProvider";
import { Subscriber } from "./Subscriber";
import { Publisher } from "./Publisher";
import { Receiver } from "./Receiver";
import { Connection } from "./Connection";
import { Card } from "../Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

export const MQTT = ({
  children,
  show,
}: {
  children?: ReactNode;
  show: boolean;
}) => {
  return (
    <MQTTProvider>
      {show && (
        <Card
          className="flex flex-col p-5 gap-5 w-full bg-slate-800 h-screen overflow-auto"
          title="MQTT Tools"
        >
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
        </Card>
      )}
      {children}
    </MQTTProvider>
  );
};
