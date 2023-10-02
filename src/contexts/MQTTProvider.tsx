import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
// https://github.com/mpolinowski/mqtt-frontend/tree/master

import * as mqtt from "mqtt";

const MQTTContext = createContext<any>(null);

export const MQTTProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  const mqttConnect = useCallback((host: string, mqttOption: any) => {
    setConnectionStatus("connecting");
    setClient(mqtt.connect(host, mqttOption));
  }, []);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectionStatus("connected");
      });
      client.on("error", (err: any) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectionStatus("reconnecting");
      });
      client.on("message", (topic: string, message: any) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  const mqttDisconnect = useCallback(() => {
    if (client) {
      console.log(`[${MQTTProvider.name}]: MQTT disconnected`);
      client.end();
      setConnectionStatus("disconnected");
    }
  }, [client]);

  const mqttPublish = useCallback(
    (context: any) => {
      if (client) {
        const { topic, qos, payload } = context;
        client.publish(topic, payload, { qos }, (error: any) => {
          if (error) {
            console.log("Publish error: ", error);
          }
          console.log(
            `[${MQTTProvider.name}]: MQTT published ${payload} to topic ${topic} `
          );
        });
      }
    },
    [client]
  );

  const mqttSubscribe = useCallback(
    (subscription: any) => {
      if (client) {
        const { topic, qos } = subscription;
        client.subscribe(topic, { qos }, (error: any) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
          console.log(
            `[${MQTTProvider.name}]: MQTT subscribed to topic ${topic} `
          );
          setIsSubscribed(true);
        });
      }
    },
    [client]
  );

  const mqttUnSubscribe = useCallback(
    (subscription: any) => {
      if (client) {
        const { topic } = subscription;
        client.unsubscribe(topic, (error: any) => {
          if (error) {
            console.log("Unsubscribe error", error);
            return;
          }
          console.log(
            `[${MQTTProvider.name}]: MQTT unsubscribed from topic ${topic} `
          );
          setIsSubscribed(false);
        });
      }
    },
    [client]
  );

  const qosOptions = useMemo(
    () => [
      {
        label: "0",
        value: 0,
      },
      {
        label: "1",
        value: 1,
      },
      {
        label: "2",
        value: 2,
      },
    ],
    []
  );

  const value = useMemo(
    () => ({
      client,
      connectionStatus,
      payload,
      isSubscribed,
      mqttConnect,
      mqttDisconnect,
      mqttPublish,
      mqttSubscribe,
      mqttUnSubscribe,
      qosOptions,
    }),
    [
      client,
      connectionStatus,
      payload,
      isSubscribed,
      mqttConnect,
      mqttDisconnect,
      mqttPublish,
      mqttSubscribe,
      mqttUnSubscribe,
      qosOptions,
    ]
  );

  return <MQTTContext.Provider value={value}>{children}</MQTTContext.Provider>;
};
{
}
export const useMQTT = () => {
  return useContext(MQTTContext);
};
