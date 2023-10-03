import { Canvas } from "@react-three/fiber";
import { Square } from "./Square";
import {
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  OrbitControls,
} from "@react-three/drei";

export const ThreeCanvas = () => {
  return (
    <div className="w-full h-[500px] shadow-lg" id="canvas-container">
      <Canvas shadows camera={{ position: [-4.27, 2.49, 4], fov: 25 }}>
        <group position={[0, -0.65, 0]}>
          <Square />
          <AccumulativeShadows
            temporal
            frames={200}
            color="purple"
            colorBlend={0.5}
            opacity={1}
            scale={10}
            alphaTest={0.85}
          >
            <RandomizedLight
              amount={8}
              radius={5}
              ambient={0.5}
              position={[5, 3, 2]}
              bias={0.001}
            />
          </AccumulativeShadows>
        </group>
        <Environment preset={"forest"} background blur={0.65} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
};
