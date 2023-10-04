import { useMQTT } from "@/contexts/MQTTProvider";
import { Card } from "../Card";
import { Button } from "../Button";
import { useState } from "react";
import { useFocus } from "@/contexts/FocusProvider";

const samplePayload = {
  color: "#FFBF00",
};
export const Publisher = () => {
  const { qosOptions, mqttPublish } = useMQTT();
  const { setFocus } = useFocus();

  const [pubTopic, setPubTopic] = useState({
    topic: "canvas/cube/color",
    qos: 0,
    payload: JSON.stringify(samplePayload, undefined, 2),
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
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <label htmlFor="qos" className="text-sm text-slate-100">
          QoS
        </label>
        <div className="relative">
          <select
            className="p-1 text-slate-500 text-sm rounded"
            value={pubTopic.qos}
            onChange={handleChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          >
            {qosOptions.map(
              (option: { label: string; value: number }, index: number) => (
                <option key={index}>{option.label}</option>
              )
            )}
          </select>
        </div>

        <label htmlFor="payload" className="text-sm text-slate-100">
          Payload (json)
        </label>
        <textarea
          className="block w-full text-sm text-slate-500 p-1 rounded"
          rows={4}
          cols={50}
          id="payload"
          value={pubTopic.payload}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </form>
    </Card>
  );
};
