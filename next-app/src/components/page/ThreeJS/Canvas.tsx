import { Canvas } from "@react-three/fiber";
import { Square } from "./Square";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";

export const ThreeCanvas = () => {
  return (
    <div className="w-full h-[500px] shadow-lg" id="canvas-container">
      <Canvas shadows camera={{ position: [-5.35, 1.21, 3.52], fov: 25 }}>
        <group position={[0, -0.25, 0]}>
          <Square />
          <ambientLight intensity={0.7} />
          <spotLight
            intensity={0.5}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          />
        </group>
        <Environment preset={"forest"} background blur={0.65} />
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.5}
          scale={10}
          blur={1.5}
          far={1}
        />
        <OrbitControls enableZoom={false} enablePan={true} />
      </Canvas>
    </div>
  );
};
