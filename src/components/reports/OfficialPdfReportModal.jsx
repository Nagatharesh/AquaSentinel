import React, { useRef } from 'react';
import { X, Printer, Download, ShieldCheck, FileCheck, Award } from 'lucide-react';
import './OfficialPdfReportModal.css';

export function OfficialPdfReportModal({ report, onClose }) {
  const printRef = useRef(null);

  if (!report) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pdf-modal-backdrop" onClick={onClose}>
      <div className="pdf-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Top Floating Control Bar */}
        <div className="pdf-control-bar">
          <div className="control-bar-info">
            <FileCheck size={16} className="pdf-icon" />
            <span>Official Government Document Preview: {report.id}.pdf</span>
          </div>

          <div className="control-bar-actions">
            <button className="pdf-action-btn primary" onClick={handlePrint}>
              <Printer size={14} /> Print / Save as PDF
            </button>
            <button className="pdf-action-btn close" onClick={onClose} aria-label="Close PDF Viewer">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Real Printable A4 PDF Sheet Viewport */}
        <div className="pdf-sheet-scroll-container">
          <div className="official-a4-sheet" ref={printRef}>
            {/* Government Emblem & Letterhead */}
            <div className="letterhead-header">
              <div className="emblem-wrapper">
                <ShieldCheck size={44} className="gov-emblem" />
              </div>
              <div className="gov-title-block">
                <h1 className="gov-name">TAMIL NADU POLLUTION CONTROL BOARD</h1>
                <h2 className="dept-name">Department of Environment, Climate Change & Forests</h2>
                <p className="gov-address">
                  76, Mount Salai, Guindy, Chennai, Tamil Nadu - 600032 | Website: www.tnpcb.gov.in
                </p>
              </div>
            </div>

            <div className="official-divider-line"></div>

            {/* Document Reference Meta Grid */}
            <div className="doc-meta-grid">
              <div className="meta-col">
                <div><strong>Ref No:</strong> TNPCB/NZ/{report.id}/2026</div>
                <div><strong>Date of Issue:</strong> {report.date}</div>
              </div>
              <div className="meta-col right">
                <div><strong>Classification:</strong> FORM-VIII STATUTORY NOTICE</div>
                <div><strong>Surveillance Zone:</strong> {report.district}</div>
              </div>
            </div>

            {/* Subject Header */}
            <div className="subject-box">
              <strong>SUBJECT:</strong> SHOW CAUSE NOTICE UNDER SECTION 33A OF THE WATER (PREVENTION AND CONTROL OF POLLUTION) ACT, 1974 AS AMENDED IN 1988 - REGARDING UNFAIR DISCHARGE & TELEMETRY ANOMALIES.
            </div>

            {/* Target Industry Block */}
            <div className="target-industry-box">
              <div className="box-label">TO THE MANAGING DIRECTOR / PROPRIETOR:</div>
              <h3 className="target-name">M/s. {report.facilityName}</h3>
              <div className="target-address">
                Industrial Site ID: {report.facilityId} | Category: <strong>RED HIGHLY POLLUTING SECTOR</strong>
                <br />
                Regional Jurisdiction: {report.district}, State of Tamil Nadu.
              </div>
            </div>

            {/* Section 1: Findings & Satellite Telemetry Audit */}
            <div className="pdf-section">
              <h4 className="section-heading">1. FACTUAL FINDINGS & SATELLITE SENSOR TELEMETRY AUDIT</h4>
              <p className="pdf-paragraph">{report.summary}</p>

              <table className="official-pdf-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Inspected Parameter / Evidence Item</th>
                    <th>Statutory Limit / Baseline</th>
                    <th>Verified Satellite / Sensor Value</th>
                    <th>Finding Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.evidenceSummary.map((ev, idx) => (
                    <tr key={idx}>
                      <td>0{idx + 1}</td>
                      <td>{ev}</td>
                      <td>CPCB Schedule VI</td>
                      <td>Sensor Verified</td>
                      <td className="status-cell-fail">VIOLATION</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2: Statutory Legal Provision */}
            <div className="pdf-section">
              <h4 className="section-heading">2. APPLICABLE STATUTORY & LEGAL PROVISIONS</h4>
              <p className="pdf-paragraph">
                WHEREAS, under <strong>{report.legalStatute}</strong>, the State Board is empowered to issue directions in writing for the closure, prohibition, or regulation of any industry, operation, or process, or the stoppage or regulation of supply of electricity, water, or any other service.
              </p>
            </div>

            {/* Section 3: Statutory Directives */}
            <div className="pdf-section">
              <h4 className="section-heading">3. MANDATORY SHOW CAUSE DIRECTIVES</h4>
              <p className="pdf-paragraph">
                NOW THEREFORE, in exercise of powers conferred under Section 33A of the Water Act 1974, you are hereby directed to SHOW CAUSE within <strong>fifteen (15) days</strong> from the receipt of this notice why action should not be initiated against your unit including issuance of closure orders and disconnection of power supply.
              </p>

              <ol className="directives-list">
                {report.recommendedActions.map((act, idx) => (
                  <li key={idx}><strong>Directive 3.{idx + 1}:</strong> {act}</li>
                ))}
              </ol>
            </div>

            {/* Official Signature & Seal Block */}
            <div className="pdf-signature-block">
              <div className="signature-col left">
                <div className="verification-stamp-box">
                  <Award size={32} className="seal-icon" />
                  <span>TNPCB DIGITAL VERIFICATION STAMP</span>
                  <span className="stamp-hash">HASH: 8f92a410c6d7e290</span>
                </div>
              </div>

              <div className="signature-col right">
                <div className="signature-line"></div>
                <div className="signatory-name">{report.author}</div>
                <div className="signatory-title">District Environmental Engineer (DEE)</div>
                <div className="signatory-dept">Tamil Nadu Pollution Control Board</div>
              </div>
            </div>

            {/* Footer Watermark */}
            <div className="pdf-footer-note">
              This is a digitally generated statutory legal report document issued under the Tamil Nadu Water Pollution Prevention Network.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficialPdfReportModal;
