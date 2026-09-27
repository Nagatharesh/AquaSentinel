import React from 'react';
import { X, Satellite, AlertTriangle, Scale, CheckCircle } from 'lucide-react';
import { SatelliteCompareSlider } from './SatelliteCompareSlider';
import { OfficerEvidenceBreakdown } from './OfficerEvidenceBreakdown';
import { OfficerActionChecklist } from './OfficerActionChecklist';
import './SatelliteExplainDrawer.css';

export function SatelliteExplainDrawer({ anomalyData, onClose }) {
  if (!anomalyData) return null;

  const handleExportBrief = () => {
    alert(`Official Satellite Evidence Brief for ${anomalyData.plantName} generated and ready for export.`);
  };

  return (
    <div className="satellite-drawer-backdrop" onClick={onClose}>
      <div
        className="satellite-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <div className="satellite-chip">
              <Satellite size={14} /> {anomalyData.satelliteSource}
            </div>
            <h3 className="plant-name">{anomalyData.plantName}</h3>
            <span className="capture-timestamp">
              Captured: {anomalyData.captureDate} ({anomalyData.resolution})
            </span>
          </div>

          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Satellite Drawer">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Executive Plain English Explanation for Officer */}
          <div className="officer-explanation-box">
            <div className="explanation-header">
              <AlertTriangle size={15} className="explanation-icon" />
              <span>Officer Compliance Advisory & Satellite Diagnosis</span>
            </div>
            <p className="explanation-text">{anomalyData.officerSummary}</p>
          </div>

          {/* Temporal Satellite Compare Slider (Before vs After) */}
          <SatelliteCompareSlider compareData={anomalyData.compareImages} />

          {/* Quantitative Evidence & Spectral Breakdown */}
          <OfficerEvidenceBreakdown telemetry={anomalyData.spectralTelemetry} />

          {/* Statutory & Legal Framework Reference Card */}
          <div className="legal-framework-card">
            <div className="legal-header">
              <Scale size={15} className="legal-icon" /> Statutory Citation & Regulatory Mandate
            </div>
            <div className="legal-statute-badge">{anomalyData.legalFramework.statute}</div>
            <div className="legal-section-text">{anomalyData.legalFramework.section}</div>
            <div className="legal-rule-desc">{anomalyData.legalFramework.cpcbRule}</div>
            <div className="legal-summary-box">
              <CheckCircle size={12} /> {anomalyData.legalFramework.legalSummary}
            </div>
          </div>

          {/* Actionable Officer Workflow Checklist */}
          <OfficerActionChecklist
            checklistData={anomalyData.actionChecklist}
            onExportBrief={handleExportBrief}
          />
        </div>
      </div>
    </div>
  );
}

export default SatelliteExplainDrawer;
