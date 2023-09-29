import { useMQTT } from "@/contexts/MQTTProvider";
import { Card } from "../Card";
import { Button } from "../Button";
import { useState } from "react";

export const Subscriber = () => {
  const { mqttSubscribe, mqttUnSubscribe, isSubscribed, qosOptions } =
    useMQTT();
  const [subTopic, setSubtopic] = useState({
    topic: "testtopic/react",
    qos: 0,
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log(subTopic);
    mqttSubscribe(subTopic);
  };

  const handleUnsub = (event: any) => {
    event.preventDefault();

    const topic = event.target.topic.value;
    mqttUnSubscribe(topic);
  };

  const handleChange = (event: any) => {
    const { key, value } = event.target;
    setSubtopic((prevTopic) => ({ ...prevTopic, [key]: value }));
  };

  return (
    <Card className="border bg-transparent">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div className="text-right">
          <Button type="submit">Subscribe</Button>
          {isSubscribed && <Button onClick={handleUnsub}>Unsubscribe</Button>}
        </div>
        <label htmlFor="topic" className="text-sm text-slate-100">
          Topic
        </label>
        <input
          className="block w-full text-sm text-slate-500 p-1 rounded"
          type="text"
          id="topic"
          defaultValue={subTopic.topic}
          onChange={handleChange}
        />
        <label htmlFor="qos" className="text-sm text-slate-100">
          QoS
        </label>
        <select value={subTopic.qos} onChange={handleChange}>
          {qosOptions.map(
            (option: { label: string; value: number }, index: number) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
      </form>
    </Card>
  );
};
