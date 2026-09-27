import { useEffect } from 'react';

const ESRI_SATELLITE_TILE_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

export function useSatelliteImagery(map, isMapLoaded, activeMode = 'vector') {
  useEffect(() => {
    if (!map || !isMapLoaded) return;

    // Ensure Esri Satellite Source is added to MapLibre
    if (!map.getSource('esri-satellite-source')) {
      map.addSource('esri-satellite-source', {
        type: 'raster',
        tiles: [ESRI_SATELLITE_TILE_URL],
        tileSize: 256,
        attribution: 'Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN'
      });

      // Insert raster layer below labels if possible
      map.addLayer(
        {
          id: 'esri-satellite-layer',
          type: 'raster',
          source: 'esri-satellite-source',
          paint: {
            'raster-opacity': 0
          }
        }
      );
    }

    // Toggle layer opacities depending on selected satellite view mode
    if (map.getLayer('esri-satellite-layer')) {
      if (activeMode === 'satellite') {
        map.setPaintProperty('esri-satellite-layer', 'raster-opacity', 1.0);
      } else if (activeMode === 'spectral') {
        map.setPaintProperty('esri-satellite-layer', 'raster-opacity', 0.85);
      } else {
        map.setPaintProperty('esri-satellite-layer', 'raster-opacity', 0.0);
      }
    }
  }, [map, isMapLoaded, activeMode]);
}

export default useSatelliteImagery;
