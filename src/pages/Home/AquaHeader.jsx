import React from 'react';
import { Shield } from 'lucide-react';
import './AquaHeader.css';

export function AquaHeader({ onOpenLogin }) {
  return (
    <header className="aqua-header">
      <div className="aqua-brand">
        <div className="aqua-logo-symbol">
          <Shield size={20} />
        </div>
        <div className="aqua-brand-text">
          <span className="aqua-brand-name">AquaSentinel</span>
          <span className="aqua-brand-tag">Tamil Nadu Pollution Control Board (TNPCB)</span>
        </div>
      </div>

      <nav className="aqua-nav">
        <a href="#overview" className="aqua-nav-link">Overview</a>
        <a href="#tn-clusters" className="aqua-nav-link">TN Industrial Clusters</a>
        <a href="#audit-list" className="aqua-nav-link">Inspection Priority</a>
        <button className="btn-aqua-signin" onClick={onOpenLogin}>
          Officer Sign In
        </button>
      </nav>
    </header>
  );
}
