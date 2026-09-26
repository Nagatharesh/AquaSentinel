import React from 'react';
import { QueryConsole } from './QueryConsole';
import './DbPage.css';

/**
 * SQLite Database Page Container (<30 lines)
 */
export function DbPage() {
  return (
    <div className="db-page-container">
      <div className="db-page-header">
        <h2 className="db-page-title">In-Browser SQLite Database</h2>
        <p className="db-page-subtitle">Run queries directly against client-side WASM SQLite storage</p>
      </div>
      <QueryConsole />
    </div>
  );
}
