import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RiverProps {
  flowSpeed?: number;
}

export const River: React.FC<RiverProps> = ({ flowSpeed = 1.0 }) => {
  const waterMeshRef = useRef<THREE.Mesh>(null);
  const flowVectorsRef = useRef<THREE.Group>(null);
  const plumeRef = useRef<THREE.Mesh>(null);

  // Subtle wave & water flow animation
  useFrame((_, delta) => {
    if (flowVectorsRef.current) {
      flowVectorsRef.current.children.forEach((arrow, i) => {
        arrow.position.x += delta * 1.8 * flowSpeed;
        if (arrow.position.x > 26) {
          arrow.position.x = -26;
        }
        arrow.position.y = 0.08 + Math.sin(Date.now() * 0.002 + i) * 0.015;
      });
    }

    if (plumeRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.12;
      plumeRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group name="LargeRiverBasinSystem">
      {/* 1. Deep Riverbed Basin Trench (Carved Subsurface Earth) */}
      <mesh position={[0, -0.25, 16]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 16, 32, 16]} />
        <meshStandardMaterial color="#0c4a6e" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* 2. Large Expansive Water Surface Body (Bhavani River Basin) */}
      <mesh
        ref={waterMeshRef}
        position={[0, 0.02, 16]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 15, 64, 32]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.06}
          metalness={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 3. Deep Water Layer (Translucent Gradient Depth) */}
      <mesh position={[0, -0.1, 16]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 14.8]} />
        <meshStandardMaterial color="#0369a1" roughness={0.2} transparent opacity={0.6} />
      </mesh>

      {/* 4. Engineered Northern Embankment / Retaining Wall (Separating Industrial Pad from River) */}
      <mesh position={[0, 0.06, 8.4]} receiveShadow>
        <boxGeometry args={[56, 0.12, 0.5]} />
        <meshStandardMaterial color="#64748b" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* 5. Concrete Outfall Discharge Chute from CETP into the River */}
      <group position={[0, 0.05, 8.8]}>
        <mesh position={[0, 0, 0.8]} receiveShadow>
          <boxGeometry args={[2.4, 0.08, 1.8]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        {/* Outfall Guide Channel Walls */}
        <mesh position={[-1.2, 0.15, 0.8]}>
          <boxGeometry args={[0.15, 0.22, 1.8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[1.2, 0.15, 0.8]}>
          <boxGeometry args={[0.15, 0.22, 1.8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>

      {/* 6. Effluent Dilution & Mixing Plume in the River */}
      <mesh
        ref={plumeRef}
        position={[0, 0.035, 11]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.5, 2.2, 32]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* 7. Sleek River Bridge spanning across the wide river body */}
      <group position={[-12, 0.6, 16]}>
        {/* Bridge Deck */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.16, 15.4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Railings */}
        <mesh position={[-0.85, 0.3, 0]}>
          <boxGeometry args={[0.04, 0.45, 15.4]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.85, 0.3, 0]}>
          <boxGeometry args={[0.04, 0.45, 15.4]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} transparent opacity={0.7} />
        </mesh>
        {/* Bridge Piers */}
        {[-4.5, 0, 4.5].map((z, idx) => (
          <group key={`pier-${idx}`} position={[0, -0.45, z]}>
            <mesh position={[-0.6, 0, 0]} castShadow>
              <boxGeometry args={[0.22, 0.8, 0.6]} />
              <meshStandardMaterial color="#64748b" roughness={0.7} />
            </mesh>
            <mesh position={[0.6, 0, 0]} castShadow>
              <boxGeometry args={[0.22, 0.8, 0.6]} />
              <meshStandardMaterial color="#64748b" roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 8. Hydrodynamic Flow Vectors along the Expansive River Basin */}
      <group ref={flowVectorsRef}>
        {[
          [-22, 12], [-14, 14], [-6, 13], [2, 15], [10, 13], [18, 16],
          [-18, 18], [-10, 19], [-2, 17], [6, 19], [14, 18], [22, 15]
        ].map(([xPos, zPos], idx) => (
          <group key={`flow-vector-${idx}`} position={[xPos, 0.08, zPos]}>
            <mesh rotation={[0, 0, -Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
            </mesh>
            <mesh position={[0.65, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <coneGeometry args={[0.1, 0.28, 8]} />
              <meshBasicMaterial color="#7dd3fc" transparent opacity={0.85} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
