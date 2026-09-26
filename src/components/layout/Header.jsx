import React from 'react';
import { Database, Box, Home } from 'lucide-react';
import './Header.css';

export function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header-container">
      <div className="header-brand">
        <Box size={24} color="#00f2fe" />
        <span className="header-title">AquaSentinal 3D</span>
      </div>
      <nav className="header-nav">
        <button 
          className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={16} /> Home
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'viewer' ? 'active' : ''}`}
          onClick={() => setActiveTab('viewer')}
        >
          <Box size={16} /> 3D Viewport
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'database' ? 'active' : ''}`}
          onClick={() => setActiveTab('database')}
        >
          <Database size={16} /> SQLite WASM
        </button>
      </nav>
    </header>
  );
}
