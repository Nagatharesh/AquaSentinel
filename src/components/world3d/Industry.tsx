import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { IndustryData } from '../../types/worldModel';

interface IndustryProps {
  industry: IndustryData;
  isSelected: boolean;
  onSelect: (industry: IndustryData) => void;
}

export const Industry: React.FC<IndustryProps> = ({ industry, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const plumeRef = useRef<THREE.Group>(null);
  const selectionRingRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Subtle exhaust plume animation
    if (plumeRef.current) {
      plumeRef.current.children.forEach((p, idx) => {
        p.position.y += delta * (0.6 + (idx % 2) * 0.2);
        p.scale.x += delta * 0.2;
        p.scale.y += delta * 0.2;
        p.scale.z += delta * 0.2;
        if (p.position.y > 3.2) {
          p.position.y = 1.6;
          p.scale.set(0.08, 0.08, 0.08);
        }
      });
    }

    if (selectionRingRef.current && isSelected) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.06;
      selectionRingRef.current.scale.set(scale, scale, 1);
    }
  });

  const [posX, posY, posZ] = industry.position3D;

  const getPriorityColor = () => {
    switch (industry.inspectionPriority) {
      case 'High Priority Inspection':
        return '#f43f5e';
      case 'Consistent':
        return '#10b981';
      default:
        return '#f59e0b';
    }
  };

  const priorityColor = getPriorityColor();

  return (
    <group
      position={[posX, posY, posZ]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(industry);
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
      {/* Precision Selection Ring on Ground */}
      {isSelected && (
        <mesh
          ref={selectionRingRef}
          position={[0, 0.07, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[2.8, 3.0, 32]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Hover Bounding Ring */}
      {isHovered && !isSelected && (
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.7, 2.85, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Professional Minimalist 3D HUD Pin (Clean, non-cluttering) */}
      <Html
        position={[0, 2.5, 0]}
        center
        distanceFactor={45}
        zIndexRange={[100, 0]}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(industry);
          }}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all duration-150 cursor-pointer shadow-sm select-none ${
            isSelected
              ? 'bg-slate-900 text-white ring-2 ring-sky-500 shadow-md'
              : isHovered
              ? 'bg-white text-slate-900 border border-sky-400 shadow-md scale-105'
              : 'bg-white/90 text-slate-700 border border-slate-200 hover:bg-white'
          }`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: priorityColor }}
          />
          <span className="font-bold tracking-tight whitespace-nowrap">{industry.name}</span>
        </div>
      </Html>

      {/* 1. ABC TEXTILES PVT LTD — Modern Architectural Textile Facility */}
      {industry.buildingType === 'textile' && (
        <group name="TextilePavilion">
          <mesh position={[-0.3, 0.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 1.5, 2.4]} />
            <meshStandardMaterial
              color={isSelected ? '#1e293b' : isHovered ? '#334155' : '#475569'}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>

          {/* Roof monitor ridges */}
          {[-0.8, 0, 0.8].map((zOffset, i) => (
            <mesh key={`sawtooth-${i}`} position={[-0.3, 1.65, zOffset]} rotation={[0, 0, 0.25]} castShadow>
              <boxGeometry args={[2.7, 0.35, 0.55]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
            </mesh>
          ))}

          {/* Glass Clerestory Strip */}
          <mesh position={[-0.3, 1.35, 1.21]}>
            <planeGeometry args={[2.6, 0.25]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
          </mesh>

          {/* Stainless Steel Exhaust Stack */}
          <mesh position={[1.4, 1.4, -0.6]} castShadow>
            <cylinderGeometry args={[0.18, 0.24, 2.8, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Subtle Plume */}
          <group ref={plumeRef} position={[1.4, 1.4, -0.6]}>
            {[0, 1, 2].map((i) => (
              <mesh key={`plume-${i}`} position={[0, 1.5 + i * 0.4, 0]}>
                <sphereGeometry args={[0.14, 8, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.4 - i * 0.1} />
              </mesh>
            ))}
          </group>

          {/* Equalization / Chemical Sump Tank */}
          <mesh position={[1.3, 0.45, 0.6]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 0.9, 16]} />
            <meshStandardMaterial color="#0f766e" metalness={0.6} roughness={0.3} />
          </mesh>

          {/* Utility Conduit Box */}
          <mesh position={[-0.3, 0.15, 1.4]} castShadow>
            <boxGeometry args={[1.0, 0.3, 0.6]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* 2. CAUVERY CHEMICAL SYNTHETICS */}
      {industry.buildingType === 'chemical' && (
        <group name="ChemicalFacility">
          <mesh position={[0, 0.7, -0.4]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 1.4, 1.6]} />
            <meshStandardMaterial
              color={isSelected ? '#1e293b' : isHovered ? '#334155' : '#475569'}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>

          <mesh position={[1.2, 1.4, 0.4]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 2.8, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
          </mesh>
          {[0.7, 1.3, 1.9, 2.5].map((y, i) => (
            <mesh key={`flange-${i}`} position={[1.2, y, 0.4]}>
              <cylinderGeometry args={[0.26, 0.26, 0.03, 16]} />
              <meshStandardMaterial color="#475569" metalness={0.8} />
            </mesh>
          ))}

          <group position={[-1.1, 0.7, 0.3]}>
            <mesh position={[0, 0.15, 0]} castShadow>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.25} />
            </mesh>
            <mesh position={[-0.25, -0.25, -0.25]}>
              <cylinderGeometry args={[0.03, 0.03, 0.6, 6]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            <mesh position={[0.25, -0.25, -0.25]}>
              <cylinderGeometry args={[0.03, 0.03, 0.6, 6]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
            <mesh position={[0, -0.25, 0.3]}>
              <cylinderGeometry args={[0.03, 0.03, 0.6, 6]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
          </group>
        </group>
      )}

      {/* 3. SRI MEENAKSHI ELECTROPLATERS */}
      {industry.buildingType === 'electroplating' && (
        <group name="ElectroplatingFacility">
          <mesh position={[-0.2, 0.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 1.5, 2.0]} />
            <meshStandardMaterial
              color={isSelected ? '#1e293b' : isHovered ? '#334155' : '#475569'}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>

          <mesh position={[1.3, 0.9, -0.5]} castShadow>
            <cylinderGeometry args={[0.35, 0.45, 1.8, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
          </mesh>

          {[-0.4, 0.2].map((z, idx) => (
            <mesh key={`bay-${idx}`} position={[-0.2, 0.25, 1.3 + z * 0.5]} castShadow>
              <boxGeometry args={[1.6, 0.35, 0.35]} />
              <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.4} />
            </mesh>
          ))}
        </group>
      )}

      {/* 4. KONGU PAPER & PULP */}
      {industry.buildingType === 'paper' && (
        <group name="PaperMillFacility">
          <mesh position={[-0.5, 0.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 1.8, 2.2]} />
            <meshStandardMaterial
              color={isSelected ? '#1e293b' : isHovered ? '#334155' : '#475569'}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>

          <mesh position={[1.3, 1.1, -0.5]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 2.2, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[1.3, 2.3, -0.5]}>
            <coneGeometry args={[0.44, 0.35, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>

          <mesh position={[1.3, 1.1, 0.5]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 2.2, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[1.3, 2.3, 0.5]}>
            <coneGeometry args={[0.44, 0.35, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>

          <mesh position={[-1.6, 1.5, -0.7]} castShadow>
            <cylinderGeometry args={[0.14, 0.2, 3.0, 12]} />
            <meshStandardMaterial color="#334155" roughness={0.6} />
          </mesh>
        </group>
      )}

      {/* 5. PALAR CHROME & LEATHER */}
      {industry.buildingType === 'tannery' && (
        <group name="TanneryFacility">
          <mesh position={[-0.4, 0.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 1.5, 2.2]} />
            <meshStandardMaterial
              color={isSelected ? '#1e293b' : isHovered ? '#334155' : '#475569'}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>

          <mesh position={[1.1, 0.65, -0.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 1.1, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
          </mesh>

          <mesh position={[1.0, 0.25, 0.8]} castShadow>
            <boxGeometry args={[1.1, 0.4, 0.8]} />
            <meshStandardMaterial color="#0f766e" roughness={0.3} metalness={0.3} />
          </mesh>
        </group>
      )}
    </group>
  );
};
