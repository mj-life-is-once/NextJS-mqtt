import { useMQTT } from "@/contexts/MQTTProvider";
import { Card } from "../_ui/Card";
import { Button } from "../_ui/Button";
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

    mqttUnSubscribe(subTopic);
  };

  const handleChange = (event: any) => {
    setSubtopic((prevTopic) => ({
      ...prevTopic,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <Card className="border bg-transparent">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div className="text-right">
          <Button className="mr-2" type="submit">
            Subscribe
          </Button>
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
        <div className="relative">
          <select
            className="p-1 text-slate-500 text-sm rounded"
            value={subTopic.qos}
            onChange={handleChange}
          >
            {qosOptions.map(
              (option: { label: string; value: number }, index: number) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              )
            )}
          </select>
        </div>
      </form>
    </Card>
  );
};
