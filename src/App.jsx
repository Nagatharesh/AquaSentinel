import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/Home/HomePage';
import { ViewerPage } from './pages/Viewer/ViewerPage';
import { DbPage } from './pages/Database/DbPage';
import './assets/styles/global.css';

export function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-main">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'viewer' && <ViewerPage />}
        {activeTab === 'database' && <DbPage />}
      </main>
    </div>
  );
}

export default App;
