import React from 'react';
import { ShieldAlert, Search, Activity, ChevronRight } from 'lucide-react';
import './HeroSection.css';

export function HeroSection({ onLaunchAudit, onExplore3D }) {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-pulse-dot"></span>
          PS-06-S1 | CPCB OCEMS DATA FORENSICS PLATFORM
        </div>

        <h1 className="hero-title">
          Auditing Industrial Discharge Telemetry For <br />
          <span className="hero-title-highlight">Signs of Data Fabrication & Fraud</span>
        </h1>

        <p className="hero-subtitle">
          Transforming massive streams of reported continuous effluent data into an actionable, prioritized 
          <strong> tomorrow-morning inspection plan</strong> for pollution control officers by detecting flatlines, digit bias, threshold hugging, and power cross-check anomalies.
        </p>

        <div className="hero-actions">
          <button className="btn-primary-glow" onClick={onLaunchAudit}>
            <Search size={18} /> Run Forensic Audit Engine <ChevronRight size={16} />
          </button>
          <button className="btn-secondary-glass" onClick={onExplore3D}>
            <Activity size={18} /> View 3D Plant Digital Twin
          </button>
        </div>

        <div className="hero-stats-grid">
          <div className="hero-stat-card">
            <div className="stat-value warning">83.4%</div>
            <div className="stat-label">Suspected Fabricated Telemetry In High-Pollution Clusters</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-value">19 Days</div>
            <div className="stat-label">Longest Detected Zero-Variance Flatline (Surat Dyes)</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-value">3.2x</div>
            <div className="stat-label">Higher Fraud Odds During Night Shifts & Rain Events</div>
          </div>
        </div>
      </div>
    </section>
  );
}
