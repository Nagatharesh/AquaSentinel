import React from 'react';
import { GovtHeaderBar } from './GovtHeaderBar';
import { GovtOfficerCard } from './GovtOfficerCard';
import { GovtFooter } from './GovtFooter';
import './GovtLoginPage.css';

export function GovtLoginPage({ onLoginSuccess }) {
  return (
    <div className="govt-login-page">
      <GovtHeaderBar />
      
      <main className="govt-hero-section">
        <div className="portal-welcome-box">
          <div className="portal-emblem-seal">OFFICIAL REGULATORY GATEWAY</div>
          <h1 className="portal-main-heading">
            Industrial Effluent Data <span>Integrity & Forensics</span>
          </h1>
          <p className="portal-desc-text">
            Centralized continuous monitoring audit network detecting data fabrication, flatlines, and threshold manipulation across registered industrial facilities in India.
          </p>

          <div className="stats-bar-mini">
            <div className="mini-stat">
              <div className="mini-stat-num">4,820+</div>
              <div className="mini-stat-label">Monitored Facilities</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-num" style={{ color: '#ff4757' }}>142</div>
              <div className="mini-stat-label">High-Risk Flags Today</div>
            </div>
          </div>
        </div>

        <GovtOfficerCard onLoginSuccess={onLoginSuccess} />
      </main>

      <GovtFooter />
    </div>
  );
}
