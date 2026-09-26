import React from 'react';
import { HeroSection } from './HeroSection';

/**
 * HomePage Container
 * Kept concise (<40 lines) by delegating hero & feature sections to sub-components
 */
export function HomePage({ setActiveTab }) {
  return (
    <div style={{ padding: '20px' }}>
      <HeroSection onExplore={() => setActiveTab('viewer')} />
    </div>
  );
}
