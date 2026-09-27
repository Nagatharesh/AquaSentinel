import React from 'react';
import { X, Layers } from 'lucide-react';
import type { BorewellData } from '../types/worldModel';

interface BorewellDetailsPanelProps {
  borewell: BorewellData;
  onClose: () => void;
}

export const BorewellDetailsPanel: React.FC<BorewellDetailsPanelProps> = ({
  borewell,
  onClose,
}) => {
  return (
    <div className="h-full flex flex-col bg-white/95 backdrop-blur-md border-l border-slate-200 shadow-2xl overflow-y-auto p-4 space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-100 text-cyan-700 border border-cyan-200">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{borewell.name}</h2>
            <div className="text-xs text-cyan-700 font-medium">{borewell.aquiferLayer}</div>
            <div className="text-[11px] text-slate-400 font-mono">Piezometer UID: {borewell.code}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Aquifer Status Banner */}
      <div className="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-cyan-900 uppercase tracking-wider">
            Subsurface Integrity Status
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white">
            Consistent
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed mt-1">
          {borewell.riskNote}
        </p>
      </div>

      {/* Groundwater Metrics */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-medium">Well Total Depth</div>
          <div className="text-base font-bold text-slate-900 mt-0.5">{borewell.depthMeters} Meters</div>
          <div className="text-[10px] text-slate-400">Deep Hard-rock</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-medium">Static Water Table</div>
          <div className="text-base font-bold text-slate-900 mt-0.5">{borewell.staticWaterLevelMeters} m bgl</div>
          <div className="text-[10px] text-slate-400">Below ground level</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-medium">Elect. Conductivity</div>
          <div className="text-base font-bold text-slate-900 mt-0.5">{borewell.electricalConductivityUscm} µS/cm</div>
          <div className="text-[10px] text-slate-400">Normal background range</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-medium">Heavy Metals Signal</div>
          <div className="text-xs font-bold text-emerald-700 mt-1">{borewell.heavyMetalSignal}</div>
          <div className="text-[10px] text-emerald-600">Spectrometric probe</div>
        </div>
      </div>

      {/* Geological Strata Legend */}
      <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="text-xs font-semibold text-slate-800 mb-2">Aquifer Geological Strata</div>
        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-600 shrink-0" />
            <span>0m – 15m: Topsoil & Alluvial Silt Formation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-stone-500 shrink-0" />
            <span>15m – 40m: Weathered Sandstone & Clay Aquitard (Barrier)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-sky-700 shrink-0" />
            <span>40m – 150m: Fractured Crystalline Deep Aquifer</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-center text-slate-400 italic">
        Demo visualization — values shown are simulated for demonstration.
      </div>
    </div>
  );
};
