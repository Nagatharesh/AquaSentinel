import React from 'react';
import { CoverageKPIMetrics } from '../../components/coverage/CoverageKPIMetrics';
import { CrossVerificationList } from '../../components/coverage/CrossVerificationList';
import { DistrictCoverageGrid } from '../../components/coverage/DistrictCoverageGrid';
import { FactorySubmissionTable } from '../../components/coverage/FactorySubmissionTable';
import { CoveragePolicyCard } from '../../components/coverage/CoveragePolicyCard';
import './CoveragePage.css';

export function CoveragePage() {
  return (
    <div className="coverage-page-wrapper">
      {/* Top Meta Timestamp */}
      <div className="coverage-meta-header">
        <span className="sync-badge">
          27 Sept 2026 • Telemetry Synced to 06:00 UTC
        </span>
        <span className="district-count-chip">
          38 Tamil Nadu Districts | 18 Active Surveillance Hubs
        </span>
      </div>

      {/* 1. 3 KPI Summary Cards (Total, Multi-Source Cross-Checked, Randomized Audit Pool) */}
      <CoverageKPIMetrics />

      {/* 2. Multi-Source Cross-Verification Databases (7 Systems Progress Bars) */}
      <CrossVerificationList />

      {/* 3. Tamil Nadu District Coverage Breakdown (Covered vs Non-Covered) */}
      <DistrictCoverageGrid />

      {/* 4. Factory Telemetry Data Submission Audit Matrix */}
      <FactorySubmissionTable />

      {/* 5. Policy & Unmonitored Protocol */}
      <CoveragePolicyCard />
    </div>
  );
}

export default CoveragePage;
