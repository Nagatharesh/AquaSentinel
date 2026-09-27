import React from 'react';
import { Thermometer, Waves, Maximize2, ShieldAlert } from 'lucide-react';
import './OfficerEvidenceBreakdown.css';

export function OfficerEvidenceBreakdown({ telemetry }) {
  if (!telemetry) return null;

  return (
    <div className="officer-evidence-container">
      <div className="evidence-section-title">
        <ShieldAlert size={14} className="evidence-icon" /> Spectral Telemetry & Anomaly Metrics
      </div>

      <div className="evidence-metrics-grid">
        <div className="evidence-card thermal-card">
          <div className="card-label">
            <Thermometer size={14} /> Thermal IR Differential
          </div>
          <div className="card-value">{telemetry.thermalAnomalyDelta}</div>
          <div className="card-subtext">
            Outfall: {telemetry.outfallTemp} | River: {telemetry.ambientRiverTemp}
          </div>
        </div>

        <div className="evidence-card turbidity-card">
          <div className="card-label">
            <Waves size={14} /> NDWI Turbidity Plume
          </div>
          <div className="card-value">{telemetry.ndwiTurbidityIndex}</div>
          <div className="card-subtext">Baseline standard: 0.12 index</div>
        </div>

        <div className="evidence-card area-card">
          <div className="card-label">
            <Maximize2 size={14} /> Plume Spread Area
          </div>
          <div className="card-value">{telemetry.plumeSpreadAreaSqM.toLocaleString()} m²</div>
          <div className="card-subtext">Buffer Encroachment: {telemetry.bufferZoneEncroachmentSqM.toLocaleString()} m²</div>
        </div>
      </div>

      <div className="fingerprint-badge">
        <strong>Chemical Signature:</strong> {telemetry.chemicalFingerprintMatch}
      </div>
    </div>
  );
}

export default OfficerEvidenceBreakdown;
