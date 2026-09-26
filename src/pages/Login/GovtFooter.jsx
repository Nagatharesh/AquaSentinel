import React from 'react';
import './GovtFooter.css';

export function GovtFooter() {
  return (
    <footer className="govt-footer-container">
      <div className="govt-footer-inner">
        <div className="govt-footer-info">
          <div><span className="nic-tag">Designed, Developed and Hosted by National Informatics Centre (NIC)</span></div>
          <div>Content Owned and Maintained by Central Pollution Control Board (CPCB) | Ministry of Environment, Forest & Climate Change</div>
        </div>

        <div className="govt-footer-badges">
          <span className="cert-pill">CERT-In Security Certified</span>
          <span className="cert-pill">GIGW Compliant</span>
          <span className="cert-pill">v4.2.0-STQC</span>
        </div>
      </div>
    </footer>
  );
}
