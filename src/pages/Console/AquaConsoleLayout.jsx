import React, { useState } from 'react';
import { AquaSidebar } from '../../components/layout/AquaSidebar';
import { AquaTopbar } from '../../components/layout/AquaTopbar';
import { PlantDrawer } from '../../components/ui/PlantDrawer';
import { PLANTS_DATA } from '../../data/aquasentinalData';
import { getPlantById } from '../../data/extendedPlantsData';

import { TodayPage } from './TodayPage';
import { InspectionListPage } from './InspectionListPage';
import { MapPage } from './MapPage';
import { FindingsPage } from './FindingsPage';
import { PlantsPage } from './PlantsPage';
import { ClustersPage } from './ClustersPage';
import { VendorsPage } from './VendorsPage';
import { CoveragePage } from './CoveragePage';

import '../../assets/styles/jalsatya.css';
import './AquaConsoleLayout.css';

export function AquaConsoleLayout() {
  const [activeTab, setActiveTab] = useState('today');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    document.body.classList.toggle('collapsed');
  };

  const pagesInfo = {
    today: { title: 'Inspection Itinerary', sub: 'Actionable field inspection schedule for tomorrow morning, ordered by risk.' },
    list: { title: 'Inspection list', sub: 'Every plant in the district, ranked by what is worth your time.' },
    map: { title: 'Spatial Industrial Grid', sub: 'Geographic surveillance map of facilities across river basins and industrial hubs.' },
    find: { title: 'Findings', sub: 'Notices issued, replies received, and what is still open.' },
    plant: { title: 'Plants', sub: 'Every registered unit and what its data looks like.' },
    cluster: { title: 'Clusters', sub: "Common effluent plants, and whether members' reports add up." },
    vendor: { title: 'Monitoring agencies', sub: 'The firms that run monitoring equipment, judged across all clients.' },
    cov: { title: 'Coverage', sub: 'What records we can check a plant against, and what is missing.' }
  };

  const currentInfo = pagesInfo[activeTab] || pagesInfo.today;
  const selectedPlant = getPlantById(selectedPlantId) || PLANTS_DATA.find((p) => p.id === selectedPlantId);

  return (
    <div className="app">
      <AquaSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed} 
        onToggleCollapse={toggleSidebar} 
      />

      <main className="main">
        <AquaTopbar title={currentInfo.title} subtitle={currentInfo.sub} />

        {activeTab === 'today' && (
          <TodayPage 
            onOpenPlant={(id) => setSelectedPlantId(id)}
            onNavigateTab={(tab) => setActiveTab(tab)} 
          />
        )}
        {activeTab === 'list' && <InspectionListPage onOpenPlant={(id) => setSelectedPlantId(id)} />}
        {activeTab === 'map' && <MapPage onOpenPlant={(id) => setSelectedPlantId(id)} />}
        {activeTab === 'find' && <FindingsPage onOpenPlant={(id) => setSelectedPlantId(id)} />}
        {activeTab === 'plant' && <PlantsPage onOpenPlant={(id) => setSelectedPlantId(id)} />}
        {activeTab === 'cluster' && <ClustersPage onNavigateTab={(tab) => setActiveTab(tab)} />}
        {activeTab === 'vendor' && <VendorsPage />}
        {activeTab === 'cov' && <CoveragePage />}
      </main>

      <PlantDrawer 
        plant={selectedPlant} 
        isOpen={Boolean(selectedPlantId)} 
        onClose={() => setSelectedPlantId(null)} 
      />
    </div>
  );
}
