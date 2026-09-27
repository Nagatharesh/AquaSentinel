import React, { useState } from 'react';
import { MapPin, CheckCircle, Clock, Waves, Building } from 'lucide-react';
import { TN_DISTRICT_COVERAGE } from '../../data/districtCoverageData';
import './DistrictCoverageGrid.css';

export function DistrictCoverageGrid() {
  const [filter, setFilter] = useState('all'); // 'all', 'covered', 'pending'

  const filteredDistricts = TN_DISTRICT_COVERAGE.filter((d) => {
    if (filter === 'covered') return d.status === 'covered';
    if (filter === 'pending') return d.status === 'pending';
    return true;
  });

  const coveredCount = TN_DISTRICT_COVERAGE.filter((d) => d.status === 'covered').length;
  const pendingCount = TN_DISTRICT_COVERAGE.filter((d) => d.status === 'pending').length;

  return (
    <div className="district-coverage-container">
      <div className="district-grid-header">
        <div className="header-title-group">
          <h3 className="section-title">Tamil Nadu District Surveillance Coverage</h3>
          <span className="section-subtitle">
            Categorized by active sensor telemetry mesh vs. pending expansion corridors
          </span>
        </div>

        <div className="district-filter-tabs">
          <button
            className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Districts ({TN_DISTRICT_COVERAGE.length})
          </button>
          <button
            className={`tab-btn ${filter === 'covered' ? 'active' : ''}`}
            onClick={() => setFilter('covered')}
          >
            <CheckCircle size={13} /> Active Mesh ({coveredCount})
          </button>
          <button
            className={`tab-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            <Clock size={13} /> Phase II Target ({pendingCount})
          </button>
        </div>
      </div>

      <div className="district-cards-grid">
        {filteredDistricts.map((d) => (
          <div key={d.id} className={`district-card ${d.status}`}>
            <div className="district-card-head">
              <div className="district-name-wrap">
                <MapPin size={15} className="district-pin-icon" />
                <span className="district-name">{d.name}</span>
              </div>
              <span className={`status-badge ${d.status}`}>
                {d.status === 'covered' ? 'Active Mesh' : 'Phase II Target'}
              </span>
            </div>

            <div className="basin-tag">
              <Waves size={12} /> {d.riverBasin}
            </div>

            {d.status === 'covered' ? (
              <div className="district-stats">
                <div className="stat-row">
                  <span>Registered Facilities:</span>
                  <strong>{d.activeUnits} Units</strong>
                </div>
                <div className="stat-row">
                  <span>Multi-Input Compliant:</span>
                  <strong className="compliant-text">{d.multiInputCompliant} Units</strong>
                </div>
                <div className="stat-row">
                  <span>Missing Data / Partial:</span>
                  <strong className="missing-text">{d.missingDataUnits} Units</strong>
                </div>

                <div className="progress-bar-wrap">
                  <div className="progress-label">
                    <span>Telemetry Sync Rate</span>
                    <span>{d.syncPercentage}%</span>
                  </div>
                  <div className="district-progress-track">
                    <div
                      className="district-progress-fill"
                      style={{ width: `${d.syncPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="pending-roadmap-box">
                <div className="pending-target">{d.roadmapTarget}</div>
                <div className="stat-row">
                  <span>Registered Facilities:</span>
                  <strong>{d.totalUnits} Units</strong>
                </div>
                <div className="hub-tags">
                  {d.keyHubs.map((hub, idx) => (
                    <span key={idx} className="hub-chip">
                      <Building size={11} /> {hub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DistrictCoverageGrid;
