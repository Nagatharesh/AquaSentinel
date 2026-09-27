import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Terrain } from './Terrain';
import { River } from './River';
import { Industry } from './Industry';
import { CETP } from './CETP';
import { DischargePoint } from './DischargePoint';
import { WastewaterFlow } from './WastewaterFlow';
import { MonitoringStation } from './MonitoringStation';
import { Borewell } from './Borewell';
import { CameraController } from './CameraController';
import type {
  IndustryData,
  CetpData,
  DownstreamStationData,
  BorewellData,
  SelectedEntity,
} from '../../types/worldModel';

interface EnvironmentalWorldProps {
  industries: IndustryData[];
  cetp: CetpData;
  downstreamStation: DownstreamStationData;
  borewell: BorewellData;
  selectedEntity: SelectedEntity;
  onSelectIndustry: (ind: IndustryData) => void;
  onSelectCetp: (cetp: CetpData) => void;
  onSelectMonitoring: (stn: DownstreamStationData) => void;
  onSelectBorewell: (bw: BorewellData) => void;
  onSelectDischargePoint: () => void;
  viewPreset: 'overview' | 'industrial' | 'cetp' | 'river' | 'borewell' | null;
  resetTrigger: number;
  flowSpeedMultiplier?: number;
}

export const EnvironmentalWorld: React.FC<EnvironmentalWorldProps> = ({
  industries,
  cetp,
  downstreamStation,
  borewell,
  selectedEntity,
  onSelectIndustry,
  onSelectCetp,
  onSelectMonitoring,
  onSelectBorewell,
  onSelectDischargePoint,
  viewPreset,
  resetTrigger,
  flowSpeedMultiplier = 1.0,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const selectedIndustryId =
    selectedEntity && selectedEntity.type === 'industry' ? selectedEntity.data.id : null;

  return (
    <div className="canvas-container w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 24, 30], fov: 40, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
        }}
      >
        {/* Soft Environmental Atmosphere */}
        <fogExp2 attach="fog" args={['#f1f5f9', 0.012]} />

        {/* Clean Architectural Lighting */}
        <ambientLight intensity={1.2} color="#ffffff" />
        <hemisphereLight color="#e0f2fe" groundColor="#f1f5f9" intensity={0.75} />
        <directionalLight position={[-18, 32, 20]} intensity={1.5} color="#fffef0" />
        <directionalLight position={[18, 20, -16]} intensity={0.6} color="#bae6fd" />

        <Suspense fallback={null}>
          {/* Smooth Camera Transition Controller */}
          <CameraController
            selectedEntity={selectedEntity}
            viewPreset={viewPreset}
            resetTrigger={resetTrigger}
            controlsRef={controlsRef}
          />

          {/* Frictionless, Responsive Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            makeDefault
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.8}
            panSpeed={0.8}
            zoomSpeed={1.0}
            minDistance={4}
            maxDistance={70}
            maxPolarAngle={Math.PI / 2.05}
            minPolarAngle={0.05}
          />

          {/* Architectural GIS Site Ground & Roads */}
          <Terrain />

          {/* Expansive River Basin with Direct Drainage */}
          <River flowSpeed={flowSpeedMultiplier} />

          {/* 5 Sleek Architectural Industrial Facilities */}
          {industries.map((ind) => (
            <Industry
              key={ind.id}
              industry={ind}
              isSelected={selectedIndustryId === ind.id}
              onSelect={onSelectIndustry}
            />
          ))}

          {/* Matte Steel Utility Conduits & Telemetry Pulses */}
          <WastewaterFlow
            industries={industries}
            cetp={cetp}
            selectedIndustryId={selectedIndustryId}
            flowSpeedMultiplier={flowSpeedMultiplier}
          />

          {/* Engineered CETP Facility */}
          <CETP
            data={cetp}
            isSelected={selectedEntity?.type === 'cetp'}
            onSelect={onSelectCetp}
          />

          {/* Riverbank Drainage Outfall Point */}
          <DischargePoint onSelect={onSelectDischargePoint} />

          {/* Downstream River Telemetry Buoy */}
          <MonitoringStation
            data={downstreamStation}
            isSelected={selectedEntity?.type === 'monitoring'}
            onSelect={onSelectMonitoring}
          />

          {/* Groundwater Piezometer Station */}
          <Borewell
            data={borewell}
            isSelected={selectedEntity?.type === 'borewell'}
            onSelect={onSelectBorewell}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
