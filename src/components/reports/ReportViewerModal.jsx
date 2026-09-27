import React from 'react';
import { X, FileText, Download, Scale, AlertTriangle, CheckCircle, UserCheck } from 'lucide-react';
import './ReportViewerModal.css';

export function ReportViewerModal({ report, onClose }) {
  if (!report) return null;

  const handleDownload = () => {
    alert(`Official PDF Compliance Dossier (${report.id}) downloaded.`);
  };

  return (
    <div className="report-modal-backdrop" onClick={onClose}>
      <div className="report-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="report-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-report-id">
              <FileText size={14} /> {report.id}
            </span>
            <h3 className="modal-title">{report.title}</h3>
            <span className="modal-meta">
              Authored by: <strong>{report.author}</strong> | Date: <strong>{report.date}</strong>
            </span>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close Report Modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="report-modal-body">
          {/* Executive Overview */}
          <div className="report-section-box overview-box">
            <div className="section-box-header">
              <AlertTriangle size={15} className="section-icon red" />
              <span>Executive Briefing & Environmental Diagnosis</span>
            </div>
            <p className="section-body-text">{report.summary}</p>
          </div>

          {/* Legal Framework */}
          <div className="report-section-box legal-box">
            <div className="section-box-header">
              <Scale size={15} className="section-icon purple" />
              <span>Statutory Legal Framework</span>
            </div>
            <div className="statute-chip">{report.legalStatute}</div>
          </div>

          {/* Telemetry & Physical Evidence Points */}
          <div className="report-section-box evidence-box">
            <div className="section-box-header">
              <FileText size={15} className="section-icon blue" />
              <span>Verified Telemetry & Physical Evidence Points</span>
            </div>
            <ul className="evidence-list">
              {report.evidenceSummary.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle size={13} className="list-icon" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Officer Field Actions */}
          <div className="report-section-box action-box">
            <div className="section-box-header">
              <UserCheck size={15} className="section-icon green" />
              <span>Mandatory Officer Field Action Directives</span>
            </div>
            <ul className="action-list">
              {report.recommendedActions.map((action, idx) => (
                <li key={idx}>
                  <span className="action-step-num">{idx + 1}</span> {action}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="report-modal-footer">
          <button className="export-pdf-btn" onClick={handleDownload}>
            <Download size={14} /> Download Official PDF Report (Signed)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportViewerModal;
