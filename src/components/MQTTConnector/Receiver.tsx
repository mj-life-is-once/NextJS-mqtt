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
    <Card className="border bg-transparent">
      <div className="flex flex-col h-80 overflow-auto">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-row justify-between">
            <div className="text-sm text-yellow-300">{message.topic}</div>
            <div className="text-sm text-slate-300">{message.message}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
