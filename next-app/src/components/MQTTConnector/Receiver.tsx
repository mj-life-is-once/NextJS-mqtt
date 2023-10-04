import { useEffect, useState } from "react";
import { Card } from "../Card";
import { useMQTT } from "@/contexts/MQTTProvider";

export const Receiver = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const { payload } = useMQTT(); // payload: { topic: string; message: string; } |

  useEffect(() => {
    if (payload.topic) {
      setMessages((messages) => [...messages, payload]);
    }
  }, [payload]);

  return (
    <Card className="border bg-neutral-800">
      <div className="flex flex-col h-80 overflow-auto">
        <div className="flex flex-row justify-around gap-3 mb-3">
          <div className="text-sm text-center text-white uppercase font-extrabold">
            Topic
          </div>
          <div className="text-sm text-center text-white uppercase font-extrabold ">
            Message
          </div>
        </div>
        {messages.map((message, index) => (
          <div key={index} className="flex flex-row justify-between gap-3">
            <div className="text-sm text-emerald-300">{message.topic}</div>
            <div className="text-sm text-left text-slate-300">
              {message.message}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
