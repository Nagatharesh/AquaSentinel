import React from 'react';
import {
  Factory,
  Layers,
  ArrowRight,
  Droplets,
  Activity,
  Compass,
  Play,
  CheckCircle2,
} from 'lucide-react';
import type { IndustryData, CetpData, DownstreamStationData, BorewellData } from '../types/worldModel';

interface DefaultSidePanelProps {
  industries: IndustryData[];
  cetp: CetpData;
  downstreamStation: DownstreamStationData;
  borewell: BorewellData;
  onSelectIndustry: (ind: IndustryData) => void;
  onSelectCetp: (cetp: CetpData) => void;
  onSelectMonitoring: (stn: DownstreamStationData) => void;
  onSelectBorewell: (bw: BorewellData) => void;
  onStartTour: () => void;
}

export const DefaultSidePanel: React.FC<DefaultSidePanelProps> = ({
  industries,
  cetp,
  downstreamStation,
  borewell,
  onSelectIndustry,
  onSelectCetp,
  onSelectMonitoring,
  onSelectBorewell,
  onStartTour,
}) => {
  return (
    <div className="h-full flex flex-col bg-white/95 backdrop-blur-md border-l border-slate-200 shadow-2xl overflow-y-auto p-4 space-y-4">
      {/* Prompt Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 via-teal-50/40 to-slate-50 border border-sky-100 shadow-xs text-center">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/20 mb-3">
          <Compass className="w-6 h-6 animate-spin-slow" />
        </div>
        <h2 className="text-base font-bold text-slate-900">
          Select an Industry
        </h2>
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
          Click any industrial unit on the 3D map to inspect its operational and environmental evidence.
        </p>

        {/* Guided Demo Button for Evaluator */}
        <button
          onClick={onStartTour}
          className="mt-3.5 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs font-semibold shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-98"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Start 60s Guided Evaluator Tour</span>
        </button>
      </div>

      {/* Quick Select Industrial Units */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Industrial Units (5 Monitored)
          </span>
          <span className="text-[10px] font-mono text-slate-400">Click to focus 3D</span>
        </div>
        <div className="space-y-2">
          {industries.map((ind) => (
            <div
              key={ind.id}
              onClick={() => onSelectIndustry(ind)}
              className="p-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-sky-300 hover:bg-sky-50/50 cursor-pointer transition-all shadow-xs flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 font-bold text-xs shadow-xs"
                  style={{ backgroundColor: ind.primaryColor }}
                >
                  <Factory className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 group-hover:text-sky-700 truncate">
                    {ind.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-sans truncate">
                    {ind.type} • {ind.productionCapacityPercent}% Cap
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 pl-2">
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    ind.inspectionPriority === 'High Priority Inspection'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : ind.inspectionPriority === 'Consistent'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {ind.inspectionPriority === 'High Priority Inspection'
                    ? 'High Priority'
                    : ind.inspectionPriority === 'Consistent'
                    ? 'Consistent'
                    : 'Verify'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Environmental Nodes */}
      <div>
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Connected Environmental System
        </div>
        <div className="space-y-2">
          {/* CETP */}
          <div
            onClick={() => onSelectCetp(cetp)}
            className="p-2.5 rounded-xl bg-teal-50/50 border border-teal-200/80 hover:bg-teal-50 cursor-pointer transition-all shadow-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-teal-900">Perundurai CETP (50 MLD)</div>
                <div className="text-[10px] text-teal-700">92.1% Removal Efficiency • Active MBR</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
          </div>

          {/* Downstream Station */}
          <div
            onClick={() => onSelectMonitoring(downstreamStation)}
            className="p-2.5 rounded-xl bg-sky-50/50 border border-sky-200/80 hover:bg-sky-50 cursor-pointer transition-all shadow-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-sky-900">Downstream River Station #04</div>
                <div className="text-[10px] text-sky-700">WQI: 84.5 • Bhavani Basin Real-time</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
          </div>

          {/* Borewell */}
          <div
            onClick={() => onSelectBorewell(borewell)}
            className="p-2.5 rounded-xl bg-cyan-50/50 border border-cyan-200/80 hover:bg-cyan-50 cursor-pointer transition-all shadow-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-cyan-900">Deep Aquifer Borewell #BW-09</div>
                <div className="text-[10px] text-cyan-700">145m Piezometer • Hard Rock Aquifer</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
          </div>
        </div>
      </div>

      {/* Triangulation Principle Card */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>JalSatya Independent Triangulation</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          The system does not rely solely on self-reported OCEMS values. It automatically reconciles
          reported discharge against physical electricity consumption, chemical usage, sludge generation,
          and downstream river assimilative capacity.
        </p>
      </div>

      <div className="text-[10px] text-center text-slate-400 font-sans italic">
        Demo visualization — values shown are simulated for demonstration.
      </div>
    </div>
  );
};
