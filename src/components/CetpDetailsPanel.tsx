import React from 'react';
import { X, Droplets } from 'lucide-react';
import type { CetpData } from '../types/worldModel';

interface CetpDetailsPanelProps {
  cetp: CetpData;
  onClose: () => void;
}

export const CetpDetailsPanel: React.FC<CetpDetailsPanelProps> = ({ cetp, onClose }) => {
  const utilization = ((cetp.currentHydraulicLoadKlDay / cetp.designCapacityKlDay) * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col bg-white/95 backdrop-blur-md border-l border-slate-200 shadow-2xl overflow-y-auto p-4 space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-xl bg-teal-100 text-teal-700 border border-teal-200">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{cetp.name}</h2>
            <div className="text-xs text-teal-700 font-medium">{cetp.location}</div>
            <div className="text-[11px] text-slate-400 font-mono">Code: {cetp.code}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Hydraulic Capacity Utilization */}
      <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200">
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="font-semibold text-teal-900">Hydraulic Capacity Utilization</span>
          <span className="font-bold text-teal-800 font-mono">{utilization}%</span>
        </div>
        <div className="w-full bg-teal-200/60 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-teal-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${utilization}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-teal-700 mt-1.5 font-mono">
          <span>Current: {(cetp.currentHydraulicLoadKlDay / 1000).toFixed(1)} MLD</span>
          <span>Design: {(cetp.designCapacityKlDay / 1000).toFixed(1)} MLD</span>
        </div>
      </div>

      {/* Primary Treatment Telemetry Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-medium">Inlet Composite COD</div>
          <div className="text-base font-bold text-slate-900 mt-0.5">{cetp.inletCodMgL} mg/L</div>
          <div className="text-[10px] text-slate-400">Raw Industrial Inflow</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-medium">Treated Outlet COD</div>
          <div className="text-base font-bold text-emerald-700 mt-0.5">{cetp.treatedOutletCodMgL} mg/L</div>
          <div className="text-[10px] text-emerald-600">Within PCB Limits (&lt; 250)</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-medium">BOD Removal Eff.</div>
          <div className="text-base font-bold text-teal-700 mt-0.5">{cetp.removalEfficiencyPercent}%</div>
          <div className="text-[10px] text-teal-600">MBR + Activated Sludge</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-medium">Treated Discharge</div>
          <div className="text-base font-bold text-sky-700 mt-0.5">{(cetp.treatedDischargeKlDay / 1000).toFixed(1)} MLD</div>
          <div className="text-[10px] text-slate-500">To River Outfall</div>
        </div>
      </div>

      {/* Connected Industrial Nodes */}
      <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="text-xs font-semibold text-slate-800 mb-2">Connected Industrial Cluster</div>
        <div className="text-xs text-slate-600 space-y-1">
          <div>• <strong>38</strong> Member Units in Perundurai Industrial Estate</div>
          <div>• Real-time composite flow meters at inlet chamber</div>
          <div>• Automatic divert to emergency equalization if inlet COD &gt; 2500 mg/L</div>
        </div>
      </div>

      <div className="text-[10px] text-center text-slate-400 italic">
        Demo visualization — values shown are simulated for demonstration.
      </div>
    </div>
  );
};
