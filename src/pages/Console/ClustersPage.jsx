import React from 'react';
import { CLUSTERS_DATA } from '../../data/aquasentinalData';
import { ArrowRight } from 'lucide-react';
import './ClustersPage.css';

export function ClustersPage({ onNavigateTab }) {
  const getBandInfo = (b) => {
    switch (b) {
      case 'red': return { tagClass: 't-red', label: 'Act now', numClass: 'red' };
      case 'amber': return { tagClass: 't-amber', label: 'Look into', numClass: 'amber' };
      case 'clear': return { tagClass: 't-green', label: 'Nothing found', numClass: 'green' };
      default: return { tagClass: 't-grey', label: "Can't check", numClass: 'grey' };
    }
  };

  return (
    <div className="clusters-container">
      {/* Cluster CETP KPI Summary Bar */}
      <div className="cluster-kpi-bar">
        <div className="cluster-kpi-card">
          <span className="cluster-kpi-lbl">Monitored CETP Clusters</span>
          <span className="cluster-kpi-val">4 Major Basins</span>
          <span className="cluster-kpi-sub">Tiruppur, Erode, Karur, Bhavani</span>
        </div>
        <div className="cluster-kpi-card">
          <span className="cluster-kpi-lbl">Member Units Covered</span>
          <span className="cluster-kpi-val">178 Units</span>
          <span className="cluster-kpi-sub">Common Pipeline Network</span>
        </div>
        <div className="cluster-kpi-card">
          <span className="cluster-kpi-lbl">Unreported CETP Load Gap</span>
          <span className="cluster-kpi-val gap-red">+18% Discrepancy</span>
          <span className="cluster-kpi-sub">7,400 m³/day Hidden Discharge</span>
        </div>
        <div className="cluster-kpi-card">
          <span className="cluster-kpi-lbl">De-convoluted Suspect Units</span>
          <span className="cluster-kpi-val gap-amber">7 Units</span>
          <span className="cluster-kpi-sub">Isolated by Shutdown Signals</span>
        </div>
      </div>

      {/* Cluster CETP Cards Grid */}
      <div className="grid-clusters">
        {CLUSTERS_DATA.map((c, idx) => {
          const { tagClass, label, numClass } = getBandInfo(c.status);
          const reportedPct = c.status === 'red' ? 82 : c.status === 'amber' ? 94 : 99;

          return (
            <div className="cluster-card" key={idx}>
              <div>
                <div className="cluster-card-header">
                  <div>
                    <div className="cluster-name">{c.name}</div>
                    <div className="cluster-location">{c.members} Members • {c.riverBasin}</div>
                  </div>
                  <span className={`tag ${tagClass}`}><span className="dot" />{label}</span>
                </div>

                <div className="cluster-gap-display">
                  <div className={`cluster-gap-num ${numClass}`}>{c.gap}</div>
                  <div className="cluster-gap-lbl">
                    {c.gap === '—' ? 'Inlet flow meter offline' : 'Discrepancy at CETP inlet meter'}
                  </div>
                </div>

                {/* Flow Volume Breakdown Box */}
                <div className="flow-breakdown-box">
                  <div className="flow-metric-item">
                    <span className="flow-metric-lbl">Members Filing</span>
                    <span className="flow-metric-val">{c.memberSum}</span>
                  </div>
                  <div className="flow-metric-item">
                    <span className="flow-metric-lbl">CETP Inlet Actual</span>
                    <span className="flow-metric-val">{c.cetpActual}</span>
                  </div>
                  <div className="flow-metric-item">
                    <span className="flow-metric-lbl">Unaccounted Gap</span>
                    <span className="flow-metric-val unaccounted">{c.unreported}</span>
                  </div>
                </div>

                <div className="cluster-line-text">{c.line}</div>
                <div className="cluster-note-text">{c.note}</div>

                {c.gap !== '—' && (
                  <div className="mass-bar-container">
                    <div className="mass-bar-labels">
                      <span>Reported Mass ({reportedPct}%)</span>
                      {reportedPct < 100 && <span>Unreported Mass ({100 - reportedPct}%)</span>}
                    </div>
                    <div className="mass-bar">
                      <div className="mass-bar-segment reported" style={{ width: `${reportedPct}%` }} />
                      <div className="mass-bar-segment missing" style={{ width: `${100 - reportedPct}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="cluster-footer">
                <span className="cluster-member-count">
                  {c.narrowed ? `Narrowed to ${c.narrowed} suspect units` : 'All members reconciled'}
                </span>
                {c.narrowed > 0 && (
                  <button 
                    className="btn-narrowed-inspect" 
                    onClick={() => onNavigateTab && onNavigateTab('list')}
                  >
                    Inspect {c.narrowed} Units <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mass-Balance Mathematics Explanation Panel */}
      <div className="cluster-explanation-panel">
        <div className="panel-h">
          <h2>Why CETP Mass Reconciliation Catches Clean-Looking Plants</h2>
        </div>
        <div className="explanation-grid">
          <div className="formula-card">
            <div className="formula-title">Mathematical Principle: Conservation of Mass</div>
            <p className="formula-body">
              Individual factory records may pass single-station validation checks on their own. However, because all member pipes discharge into a single CETP main inlet, the total volume received at the CETP receiving basin must strictly equal the sum of all individual filings:
            </p>
            <span className="formula-eq">
              Sum(Member Reports) = CETP Inlet Flow Meter - Piping Losses
            </span>
          </div>

          <div className="formula-card">
            <div className="formula-title">De-convolution via Staggered Shut-down Signals</div>
            <p className="formula-body">
              Factories operate on different production schedules, holidays, and maintenance cycles. By analyzing which cluster member was shut on days when the CETP discrepancy gap closed (e.g. from 48,600 m³/day down to normal), AquaSentinal isolates the exact suspect factories without needing to inspect all 64 units.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
