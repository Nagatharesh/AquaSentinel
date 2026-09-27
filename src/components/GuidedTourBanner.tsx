import React from 'react';
import { SkipForward, SkipBack, X, Sparkles } from 'lucide-react';

export interface TourStep {
  step: number;
  title: string;
  narration: string;
  target: 'overview' | 'industry-01' | 'pipes' | 'cetp' | 'discharge' | 'monitoring' | 'borewell';
  insight: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    title: '1. Industrial Basin Overview',
    narration: 'AquaSentinel provides an interactive 3D digital twin of the industrial-environmental ecosystem along the river basin.',
    target: 'overview',
    insight: 'Visualizes 5 high-impact industrial units connected via pipelines to the central CETP and river discharge.',
  },
  {
    step: 2,
    title: '2. Inspecting ABC Textiles Pvt Ltd',
    narration: 'Evaluating an individual factory by clicking its 3D model brings up comprehensive multi-source physical evidence.',
    target: 'industry-01',
    insight: 'Shows 82% production capacity, 12,450 kWh/day power, chemical usage (lime/alum/poly), and 1.8 tonnes sludge.',
  },
  {
    step: 3,
    title: '3. Forensic Pattern Signals',
    narration: 'JalSatya tests OCEMS data for flatline, threshold hugging, digit preference, and strategic downtime.',
    target: 'industry-01',
    insight: 'Flagged "High Priority Inspection" because OCEMS BOD hovers at 29.2 mg/L while power and production indicate heavy batch load.',
  },
  {
    step: 4,
    title: '4. Wastewater Conveyance & Mass Balance',
    narration: 'Pipes transport wastewater from industries to the CETP with real-time hydraulic flow telemetry.',
    target: 'pipes',
    insight: 'Computed mass balance (512 KL/day) exceeds reported discharge (420 KL/day), revealing physical discrepancy.',
  },
  {
    step: 5,
    title: '5. Common Effluent Treatment Plant (CETP)',
    narration: 'The 50 MLD CETP treats combined wastewater through primary clarifiers, MBR aeration, and secondary settling.',
    target: 'cetp',
    insight: 'CETP is operating at 78.4% capacity (39.2 MLD) with 92.1% BOD removal efficiency.',
  },
  {
    step: 6,
    title: '6. Treated Discharge & River Outfall',
    narration: 'Treated effluent is discharged into the river at the designated outfall structure with continuous parameter verification.',
    target: 'discharge',
    insight: 'Treated outlet COD is 112 mg/L, safely within statutory discharge limits (< 250 mg/L).',
  },
  {
    step: 7,
    title: '7. Downstream River & Subsurface Sensors',
    narration: 'Downstream river telemetry buoy and deep groundwater piezometers confirm environmental health.',
    target: 'monitoring',
    insight: 'JalSatya never trusts one number alone — it connects reported data with independent physical ground-truth.',
  },
];

interface GuidedTourBannerProps {
  currentStepIndex: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onEndTour: () => void;
}

export const GuidedTourBanner: React.FC<GuidedTourBannerProps> = ({
  currentStepIndex,
  onNextStep,
  onPrevStep,
  onEndTour,
}) => {
  const currentStep = TOUR_STEPS[currentStepIndex];

  return (
    <div className="absolute top-16 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[620px] z-30 pointer-events-auto animate-slideDown">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-sky-300 shadow-2xl p-4 ring-4 ring-sky-500/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 pulse-emerald" />
            <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">
              Evaluator Demo Tour — Step {currentStep.step} of {TOUR_STEPS.length}
            </span>
          </div>
          <button
            onClick={onEndTour}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            title="Exit Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-sm font-bold text-slate-900">{currentStep.title}</h3>
        <p className="text-xs text-slate-700 mt-1 leading-relaxed">{currentStep.narration}</p>

        {/* Highlight Insight Box */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-sky-50/80 border border-sky-200 text-xs text-sky-950 font-medium flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <span>
            <strong className="font-bold text-sky-900">Key Takeaway: </strong>
            {currentStep.insight}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
          <button
            onClick={onPrevStep}
            disabled={currentStepIndex === 0}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
          >
            <SkipBack className="w-3 h-3" />
            <span>Previous</span>
          </button>

          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((s, idx) => (
              <span
                key={s.step}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-sky-600'
                    : idx < currentStepIndex
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={onNextStep}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-sm flex items-center gap-1"
          >
            <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            <SkipForward className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
