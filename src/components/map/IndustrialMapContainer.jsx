import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import { config } from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import { TN_MAP_CENTER } from '../../utils/plantCoordinates';
import './IndustrialMapContainer.css';
import './MapcnMap.css';
import './PlantMarkerGroup.css';

// Configure Web Worker URL for MapLibre GL in Vite
config.WORKER_URL = maplibreWorkerUrl;

// CartoDB Dark Matter GL Vector Style (100% Free Vector Map, Zero Rate Limits, Ultra Smooth GPU WebGL)
const MAPCN_DARK_VECTOR_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export function IndustrialMapContainer({
  plants = [],
  selectedPlantId = null,
  onSelectPlant = () => {},
  height = '100%'
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize MapLibre GL map instance (mapcn pattern)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAPCN_DARK_VECTOR_STYLE,
      center: [TN_MAP_CENTER.lng, TN_MAP_CENTER.lat],
      zoom: TN_MAP_CENTER.zoom,
      pitch: 30, // 3D Tilt angle for dynamic mapcn visual depth
      attributionControl: true
    });

    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
    mapRef.current = map;

    const onStyleLoad = () => setIsMapLoaded(true);
    map.on('load', onStyleLoad);
    if (map.isStyleLoaded()) {
      setIsMapLoaded(true);
    }

    return () => {
      map.off('load', onStyleLoad);
      map.remove();
    };
  }, []);

  // Update Plant Markers on Map
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    plants.forEach((plant) => {
      if (!plant.lat || !plant.lng) return;

      // Create Custom Animated HTML Pin (mapcn Marker)
      const el = document.createElement('div');
      el.className = 'custom-plant-marker';

      const bandClass = plant.band === 'red' ? 'marker-pin-red' : plant.band === 'amber' ? 'marker-pin-amber' : 'marker-pin-green';
      const pulseClass = plant.band === 'red' ? 'pulse-red' : plant.band === 'amber' ? 'pulse-amber' : '';

      el.innerHTML = `
        ${pulseClass ? `<div class="marker-pulse-ring ${pulseClass}"></div>` : ''}
        <div class="marker-pin-inner ${bandClass}"></div>
      `;

      // Popup content
      const popupHtml = `
        <div class="map-popup-card">
          <div class="map-popup-header">
            <span class="map-popup-title">${plant.name}</span>
            <span class="map-popup-tag tag-${plant.band || 'clear'}">${plant.band}</span>
          </div>
          <div class="map-popup-detail">
            <span>Town: <strong>${plant.town}</strong></span>
            <span>Score: <strong>${plant.score}/100</strong></span>
          </div>
          <div class="map-popup-detail">
            <span>Sector: <strong>${plant.sector}</strong></span>
            <span>Cluster: <strong>${plant.cluster || '—'}</strong></span>
          </div>
          ${plant.reason ? `<div class="map-popup-reason">${plant.reason}</div>` : ''}
          <button id="inspect-btn-${plant.id}" class="map-popup-btn">
            Inspect Plant Telemetry
          </button>
        </div>
      `;

      const popup = new maplibregl.Popup({ offset: 15, closeButton: true })
        .setHTML(popupHtml);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([plant.lng, plant.lat])
        .setPopup(popup)
        .addTo(map);

      // Attach button listener inside popup
      popup.on('open', () => {
        const btn = document.getElementById(`inspect-btn-${plant.id}`);
        if (btn) {
          btn.onclick = () => onSelectPlant(plant.id);
        }
      });

      markersRef.current.push(marker);
    });
  }, [plants, isMapLoaded, onSelectPlant]);

  // Fly to selected plant when selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedPlantId) return;

    const selected = plants.find((p) => p.id === selectedPlantId);
    if (selected && selected.lat && selected.lng) {
      map.flyTo({
        center: [selected.lng, selected.lat],
        zoom: 13,
        pitch: 45,
        speed: 1.2
      });
    }
  }, [selectedPlantId, plants]);

  return (
    <div className="industrial-map-wrapper" style={{ height }}>
      <div ref={mapContainerRef} className="mapcn-canvas-viewport" />
    </div>
  );
}

export default IndustrialMapContainer;
