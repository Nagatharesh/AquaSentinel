import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { BorewellData } from '../../types/worldModel';

interface BorewellProps {
  data: BorewellData;
  isSelected: boolean;
  onSelect: (borewell: BorewellData) => void;
}

export const Borewell: React.FC<BorewellProps> = ({ data, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const sensorGlowRef = useRef<THREE.Mesh>(null);
  const selectionRingRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sensorGlowRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.12;
      sensorGlowRef.current.scale.set(scale, scale, scale);
    }

    if (selectionRingRef.current && isSelected) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.06;
      selectionRingRef.current.scale.set(scale, scale, 1);
    }
  });

  const [x, y, z] = data.position3D;

  return (
    <group
      position={[x, y, z]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(data);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Precision Selection Marker */}
      {isSelected && (
        <mesh ref={selectionRingRef} position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.0, 2.2, 32]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Minimalist 3D HUD Pin */}
      <Html position={[0, 2.2, 0]} center distanceFactor={45} zIndexRange={[100, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(data);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all duration-150 cursor-pointer shadow-sm select-none ${
            isSelected
              ? 'bg-slate-900 text-white ring-2 ring-cyan-400 shadow-md'
              : isHovered
              ? 'bg-white text-slate-900 border border-cyan-400 shadow-md scale-105'
              : 'bg-white/90 text-slate-800 border border-cyan-300 hover:bg-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
          <span className="font-bold tracking-tight">Groundwater Well</span>
          <span className="text-[9px] bg-cyan-50 text-cyan-700 font-mono px-1 rounded border border-cyan-200">
            {data.depthMeters}m
          </span>
        </div>
      </Html>

      {/* Surface Wellhead Concrete Apron */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.85, 0.2, 24]} />
        <meshStandardMaterial color={isSelected ? '#bae6fd' : isHovered ? '#e2e8f0' : '#cbd5e1'} roughness={0.6} />
      </mesh>

      {/* Stainless Steel Casing Flange */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Digital Telemetry Cap */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.12, 16]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* Geological Soil Strata & Aquifer Pillar */}
      <group position={[0, -1.6, 0]}>
        <mesh position={[0, 1.0, 0]}>
          <boxGeometry args={[1.6, 0.6, 1.6]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} transparent opacity={0.65} />
        </mesh>

        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[1.6, 0.6, 1.6]} />
          <meshStandardMaterial color="#475569" roughness={0.9} transparent opacity={0.7} />
        </mesh>

        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[1.6, 0.8, 1.6]} />
          <meshStandardMaterial color="#0369a1" roughness={0.4} transparent opacity={0.75} />
        </mesh>

        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 2.2, 16]} />
          <meshStandardMaterial color="#e0f2fe" transparent opacity={0.5} metalness={0.6} />
        </mesh>

        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 12]} />
          <meshStandardMaterial color="#0f766e" metalness={0.9} />
        </mesh>

        <mesh ref={sensorGlowRef} position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
};
