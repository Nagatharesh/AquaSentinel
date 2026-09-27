import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, Info } from 'lucide-react';

export const SpatialLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const legendItems = [
    { label: 'Industry', color: 'bg-sky-500', desc: 'Textile, Chemical, Plating, Paper, Tannery' },
    { label: 'CETP', color: 'bg-teal-500', desc: '50 MLD Central Treatment Plant' },
    { label: 'Discharge Point', color: 'bg-cyan-400', desc: 'Treated Effluent Outfall' },
    { label: 'River', color: 'bg-blue-600', desc: 'Flowing Bhavani River' },
    { label: 'Monitoring Station', color: 'bg-emerald-500', desc: 'Downstream Telemetry Buoy' },
    { label: 'Borewell', color: 'bg-indigo-500', desc: 'Deep Aquifer Groundwater Piezometer' },
  ];

  return (
    <div className="absolute bottom-4 left-4 z-20 pointer-events-auto">
      <div className="bg-white/92 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-lg p-3 w-64 transition-all">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider"
        >
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Spatial Legend</span>
          </div>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {isOpen && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5 animate-fadeIn">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                  <span className="font-semibold text-slate-700">{item.label}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans truncate max-w-[110px]">
                  {item.desc}
                </span>
              </div>
            ))}

            <div className="pt-2 mt-1 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1">
              <Info className="w-3 h-3 text-slate-400 shrink-0" />
              <span>Orbit / Pan / Touch / Pinch Zoom</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
