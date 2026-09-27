import React, { useState, useMemo } from 'react';
import { Satellite, AlertTriangle, Eye, ShieldAlert, Sparkles } from 'lucide-react';
import { IndustrialMapContainer } from '../../components/map/IndustrialMapContainer';
import { SatelliteExplainDrawer } from '../../components/satellite/SatelliteExplainDrawer';
import { SATELLITE_ANOMALIES_DATA, getSatelliteAnomalyForPlant } from '../../data/satelliteAnomaliesData';
import { PLANTS_DATA } from '../../data/aquasentinalData';
import { EXTENDED_PLANTS_DATA } from '../../data/extendedPlantsData';
import { enrichPlantWithCoordinates } from '../../utils/plantCoordinates';
import './SatellitePage.css';

export function SatellitePage({ onOpenPlant }) {
  const [selectedAnomalyId, setSelectedAnomalyId] = useState('plant-tn-001');
  const [activeDrawerAnomaly, setActiveDrawerAnomaly] = useState(null);

  // All plants enriched with Tamil Nadu coordinates
  const allPlants = useMemo(() => {
    const rawList = [...PLANTS_DATA];
    EXTENDED_PLANTS_DATA.forEach((extP) => {
      if (!rawList.some((p) => p.id === extP.id)) {
        rawList.push(extP);
      }
    });
    return rawList.map((p, idx) => enrichPlantWithCoordinates(p, idx));
  }, []);

  const anomalyList = Object.values(SATELLITE_ANOMALIES_DATA);

  const handleSelectAnomaly = (plantId) => {
    setSelectedAnomalyId(plantId);
    const anomaly = getSatelliteAnomalyForPlant(plantId);
    setActiveDrawerAnomaly(anomaly);
  };

  return (
    <div className="satellite-page-container">
      {/* Top Meta Header Bar */}
      <div className="satellite-meta-bar">
        <div className="satellite-badge active-satellite">
          <Satellite size={14} /> Active Constellation: Sentinel-2B (MSI) & Landsat-9 (TIRS-2)
        </div>
        <div className="satellite-badge live-pass">
          <Sparkles size={14} /> Orbital Pass Cycle: Every 5 Days | Real Resolution: 10m Multispectral
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="satellite-content-grid">
        {/* Left Side: Satellite Anomaly Alerts List for Officers */}
        <div className="satellite-alerts-panel">
          <div className="alerts-panel-header">
            <ShieldAlert size={16} className="alert-header-icon" />
            <div>
              <h4 className="alerts-title">Orbital Anomaly Dossiers</h4>
              <span className="alerts-subtitle">Detected by multi-spectral optical & thermal sensors</span>
            </div>
          </div>

          <div className="anomaly-cards-list">
            {anomalyList.map((anom) => (
              <div
                key={anom.plantId}
                className={`anomaly-card ${selectedAnomalyId === anom.plantId ? 'selected' : ''}`}
                onClick={() => handleSelectAnomaly(anom.plantId)}
              >
                <div className="card-top">
                  <span className="anomaly-plant-name">{anom.plantName}</span>
                  <span className={`severity-tag ${anom.bandSeverity}`}>
                    Score {anom.overallAnomalyScore}/100
                  </span>
                </div>

                <div className="card-meta">
                  <span>Town: <strong>{anom.town}</strong></span>
                  <span>Sensor: <strong>{anom.satelliteSource}</strong></span>
                </div>

                <p className="card-summary-snippet">{anom.officerSummary}</p>

                <div className="card-footer-action">
                  <button className="card-action-btn">
                    <Eye size={13} /> View Officer Satellite Analysis
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: High-Res Real Satellite Map Viewport */}
        <div className="satellite-map-panel">
          <IndustrialMapContainer
            plants={allPlants}
            selectedPlantId={selectedAnomalyId}
            onSelectPlant={onOpenPlant}
            onOpenSatelliteDrawer={handleSelectAnomaly}
            height="100%"
          />
        </div>
      </div>

      {/* Officer Explanation Side Drawer */}
      {activeDrawerAnomaly && (
        <SatelliteExplainDrawer
          anomalyData={activeDrawerAnomaly}
          onClose={() => setActiveDrawerAnomaly(null)}
        />
      )}
    </div>
  );
}

export default SatellitePage;
