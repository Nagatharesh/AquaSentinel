import React from 'react';
import { Search, Filter } from 'lucide-react';
import './MapFilterBar.css';

export function MapFilterBar({
  searchTerm,
  setSearchTerm,
  selectedBand,
  setSelectedBand,
  selectedTown,
  setSelectedTown,
  selectedSector,
  setSelectedSector,
  townOptions = [],
  sectorOptions = [],
  totalCount = 0,
  filteredCount = 0
}) {
  return (
    <div className="map-filter-bar">
      <div className="map-search-box">
        <Search size={14} color="#64748b" />
        <input
          type="text"
          placeholder="Search by plant name, town, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="band-toggle-pills">
        <button
          type="button"
          className={`band-pill-btn ${selectedBand === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedBand('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`band-pill-btn ${selectedBand === 'red' ? 'active-red' : ''}`}
          onClick={() => setSelectedBand('red')}
        >
          High Anomaly (Red)
        </button>
        <button
          type="button"
          className={`band-pill-btn ${selectedBand === 'amber' ? 'active-amber' : ''}`}
          onClick={() => setSelectedBand('amber')}
        >
          Watch (Amber)
        </button>
        <button
          type="button"
          className={`band-pill-btn ${selectedBand === 'clear' ? 'active-green' : ''}`}
          onClick={() => setSelectedBand('clear')}
        >
          Clear (Green)
        </button>
      </div>

      <div className="map-filter-group">
        <Filter size={12} color="#94a3b8" />
        <span className="map-filter-label">Town:</span>
        <select
          className="map-select"
          value={selectedTown}
          onChange={(e) => setSelectedTown(e.target.value)}
        >
          <option value="all">All Towns</option>
          {townOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="map-filter-group">
        <span className="map-filter-label">Sector:</span>
        <select
          className="map-select"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
        >
          <option value="all">All Sectors</option>
          {sectorOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="map-count-badge">
        Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> plants
      </div>
    </div>
  );
}

export default MapFilterBar;
