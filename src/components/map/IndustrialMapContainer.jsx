import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import { config } from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import { TN_MAP_CENTER } from '../../utils/plantCoordinates';
import { SatelliteLayerControl } from './SatelliteLayerControl';
import { useSatelliteImagery } from '../../hooks/useSatelliteImagery';
import './IndustrialMapContainer.css';
import './MapcnMap.css';
import './PlantMarkerGroup.css';

// Configure Web Worker URL for MapLibre GL in Vite
config.WORKER_URL = maplibreWorkerUrl;

// Fail-proof Vercel-compatible Dark Map Style definition
const DARK_MAP_STYLE = {
  version: 8,
  sources: {
    'carto-dark-source': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
      ],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }
  },
  layers: [
    {
      id: 'carto-dark-layer',
      type: 'raster',
      source: 'carto-dark-source',
      minzoom: 0,
      maxzoom: 22
    }
  ]
};

export function IndustrialMapContainer({
  plants = [],
  selectedPlantId = null,
  onSelectPlant = () => {},
  onOpenSatelliteDrawer = () => {},
  height = '100%'
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [activeMapMode, setActiveMapMode] = useState('vector');

  // Initialize MapLibre GL map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: DARK_MAP_STYLE,
      center: [TN_MAP_CENTER.lng, TN_MAP_CENTER.lat],
      zoom: TN_MAP_CENTER.zoom,
      pitch: 30,
      attributionControl: true
    });

    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
    mapRef.current = map;

    // Suppress unhandled tile errors on Vercel
    map.on('error', (e) => {
      console.warn('MapLibre GL tile notice:', e);
    });

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

  // Hook for real satellite imagery blending (Esri raster tiles)
  useSatelliteImagery(mapRef.current, isMapLoaded, activeMapMode);

  // Update Plant Markers on Map
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    plants.forEach((plant) => {
      if (!plant.lat || !plant.lng) return;

      const el = document.createElement('div');
      el.className = 'custom-plant-marker';

      const bandClass = plant.band === 'red' ? 'marker-pin-red' : plant.band === 'amber' ? 'marker-pin-amber' : 'marker-pin-green';
      const pulseClass = plant.band === 'red' ? 'pulse-red' : plant.band === 'amber' ? 'pulse-amber' : '';

      el.innerHTML = `
        ${pulseClass ? `<div class="marker-pulse-ring ${pulseClass}"></div>` : ''}
        <div class="marker-pin-inner ${bandClass}"></div>
      `;

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
          <div class="map-popup-actions">
            <button id="inspect-btn-${plant.id}" class="map-popup-btn">
              Inspect Telemetry
            </button>
            <button id="sat-btn-${plant.id}" class="map-popup-sat-btn">
              🛰️ Satellite AI Analysis
            </button>
          </div>
        </div>
      `;

      const popup = new maplibregl.Popup({ offset: 15, closeButton: true }).setHTML(popupHtml);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([plant.lng, plant.lat])
        .setPopup(popup)
        .addTo(map);

      popup.on('open', () => {
        const btn = document.getElementById(`inspect-btn-${plant.id}`);
        if (btn) {
          btn.onclick = () => onSelectPlant(plant.id);
        }
        const satBtn = document.getElementById(`sat-btn-${plant.id}`);
        if (satBtn) {
          satBtn.onclick = () => onOpenSatelliteDrawer(plant.id);
        }
      });

      markersRef.current.push(marker);
    });
  }, [plants, isMapLoaded, onSelectPlant, onOpenSatelliteDrawer]);

  // Fly to selected plant when selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedPlantId) return;

    const selected = plants.find((p) => p.id === selectedPlantId);
    if (selected && selected.lat && selected.lng) {
      map.flyTo({
        center: [selected.lng, selected.lat],
        zoom: 14,
        pitch: 45,
        speed: 1.2
      });
    }
  }, [selectedPlantId, plants]);

  return (
    <div className="industrial-map-wrapper" style={{ height }}>
      <SatelliteLayerControl
        activeMode={activeMapMode}
        onChangeMode={setActiveMapMode}
      />
      <div ref={mapContainerRef} className="mapcn-canvas-viewport" />
    </div>
  );
}

export default IndustrialMapContainer;
