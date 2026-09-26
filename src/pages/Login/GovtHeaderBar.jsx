import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import './GovtHeaderBar.css';

export function GovtHeaderBar() {
  return (
    <header className="govt-header-wrapper">
      <div className="tricolor-strip"></div>
      
      <div className="top-govt-bar">
        <div className="govt-title-text">
          <span>भारत सरकार | <strong>Government of India</strong></span>
          <span style={{ margin: '0 8px', color: '#475569' }}>|</span>
          <span>पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय | <strong>MoEFCC</strong></span>
        </div>

        <div className="accessibility-tools">
          <button className="tool-btn">Skip to main content</button>
          <button className="tool-btn">A-</button>
          <button className="tool-btn">A</button>
          <button className="tool-btn">A+</button>
          <button className="tool-btn">हिंदी / English</button>
        </div>
      </div>

      <div className="main-agency-bar">
        <div className="agency-brand">
          <div className="emblem-icon-box">GOI</div>
          <div className="agency-titles">
            <span className="agency-name-main">Central & State Pollution Control Boards (CPCB / SPCB)</span>
            <span className="agency-subtext">Online Continuous Effluent Monitoring System (OCEMS) — Data Forensics Network</span>
          </div>
        </div>

        <div className="header-status-badge">
          <span className="pulse-green"></span>
          <span>OCEMS AUDIT GATEWAY: ACTIVE</span>
        </div>
      </div>
    </header>
  );
}
