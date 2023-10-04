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
      const messageObj = JSON.parse(message);
      ref.current.position.x = messageObj.x;
      ref.current.position.y = messageObj.y;
      ref.current.position.z = messageObj.z;
    } else if (topic === "canvas/cube/rotation") {
      const messageObj = JSON.parse(message);
      // console.log(messageObj.x, messageObj.y, messageObj.z);
      ref.current.rotation.x = messageObj.gyroX;
      ref.current.rotation.y = messageObj.gyroY;
      ref.current.rotation.z = messageObj.gyroZ;
    } else if (topic === "canvas/cube/color") {
      const messageObj = JSON.parse(message);
      setColor(messageObj.color);
    }
  }, [payload]);

  // useFrame((state) => {
  //   console.log(state.camera.position);
  // });

  return (
    <Center top>
      <mesh castShadow ref={ref}>
        <boxGeometry args={[1, 0.2, 2]} />
        <meshStandardMaterial metalness={1} roughness={1} color={color} />
      </mesh>
    </Center>
  );
};
