import React from 'react';
import { Layers, Globe, Eye, Flame } from 'lucide-react';
import './SatelliteLayerControl.css';

export function SatelliteLayerControl({ activeMode = 'vector', onChangeMode }) {
  return (
    <div className="satellite-layer-control-container">
      <div className="satellite-layer-title">
        <Layers size={13} className="satellite-icon" /> Map View Engine
      </div>
      <div className="satellite-layer-buttons">
        <button
          className={`satellite-mode-btn ${activeMode === 'vector' ? 'active' : ''}`}
          onClick={() => onChangeMode('vector')}
          title="Dark Matter GPU Vector GIS Map"
        >
          <Globe size={13} />
          <span>Dark Vector</span>
        </button>

        <button
          className={`satellite-mode-btn ${activeMode === 'satellite' ? 'active' : ''}`}
          onClick={() => onChangeMode('satellite')}
          title="High-Resolution Real Satellite Imagery (Esri World Imagery)"
        >
          <Eye size={13} />
          <span>Real Satellite</span>
        </button>

        <button
          className={`satellite-mode-btn ${activeMode === 'spectral' ? 'active' : ''}`}
          onClick={() => onChangeMode('spectral')}
          title="Sentinel-2 NDWI / Thermal Effluent Anomaly Plume"
        >
          <Flame size={13} />
          <span>Spectral Anomaly</span>
        </button>
      </div>
    </div>
  );
}

export default SatelliteLayerControl;
