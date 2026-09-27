import React from 'react';
import { MapPin, ShieldCheck, AlertCircle } from 'lucide-react';
import './CoverageKPIMetrics.css';

export function CoverageKPIMetrics() {
  return (
    <div className="coverage-kpi-bar">
      <div className="coverage-kpi-card">
        <div className="kpi-icon-wrapper blue">
          <MapPin size={18} />
        </div>
        <div className="kpi-content">
          <span className="coverage-kpi-lbl">Total Registered Plants</span>
          <span className="coverage-kpi-val">892 Units</span>
          <span className="coverage-kpi-sub">TNPCB District Register</span>
        </div>
      </div>

      <div className="coverage-kpi-card">
        <div className="kpi-icon-wrapper green">
          <ShieldCheck size={18} />
        </div>
        <div className="kpi-content">
          <span className="coverage-kpi-lbl">Multi-Source Cross-Checked</span>
          <span className="coverage-kpi-val highlight">605 Plants</span>
          <span className="coverage-kpi-sub">Verifiable via External Data</span>
        </div>
      </div>

      <div className="coverage-kpi-card">
        <div className="kpi-icon-wrapper amber">
          <AlertCircle size={18} />
        </div>
        <div className="kpi-content">
          <span className="coverage-kpi-lbl">Randomized Audit Pool</span>
          <span className="coverage-kpi-val unmonitored">287 Plants</span>
          <span className="coverage-kpi-sub">No Independent Power Meter</span>
        </div>
      </div>
    </div>
  );
}

export default CoverageKPIMetrics;
