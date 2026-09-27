import React from 'react';
import * as THREE from 'three';

export const Terrain: React.FC = () => {
  return (
    <group name="ArchitecturalGISBasin">
      {/* 1. Base GIS Site Ground (Clean Matte Architectural Foundation) */}
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[56, 56]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.92} metalness={0.02} />
      </mesh>

      {/* 2. Technical Engineering Coordinate Grid Overlay */}
      <gridHelper
        args={[54, 54, '#cbd5e1', '#f1f5f9']}
        position={[0, 0.005, 0]}
      />

      {/* 3. Industrial Cluster Master Zone Pad (Crisp Engineering Concrete Slab) */}
      <mesh position={[0, 0.02, -7.5]} receiveShadow>
        <boxGeometry args={[38, 0.04, 23]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* 4. River Basin Riparian Buffer Zone */}
      <mesh position={[0, 0.015, 12]} receiveShadow>
        <boxGeometry args={[48, 0.03, 12]} />
        <meshStandardMaterial color="#e6f4ea" roughness={0.88} />
      </mesh>

      {/* 5. Precision Road Network (Sleek Dark Asphalt with Technical Line markings) */}
      <group position={[0, 0.045, -1]}>
        {/* East-West Primary Arterial Corridor */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[36, 0.01, 1.8]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        {/* Road Center Technical Markings */}
        {[-15, -11, -7, -3, 1, 5, 9, 13].map((x) => (
          <mesh key={`dash-${x}`} position={[x, 0.006, 0]}>
            <planeGeometry args={[1.6, 0.08]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>
        ))}

        {/* North-South Access Corridor 1 (to ABC Textiles) */}
        <mesh position={[-10, 0, -6.5]} receiveShadow>
          <boxGeometry args={[1.5, 0.01, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>

        {/* North-South Access Corridor 2 (to Chemical & CETP Plant) */}
        <mesh position={[0, 0, -5]} receiveShadow>
          <boxGeometry args={[1.5, 0.01, 9]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>

        {/* North-South Access Corridor 3 (to Paper & Electroplating) */}
        <mesh position={[8, 0, -5.5]} receiveShadow>
          <boxGeometry args={[1.5, 0.01, 10]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>

        {/* Riverbank Environmental Inspection Access Way */}
        <mesh position={[-5, 0, 7]} receiveShadow>
          <boxGeometry args={[1.5, 0.01, 13]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
      </group>

      {/* 6. Precision Foundation Slabs for Each Industrial Facility */}
      {/* Unit 1 Foundation (ABC Textiles) */}
      <mesh position={[-10, 0.05, -8]} receiveShadow>
        <boxGeometry args={[6.8, 0.06, 6.8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
      </mesh>

      {/* Unit 2 Foundation (Chemical) */}
      <mesh position={[-3, 0.05, -11]} receiveShadow>
        <boxGeometry args={[5.8, 0.06, 5.8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
      </mesh>

      {/* Unit 3 Foundation (Electroplating) */}
      <mesh position={[5, 0.05, -10]} receiveShadow>
        <boxGeometry args={[5.8, 0.06, 5.8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
      </mesh>

      {/* Unit 4 Foundation (Paper Mill) */}
      <mesh position={[11, 0.05, -6]} receiveShadow>
        <boxGeometry args={[7.2, 0.06, 7.2]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
      </mesh>

      {/* Unit 5 Foundation (Tannery) */}
      <mesh position={[-8, 0.05, -14.5]} receiveShadow>
        <boxGeometry args={[5.8, 0.06, 5.8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
      </mesh>

      {/* CETP Engineered Concrete Pad */}
      <mesh position={[0, 0.06, 3]} receiveShadow>
        <boxGeometry args={[10.5, 0.08, 8]} />
        <meshStandardMaterial color="#e0f2fe" roughness={0.5} />
      </mesh>

      {/* 7. Minimalist Landscaped Linear Green Buffers (Clean architectural hedges) */}
      {[-16, 0, 16].map((x, idx) => (
        <group key={`hedge-group-${idx}`}>
          <mesh position={[x, 0.12, -18]} castShadow>
            <boxGeometry args={[8, 0.18, 0.6]} />
            <meshStandardMaterial color="#10b981" roughness={0.7} />
          </mesh>
          <mesh position={[x, 0.12, 4]} castShadow>
            <boxGeometry args={[7, 0.18, 0.5]} />
            <meshStandardMaterial color="#059669" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* 8. Minimalist Technical Site Poles */}
      {[-12, -4, 4, 12].map((x, idx) => (
        <group key={`luminaire-${idx}`} position={[x, 0, 0.95]}>
          <mesh position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.9} />
          </mesh>
          <mesh position={[0.1, 1.6, 0]}>
            <boxGeometry args={[0.22, 0.03, 0.06]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
