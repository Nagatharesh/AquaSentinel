import React from 'react';
import { X, Activity } from 'lucide-react';
import type { DownstreamStationData } from '../types/worldModel';

interface MonitoringStationPanelProps {
  station: DownstreamStationData;
  onClose: () => void;
}

export const MonitoringStationPanel: React.FC<MonitoringStationPanelProps> = ({
  station,
  onClose,
}) => {
  return (
    <div className="h-full flex flex-col bg-white/95 backdrop-blur-md border-l border-slate-200 shadow-2xl overflow-y-auto p-4 space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-xl bg-sky-100 text-sky-700 border border-sky-200">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{station.name}</h2>
            <div className="text-xs text-sky-700 font-medium">{station.riverName}</div>
            <div className="text-[11px] text-slate-400 font-mono">
              {station.distanceFromDischargeKm} km Downstream from CETP Outfall
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Water Quality Index Card */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">
              Water Quality Index (WQI)
            </div>
            <div className="text-2xl font-black text-emerald-700 mt-0.5">
              {station.waterQualityIndex} / 100
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            {station.waterQualityGrade}
          </div>
        </div>
        <div className="text-[11px] text-emerald-800/80 mt-2">
          Continuous telemetry validates that river assimilative capacity is functioning within designated Class B standards.
        </div>
      </div>

      {/* Real-time Parameters Grid */}
      <div>
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          River Multi-Parameter Sensors
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Dissolved Oxygen (DO)</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {station.parameters.do} mg/L
            </div>
            <div className="text-[10px] text-emerald-600 font-medium">Healthy (&gt; 5.0 mg/L)</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">River BOD</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {station.parameters.bod} mg/L
            </div>
            <div className="text-[10px] text-slate-400">Limit: &lt; 5.0 mg/L</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Total Dissolved Solids</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {station.parameters.tds} mg/L
            </div>
            <div className="text-[10px] text-slate-400">Limit: &lt; 1500 mg/L</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Turbidity</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {station.parameters.turbidityNtu} NTU
            </div>
            <div className="text-[10px] text-slate-400">Optical sensor</div>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-center text-slate-400 italic">
        Demo visualization — values shown are simulated for demonstration.
      </div>
    </div>
  );
};
