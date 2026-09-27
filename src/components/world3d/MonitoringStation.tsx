import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { DownstreamStationData } from '../../types/worldModel';

interface MonitoringStationProps {
  data: DownstreamStationData;
  isSelected: boolean;
  onSelect: (station: DownstreamStationData) => void;
}

export const MonitoringStation: React.FC<MonitoringStationProps> = ({
  data,
  isSelected,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buoyRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const selectionRingRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (buoyRef.current) {
      buoyRef.current.position.y = 0.06 + Math.sin(Date.now() * 0.002) * 0.02;
    }

    if (pulseRingRef.current) {
      const scale = 1 + ((Date.now() * 0.0008) % 2) * 0.9;
      pulseRingRef.current.scale.set(scale, scale, 1);
      const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.6 - (scale - 1) * 0.4);
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
        <mesh ref={selectionRingRef} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
              ? 'bg-slate-900 text-white ring-2 ring-emerald-400 shadow-md'
              : isHovered
              ? 'bg-white text-slate-900 border border-emerald-400 shadow-md scale-105'
              : 'bg-white/90 text-slate-800 border border-emerald-300 hover:bg-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="font-bold tracking-tight">Downstream River Buoy</span>
          <span className="text-[9px] bg-emerald-50 text-emerald-700 font-mono px-1 rounded border border-emerald-200">
            WQI {data.waterQualityIndex}
          </span>
        </div>
      </Html>

      {/* Floating River Sensor Probe */}
      <group ref={buoyRef} position={[0, 0.07, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.38, 0.3, 0.24, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.48, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>

      {/* Subtle Sonar Ring */}
      <mesh
        ref={pulseRingRef}
        position={[0, 0.03, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.4, 0.55, 24]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
