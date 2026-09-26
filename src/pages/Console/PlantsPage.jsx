import React, { useState } from 'react';
import { EXTENDED_PLANTS_DATA } from '../../data/extendedPlantsData';
import { MiniAnomalyGraph } from '../../components/ui/MiniAnomalyGraph';
import { Search, LayoutGrid, List, ChevronRight } from 'lucide-react';
import './PlantsPage.css';

export function PlantsPage({ onOpenPlant }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [bandFilter, setBandFilter] = useState('all');
  const [townFilter, setTownFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const getBandInfo = (band) => {
    switch (band) {
      case 'red': return { tagClass: 't-red', label: 'Act now' };
      case 'amber': return { tagClass: 't-amber', label: 'Look into' };
      case 'clear': return { tagClass: 't-green', label: 'Nothing found' };
      default: return { tagClass: 't-grey', label: "Can't check" };
    }
  };

  const filteredPlants = EXTENDED_PLANTS_DATA.filter((plant) => {
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.town.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plant.cluster && plant.cluster.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesSector = sectorFilter === 'all' || plant.sector === sectorFilter;
    const matchesBand = bandFilter === 'all' || plant.band === bandFilter;
    const matchesTown = townFilter === 'all' || plant.town === townFilter;

    return matchesSearch && matchesSector && matchesBand && matchesTown;
  });

  const sectors = Array.from(new Set(EXTENDED_PLANTS_DATA.map((p) => p.sector)));
  const towns = Array.from(new Set(EXTENDED_PLANTS_DATA.map((p) => p.town)));

  const actNowCount = EXTENDED_PLANTS_DATA.filter(p => p.band === 'red').length;
  const lookIntoCount = EXTENDED_PLANTS_DATA.filter(p => p.band === 'amber').length;
  const clearedCount = EXTENDED_PLANTS_DATA.filter(p => p.band === 'clear').length;

  return (
    <div className="plants-container">
      {/* KPI Summary Cards */}
      <div className="plants-kpi-bar">
        <div className={`kpi-card ${bandFilter === 'all' ? 'active' : ''}`} onClick={() => setBandFilter('all')}>
          <span className="kpi-card-lbl">Total Units Catalogued</span>
          <span className="kpi-card-val">892</span>
          <span className="kpi-card-sub">TNPCB Register</span>
        </div>
        <div className={`kpi-card ${bandFilter === 'red' ? 'active' : ''}`} onClick={() => setBandFilter('red')}>
          <span className="kpi-card-lbl">Act Now (Critical)</span>
          <span className="kpi-card-val act-now">{actNowCount}</span>
          <span className="kpi-card-sub">Immediate Anomaly</span>
        </div>
        <div className={`kpi-card ${bandFilter === 'amber' ? 'active' : ''}`} onClick={() => setBandFilter('amber')}>
          <span className="kpi-card-lbl">Look Into (Watchlist)</span>
          <span className="kpi-card-val look-into">{lookIntoCount}</span>
          <span className="kpi-card-sub">Statistical Deviation</span>
        </div>
        <div className={`kpi-card ${bandFilter === 'clear' ? 'active' : ''}`} onClick={() => setBandFilter('clear')}>
          <span className="kpi-card-lbl">Nothing Found</span>
          <span className="kpi-card-val cleared">{clearedCount}</span>
          <span className="kpi-card-sub">Verified Compliant</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-card-lbl">Unmonitored Pool</span>
          <span className="kpi-card-val unmonitored">287</span>
          <span className="kpi-card-sub">Random Audit Baseline</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="plants-controls-bar">
        <div className="controls-row-top">
          <div className="search-box-wrapper">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="plants-search-input"
              placeholder="Search real facilities (e.g. Sree Murugan, Kongu Knit, Ranipet Tannery, TN-CD-0601)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="view-toggle-btns">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={14} /> Cards
            </button>
            <button
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <List size={14} /> Table
            </button>
          </div>
        </div>

        <div className="controls-row-filters">
          <select 
            className="filter-select" 
            value={townFilter} 
            onChange={(e) => setTownFilter(e.target.value)}
          >
            <option value="all">All Towns ({towns.length} Industrial Hubs)</option>
            {towns.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select 
            className="filter-select" 
            value={sectorFilter} 
            onChange={(e) => setSectorFilter(e.target.value)}
          >
            <option value="all">All Sectors ({sectors.length} Categories)</option>
            {sectors.map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>

          <select 
            className="filter-select" 
            value={bandFilter} 
            onChange={(e) => setBandFilter(e.target.value)}
          >
            <option value="all">All Standing Bands</option>
            <option value="red">Act now (Critical)</option>
            <option value="amber">Look into (Watchlist)</option>
            <option value="clear">Nothing found (Compliant)</option>
          </select>
        </div>
      </div>

      {/* Main Content View */}
      {viewMode === 'grid' ? (
        <div className="plants-grid-view">
          {filteredPlants.map((plant) => {
            const { tagClass, label } = getBandInfo(plant.band);
            return (
              <div key={plant.id} className="plant-card" onClick={() => onOpenPlant(plant.id)}>
                <div>
                  <div className="plant-card-top">
                    <div>
                      <div className="plant-card-title">{plant.name}</div>
                      <div className="plant-card-sub">{plant.id} • {plant.town}</div>
                    </div>
                    <span className={`tag ${tagClass}`}>{label}</span>
                  </div>

                  <div className="plant-card-details">
                    <div>
                      <div className="detail-item-lbl">Sector</div>
                      <div className="detail-item-val">{plant.sector}</div>
                    </div>
                    <div>
                      <div className="detail-item-lbl">Cluster</div>
                      <div className="detail-item-val">{plant.cluster || 'Standalone'}</div>
                    </div>
                    <div>
                      <div className="detail-item-lbl">Agency</div>
                      <div className="detail-item-val">{plant.vendor}</div>
                    </div>
                    <div>
                      <div className="detail-item-lbl">Uptime</div>
                      <div className="detail-item-val">{plant.uptime}%</div>
                    </div>
                  </div>

                  <div className="plant-card-sparkline">
                    <span className="sparkline-lbl">28-Day Telemetry Signal</span>
                    <MiniAnomalyGraph isFlat={plant.band === 'red'} width={280} height={26} />
                  </div>
                </div>

                <div className="plant-card-footer">
                  <span className="kpi-card-sub">Param: {plant.param}</span>
                  <button className="btn-open-plant" onClick={(e) => { e.stopPropagation(); onOpenPlant(plant.id); }}>
                    View Profile <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="panel">
          <div className="panel-h">
            <h2>Registered Facilities Directory ({filteredPlants.length} Listed)</h2>
          </div>
          <div className="scroll">
            <table>
              <thead>
                <tr>
                  <th>Plant & Registration ID</th>
                  <th>Town</th>
                  <th>Industrial Sector</th>
                  <th>Cluster / Belt</th>
                  <th>Empaneled Agency</th>
                  <th>28-Day Telemetry</th>
                  <th>Standing</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filteredPlants.map((plant) => {
                  const { tagClass, label } = getBandInfo(plant.band);
                  return (
                    <tr key={plant.id} className="click" onClick={() => onOpenPlant(plant.id)}>
                      <td>
                        <b>{plant.name}</b>
                        <div className="muted mono">{plant.id}</div>
                      </td>
                      <td><b>{plant.town}</b></td>
                      <td>{plant.sector}</td>
                      <td>{plant.cluster || 'Standalone'}</td>
                      <td>{plant.vendor}</td>
                      <td>
                        <MiniAnomalyGraph isFlat={plant.band === 'red'} width={130} height={20} />
                      </td>
                      <td>
                        <span className={`tag ${tagClass}`}><span className="dot" />{label}</span>
                      </td>
                      <td>
                        <button className="btn" onClick={(e) => { e.stopPropagation(); onOpenPlant(plant.id); }}>
                          Profile
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Context Note */}
      <div className="plants-footer-note">
        <strong>Unmonitored Unit Policy (287 units):</strong> Facilities without independent electricity metering on effluent equipment are assigned to randomized physical inspections to maintain equal enforcement probability across Tamil Nadu.
      </div>
    </div>
  );
}
