import { Center } from "@react-three/drei";
import { useMQTT } from "@/contexts/MQTTProvider";
import { useEffect, useRef, useState } from "react";
// import { useFrame } from "@react-three/fiber";

export const Square = () => {
  const { payload } = useMQTT();
  const [color, setColor] = useState("#ffffff");

  const ref = useRef<any>();

  useEffect(() => {
    const { topic, message } = payload;
    console.log(topic, message);
    if (topic === "canvas/cube/position") {
      const [x, y, z] = message.split(",");
      ref.current.position.x = Number(x);
      ref.current.position.y = Number(y);
      ref.current.position.z = Number(z);
    } else if (topic === "canvas/cube/color") {
      const messageObj = JSON.parse(message);

      // console.log(messageObj.color);
      setColor(messageObj.color);
      // ref.current.material.color.set(messageObj.color);
    }
  }, [payload]);

  // useFrame((state) => {
  //   console.log(state.camera.position);
  // });

  return (
    <Center top>
      <mesh castShadow ref={ref}>
        <boxGeometry />
        <meshStandardMaterial metalness={1} roughness={1} color={color} />
      </mesh>
    </Center>
  );
};
