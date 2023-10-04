"use client";
import { ReactNode } from "react";
import { useMQTT } from "@/contexts/MQTTProvider";
import { Subscriber } from "./Subscriber";
import { Publisher } from "./Publisher";
import { Receiver } from "./Receiver";
import { Connection } from "./Connection";
import { Popup } from "../Popup";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useCallback } from "react";

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => {
  const { connectionStatus } = useMQTT();
  const backgroundColor = useCallback(
    (theme: any) => {
      if (theme.palette.mode == "dark") {
        if (connectionStatus == "connected") return "#009688";
        else return "rgba(255, 255, 255, .05)";
      } else {
        if (connectionStatus == "connected") return "#009688";
        else return "rgba(0, 0, 0, .03)";
      }
    },
    [connectionStatus]
  );

  return {
    backgroundColor: backgroundColor(theme),
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  };
});

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
    <>
      {show && (
        <Popup
          className="bg-slate-700 w-2/5 h-3/4 pointer-events-auto"
          title="MQTT Tools"
          onClose={onClose}
        >
          <div className="flex flex-col gap-5 h-[35rem] overflow-auto">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h1 className="font-extrabold">Connector</h1>
              </AccordionSummary>
              <AccordionDetails>
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
    </>
  );
};
