import React from 'react';
import './MiniAnomalyGraph.css';

export function MiniAnomalyGraph({ plantId, band }) {
  const isRed = band === 'red';
  const color = isRed ? '#dc2626' : band === 'amber' ? '#b45309' : '#16a34a';

  // Generate 20 point curve unique to plant
  const points = Array.from({ length: 20 }, (_, i) => {
    let y = 14;
    if (plantId === 'TN-ER-0412' && i >= 6 && i <= 16) {
      y = 14; // Flatline
    } else if (plantId === 'TN-TP-0088' && (i === 3 || i === 9 || i === 15)) {
      y = 26; // Offline gap
    } else if (plantId === 'TN-ER-0377' && i >= 5) {
      y = 5; // Hugging limit ceiling
    } else {
      y = 14 + Math.sin(i * 0.9) * 10;
    }
    return { x: (i / 19) * 140, y };
  });

  const pathD = points.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');

  return (
    <div className="mini-graph-wrapper" title={`28-day anomaly trend (${plantId})`}>
      <svg viewBox="0 0 140 28" className="mini-graph-svg">
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
