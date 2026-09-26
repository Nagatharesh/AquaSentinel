import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function ModelViewer() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#00f2fe" roughness={0.3} metalness={0.8} />
    </mesh>
  );
}
