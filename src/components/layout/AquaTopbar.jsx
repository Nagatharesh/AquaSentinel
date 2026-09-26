import React from 'react';
import './AquaTopbar.css';

export function AquaTopbar({ title, subtitle }) {
  const dateStamp = `${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} • telemetry synced to 06:00`;

  return (
    <div className="topbar">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="spacer" />
      <div className="topbar-stamp mono">{dateStamp}</div>
    </div>
  );
}
