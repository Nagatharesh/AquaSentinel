import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { IndustryData, CetpData } from '../../types/worldModel';

interface WastewaterFlowProps {
  industries: IndustryData[];
  cetp: CetpData;
  selectedIndustryId: string | null;
  flowSpeedMultiplier?: number;
}

export const WastewaterFlow: React.FC<WastewaterFlowProps> = ({
  industries,
  cetp,
  selectedIndustryId,
  flowSpeedMultiplier = 1.0,
}) => {
  const particleStreamsRef = useRef<{ [key: string]: THREE.InstancedMesh }>({});

  const industryRoutes = useMemo(() => {
    return industries.map((ind) => {
      const points = ind.pipeRoute.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
      const curve = new THREE.CatmullRomCurve3(points);
      return {
        id: ind.id,
        name: ind.name,
        color: ind.pipeColor,
        curve,
        length: curve.getLength(),
        particleCount: 16,
      };
    });
  }, [industries]);

  const dischargeRoute = useMemo(() => {
    const points = cetp.dischargePipeRoute.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    const curve = new THREE.CatmullRomCurve3(points);
    return {
      curve,
      length: curve.getLength(),
      particleCount: 20,
    };
  }, [cetp]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.35 * flowSpeedMultiplier;

    industryRoutes.forEach((route) => {
      const instancedMesh = particleStreamsRef.current[route.id];
      if (!instancedMesh) return;

      const isSelected = selectedIndustryId === route.id;
      const speed = isSelected ? 1.3 : 0.9;

      for (let i = 0; i < route.particleCount; i++) {
        const offset = i / route.particleCount;
        const progress = (time * speed + offset) % 1.0;
        const point = route.curve.getPointAt(progress);
        const tangent = route.curve.getTangentAt(progress);

        dummy.position.copy(point);
        dummy.lookAt(point.clone().add(tangent));
        const scale = isSelected ? 1.4 : 0.9;
        dummy.scale.set(scale, scale, scale * 1.5);
        dummy.updateMatrix();

        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
    });

    const dischargeMesh = particleStreamsRef.current['cetp-discharge'];
    if (dischargeMesh) {
      for (let i = 0; i < dischargeRoute.particleCount; i++) {
        const offset = i / dischargeRoute.particleCount;
        const progress = (time * 1.1 + offset) % 1.0;
        const point = dischargeRoute.curve.getPointAt(progress);
        const tangent = dischargeRoute.curve.getTangentAt(progress);

        dummy.position.copy(point);
        dummy.lookAt(point.clone().add(tangent));
        dummy.scale.set(1.1, 1.1, 1.8);
        dummy.updateMatrix();

        dischargeMesh.setMatrixAt(i, dummy.matrix);
      }
      dischargeMesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group name="UtilityConduitNetwork">
      {/* 1. Industrial Utility Conduits */}
      {industryRoutes.map((route) => {
        const isSelected = selectedIndustryId === route.id;
        const pipeGeo = new THREE.TubeGeometry(route.curve, 32, isSelected ? 0.07 : 0.045, 8, false);

        return (
          <group key={`conduit-${route.id}`}>
            {/* Matte Steel Conduit */}
            <mesh geometry={pipeGeo}>
              <meshStandardMaterial
                color={isSelected ? '#0284c7' : '#475569'}
                metalness={0.8}
                roughness={0.25}
                transparent
                opacity={isSelected ? 0.95 : 0.7}
              />
            </mesh>

            {/* Glowing Telemetry Pulse Dots */}
            <instancedMesh
              ref={(el) => {
                if (el) particleStreamsRef.current[route.id] = el;
              }}
              args={[undefined, undefined, route.particleCount]}
            >
              <sphereGeometry args={[0.065, 8, 8]} />
              <meshBasicMaterial
                color={isSelected ? '#38bdf8' : '#0ea5e9'}
                transparent
                opacity={isSelected ? 0.95 : 0.75}
              />
            </instancedMesh>
          </group>
        );
      })}

      {/* 2. Treated Effluent Outfall Pipeline */}
      {(() => {
        const pipeGeo = new THREE.TubeGeometry(dischargeRoute.curve, 32, 0.09, 10, false);
        return (
          <group name="TreatedEffluentConduit">
            <mesh geometry={pipeGeo}>
              <meshStandardMaterial color="#0d9488" metalness={0.8} roughness={0.2} transparent opacity={0.85} />
            </mesh>

            <instancedMesh
              ref={(el) => {
                if (el) particleStreamsRef.current['cetp-discharge'] = el;
              }}
              args={[undefined, undefined, dischargeRoute.particleCount]}
            >
              <sphereGeometry args={[0.075, 8, 8]} />
              <meshBasicMaterial color="#2dd4bf" transparent opacity={0.9} />
            </instancedMesh>
          </group>
        );
      })()}
    </group>
  );
};
