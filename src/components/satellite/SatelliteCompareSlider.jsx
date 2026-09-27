import React, { useState } from 'react';
import { Sliders, Calendar } from 'lucide-react';
import './SatelliteCompareSlider.css';

export function SatelliteCompareSlider({ compareData }) {
  const [sliderPos, setSliderPos] = useState(50);

  if (!compareData) return null;

  const handleSliderChange = (e) => {
    setSliderPos(e.target.value);
  };

  return (
    <div className="satellite-compare-wrapper">
      <div className="satellite-compare-header">
        <span className="satellite-compare-title">
          <Sliders size={14} className="compare-icon" /> Temporal Satellite Comparison
        </span>
        <span className="satellite-overlay-tag">{compareData.overlayType}</span>
      </div>

      <div className="satellite-compare-viewport">
        {/* Baseline Background Image (Underneath) */}
        <img
          src={compareData.baselineUrl}
          alt="Baseline Satellite Capture"
          className="compare-img baseline-img"
        />

        {/* Current Satellite Image (Overlaid & Seamlessly Clipped for 100% Spatial Sync) */}
        <img
          src={compareData.currentUrl}
          alt="Current Sentinel Pass"
          className="compare-img current-img"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        />

        {/* Vertical Divider Handle Line */}
        <div
          className="compare-divider-handle"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="divider-line"></div>
          <div className="divider-badge">↔</div>
        </div>

        {/* Dates Overlay Badges */}
        <div className="compare-badge baseline-badge">
          <Calendar size={11} /> {compareData.baselineDate}
        </div>
        <div className="compare-badge current-badge">
          <Calendar size={11} /> {compareData.currentDate}
        </div>

        {/* Interactive Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={handleSliderChange}
          className="compare-range-input"
          aria-label="Satellite Image Comparison Slider"
        />
      </div>
      <div className="compare-slider-footer-hint">
        Drag slider left/right to compare baseline vs. active spectral plume detection
      </div>
    </div>
  );
}

export default SatelliteCompareSlider;
