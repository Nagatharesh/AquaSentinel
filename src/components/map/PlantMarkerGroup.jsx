import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import './PlantMarkerGroup.css';

function createCustomIcon(band, score) {
  const pulseClass = band === 'red' ? 'pulse-red' : band === 'amber' ? 'pulse-amber' : '';
  const bandClass = band === 'red' ? 'marker-pin-red' : band === 'amber' ? 'marker-pin-amber' : 'marker-pin-green';

  const html = `
    <div class="custom-plant-marker">
      ${pulseClass ? `<div class="marker-pulse-ring ${pulseClass}"></div>` : ''}
      <div class="marker-pin-inner ${bandClass}"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'leaflet-div-icon-custom',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14]
  });
}

export function PlantMarkerGroup({ plants, onSelectPlant }) {
  if (!plants || plants.length === 0) return null;

  return (
    <>
      {plants.map((plant) => {
        if (!plant.lat || !plant.lng) return null;

        const icon = createCustomIcon(plant.band, plant.score);
        const tagClass = `map-popup-tag tag-${plant.band || 'clear'}`;

        return (
          <Marker
            key={plant.id}
            position={[plant.lat, plant.lng]}
            icon={icon}
          >
            <Popup closeButton={true} autoPan={true}>
              <div className="map-popup-card">
                <div className="map-popup-header">
                  <span className="map-popup-title">{plant.name}</span>
                  <span className={tagClass}>{plant.band}</span>
                </div>
                <div className="map-popup-detail">
                  <span>Town: <strong>{plant.town}</strong></span>
                  <span>Score: <strong>{plant.score}/100</strong></span>
                </div>
                <div className="map-popup-detail">
                  <span>Sector: <strong>{plant.sector}</strong></span>
                  <span>Cluster: <strong>{plant.cluster || '—'}</strong></span>
                </div>
                {plant.reason && (
                  <div className="map-popup-reason">
                    {plant.reason}
                  </div>
                )}
                <button
                  type="button"
                  className="map-popup-btn"
                  onClick={() => onSelectPlant(plant.id)}
                >
                  <ShieldAlert size={12} /> Inspect Plant Telemetry <ExternalLink size={11} />
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default PlantMarkerGroup;
