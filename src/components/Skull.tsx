import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Matrix4, Object3D, Quaternion, Vector3 } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";

export const Skull = () => {
  const { scene, nodes } = useGLTF("/Skull_Sep.glb");
  const targetRot = useRef<number>(0);
  const meshRef = useRef<Object3D>();
  const targetPos = useRef<Vector3>(new Vector3(0, 1, 0));
  const rotMatrix = useRef<Matrix4>(new Matrix4());
  const targetQuat = useRef<Quaternion>(new Quaternion(0, 0, 0, 0));

  useFrame(({ pointer, viewport }) => {
    if (meshRef.current) {
      const x = pointer.x * viewport.width;
      const y = pointer.y * viewport.height;
      targetPos.current.set(x, y, 1);
      rotMatrix.current.lookAt(
        targetPos.current,
        meshRef.current.position,
        meshRef.current.up
      );
      targetQuat.current.setFromRotationMatrix(rotMatrix.current);
      meshRef.current.quaternion.slerp(targetQuat.current, 0.1);

      if (nodes.SkullBottom) {
        nodes.SkullBottom.rotation.x = lerp(
          nodes.SkullBottom.rotation.x,
          degToRad(targetRot.current),
          0.4
        );
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

      <OrbitControls
        target={[0, 1, 0]}
        enableZoom={false}
        enableDamping={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
};
