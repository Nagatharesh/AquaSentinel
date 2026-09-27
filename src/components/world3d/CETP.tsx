import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { CetpData } from '../../types/worldModel';

interface CETPProps {
  data: CetpData;
  isSelected: boolean;
  onSelect: (cetp: CetpData) => void;
}

export const CETP: React.FC<CETPProps> = ({ data, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const bridge1Ref = useRef<THREE.Group>(null);
  const bridge2Ref = useRef<THREE.Group>(null);
  const selectionRingRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (bridge1Ref.current) bridge1Ref.current.rotation.y += delta * 0.25;
    if (bridge2Ref.current) bridge2Ref.current.rotation.y += delta * 0.22;

    if (selectionRingRef.current && isSelected) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.05;
      selectionRingRef.current.scale.set(scale, scale, 1);
    }
  });

  const [posX, posY, posZ] = data.position3D;

  return (
    <group
      position={[posX, posY, posZ]}
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
        <mesh ref={selectionRingRef} position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.4, 4.6, 32]} />
          <meshBasicMaterial color="#0d9488" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Professional Minimalist 3D HUD Pin */}
      <Html position={[0, 2.8, 0]} center distanceFactor={45} zIndexRange={[100, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(data);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all duration-150 cursor-pointer shadow-sm select-none ${
            isSelected
              ? 'bg-teal-900 text-white ring-2 ring-teal-400 shadow-md'
              : isHovered
              ? 'bg-white text-slate-900 border border-teal-400 shadow-md scale-105'
              : 'bg-white/90 text-slate-800 border border-teal-200 hover:bg-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
          <span className="font-bold tracking-tight">CETP Plant</span>
          <span className="text-[9px] bg-teal-50 text-teal-700 font-mono px-1 rounded border border-teal-200">50 MLD</span>
        </div>
      </Html>

      {/* Engineered Concrete Foundation Base */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[9.5, 0.16, 7.2]} />
        <meshStandardMaterial color={isSelected ? '#ccfbf1' : isHovered ? '#e2e8f0' : '#f1f5f9'} roughness={0.7} />
      </mesh>

      {/* Primary Clarifier Tank 1 */}
      <group position={[-2.4, 0.45, -1.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.35, 1.35, 0.7, 32]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[1.22, 1.22, 0.2, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.15} transparent opacity={0.88} />
        </mesh>
        <group ref={bridge1Ref} position={[0, 0.38, 0]}>
          <mesh>
            <boxGeometry args={[2.4, 0.06, 0.12]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.3, 12]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Primary Clarifier Tank 2 */}
      <group position={[2.4, 0.45, -1.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.35, 1.35, 0.7, 32]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[1.22, 1.22, 0.2, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.15} transparent opacity={0.88} />
        </mesh>
        <group ref={bridge2Ref} position={[0, 0.38, 0]}>
          <mesh>
            <boxGeometry args={[2.4, 0.06, 0.12]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.3, 12]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Biological Aeration Basin */}
      <group position={[-1.2, 0.45, 1.6]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.7, 1.8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[2.6, 0.12, 1.6]} />
          <meshStandardMaterial color="#0f766e" roughness={0.3} transparent opacity={0.9} />
        </mesh>
      </group>

      {/* Secondary Clarifier Tank */}
      <group position={[1.8, 0.45, 1.6]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.1, 1.1, 0.7, 24]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.15, 24]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} transparent opacity={0.9} />
        </mesh>
      </group>

      {/* SCADA Building */}
      <group position={[-3.3, 0.75, 1.6]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.3, 1.5]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.1, 0.76]}>
          <planeGeometry args={[1.3, 0.6]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
        </mesh>
        <mesh position={[0.4, 1.2, 0.3]}>
          <cylinderGeometry args={[0.015, 0.03, 1.5, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      </group>

      {/* Sludge Dewatering House */}
      <group position={[3.4, 0.65, 1.6]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.1, 1.4]} />
          <meshStandardMaterial color="#475569" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};
