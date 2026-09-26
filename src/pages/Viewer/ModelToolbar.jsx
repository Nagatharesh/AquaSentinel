import React from 'react';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import './ModelToolbar.css';

export function ModelToolbar() {
  return (
    <div className="model-toolbar">
      <button className="toolbar-btn" title="Reset View"><RotateCw size={18} /></button>
      <button className="toolbar-btn" title="Zoom In"><ZoomIn size={18} /></button>
      <button className="toolbar-btn" title="Zoom Out"><ZoomOut size={18} /></button>
    </div>
  );
}
