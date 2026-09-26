import React from 'react';
import { COVERAGE_DATA } from '../../data/aquasentinalData';
import { ShieldCheck, Database, Zap, FileText, Activity } from 'lucide-react';
import './CoveragePage.css';

export function CoveragePage() {
  return (
    <div className="coverage-container">
      {/* Coverage KPI Summary Bar */}
      <div className="coverage-kpi-bar">
        <div className="coverage-kpi-card">
          <span className="coverage-kpi-lbl">Total Registered Plants</span>
          <span className="coverage-kpi-val">892 Units</span>
          <span className="coverage-kpi-sub">TNPCB District Register</span>
        </div>
        <div className="coverage-kpi-card">
          <span className="coverage-kpi-lbl">Multi-Source Cross-Checked</span>
          <span className="coverage-kpi-val highlight">605 Plants</span>
          <span className="coverage-kpi-sub">Verifiable via External Data</span>
        </div>
        <div className="coverage-kpi-card">
          <span className="coverage-kpi-lbl">Randomized Audit Pool</span>
          <span className="coverage-kpi-val unmonitored">287 Plants</span>
          <span className="coverage-kpi-sub">No Independent Power Meter</span>
        </div>
        <div className="coverage-kpi-card">
          <span className="coverage-kpi-lbl">Policy Unlock Potential</span>
          <span className="coverage-kpi-val highlight">+318 Plants</span>
          <span className="coverage-kpi-sub">Mandatory ETP Feeder Policy</span>
        </div>
      </div>

      {/* Multi-Source External Register Panel */}
      <div className="coverage-register-panel">
        <div className="panel-h">
          <h2>Multi-Source Cross-Verification Databases ({COVERAGE_DATA.length} Systems)</h2>
        </div>

        <div className="coverage-list">
          {COVERAGE_DATA.map((c, idx) => {
            const pc = Math.round((c.have / c.tot) * 100);
            const fillClass = pc > 70 ? 'high' : pc > 40 ? 'mid' : 'low';

            return (
              <div key={idx}>
                <div className="coverage-item-header">
                  <span className="coverage-item-title">{c.rec}</span>
                  <span className="coverage-item-meta">
                    {c.have} of {c.tot} plants ({pc}%) • Source: {c.who}
                  </span>
                </div>
                <div className="coverage-progress-bar">
                  <div className={`coverage-progress-fill ${fillClass}`} style={{ width: `${pc}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Policy & Unmonitored Pool Cards */}
      <div className="coverage-two-grid">
        <div className="coverage-card">
          <div className="panel-h">
            <h2>The 287 Unmonitored Units Protocol</h2>
          </div>

          <div className="unmonitored-box">
            <div className="unmonitored-title">Randomized Field Inspection Pool</div>
            <p className="unmonitored-desc">
              Plants running on internal diesel generators or unmetered borewell permits have no external government database to cross-check digital telemetry against.
            </p>
          </div>

          <p className="coverage-policy-quote">
            <strong>Enforcement Fairness:</strong> Unmonitored plants are neither penalized nor ignored. They are placed in a randomized physical field audit pool where every unit carries a non-zero probability of an unannounced inspector visit.
          </p>
        </div>

        <div className="coverage-card">
          <div className="panel-h">
            <h2>Single Highest-Impact Policy Recommendation</h2>
          </div>

          <div className="win-number-display">+318 Plants</div>
          <div className="win-number-sub">Instantly Digitally Verifiable</div>

          <p className="coverage-policy-quote">
            Mandating a dedicated TANGEDCO electricity feeder meter on the effluent treatment plant (ETP) as a condition of Consent to Operate (CTO) is the single policy change that unlocks mass digital fraud detection. TANGEDCO power bills cannot be altered by factory operators.
          </p>
        </div>
      </div>
    </div>
  );
}
