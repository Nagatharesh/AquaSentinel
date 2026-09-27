import React from 'react';
import { 
  Calendar, ListFilter, FileCheck, Building2, 
  Network, ShieldAlert, PieChart, Menu, Map 
} from 'lucide-react';
import './AquaSidebar.css';

export function AquaSidebar({ activeTab, setActiveTab, isCollapsed, onToggleCollapse }) {
  const navItems = [
    { k: 'today', label: 'Inspection Itinerary', icon: <Calendar size={18} />, count: 6 },
    { k: 'list', label: 'Inspection list', icon: <ListFilter size={18} />, count: 24 },
    { k: 'map', label: 'Spatial Map', icon: <Map size={18} /> },
    { k: 'find', label: 'Findings', icon: <FileCheck size={18} />, count: 9 },
    { k: 'plant', label: 'Plants', icon: <Building2 size={18} /> },
    { k: 'cluster', label: 'Clusters', icon: <Network size={18} />, count: 1 },
    { k: 'vendor', label: 'Monitoring agencies', icon: <ShieldAlert size={18} />, count: 1 },
    { k: 'cov', label: 'Coverage', icon: <PieChart size={18} /> }
  ];

  return (
    <nav className="sidebar" aria-label="Sections">
      <div className="sb-head">
        <button className="sb-toggle" onClick={onToggleCollapse} aria-label="Toggle sidebar">
          <Menu size={18} />
        </button>
        <div className="sb-brand lbl">
          AquaSentinal
          <span>Tamil Nadu PCB</span>
        </div>
      </div>

      <div className="sb-nav">
        {navItems.map((item) => (
          <button
            key={item.k}
            className={`nav-btn ${activeTab === item.k ? 'active' : ''}`}
            onClick={() => setActiveTab(item.k)}
            title={item.label}
          >
            {item.icon}
            <span className="lbl">{item.label}</span>
            {item.count && <span className="nav-count lbl">{item.count}</span>}
          </button>
        ))}
      </div>

      <div className="sb-foot">
        <div className="avatar">RK</div>
        <div className="lbl">
          R. Karthikeyan
          <br />
          <span style={{ color: '#5E838C' }}>Erode District Officer</span>
        </div>
      </div>
    </nav>
  );
}
