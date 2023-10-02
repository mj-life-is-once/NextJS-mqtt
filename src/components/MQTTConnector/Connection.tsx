import { useState } from "react";
import { Card } from "../Card";
import { useMQTT } from "@/contexts/MQTTProvider";
import { Button } from "../Button";

export const Connection = () => {
  const { mqttConnect, mqttDisconnect, connectionStatus } = useMQTT();
  const [connectionOptions, setConnectionOptions] = useState({
    host: "localhost",
    clientId: "react_client",
    port: "9001",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(connectionOptions);
    const { host, clientId, port } = connectionOptions;
    const url = `ws://${host}:${port}`;
    const options = {
      clientId,
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    };
    mqttConnect(url, options);
  };

  const handleChange = (event: any) => {
    setConnectionOptions((prevOptions) => ({
      ...prevOptions,
      [event.target.id]: event.target.value,
    }));
  };

  const backgroundColor =
    connectionStatus === "connected" ? "bg-emerald-700" : "bg-transparent";

  return (
    <Card className={`border ${backgroundColor}`}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="text-right">
          {connectionStatus === "disconnected" && (
            <Button className="mr-2" type="submit">
              Connect
            </Button>
          )}

          {connectionStatus === "connected" && (
            <Button type="button" onClick={mqttDisconnect}>
              Disconnect
            </Button>
          )}
        </div>
        <label className="text-sm text-slate-100" htmlFor="host">
          Host
        </label>
        <input
          className="block w-full text-sm text-slate-500 p-1 rounded"
          type="text"
          id="host"
          value={connectionOptions.host}
          onChange={handleChange}
        />
        <label className="text-sm text-slate-100" htmlFor="port">
          Port{" "}
        </label>
        <input
          className="block w-full text-sm text-slate-500 p-1 rounded"
          type="text"
          id="port"
          value={connectionOptions.port}
          onChange={handleChange}
        />{" "}
        <label className="text-sm text-slate-100" htmlFor="clientId">
          Client ID
        </label>
        <input
          className="block w-full text-sm text-slate-500 p-1 rounded"
          type="text"
          id="clientId"
          value={connectionOptions.clientId}
          onChange={handleChange}
        />
      </form>
    </Card>
  );
};
