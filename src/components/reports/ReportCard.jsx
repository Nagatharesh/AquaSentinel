import React from 'react';
import { FileText, Calendar, Eye, Printer } from 'lucide-react';
import './ReportCard.css';

export function ReportCard({ report, onViewReport, onOpenPdf }) {
  if (!report) return null;

  const severityClass = report.severity === 'Critical' ? 'red' : report.severity === 'High' ? 'amber' : 'green';

  return (
    <div className="report-card-item">
      <div className="report-card-header">
        <div className="report-id-badge">
          <FileText size={13} /> {report.id}
        </div>
        <span className={`severity-chip ${severityClass}`}>
          {report.severity} Priority
        </span>
      </div>

      <h4 className="report-card-title">{report.title}</h4>

      <div className="report-card-meta">
        <span>Facility: <strong>{report.facilityName}</strong></span>
        <span>District: <strong>{report.district}</strong></span>
      </div>

      <p className="report-card-summary">{report.summary}</p>

      <div className="report-card-footer">
        <span className="report-card-date">
          <Calendar size={12} /> {report.date} • {report.category}
        </span>

        <div className="report-card-actions">
          <button
            className="report-btn secondary-btn"
            onClick={() => onViewReport(report)}
          >
            <Eye size={13} /> Briefing
          </button>

          <button
            className="report-btn primary-btn"
            onClick={() => onOpenPdf(report)}
          >
            <Printer size={13} /> Official PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
