import { Canvas } from "@react-three/fiber";
import { Skull } from "./Skull";

export const SkullLoader = () => {
  return (
    <Canvas
      camera={{ position: [-0.5, 1, 2] }}
      shadows
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "100%",
      }}
      z-index={-1}
    >
      <Skull />
    </Canvas>
  );
};
