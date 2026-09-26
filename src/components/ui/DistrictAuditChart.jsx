import React, { useState } from 'react';
import './DistrictAuditChart.css';

export function DistrictAuditChart({ onCategoryClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    { label: 'Act now', count: 24, pct: 2.7, color: '#dc2626', key: 'list' },
    { label: 'Look into', count: 79, pct: 8.9, color: '#b45309', key: 'list' },
    { label: 'Nothing found', count: 502, pct: 56.3, color: '#16a34a', key: 'list' },
    { label: "Can't check", count: 287, pct: 32.2, color: '#64748b', key: 'cov' }
  ];

  const total = 892;
  const radius = 60;
  const circumference = 2 * Math.PI * radius; // ~376.99

  let accumulatedPct = 0;

  return (
    <div className="district-chart-card">
      <div className="donut-wrapper">
        <svg viewBox="0 0 160 160" className="donut-svg">
          {categories.map((cat, idx) => {
            const strokeDasharray = `${(cat.pct / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPct / 100) * circumference);
            accumulatedPct += cat.pct;

            return (
              <circle
                key={idx}
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke={cat.color}
                strokeWidth="20"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="donut-segment"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onCategoryClick && onCategoryClick(cat.key)}
              />
            );
          })}
        </svg>

        <div className="donut-center-info">
          <div className="donut-center-num">
            {hoveredIndex !== null ? categories[hoveredIndex].count : total}
          </div>
          <div className="donut-center-label">
            {hoveredIndex !== null ? categories[hoveredIndex].label : 'Total Plants'}
          </div>
        </div>
      </div>
    </div>
  );
}
