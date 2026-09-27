import React from 'react';
import { COVERAGE_DATA } from '../../data/aquasentinalData';
import { Database } from 'lucide-react';
import './CrossVerificationList.css';

export function CrossVerificationList() {
  return (
    <div className="coverage-register-panel">
      <div className="panel-h">
        <h3 className="section-title">
          <Database size={16} className="title-icon" /> Multi-Source Cross-Verification Databases ({COVERAGE_DATA.length} Systems)
        </h3>
        <span className="section-subtitle">Independent state & central database registers used for cross-checking plant telemetry</span>
      </div>

      <div className="coverage-list">
        {COVERAGE_DATA.map((c, idx) => {
          const pc = Math.round((c.have / c.tot) * 100);
          const fillClass = pc > 70 ? 'high' : pc > 40 ? 'mid' : 'low';

          return (
            <div key={idx} className="coverage-item">
              <div className="coverage-item-header">
                <span className="coverage-item-title">{c.rec}</span>
                <span className="coverage-item-meta">
                  {c.have} of {c.tot} plants ({pc}%) • Source: <strong>{c.who}</strong>
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
  );
}

export default CrossVerificationList;
