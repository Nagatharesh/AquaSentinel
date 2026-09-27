import React from 'react';
import { Info } from 'lucide-react';
import './MapLegend.css';

export function MapLegend() {
  return (
    <div className="map-legend-floating">
      <div className="legend-title">
        <Info size={12} color="#38bdf8" /> Anomaly Risk Score
      </div>
      <div className="legend-item">
        <span className="legend-dot legend-dot-red"></span>
        <span>High Anomaly (80–100)</span>
      </div>
      <div className="legend-item">
        <span className="legend-dot legend-dot-amber"></span>
        <span>Watchlist (50–79)</span>
      </div>
      <div className="legend-item">
        <span className="legend-dot legend-dot-green"></span>
        <span>Compliant (&lt;50)</span>
      </div>
    </div>
  );
}

export default MapLegend;
