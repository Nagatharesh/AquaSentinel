import React from 'react';
import {
  RotateCcw,
  Compass,
  Factory,
  Droplets,
  Waves,
  Layers,
  Play,
  FastForward,
} from 'lucide-react';

interface WorldControlsProps {
  onResetView: () => void;
  onSelectPreset: (preset: 'overview' | 'industrial' | 'cetp' | 'river' | 'borewell') => void;
  activePreset: 'overview' | 'industrial' | 'cetp' | 'river' | 'borewell' | null;
  flowSpeed: number;
  onChangeFlowSpeed: (speed: number) => void;
  onStartTour: () => void;
  isTourActive: boolean;
}

export const WorldControls: React.FC<WorldControlsProps> = ({
  onResetView,
  onSelectPreset,
  activePreset,
  flowSpeed,
  onChangeFlowSpeed,
  onStartTour,
  isTourActive,
}) => {
  const presets = [
    { id: 'overview', label: 'Full Basin', icon: Compass },
    { id: 'industrial', label: 'Industrial Hub', icon: Factory },
    { id: 'cetp', label: 'CETP Plant', icon: Droplets },
    { id: 'river', label: 'River Outfall', icon: Waves },
    { id: 'borewell', label: 'Groundwater', icon: Layers },
  ] as const;

  return (
    <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
      {/* Reset View Button */}
      <button
        onClick={onResetView}
        className="px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-sky-300 text-slate-700 hover:text-sky-700 text-xs font-bold shadow-md shadow-slate-200/50 flex items-center gap-1.5 transition-all transform active:scale-95"
        title="Reset camera to default overview"
      >
        <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
        <span>Reset View</span>
      </button>

      {/* Perspective Presets */}
      <div className="hidden sm:flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200/90 shadow-md">
        {presets.map((p) => {
          const Icon = p.icon;
          const isActive = activePreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPreset(p.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Guided Tour Trigger Button */}
      <button
        onClick={onStartTour}
        className={`px-3 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all transform active:scale-95 ${
          isTourActive
            ? 'bg-amber-500 text-white shadow-amber-500/20 animate-pulse'
            : 'bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-sky-600/20 hover:from-sky-700 hover:to-teal-700'
        }`}
      >
        <Play className="w-3 h-3 fill-white" />
        <span>{isTourActive ? 'Tour Active...' : '60s Demo Tour'}</span>
      </button>

      {/* Flow Speed Quick Toggle */}
      <button
        onClick={() => onChangeFlowSpeed(flowSpeed === 1.0 ? 2.0 : flowSpeed === 2.0 ? 0.5 : 1.0)}
        className="px-2.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium shadow-md flex items-center gap-1"
        title="Toggle Pipe Flow Animation Speed"
      >
        <FastForward className="w-3 h-3 text-cyan-600" />
        <span className="font-mono text-[11px]">{flowSpeed}x Flow</span>
      </button>
    </div>
  );
};
