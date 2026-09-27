import React from 'react';
import { TrendingUp, Activity, Droplets, Factory, ShieldAlert, Waves } from 'lucide-react';
import type { SystemImpact } from '../types/worldModel';

interface WorldModelFlowProps {
  impact: SystemImpact;
  simulationMultiplier?: number;
}

export const WorldModelFlow: React.FC<WorldModelFlowProps> = ({
  impact,
  simulationMultiplier = 1.0,
}) => {
  const adjustedProd = (impact.productionChangePercent * simulationMultiplier).toFixed(1);
  const adjustedWaste = (impact.estimatedWastewaterChangePercent * simulationMultiplier).toFixed(1);
  const adjustedCetp = (impact.cetpLoadChangePercent * simulationMultiplier).toFixed(1);

  const steps = [
    {
      title: 'Production',
      metric: `+${adjustedProd}%`,
      icon: Factory,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      desc: 'Plant Capacity',
    },
    {
      title: 'Wastewater',
      metric: `+${adjustedWaste}%`,
      icon: Droplets,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      desc: 'Hydraulic Volume',
    },
    {
      title: 'CETP Load',
      metric: `+${adjustedCetp}%`,
      icon: Activity,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      desc: 'Treatment Basin',
    },
    {
      title: 'Discharge',
      metric: 'Treated',
      icon: Waves,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      desc: 'River Outfall',
    },
    {
      title: 'Downstream',
      metric: impact.downstreamRiskScore > 50 ? 'Attention' : 'Normal',
      icon: ShieldAlert,
      color: impact.downstreamRiskScore > 50 ? 'text-amber-600' : 'text-emerald-600',
      bg: impact.downstreamRiskScore > 50 ? 'bg-amber-50' : 'bg-emerald-50',
      border: impact.downstreamRiskScore > 50 ? 'border-amber-200' : 'border-emerald-200',
      desc: 'Assimilative Cap.',
    },
  ];

  return (
    <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
            World Model Causal Chain
          </span>
        </div>
        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
          Simulated Impact
        </span>
      </div>

      {/* Horizontal Flow Chain Diagram */}
      <div className="grid grid-cols-5 gap-1.5 items-center relative">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div
                className={`w-full py-2 px-1 rounded-lg border ${step.border} ${step.bg} flex flex-col items-center justify-center transition-all duration-300`}
              >
                <Icon className={`w-3.5 h-3.5 ${step.color} mb-1`} />
                <span className="text-[10px] font-medium text-slate-600 leading-tight">
                  {step.title}
                </span>
                <span className={`text-xs font-bold ${step.color} mt-0.5`}>
                  {step.metric}
                </span>
              </div>
              <span className="text-[9px] text-slate-400 mt-1 truncate max-w-full font-sans">
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* System Impact Summary Metrics */}
      <div className="mt-3 pt-2.5 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-white p-1.5 rounded-lg border border-slate-100">
          <div className="text-[10px] text-slate-500 font-medium">Production Change</div>
          <div className="text-xs font-bold text-sky-700 mt-0.5">+{adjustedProd}%</div>
        </div>
        <div className="bg-white p-1.5 rounded-lg border border-slate-100">
          <div className="text-[10px] text-slate-500 font-medium">Est. Wastewater</div>
          <div className="text-xs font-bold text-cyan-700 mt-0.5">+{adjustedWaste}%</div>
        </div>
        <div className="bg-white p-1.5 rounded-lg border border-slate-100">
          <div className="text-[10px] text-slate-500 font-medium">CETP Load Change</div>
          <div className="text-xs font-bold text-teal-700 mt-0.5">+{adjustedCetp}%</div>
        </div>
      </div>
    </div>
  );
};
