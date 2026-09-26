import React from 'react';
import { Scene } from '../../components/canvas/Scene';
import { ModelToolbar } from './ModelToolbar';
import './ViewerPage.css';

/**
 * 3D Model Viewer Page Container (<20 lines)
 */
export function ViewerPage() {
  return (
    <div className="viewer-page-container">
      <ModelToolbar />
      <Scene />
    </div>
  );
}
