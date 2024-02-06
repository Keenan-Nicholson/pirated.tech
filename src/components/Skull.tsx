import { OrbitControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Object3D } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const Skull = () => {
  const gltf = useLoader(GLTFLoader, "/Skull.glb");

  let meshRef = useRef<Object3D>();

  useFrame(({ pointer, viewport }) => {
    if (meshRef.current) {
      const x = pointer.x * viewport.width * 1.25;
      const y = pointer.y * viewport.height * 1.25;
      meshRef.current.lookAt(x, y, 1);
    }
  });

  return (
    <>
      <directionalLight position={[3.3, 1.0, 4.4]} intensity={Math.PI} />
      <primitive
        object={gltf.scene}
        position={[0, 1, 0]}
        children-0-castShadow
        ref={meshRef}
      />

      <OrbitControls target={[0, 1, 0]} enableZoom={false} />
    </>
  );
};
