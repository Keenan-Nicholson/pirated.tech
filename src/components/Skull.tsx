import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Object3D } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";

export const Skull = () => {
  const { scene, nodes }= useGLTF("/Skull_Sep.glb");
  const targetRot = useRef<number>(0);
  const meshRef = useRef<Object3D>();

  useFrame(({ pointer, viewport }) => {
    if (meshRef.current) {
      const x = pointer.x * viewport.width * 1.25;
      const y = pointer.y * viewport.height * 1.25;
      meshRef.current.lookAt(x, y, 1);
      if (nodes.SkullBottom) {
        nodes.SkullBottom.rotation.x = lerp(nodes.SkullBottom.rotation.x, degToRad(targetRot.current), 0.4);
      }
    }
  });

  return (
    <>
      <directionalLight position={[3.3, 1.0, 4.4]} intensity={Math.PI} />
      <primitive
        object={scene}
        position={[0, 1, 0]}
        children-0-castShadow
        ref={meshRef}
        onPointerOver={() => (targetRot.current = 10)}
        onPointerOut={() => (targetRot.current = 0)}
      />

      <OrbitControls target={[0, 1, 0]} enableZoom={false} />
    </>
  );
};
