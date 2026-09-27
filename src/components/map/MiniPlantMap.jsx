import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import { config } from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import { MapPin } from 'lucide-react';
import { enrichPlantWithCoordinates } from '../../utils/plantCoordinates';
import './MiniPlantMap.css';
import './MapcnMap.css';

config.WORKER_URL = maplibreWorkerUrl;

const MAPCN_DARK_VECTOR_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export function MiniPlantMap({ plant }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  const loc = plant ? (plant.lat && plant.lng ? plant : enrichPlantWithCoordinates(plant)) : null;

  useEffect(() => {
    if (!containerRef.current || !loc) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAPCN_DARK_VECTOR_STYLE,
      center: [loc.lng, loc.lat],
      zoom: 12,
      pitch: 20,
      interactive: false,
      attributionControl: false
    });

    // Custom mini marker
    const el = document.createElement('div');
    const bg = loc.band === 'red' ? '#ef4444' : loc.band === 'amber' ? '#f59e0b' : '#10b981';
    el.innerHTML = `<div style="width: 16px; height: 16px; background: ${bg}; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${bg};"></div>`;

    new maplibregl.Marker({ element: el })
      .setLngLat([loc.lng, loc.lat])
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [loc?.lat, loc?.lng, loc?.band]);

  if (!plant || !loc) return null;

  return (
    <div className="mini-map-card">
      <div className="mini-map-header">
        <span><MapPin size={12} color="#38bdf8" /> Geolocation (mapcn vector)</span>
        <span className="mini-map-coordinates">{loc.lat}° N, {loc.lng}° E</span>
      </div>
      <div className="mini-map-viewport">
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default MiniPlantMap;
