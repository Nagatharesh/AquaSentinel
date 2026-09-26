import React, { useState } from 'react';
import { AlertCircle, Calendar } from 'lucide-react';
import './AuditInspectionList.css';

const TAMIL_NADU_INSPECTIONS = [
  {
    id: 1,
    plant_name: 'Tiruppur Common Effluent Treatment Plant #4 (CETP)',
    industry_sector: 'Textile Processing & Dyeing',
    location: 'Tiruppur Dyeing Cluster, Tamil Nadu',
    risk_score: 97,
    primary_anomaly: 'Zero-Variance Flatline & Digit Bias',
    forensic_evidence: 'Reported Total Dissolved Solids (TDS) at exactly 2,100 mg/L for 21 consecutive days. Benford frequency shows 96% digit preference for 2.',
    recommended_action: 'TNPCB Tiruppur Team: Audit RO membrane power logs & inspect physical ZLD drain line tomorrow morning',
    cto_limit_bod: 30,
    reported_max_bod: 21.0
  },
  {
    id: 2,
    plant_name: 'Ranipet Leather Tannery Complex #12',
    industry_sector: 'Leather Tanning & Finishing',
    location: 'Ranipet SIPCOT Industrial Zone, Tamil Nadu',
    risk_score: 92,
    primary_anomaly: 'Palar River Downstream Spike & Outage Gap',
    forensic_evidence: 'Registered "maintenance sensor outage" coincided with 8.4 mg/L Hexavalent Chromium spike recorded by Palar River downstream gauge.',
    recommended_action: 'TNPCB Ranipet Team: Physical audit of sludge drying beds & raw effluent equalization tank #2',
    cto_limit_bod: 30,
    reported_max_bod: 28.5
  },
  {
    id: 3,
    plant_name: 'Cuddalore Synthetic Organics Ltd',
    industry_sector: 'Bulk Chemical Manufacturing',
    location: 'SIPCOT Complex, Cuddalore, Tamil Nadu',
    risk_score: 86,
    primary_anomaly: 'Threshold Hugging & Capacity Skew',
    forensic_evidence: 'COD readings artificially cluster in a 0.25 mg/L band directly below 250 mg/L consent limit during 2.5x production surge.',
    recommended_action: 'TNPCB Cuddalore Team: Inspect DAHS raw data logger buffer & calibration gas/solution logs',
    cto_limit_bod: 100,
    reported_max_bod: 248.5
  }
];

export function AuditInspectionList() {
  const [targets] = useState(TAMIL_NADU_INSPECTIONS);

  return (
    <section className="audit-section" id="audit-list">
      <div className="audit-inner">
        <div className="audit-header">
          <div className="audit-title-box">
            <div className="audit-tag">
              <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
              TNPCB ACTIONABLE REGULATORY ITINERARY
            </div>
            <h2 className="audit-title">Tomorrow Morning Inspection Priority List</h2>
            <p className="audit-subtitle">
              Targeted field inspections ranked by risk score for Tamil Nadu Pollution Control Board officers.
            </p>
          </div>
          <div className="audit-badge-pill">
            <Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Active TN Targets: {targets.length} High-Risk Facilities
          </div>
        </div>

        <div className="table-wrapper">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Priority / Facility Name</th>
                <th>Risk Score</th>
                <th>Primary Anomaly</th>
                <th>Forensic Evidence (Plain Language)</th>
                <th>Tomorrow Morning Action Plan</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((item, idx) => (
                <tr key={item.id}>
                  <td>
                    <span className="plant-name">#{idx + 1} {item.plant_name}</span>
                    <span className="plant-location">{item.industry_sector} • {item.location}</span>
                  </td>
                  <td>
                    <span className="risk-pill risk-high">
                      {item.risk_score}/100
                    </span>
                  </td>
                  <td>
                    <span className="anomaly-tag">{item.primary_anomaly}</span>
                  </td>
                  <td>
                    <div className="evidence-text">{item.forensic_evidence}</div>
                  </td>
                  <td>
                    <div className="action-box">{item.recommended_action}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
