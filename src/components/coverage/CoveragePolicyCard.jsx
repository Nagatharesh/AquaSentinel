import React from 'react';
import { ShieldAlert, Zap, CheckCircle2 } from 'lucide-react';
import './CoveragePolicyCard.css';

export function CoveragePolicyCard() {
  return (
    <div className="coverage-policy-grid">
      {/* Card 1: The 287 Unmonitored Units Protocol */}
      <div className="policy-card unmonitored-card">
        <div className="card-header">
          <ShieldAlert size={16} className="card-icon red" />
          <h4 className="card-title">The 287 Unmonitored Units Protocol</h4>
        </div>

        <div className="unmonitored-box">
          <div className="unmonitored-chip">Randomized Field Inspection Pool</div>
          <p className="unmonitored-desc">
            Plants running on internal diesel generators or unmetered borewell permits have no external government database to cross-check digital telemetry against.
          </p>
        </div>

        <p className="policy-quote">
          <strong>Enforcement Fairness:</strong> Unmonitored plants are neither penalized nor ignored. They are placed in a randomized physical field audit pool where every unit carries a non-zero probability of an unannounced inspector visit.
        </p>
      </div>

      {/* Card 2: Single Highest-Impact Policy Recommendation */}
      <div className="policy-card unlock-card">
        <div className="card-header">
          <Zap size={16} className="card-icon purple" />
          <h4 className="card-title">Single Highest-Impact Policy Recommendation</h4>
        </div>

        <p className="policy-quote">
          <CheckCircle2 size={13} className="quote-icon" />
          Mandating a dedicated TANGEDCO electricity feeder meter on the effluent treatment plant (ETP) as a condition of Consent to Operate (CTO) is the single policy change that unlocks mass digital fraud detection. TANGEDCO power bills cannot be altered by factory operators.
        </p>
      </div>
    </div>
  );
}

export default CoveragePolicyCard;
