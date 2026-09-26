import React, { useState } from 'react';
import { AquaLandingPage } from './pages/Home/AquaLandingPage';
import { AquaConsoleLayout } from './pages/Console/AquaConsoleLayout';
import './assets/styles/global.css';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AquaLandingPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AquaConsoleLayout />;
}

export default App;
