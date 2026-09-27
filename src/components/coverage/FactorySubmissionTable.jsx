import React, { useState } from 'react';
import { Database, CheckCircle2, XCircle, AlertTriangle, Filter } from 'lucide-react';
import { FACTORY_SUBMISSION_MATRIX } from '../../data/districtCoverageData';
import './FactorySubmissionTable.css';

export function FactorySubmissionTable() {
  const [filter, setFilter] = useState('all');

  const filteredFactories = FACTORY_SUBMISSION_MATRIX.filter((f) => {
    if (filter === 'compliant') return f.status === 'compliant';
    if (filter === 'partial') return f.status === 'partial';
    if (filter === 'unmonitored') return f.status === 'unmonitored';
    return true;
  });

  return (
    <div className="factory-table-container">
      <div className="table-header-row">
        <div className="table-title-group">
          <h3 className="section-title">
            <Database size={16} className="title-icon" /> Factory Telemetry Submission Audit Matrix
          </h3>
          <span className="section-subtitle">
            Verified across 7 multi-source registers (CTO, TANGEDCO power, Water intake, Sludge, GST, CPCB, OCEMS)
          </span>
        </div>

        <div className="table-filter-bar">
          <Filter size={13} className="filter-icon" />
          <button
            className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({FACTORY_SUBMISSION_MATRIX.length})
          </button>
          <button
            className={`filter-chip green ${filter === 'compliant' ? 'active' : ''}`}
            onClick={() => setFilter('compliant')}
          >
            Multi-Input Compliant (7/7)
          </button>
          <button
            className={`filter-chip amber ${filter === 'partial' ? 'active' : ''}`}
            onClick={() => setFilter('partial')}
          >
            Partial Submission
          </button>
          <button
            className={`filter-chip red ${filter === 'unmonitored' ? 'active' : ''}`}
            onClick={() => setFilter('unmonitored')}
          >
            Unmonitored / Audit Pool
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="submission-table">
          <thead>
            <tr>
              <th>Facility Name</th>
              <th>District Corridor</th>
              <th>7-Stream Score</th>
              <th>Data Streams Submitted</th>
              <th>Compliance Status & Audit Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredFactories.map((f) => (
              <tr key={f.id} className={`table-row ${f.status}`}>
                <td>
                  <span className="factory-name">{f.name}</span>
                  <span className="factory-id">{f.id}</span>
                </td>
                <td>
                  <span className="district-tag">{f.district}</span>
                </td>
                <td>
                  <span className={`score-badge score-${f.submittedStreams}`}>
                    {f.submittedStreams} / {f.totalStreams} Streams
                  </span>
                </td>
                <td>
                  <div className="stream-icons-grid">
                    <span className={`stream-pill ${f.streams.cto ? 'valid' : 'invalid'}`} title="Board CTO Register">
                      CTO
                    </span>
                    <span className={`stream-pill ${f.streams.tangedcoPower ? 'valid' : 'invalid'}`} title="TANGEDCO Power Feeder">
                      Power
                    </span>
                    <span className={`stream-pill ${f.streams.waterMeter ? 'valid' : 'invalid'}`} title="Water Meter / Borewell">
                      Water
                    </span>
                    <span className={`stream-pill ${f.streams.sludgeManifest ? 'valid' : 'invalid'}`} title="Hazardous Sludge Manifest">
                      Sludge
                    </span>
                    <span className={`stream-pill ${f.streams.gstReturns ? 'valid' : 'invalid'}`} title="GST Returns Output">
                      GST
                    </span>
                    <span className={`stream-pill ${f.streams.riverStation ? 'valid' : 'invalid'}`} title="CPCB River Station">
                      River
                    </span>
                    <span className={`stream-pill ${f.streams.analyzerDecl ? 'valid' : 'invalid'}`} title="Analyzer Make/Model">
                      OCEMS
                    </span>
                  </div>
                </td>
                <td>
                  {f.status === 'compliant' ? (
                    <span className="status-note green">
                      <CheckCircle2 size={13} /> Verified Multi-Input Synced
                    </span>
                  ) : f.status === 'partial' ? (
                    <span className="status-note amber">
                      <AlertTriangle size={13} /> {f.missingReason}
                    </span>
                  ) : (
                    <span className="status-note red">
                      <XCircle size={13} /> {f.missingReason}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FactorySubmissionTable;
