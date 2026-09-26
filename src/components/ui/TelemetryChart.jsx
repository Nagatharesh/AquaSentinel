import React from 'react';
import './TelemetryChart.css';

export function TelemetryChart({ plantId = 'TN-ER-0412', isFlat, param = 'pH / COD' }) {
  // Generate plant-specific 28-day telemetry curve
  const getPlantTelemetry = () => {
    switch (plantId) {
      case 'TN-ER-0412': // Sri Amman: Flatline freeze at 7.20
        return {
          title: '28-Day Telemetry: Zero-Variance Flatline (pH 7.20)',
          thresholdLabel: 'CTO Limit (30.0 mg/L)',
          color: '#dc2626',
          badgeText: 'FROZEN AT pH 7.20',
          badgeClass: 'legend-dot-flat',
          points: Array.from({ length: 28 }, (_, i) => {
            const isFlatZone = i >= 8 && i <= 24;
            const yVal = isFlatZone ? 45 : 30 + Math.sin(i * 0.9) * 35;
            return { x: (i / 27) * 400, y: 100 - yVal, isFlatZone, val: isFlatZone ? '7.20' : yVal.toFixed(1) };
          })
        };

      case 'TN-TP-0088': // Kongu Knit: Selective Outages on Peak Days
        return {
          title: '28-Day Telemetry: Selective Outages on Peak Days',
          thresholdLabel: 'Target Uptime (85%)',
          color: '#dc2626',
          badgeText: 'OUTAGE ON PEAK DAYS',
          badgeClass: 'legend-dot-flat',
          points: Array.from({ length: 28 }, (_, i) => {
            const isOffline = i === 4 || i === 5 || i === 11 || i === 12 || i === 18 || i === 19;
            const yVal = isOffline ? 0 : 55 + Math.sin(i * 1.2) * 30;
            return { x: (i / 27) * 400, y: 100 - yVal, isFlatZone: isOffline, val: isOffline ? 'OFFLINE' : yVal.toFixed(1) };
          })
        };

      case 'TN-KR-0219': // Cauvery Tanning: Power vs Removal Contradiction
        return {
          title: '28-Day Telemetry: Energy vs Removal Contradiction',
          thresholdLabel: 'Min Required Energy (486 kWh)',
          color: '#dc2626',
          badgeText: 'POWER DISCREPANCY',
          badgeClass: 'legend-dot-flat',
          points: Array.from({ length: 28 }, (_, i) => {
            const yVal = 85 + Math.sin(i * 0.6) * 10; // Reported COD removal high
            return { x: (i / 27) * 400, y: 100 - yVal, isFlatZone: true, val: `${yVal.toFixed(0)} kg/d` };
          })
        };

      case 'TN-ER-0377': // Bhavani Bleaching: Threshold Hugging
        return {
          title: '28-Day Telemetry: Threshold Hugging (29.8 mg/L)',
          thresholdLabel: 'CTO BOD Limit (30.0 mg/L)',
          color: '#b45309',
          badgeText: 'HUGGING 29.8 mg/L',
          badgeClass: 'legend-dot-amber',
          points: Array.from({ length: 28 }, (_, i) => {
            const isHugging = i >= 6;
            const yVal = isHugging ? 78 + (i % 2) * 1.5 : 35 + Math.sin(i * 0.8) * 30;
            return { x: (i / 27) * 400, y: 100 - yVal, isFlatZone: isHugging, val: yVal.toFixed(2) };
          })
        };

      case 'TN-TP-0143': // Noyyal Garment: Copy-Paste Duplicate Stretch
        return {
          title: '28-Day Telemetry: Byte-Identical Duplicate Period',
          thresholdLabel: 'CTO Limit (30.0 mg/L)',
          color: '#b45309',
          badgeText: 'DUPLICATE WAVE',
          badgeClass: 'legend-dot-amber',
          points: Array.from({ length: 28 }, (_, i) => {
            const wave = Math.sin((i % 4) * 1.5) * 30 + 50;
            return { x: (i / 27) * 400, y: 100 - wave, isFlatZone: i >= 14 && i <= 18, val: wave.toFixed(1) };
          })
        };

      case 'TN-CB-0501': // Sulur Metal: Low Volume / High Toxicity
        return {
          title: '28-Day Telemetry: Low Volume / High Chromium Risk',
          thresholdLabel: 'Safe Drinking Limit (0.05 mg/L)',
          color: '#b45309',
          badgeText: 'SHALLOW AQUIFER RISK',
          badgeClass: 'legend-dot-amber',
          points: Array.from({ length: 28 }, (_, i) => {
            const yVal = 20 + Math.sin(i * 0.5) * 8;
            return { x: (i / 27) * 400, y: 100 - yVal, isFlatZone: false, val: `${(yVal / 300).toFixed(2)} mg/L` };
          })
        };

      default: // Perundurai Paper / Salem Steel: Healthy Cleared Curve
        return {
          title: '28-Day Telemetry: Normal Operational Behaviour',
          thresholdLabel: 'CTO Limit (30.0 mg/L)',
          color: '#16a34a',
          badgeText: '100% HEALTHY FLUCTUATION',
          badgeClass: 'legend-dot-green',
          points: Array.from({ length: 28 }, (_, i) => {
            const yVal = 40 + Math.sin(i * 0.7) * 25 + Math.cos(i * 1.3) * 10;
            return { x: (i / 27) * 400, y: 100 - yVal, isFlatZone: false, val: yVal.toFixed(1) };
          })
        };
    }
  };

  const chartData = getPlantTelemetry();

  const pathD = chartData.points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L 400 100 L 0 100 Z`;

  return (
    <div className="telemetry-chart-container">
      <div className="chart-meta-row">
        <span className="chart-title-tag">{chartData.title}</span>
        <div className="chart-legend">
          <span className="legend-item">
            <span className={chartData.badgeClass || 'legend-dot-normal'} /> {chartData.badgeText}
          </span>
        </div>
      </div>

      <div className="svg-chart-wrapper">
        <svg viewBox="0 0 400 100" className="svg-chart" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${plantId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartData.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={chartData.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Legal CTO Threshold Reference Line */}
          <line x1="0" y1="20" x2="400" y2="20" className="threshold-line" />
          <text x="5" y="16" className="chart-axis-label" fill="#f59e0b">{chartData.thresholdLabel}</text>

          {/* Area Fill */}
          <path d={areaD} fill={`url(#grad-${plantId})`} />

          {/* Continuous Line */}
          <path d={pathD} fill="none" stroke={chartData.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {chartData.points.filter((_, idx) => idx % 3 === 0).map((pt, idx) => (
            <circle 
              key={idx} 
              cx={pt.x} 
              cy={pt.y} 
              r="3.5" 
              fill={pt.isFlatZone ? chartData.color : '#0284c7'} 
              stroke="#ffffff" 
              strokeWidth="1.5" 
            />
          ))}
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }} className="mono chart-axis-label">
        <span>Day 1</span>
        <span>Day 14 (Mid-Month)</span>
        <span>Day 28 (Today)</span>
      </div>
    </div>
  );
}
