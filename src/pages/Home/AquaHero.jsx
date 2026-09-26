import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import './AquaHero.css';

export function AquaHero({ onOpenLogin }) {
  return (
    <section className="aqua-hero" id="overview">
      <div className="aqua-hero-glass-card">
        <div className="hero-pill-badge">
          <MapPin size={14} /> TAMIL NADU INDUSTRIAL EFFLUENT AUDIT PLATFORM
        </div>

        <h1 className="hero-heading">
          Auditing Tamil Nadu Industrial Discharge Telemetry <br />
          For <span className="hero-heading-gradient">Signs of Data Fabrication</span>
        </h1>

        <p className="hero-subtext">
          AquaSentinel audits real-time OCEMS streams across Tiruppur Textile Dyeing, Ranipet Tanneries, 
          Cuddalore Chemical Complex, and Manali Petrochemical clusters to generate prioritized inspection itineraries for TNPCB field officers.
        </p>

        <button className="btn-hero-login" onClick={onOpenLogin}>
          TNPCB Officer Access / Login <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
