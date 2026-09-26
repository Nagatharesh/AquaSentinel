import React from 'react';
import './HeroSection.css';

export function HeroSection({ onExplore }) {
  return (
    <section className="hero-section">
      <h1 className="hero-title">Client-Side 3D + SQLite Architecture</h1>
      <p className="hero-subtitle">
        Modular React application powered by Vite, Three.js 3D model rendering, and WASM SQLite database running entirely in the browser.
      </p>
      <div className="hero-actions">
        <button className="hero-btn-primary" onClick={onExplore}>
          Open 3D Viewport
        </button>
      </div>
    </section>
  );
}
