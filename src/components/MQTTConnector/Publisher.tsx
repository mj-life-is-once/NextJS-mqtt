import { useMQTT } from "@/contexts/MQTTProvider";
import { Card } from "../_ui/Card";
import { Button } from "../_ui/Button";
import { useState } from "react";

export const Publisher = () => {
  const { qosOptions, mqttPublish } = useMQTT();
  const [pubTopic, setPubTopic] = useState({
    topic: "testtopic/react",
    qos: 0,
    payload: "This is your message to send",
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    mqttPublish(pubTopic);
  };

  const handleChange = (event: any) => {
    // console.log(pubTopic);
    setPubTopic((prevTopic) => ({
      ...prevTopic,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <Card className="border bg-transparent">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div className="text-right">
          <Button type="submit">Publish</Button>
        </div>
        <label htmlFor="topic" className="text-sm text-slate-100">
          Topic
        </label>
        <input
          className="block w-full text-sm text-slate-500 p-1 rounded"
          type="text"
          id="topic"
          value={pubTopic.topic}
          onChange={handleChange}
        />
        <label htmlFor="qos" className="text-sm text-slate-100">
          QoS
        </label>
        <div className="relative">
          <select
            className="p-1 text-slate-500 text-sm rounded"
            value={pubTopic.qos}
            onChange={handleChange}
          >
            {qosOptions.map(
              (option: { label: string; value: number }, index: number) => (
                <option key={index}>{option.label}</option>
              )
            )}
          </select>
        </div>

        <label htmlFor="payload" className="text-sm text-slate-100">
          Payload
        </label>
        <input
          className="block w-full text-sm text-slate-500 p-1 rounded"
          type="text"
          id="payload"
          value={pubTopic.payload}
          onChange={handleChange}
        />
      </form>
    </Card>
  );
};
