import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { DISCHARGE_POINT_LOCATION } from '../../data/mockWorldData';

interface DischargePointProps {
  onSelect?: () => void;
}

export const DischargePoint: React.FC<DischargePointProps> = ({ onSelect }) => {
  const rippleRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (rippleRef.current) {
      rippleRef.current.rotation.z += delta * 0.4;
      const s = 1 + Math.sin(Date.now() * 0.003) * 0.12;
      rippleRef.current.scale.set(s, s, s);
    }
  });

  const [x, y, z] = DISCHARGE_POINT_LOCATION;

  return (
    <group position={[x, y, z]}>
      {/* Sleek Minimalist 3D HUD Pin */}
      <Html position={[0, 1.8, 0]} center distanceFactor={45} zIndexRange={[100, 0]}>
        <div
          onClick={onSelect}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-slate-800 border border-teal-300 shadow-sm hover:scale-105 cursor-pointer transition-all select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
          <span className="font-bold tracking-tight">Discharge Outfall</span>
          <span className="text-[9px] text-teal-700 font-mono">38.4 MLD</span>
        </div>
      </Html>

      {/* Concrete Outfall Headwall Structure */}
      <mesh position={[0, 0.35, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.7, 0.6]} />
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </mesh>

      {/* Discharge Pipe Mouth */}
      <mesh position={[0, 0.28, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
        <meshStandardMaterial color="#0d9488" metalness={0.8} />
      </mesh>

      {/* Subtle Mixing Ripple on River Surface */}
      <mesh
        ref={rippleRef}
        position={[0, 0.03, 0.7]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.3, 0.9, 24]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
