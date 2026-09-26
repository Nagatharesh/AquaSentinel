import React, { useState } from 'react';
import { ExternalLink, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import './FindingsPage.css';

export function FindingsPage({ onOpenPlant }) {
  const [filter, setFilter] = useState('all');

  const NOTICES_DATA = [
    {
      refNo: 'TNPCB/NOT/2026/0143',
      date: '02 Sep 2026',
      plantId: 'TN-TP-0143',
      plant: 'Noyyal Garment Dyers',
      location: 'Tiruppur Cluster',
      finding: 'Four days of continuous telemetry readings in August were identified as an exact copy of July data.',
      strengthClass: 't-red',
      strength: 'Intent',
      statusClass: 't-green',
      status: 'Confirmed on inspection',
      statusKey: 'confirmed'
    },
    {
      refNo: 'TNPCB/NOT/2026/0219',
      date: '28 Aug 2026',
      plantId: 'TN-KR-0219',
      plant: 'Cauvery Tanning Works',
      location: 'Karur Belt',
      finding: 'Reported effluent treatment volume exceeds physical possibility given actual grid electricity consumed.',
      strengthClass: 't-red',
      strength: 'Certified',
      statusClass: 't-amber',
      status: 'Reply received — review',
      statusKey: 'reply'
    },
    {
      refNo: 'TNPCB/NOT/2026/0412',
      date: '21 Aug 2026',
      plantId: 'TN-ER-0412',
      plant: 'Sri Amman Processing Mills',
      location: 'Erode District',
      finding: 'pH meter remained completely flat at 7.20 for 19 days despite a 40% swing in production throughput.',
      strengthClass: 't-red',
      strength: 'Certified',
      statusClass: 't-amber',
      status: 'Reply received — review',
      statusKey: 'reply'
    },
    {
      refNo: 'TNPCB/NOT/2026/0088',
      date: '14 Aug 2026',
      plantId: 'TN-TP-0088',
      plant: 'Kongu Knit Fabrics',
      location: 'Tiruppur North',
      finding: 'Monitoring hardware goes offline on peak production days and resumes precisely at 85% monthly compliance threshold.',
      strengthClass: 't-red',
      strength: 'Intent',
      statusClass: 't-water',
      status: 'Awaiting reply',
      statusKey: 'awaiting'
    },
    {
      refNo: 'TNPCB/NOT/2026/0377',
      date: '09 Aug 2026',
      plantId: 'TN-ER-0377',
      plant: 'Anna Nagar Dyeing Unit',
      location: 'Bhavani Cluster',
      finding: 'Sensor readings clustered just under legal CTO ceiling. Withdrawn due to incorrect analyzer calibration in register.',
      strengthClass: 't-amber',
      strength: 'Statistical',
      statusClass: 't-grey',
      status: 'Withdrawn — register corrected',
      statusKey: 'withdrawn'
    },
    {
      refNo: 'TNPCB/NOT/2026/0378',
      date: '02 Aug 2026',
      plantId: 'TN-ER-0377',
      plant: 'Bhavani Bleaching Unit',
      location: 'Bhavani River Basin',
      finding: '412 readings clustered precisely 0.1 unit under CTO threshold, far exceeding statistical probability.',
      strengthClass: 't-red',
      strength: 'Certified',
      statusClass: 't-green',
      status: 'Confirmed on inspection',
      statusKey: 'confirmed'
    }
  ];

  const filteredNotices = filter === 'all' 
    ? NOTICES_DATA 
    : NOTICES_DATA.filter((n) => n.statusKey === filter);

  return (
    <div className="findings-container">
      {/* Legal Enforcement Lifecycle Pipeline */}
      <div className="pipeline-bar">
        <div className="pipeline-step" onClick={() => setFilter('all')}>
          <span className="pipeline-num">9</span>
          <span className="pipeline-label">Notices Issued</span>
        </div>
        <div className="pipeline-step" onClick={() => setFilter('reply')}>
          <span className="pipeline-num reply">4</span>
          <span className="pipeline-label">Replies Received</span>
        </div>
        <div className="pipeline-step" onClick={() => setFilter('confirmed')}>
          <span className="pipeline-num confirmed">4</span>
          <span className="pipeline-label">Field Confirmed</span>
        </div>
        <div className="pipeline-step" onClick={() => setFilter('withdrawn')}>
          <span className="pipeline-num withdrawn">2</span>
          <span className="pipeline-label">Withdrawn / Cleared</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="findings-filter-bar">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All Legal Dossiers (6)
        </button>
        <button className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`} onClick={() => setFilter('confirmed')}>
          Confirmed (2)
        </button>
        <button className={`filter-btn ${filter === 'reply' ? 'active' : ''}`} onClick={() => setFilter('reply')}>
          Reply Received (2)
        </button>
        <button className={`filter-btn ${filter === 'awaiting' ? 'active' : ''}`} onClick={() => setFilter('awaiting')}>
          Awaiting Reply (1)
        </button>
        <button className={`filter-btn ${filter === 'withdrawn' ? 'active' : ''}`} onClick={() => setFilter('withdrawn')}>
          Withdrawn (1)
        </button>
      </div>

      {/* Dossier Card Grid View */}
      <div className="dossier-grid">
        {filteredNotices.map((n) => (
          <div key={n.refNo} className="dossier-card">
            <div>
              <div className="dossier-header">
                <span className="dossier-ref">{n.refNo}</span>
                <span className="dossier-date">{n.date}</span>
              </div>
              <div className="dossier-plant-name">{n.plant}</div>
              <div className="dossier-plant-sub">{n.plantId} • {n.location}</div>
              <div className="dossier-finding-box">
                <p className="dossier-finding-text">{n.finding}</p>
              </div>
            </div>

            <div className="dossier-footer">
              <div className="dossier-meta-row">
                <span className={`tag ${n.strengthClass}`}>{n.strength}</span>
                <span className={`tag ${n.statusClass}`}>{n.status}</span>
              </div>
              <button 
                className="btn-view-dossier" 
                onClick={() => onOpenPlant && onOpenPlant(n.plantId)}
              >
                Review Dossier <ExternalLink size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Audit & Legal Definition Panels */}
      <div className="findings-bottom-grid">
        <div className="panel">
          <div className="panel-h">
            <h2>Legal Evidentiary Hierarchy</h2>
          </div>
          <div className="explanation-list">
            <div>
              <div className="explanation-item-title">
                <span className="tag t-red">Intent</span>
                <strong>Digital Tampering / Fabrication</strong>
              </div>
              <p className="explanation-desc">
                Behaviors impossible for physical sensor failure: cloned history files, telemetry silencing synchronized with audit dates, or shared signature across vendor clients.
              </p>
            </div>
            <div>
              <div className="explanation-item-title">
                <span className="tag t-red">Certified</span>
                <strong>Physical Contradiction</strong>
              </div>
              <p className="explanation-desc">
                Reported discharge violates conservation of energy/mass (e.g. effluent volume treated exceeds electricity consumed by pumps).
              </p>
            </div>
            <div>
              <div className="explanation-item-title">
                <span className="tag t-amber">Statistical</span>
                <strong>Anomaly Cluster</strong>
              </div>
              <p className="explanation-desc">
                High statistical confidence of artificial manipulation (e.g. 99% of readings sitting precisely 0.05 units under legal CTO ceiling).
              </p>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-h">
            <h2>Withdrawn Notices Audit Register</h2>
          </div>
          <div className="audit-withdrawal-box">
            <p className="audit-highlight">
              2 notices were formally withdrawn this quarter following plant representation and hardware audit.
            </p>
            <p className="audit-body">
              Audit revealed our central database registered an outdated sensor calibration curve for specific dual-wavelength spectro-analysers. All 14 plants using this hardware model were updated automatically, eliminating false positive triggers while preserving legal integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

