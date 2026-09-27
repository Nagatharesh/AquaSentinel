import React, { useState } from 'react';
import {
  X,
  Factory,
  Zap,
  FlaskConical,
  Trash2,
  Droplets,
  Info,
  Sliders,
} from 'lucide-react';
import type { IndustryData, ForensicStatus } from '../types/worldModel';
import { WorldModelFlow } from './WorldModelFlow';

interface IndustryDetailsPanelProps {
  industry: IndustryData;
  onClose: () => void;
}

export const IndustryDetailsPanel: React.FC<IndustryDetailsPanelProps> = ({
  industry,
  onClose,
}) => {
  const [simulationMultiplier, setSimulationMultiplier] = useState(1.0);
  const [activeTab, setActiveTab] = useState<'evidence' | 'ocems' | 'signals'>('evidence');

  // Simulated dynamic scaling based on evaluator slider
  const dynamicProduction = Math.round(industry.productionCapacityPercent * simulationMultiplier);
  const dynamicElectricity = Math.round(industry.electricityKwhDay * simulationMultiplier);
  const dynamicWastewater = Math.round(industry.wastewaterReportedKlDay * simulationMultiplier);
  const dynamicSludge = (industry.sludgeTonnesDay * simulationMultiplier).toFixed(2);
  const dynamicLime = Math.round(industry.chemicals.limeKgDay * simulationMultiplier);
  const dynamicAlum = Math.round(industry.chemicals.alumKgDay * simulationMultiplier);
  const dynamicPoly = Math.round(industry.chemicals.polyelectrolyteKgDay * simulationMultiplier);

  const getStatusBadge = (status: ForensicStatus) => {
    switch (status) {
      case 'Normal':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
            Normal
          </span>
        );
      case 'Attention':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
            Attention
          </span>
        );
      case 'Requires Verification':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
            Requires Verification
          </span>
        );
    }
  };

  const getPriorityBanner = () => {
    switch (industry.inspectionPriority) {
      case 'High Priority Inspection':
        return {
          title: 'Inspection Priority: HIGH',
          bg: 'bg-rose-50/90 border-rose-200 text-rose-900',
          badge: 'bg-rose-600 text-white',
          dot: 'bg-rose-500 pulse-rose',
        };
      case 'Inspection Recommended':
      case 'Requires Verification':
        return {
          title: 'Inspection Priority: RECOMMENDED',
          bg: 'bg-amber-50/90 border-amber-200 text-amber-900',
          badge: 'bg-amber-600 text-white',
          dot: 'bg-amber-500 pulse-amber',
        };
      default:
        return {
          title: 'Inspection Priority: ROUTINE',
          bg: 'bg-emerald-50/90 border-emerald-200 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          dot: 'bg-emerald-500 pulse-emerald',
        };
    }
  };

  const priorityStyle = getPriorityBanner();

  return (
    <div className="h-full flex flex-col bg-white/95 backdrop-blur-md border-l border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
      {/* 1. Header with Industry Identity */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-sky-50/70 via-white to-slate-50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-sky-100/80 text-sky-700 border border-sky-200 shadow-xs mt-0.5">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  {industry.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-slate-600">
                  {industry.type}
                </span>
                <span className="text-[11px] font-mono text-slate-400">•</span>
                <span className="inline-flex items-center text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5 pulse-emerald" />
                  {industry.status}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                UID: {industry.code} • {industry.basin}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-800">
        {/* World Model System Impact Flow Visualizer */}
        <WorldModelFlow
          impact={industry.systemImpact}
          simulationMultiplier={simulationMultiplier}
        />

        {/* Responsible Inspection Priority Box */}
        <div className={`p-3.5 rounded-xl border ${priorityStyle.bg} shadow-xs`}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${priorityStyle.dot}`} />
              <span className="text-xs font-bold uppercase tracking-wider">
                {priorityStyle.title}
              </span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${priorityStyle.badge}`}>
              Evidence Signal
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            <strong className="font-semibold text-slate-900">Reason: </strong>
            "{industry.inspectionReason}"
          </p>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1 italic border-t border-slate-200/60 pt-1.5">
            <Info className="w-3 h-3 text-slate-400 shrink-0" />
            <span>Decision-support flag: Potential Inconsistency requires physical officer verification.</span>
          </div>
        </div>

        {/* Tab Navigation for Deep Inspection */}
        <div className="flex border-b border-slate-200 gap-1 bg-slate-100/70 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'evidence'
                ? 'bg-white text-sky-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Real-World Evidence
          </button>
          <button
            onClick={() => setActiveTab('ocems')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ocems'
                ? 'bg-white text-sky-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            OCEMS Telemetry
          </button>
          <button
            onClick={() => setActiveTab('signals')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'signals'
                ? 'bg-white text-sky-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Forensic Signals
          </button>
        </div>

        {/* TAB 1: REAL-WORLD PHYSICAL EVIDENCE */}
        {activeTab === 'evidence' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2.5">
              {/* Production */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium mb-1">
                  <Factory className="w-3.5 h-3.5 text-sky-600" />
                  <span>Production</span>
                </div>
                <div className="text-base font-bold text-slate-900">
                  {dynamicProduction}%
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  of permitted capacity
                </div>
              </div>

              {/* Electricity Consumption */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Electricity</span>
                </div>
                <div className="text-base font-bold text-slate-900">
                  {dynamicElectricity.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  kWh/day (TANGEDCO Meter)
                </div>
              </div>

              {/* Sludge Generation */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium mb-1">
                  <Trash2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Sludge Generation</span>
                </div>
                <div className="text-base font-bold text-slate-900">
                  {dynamicSludge}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  tonnes/day (Weighbridge Log)
                </div>
              </div>

              {/* Wastewater Reported */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium mb-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-600" />
                  <span>Wastewater Reported</span>
                </div>
                <div className="text-base font-bold text-slate-900">
                  {dynamicWastewater} KL/day
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  CETP Load Share: <strong>{industry.cetpLoadContributionPercent}%</strong>
                </div>
              </div>
            </div>

            {/* Chemical Usage Detailed Breakdown */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                  <FlaskConical className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Chemical Usage Breakdown</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Daily Inventory</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-white rounded-lg border border-slate-200/60">
                  <div className="text-[10px] text-slate-500 font-medium">Lime</div>
                  <div className="font-bold text-slate-800 mt-0.5">{dynamicLime} kg/day</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200/60">
                  <div className="text-[10px] text-slate-500 font-medium">Alum</div>
                  <div className="font-bold text-slate-800 mt-0.5">{dynamicAlum} kg/day</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200/60">
                  <div className="text-[10px] text-slate-500 font-medium">Polyelectrolyte</div>
                  <div className="font-bold text-slate-800 mt-0.5">{dynamicPoly} kg/day</div>
                </div>
              </div>
            </div>

            {/* Mass Balance Triangulation Callout */}
            <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-200/80 text-[11px] text-sky-900">
              <div className="flex items-center justify-between font-semibold">
                <span>Triangulated Mass Balance Reconciliation</span>
                <span className="text-sky-700 font-mono">
                  Δ +{industry.computedMassBalanceKlDay - industry.wastewaterReportedKlDay} KL/day
                </span>
              </div>
              <div className="text-[10px] text-sky-800/80 mt-1">
                Computed theoretical mass balance from chemical and power telemetry indicates potential 
                unmetered hydraulic discharge variance.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OCEMS CONTINUOUS MONITORING PARAMETERS */}
        {activeTab === 'ocems' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="font-medium">Continuous Telemetry Availability:</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {industry.ocems.dataAvailabilityPercent}%
              </span>
            </div>

            <div className="space-y-2.5">
              {/* pH */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">pH Level</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {industry.ocems.ph}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      (Limit: 6.5 - 8.5)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${((industry.ocems.ph - 5) / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* BOD */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">BOD (Biochemical Oxygen Demand)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-amber-700 text-sm">
                      {industry.ocems.bod} mg/L
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      (Limit: {industry.ocemsLimits.bodMax} mg/L)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(industry.ocems.bod / industry.ocemsLimits.bodMax) * 100}%` }}
                  />
                </div>
                <div className="text-[10px] text-amber-600 mt-1 font-medium">
                  ⚠️ Readings cluster closely near the 30.0 mg/L permissible threshold.
                </div>
              </div>

              {/* COD */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">COD (Chemical Oxygen Demand)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {industry.ocems.cod} mg/L
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      (Limit: {industry.ocemsLimits.codMax} mg/L)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(industry.ocems.cod / industry.ocemsLimits.codMax) * 100}%` }}
                  />
                </div>
              </div>

              {/* TSS */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">TSS (Total Suspended Solids)</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {industry.ocems.tss} mg/L
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      (Limit: {industry.ocemsLimits.tssMax} mg/L)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(industry.ocems.tss / industry.ocemsLimits.tssMax) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FORENSIC SIGNALS (Triangulated AI Audit) */}
        {activeTab === 'signals' && (
          <div className="space-y-2.5 animate-fadeIn">
            <div className="text-[11px] text-slate-500 font-medium mb-1">
              Multi-Source Algorithmic Pattern Evaluation
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div>
                <div className="text-xs font-semibold text-slate-800">Flatline Pattern</div>
                <div className="text-[10px] text-slate-500">Continuous unchanging variance test</div>
              </div>
              {getStatusBadge(industry.forensicSignals.flatline)}
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div>
                <div className="text-xs font-semibold text-slate-800">Threshold Hugging</div>
                <div className="text-[10px] text-slate-500">Values artificially maintained near max limit</div>
              </div>
              {getStatusBadge(industry.forensicSignals.thresholdHugging)}
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div>
                <div className="text-xs font-semibold text-slate-800">Digit Preference</div>
                <div className="text-[10px] text-slate-500">Benford's law frequency distribution</div>
              </div>
              {getStatusBadge(industry.forensicSignals.digitPreference)}
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div>
                <div className="text-xs font-semibold text-slate-800">Strategic Downtime</div>
                <div className="text-[10px] text-slate-500">Telemetry gaps during high-production windows</div>
              </div>
              {getStatusBadge(industry.forensicSignals.strategicDowntime)}
            </div>
          </div>
        )}

        {/* 3. Interactive Evaluator Capacity Simulation Slider */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <Sliders className="w-3.5 h-3.5 text-sky-600" />
              <span>Evaluator Simulation Slider</span>
            </div>
            <span className="text-xs font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded border border-sky-200">
              {Math.round(simulationMultiplier * 100)}% Load
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mb-2">
            Simulate operational shifts to visualize upstream-to-downstream system impact in real-time.
          </p>
          <input
            type="range"
            min="0.5"
            max="1.4"
            step="0.05"
            value={simulationMultiplier}
            onChange={(e) => setSimulationMultiplier(parseFloat(e.target.value))}
            className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
            <span>50% (Low Output)</span>
            <span>100% (Baseline)</span>
            <span>140% (Peak Surge)</span>
          </div>
        </div>

        {/* Small Responsible Disclaimer */}
        <div className="text-[10px] text-center text-slate-400 font-sans italic pt-1">
          Demo visualization — values shown are simulated for demonstration.
        </div>
      </div>
    </div>
  );
};
