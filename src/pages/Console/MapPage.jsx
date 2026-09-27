import React, { useState, useMemo } from 'react';
import { Map, Layers } from 'lucide-react';
import { PLANTS_DATA } from '../../data/aquasentinalData';
import { EXTENDED_PLANTS_DATA } from '../../data/extendedPlantsData';
import { enrichPlantWithCoordinates } from '../../utils/plantCoordinates';
import { IndustrialMapContainer } from '../../components/map/IndustrialMapContainer';
import { MapFilterBar } from '../../components/map/MapFilterBar';
import { MapLegend } from '../../components/map/MapLegend';
import './MapPage.css';

export function MapPage({ onOpenPlant }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBand, setSelectedBand] = useState('all');
  const [selectedTown, setSelectedTown] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');

  // Consolidate & enrich plant data with real Tamil Nadu coordinates
  const allPlants = useMemo(() => {
    const rawList = [...PLANTS_DATA];
    EXTENDED_PLANTS_DATA.forEach((extP) => {
      if (!rawList.some((p) => p.id === extP.id)) {
        rawList.push(extP);
      }
    });
    return rawList.map((p, idx) => enrichPlantWithCoordinates(p, idx));
  }, []);

  // Filter options derived from dataset
  const townOptions = useMemo(() => {
    const set = new Set(allPlants.map((p) => p.town).filter(Boolean));
    return Array.from(set).sort();
  }, [allPlants]);

  const sectorOptions = useMemo(() => {
    const set = new Set(allPlants.map((p) => p.sector).filter(Boolean));
    return Array.from(set).sort();
  }, [allPlants]);

  // Apply active filters
  const filteredPlants = useMemo(() => {
    return allPlants.filter((plant) => {
      const matchesSearch =
        !searchTerm ||
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.town.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBand = selectedBand === 'all' || plant.band === selectedBand;
      const matchesTown = selectedTown === 'all' || plant.town === selectedTown;
      const matchesSector = selectedSector === 'all' || plant.sector === selectedSector;

      return matchesSearch && matchesBand && matchesTown && matchesSector;
    });
  }, [allPlants, searchTerm, selectedBand, selectedTown, selectedSector]);

  return (
    <div className="map-page-container">
      <div className="map-page-header-meta">
        <div className="map-page-title-badge">
          <Map size={13} /> Regional GIS Surveillance Grid (Tamil Nadu Industrial Corridors)
        </div>
        <div className="map-page-title-badge">
          <Layers size={13} /> Active Basemap: mapcn (MapLibre GL GPU Vector Engine)
        </div>
      </div>

      <MapFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedBand={selectedBand}
        setSelectedBand={setSelectedBand}
        selectedTown={selectedTown}
        setSelectedTown={setSelectedTown}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        townOptions={townOptions}
        sectorOptions={sectorOptions}
        totalCount={allPlants.length}
        filteredCount={filteredPlants.length}
      />

      <div className="map-viewport-wrapper">
        <IndustrialMapContainer
          plants={filteredPlants}
          onSelectPlant={onOpenPlant}
          height="100%"
        />
        <MapLegend />
      </div>
    </div>
  );
}

export default MapPage;
