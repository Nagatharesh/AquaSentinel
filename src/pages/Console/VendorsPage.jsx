import React from 'react';
import { VENDORS_DATA } from '../../data/aquasentinalData';
import { ShieldAlert, AlertCircle, CheckCircle2, Building2, ExternalLink } from 'lucide-react';
import './VendorsPage.css';

export function VendorsPage() {
  const getBandInfo = (b) => {
    switch (b) {
      case 'red': return { tagClass: 't-red', label: 'Act now', exceedClass: 'red' };
      case 'amber': return { tagClass: 't-amber', label: 'Look into', exceedClass: 'amber' };
      case 'clear': return { tagClass: 't-green', label: 'Nothing found', exceedClass: 'green' };
      default: return { tagClass: 't-grey', label: "Can't check", exceedClass: '' };
    }
  };

  return (
    <div className="vendors-container">
      {/* KPI Summary Cards */}
      <div className="vendor-kpi-bar">
        <div className="vendor-kpi-card">
          <span className="vendor-kpi-lbl">Empaneled Agencies</span>
          <span className="vendor-kpi-val">5 Agencies</span>
          <span className="vendor-kpi-sub">TNPCB Register</span>
        </div>
        <div className="vendor-kpi-card">
          <span className="vendor-kpi-lbl">Client Facilities Covered</span>
          <span className="vendor-kpi-val">101 Plants</span>
          <span className="vendor-kpi-sub">Online Datalogger Network</span>
        </div>
        <div className="vendor-kpi-card">
          <span className="vendor-kpi-lbl">Flagged Agency Portfolio</span>
          <span className="vendor-kpi-val flagged">1 High Risk</span>
          <span className="vendor-kpi-sub">Aquatrace Systems (38 Plants)</span>
        </div>
        <div className="vendor-kpi-card">
          <span className="vendor-kpi-lbl">Peer Benchmark Exceedance</span>
          <span className="vendor-kpi-val normal">5.1%</span>
          <span className="vendor-kpi-sub">Expected Exceedance Rate</span>
        </div>
      </div>

      {/* Main Agencies Portfolio Table */}
      <div className="vendor-table-panel">
        <div className="panel-h">
          <h2>Empaneled Monitoring Agencies Audit Register</h2>
        </div>
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>Empaneled Agency Name</th>
                <th>Client Plants</th>
                <th>Client Limit Exceedance Rate</th>
                <th>Peer Benchmark</th>
                <th>Audit Findings</th>
                <th>Standing</th>
              </tr>
            </thead>
            <tbody>
              {VENDORS_DATA.map((v, idx) => {
                const { tagClass, label, exceedClass } = getBandInfo(v.status);
                return (
                  <tr key={idx}>
                    <td>
                      <b>{v.name}</b>
                    </td>
                    <td className="mono"><b>{v.plants} plants</b></td>
                    <td>
                      <span className={`vendor-exceedance-tag ${exceedClass}`}>{v.exceed}</span>
                    </td>
                    <td className="mono muted">{v.peer}</td>
                    <td>
                      <div className="muted">{v.line}</div>
                    </td>
                    <td>
                      <span className={`tag ${tagClass}`}><span className="dot" />{label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Investigation & Protocol Panels */}
      <div className="vendor-two-grid">
        <div className="vendor-investigation-card">
          <div className="panel-h">
            <h2>Aquatrace Systems — Portfolio Forensic Audit</h2>
          </div>

          <div className="vendor-flag-box">
            <div className="vendor-flag-title">Single Audit Investigation, 38 Facilities Covered</div>
            <p className="vendor-flag-desc">
              Investigating one empaneled agency audits 38 client plants simultaneously. Auditing those 38 plants individually would require 38 separate field trips.
            </p>
          </div>

          <div className="fingerprint-progress-wrapper">
            <div className="fingerprint-lbl">Clients exhibiting identical telemetry rounding habit</div>
            <div className="fingerprint-bar">
              <div className="fingerprint-fill" style={{ width: '81.6%' }} />
            </div>
            <div className="fingerprint-count">31 of 38 client facilities (81.6%)</div>
          </div>

          <p className="vendor-audit-quote">
            <strong>Statistical Impossibility:</strong> 38 independent sensor probes across 38 separate plants cannot output identical decimal rounding distributions. Software-level rounding manipulation identified at the central datalogger gateway.
          </p>
        </div>

        <div className="vendor-investigation-card">
          <div className="panel-h">
            <h2>Enforcement Protocol & Next Steps</h2>
          </div>

          <div className="protocol-steps-list">
            <div className="protocol-step-item">
              <span className="protocol-step-num">1</span>
              <div>
                <div className="protocol-step-title">Empaneltment Show-Cause Notice</div>
                <p className="protocol-step-desc">
                  Issue formal legal notice against the agency. Action is taken against the vendor empanelment rather than penalizing individual client plants.
                </p>
              </div>
            </div>

            <div className="protocol-step-item">
              <span className="protocol-step-num">2</span>
              <div>
                <div className="protocol-step-title">Independent 20% Random Back-Check</div>
                <p className="protocol-step-desc">
                  20% of all telemetry dataloggers maintained by Aquatrace Systems will undergo physical audit by an un-affiliated 3rd-party laboratory.
                </p>
              </div>
            </div>

            <div className="protocol-step-item">
              <span className="protocol-step-num">3</span>
              <div>
                <div className="protocol-step-title">Reassignment by Lot Allocation</div>
                <p className="protocol-step-desc">
                  If the agency fails the back-check, its license is suspended and client plants are reassigned via random lot allocation, eliminating vendor selection bias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
