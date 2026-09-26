import React from 'react';
import { Zap, Droplets, Gauge } from 'lucide-react';
import './CrossCheckMetrics.css';

export function CrossCheckMetrics() {
  return (
    <section className="metrics-container" id="tn-clusters">
      <div className="metrics-header">
        <div className="metrics-tag">TAMIL NADU MULTI-SOURCE EVIDENCE CORRELATION</div>
        <h2 className="metrics-title">Validating Monitored Streams in TN Industrial Hubs</h2>
        <p className="metrics-desc">
          AquaSentinel cross-references reported OCEMS values against electricity meters, production capacity, and river gauge telemetry.
        </p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-header">
            <div className="metric-card-title">
              <Zap size={18} color="#0284c7" /> Tiruppur Textile CETP ZLD Power
            </div>
            <span className="status-badge-alert">POWER DISCREPANCY</span>
          </div>
          <div className="metric-comparison-row">
            <span className="metric-label">Reported Dye Effluent Volume:</span>
            <span className="metric-val">3,400 m³/day</span>
          </div>
          <div className="metric-comparison-row">
            <span className="metric-label">Reverse Osmosis (RO) Power:</span>
            <span className="metric-val flagged">18.2 kWh (Idle Draw)</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '88%' }}></div>
          </div>
          <div className="metric-summary-note">
            ⚡ <strong>Tiruppur Forensic Alert:</strong> High probability of Zero Liquid Discharge (ZLD) bypass. RO high-pressure pumps operated at idle power while dyeing peak output reported 100% processing.
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <div className="metric-card-title">
              <Droplets size={18} color="#0284c7" /> Ranipet Tannery River Telemetry
            </div>
            <span className="status-badge-alert">RIVER SPIKE DETECTED</span>
          </div>
          <div className="metric-comparison-row">
            <span className="metric-label">Plant Reported Total Chromium:</span>
            <span className="metric-val">0.12 mg/L (Normal)</span>
          </div>
          <div className="metric-comparison-row">
            <span className="metric-label">Palar River Downstream Gauge:</span>
            <span className="metric-val flagged">8.40 mg/L (Spike)</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '94%' }}></div>
          </div>
          <div className="metric-summary-note">
            🌊 <strong>Ranipet Forensic Alert:</strong> 70x Chromium spike in downstream river gauge during 02:00-05:00 window coinciding with plant's logged "maintenance outage".
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <div className="metric-card-title">
              <Gauge size={18} color="#0284c7" /> Cuddalore SIPCOT Chemical Hub
            </div>
            <span className="status-badge-alert">CTO HUGGING</span>
          </div>
          <div className="metric-comparison-row">
            <span className="metric-label">TNPCB Consent (CTO) BOD Limit:</span>
            <span className="metric-val">30.0 mg/L</span>
          </div>
          <div className="metric-comparison-row">
            <span className="metric-label">95th Percentile Reported BOD:</span>
            <span className="metric-val flagged">29.82 mg/L</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '98%' }}></div>
          </div>
          <div className="metric-summary-note">
            🎯 <strong>Cuddalore Forensic Alert:</strong> 6 straight weeks of readings artificial clustering in a 0.18 mg/L margin directly below legal threshold during 2x production expansion.
          </div>
        </div>
      </div>
    </section>
  );
}
