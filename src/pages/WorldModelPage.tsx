import React, { useState } from 'react';
import { EnvironmentalWorld } from '../components/world3d/EnvironmentalWorld';
import { IndustryDetailsPanel } from '../components/IndustryDetailsPanel';
import { DefaultSidePanel } from '../components/DefaultSidePanel';
import { CetpDetailsPanel } from '../components/CetpDetailsPanel';
import { MonitoringStationPanel } from '../components/MonitoringStationPanel';
import { BorewellDetailsPanel } from '../components/BorewellDetailsPanel';
import { SpatialLegend } from '../components/SpatialLegend';
import { WorldControls } from '../components/WorldControls';
import { GuidedTourBanner, TOUR_STEPS } from '../components/GuidedTourBanner';
import {
  MOCK_INDUSTRIES,
  MOCK_CETP,
  MOCK_DOWNSTREAM_STATION,
  MOCK_BOREWELL,
} from '../data/mockWorldData';
import type {
  IndustryData,
  CetpData,
  DownstreamStationData,
  BorewellData,
  SelectedEntity,
} from '../types/worldModel';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

export const WorldModelPage: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(null);
  const [viewPreset, setViewPreset] = useState<'overview' | 'industrial' | 'cetp' | 'river' | 'borewell' | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [flowSpeedMultiplier, setFlowSpeedMultiplier] = useState(1.0);

  // Guided Tour State
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  // Mobile/Tablet side panel toggle
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  // Select Handlers
  const handleSelectIndustry = (ind: IndustryData) => {
    setSelectedEntity({ type: 'industry', data: ind });
    setViewPreset(null);
    setIsPanelCollapsed(false);
  };

  const handleSelectCetp = (cetp: CetpData) => {
    setSelectedEntity({ type: 'cetp', data: cetp });
    setViewPreset(null);
    setIsPanelCollapsed(false);
  };

  const handleSelectMonitoring = (stn: DownstreamStationData) => {
    setSelectedEntity({ type: 'monitoring', data: stn });
    setViewPreset(null);
    setIsPanelCollapsed(false);
  };

  const handleSelectBorewell = (bw: BorewellData) => {
    setSelectedEntity({ type: 'borewell', data: bw });
    setViewPreset(null);
    setIsPanelCollapsed(false);
  };

  const handleSelectDischargePoint = () => {
    handleSelectCetp(MOCK_CETP);
  };

  const handleResetView = () => {
    setSelectedEntity(null);
    setViewPreset('overview');
    setResetTrigger((prev) => prev + 1);
    setIsTourActive(false);
  };

  const handleSelectPreset = (preset: 'overview' | 'industrial' | 'cetp' | 'river' | 'borewell') => {
    setSelectedEntity(null);
    setViewPreset(preset);
  };

  // Tour Handlers
  const handleStartTour = () => {
    setIsTourActive(true);
    setTourStepIndex(0);
    applyTourStep(0);
  };

  const handleNextTourStep = () => {
    if (tourStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = tourStepIndex + 1;
      setTourStepIndex(nextIndex);
      applyTourStep(nextIndex);
    } else {
      setIsTourActive(false);
    }
  };

  const handlePrevTourStep = () => {
    if (tourStepIndex > 0) {
      const prevIndex = tourStepIndex - 1;
      setTourStepIndex(prevIndex);
      applyTourStep(prevIndex);
    }
  };

  const applyTourStep = (stepIdx: number) => {
    const target = TOUR_STEPS[stepIdx].target;
    if (target === 'overview') {
      setSelectedEntity(null);
      setViewPreset('overview');
    } else if (target === 'industry-01') {
      setSelectedEntity({ type: 'industry', data: MOCK_INDUSTRIES[0] }); // ABC Textiles
      setViewPreset(null);
    } else if (target === 'pipes') {
      setSelectedEntity({ type: 'industry', data: MOCK_INDUSTRIES[0] });
      setViewPreset(null);
    } else if (target === 'cetp') {
      setSelectedEntity({ type: 'cetp', data: MOCK_CETP });
      setViewPreset(null);
    } else if (target === 'discharge') {
      setSelectedEntity({ type: 'cetp', data: MOCK_CETP });
      setViewPreset('river');
    } else if (target === 'monitoring') {
      setSelectedEntity({ type: 'monitoring', data: MOCK_DOWNSTREAM_STATION });
      setViewPreset(null);
    } else if (target === 'borewell') {
      setSelectedEntity({ type: 'borewell', data: MOCK_BOREWELL });
      setViewPreset(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden bg-slate-100 min-h-[calc(100vh-112px)]">
      {/* 1. Main 3D Canvas Viewport */}
      <div className="flex-1 relative w-full h-[60vh] lg:h-auto min-h-[480px]">
        {/* Floating Top Controls */}
        <WorldControls
          onResetView={handleResetView}
          onSelectPreset={handleSelectPreset}
          activePreset={viewPreset}
          flowSpeed={flowSpeedMultiplier}
          onChangeFlowSpeed={setFlowSpeedMultiplier}
          onStartTour={handleStartTour}
          isTourActive={isTourActive}
        />

        {/* Guided Tour Banner (if active) */}
        {isTourActive && (
          <GuidedTourBanner
            currentStepIndex={tourStepIndex}
            onNextStep={handleNextTourStep}
            onPrevStep={handlePrevTourStep}
            onEndTour={() => setIsTourActive(false)}
          />
        )}

        {/* 3D Scene */}
        <EnvironmentalWorld
          industries={MOCK_INDUSTRIES}
          cetp={MOCK_CETP}
          downstreamStation={MOCK_DOWNSTREAM_STATION}
          borewell={MOCK_BOREWELL}
          selectedEntity={selectedEntity}
          onSelectIndustry={handleSelectIndustry}
          onSelectCetp={handleSelectCetp}
          onSelectMonitoring={handleSelectMonitoring}
          onSelectBorewell={handleSelectBorewell}
          onSelectDischargePoint={handleSelectDischargePoint}
          viewPreset={viewPreset}
          resetTrigger={resetTrigger}
          flowSpeedMultiplier={flowSpeedMultiplier}
        />

        {/* Bottom Spatial Legend */}
        <SpatialLegend />

        {/* Mobile/Tablet Collapse Drawer Button */}
        <button
          onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
          className="lg:hidden absolute bottom-4 right-4 z-20 p-2.5 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-slate-700 flex items-center gap-1.5 text-xs font-bold"
        >
          {isPanelCollapsed ? <PanelRightOpen className="w-4 h-4 text-sky-600" /> : <PanelRightClose className="w-4 h-4 text-sky-600" />}
          <span>{isPanelCollapsed ? 'Show Panel' : 'Hide Panel'}</span>
        </button>
      </div>

      {/* 2. Interactive Right Side Evidence Panel */}
      <div
        className={`w-full lg:w-[460px] xl:w-[490px] h-[55vh] lg:h-auto shrink-0 z-20 transition-all duration-300 ${
          isPanelCollapsed ? 'hidden lg:block' : 'block'
        }`}
      >
        {selectedEntity?.type === 'industry' && (
          <IndustryDetailsPanel
            industry={selectedEntity.data}
            onClose={() => setSelectedEntity(null)}
          />
        )}

        {selectedEntity?.type === 'cetp' && (
          <CetpDetailsPanel
            cetp={selectedEntity.data}
            onClose={() => setSelectedEntity(null)}
          />
        )}

        {selectedEntity?.type === 'monitoring' && (
          <MonitoringStationPanel
            station={selectedEntity.data}
            onClose={() => setSelectedEntity(null)}
          />
        )}

        {selectedEntity?.type === 'borewell' && (
          <BorewellDetailsPanel
            borewell={selectedEntity.data}
            onClose={() => setSelectedEntity(null)}
          />
        )}

        {!selectedEntity && (
          <DefaultSidePanel
            industries={MOCK_INDUSTRIES}
            cetp={MOCK_CETP}
            downstreamStation={MOCK_DOWNSTREAM_STATION}
            borewell={MOCK_BOREWELL}
            onSelectIndustry={handleSelectIndustry}
            onSelectCetp={handleSelectCetp}
            onSelectMonitoring={handleSelectMonitoring}
            onSelectBorewell={handleSelectBorewell}
            onStartTour={handleStartTour}
          />
        )}
      </div>
    </div>
  );
};
