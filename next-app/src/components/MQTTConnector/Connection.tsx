import { useState } from "react";
import { Card } from "../Card";
import { useMQTT } from "@/contexts/MQTTProvider";
import { Button } from "../Button";
import { useFocus } from "@/contexts/FocusProvider";

export const Connection = () => {
  const { mqttConnect, mqttDisconnect, connectionStatus } = useMQTT();
  const [connectionOptions, setConnectionOptions] = useState({
    protocol: "ws",
    host: "localhost",
    clientId: "react_client",
    port: "9001",
    username: "user",
    password: "password",
  });
  const { setFocus } = useFocus();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // console.log(connectionOptions);
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

  return (
    <Card className="border bg-transparent">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-row flex-wrap gap-2 justify-end items-center">
          {connectionStatus === "disconnected" ? (
            <Button type="submit">Connect</Button>
          ) : connectionStatus === "connected" ? (
            <Button type="button" disabled={true}>
              Connected
            </Button>
          ) : (
            <Button type="button" disabled={true}>
              {connectionStatus}
            </Button>
          )}
          <Button type="button" onClick={mqttDisconnect}>
            Disconnect
          </Button>
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
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
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
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
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
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </form>
    </Card>
  );
};
