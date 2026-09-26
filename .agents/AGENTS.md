# Workspace Rules & AI Customization

This project enforces strict modularity standards for React, Three.js 3D viewport, and in-browser SQLite WASM development.

## 🚨 Core Rules for AI Agents

<ul>
  <li>
    <strong>Page & Component File Line Threshold (150 Lines):</strong>
    Strictly enforce a maximum line count of <strong>150 lines</strong> per file for all components in <code>src/components/</code> and pages in <code>src/pages/</code>.
  </li>
  <li>
    <strong>Strict CSS Separation:</strong>
    NEVER write inline JS styles or <code>const styles = {}</code> inside JSX/React components. All styles must be placed in separate CSS files (e.g., <code>Component.css</code>) and imported at the top of the file.
  </li>
  <li>
    <strong>Splitting Strategy:</strong>
    When a page file grows beyond 150 lines, automatically decompose it into dedicated sub-components within the page directory, move stateful logic into custom React hooks (<code>src/hooks/</code>), and extract static configs into <code>src/utils/</code>.
  </li>
  <li>
    <strong>3D Three.js Component Isolation:</strong>
    Isolate Canvas, Lights, OrbitControls, and 3D Mesh loaders into <code>src/components/canvas/</code>. Never mix raw HTML overlays directly into 3D rendering loops.
  </li>
  <li>
    <strong>SQLite In-Browser Database Isolation:</strong>
    Keep SQLite WASM client logic, DDL schemas, and SQL queries encapsulated inside <code>src/db/</code> and <code>src/hooks/useSQLite.js</code>.
  </li>
</ul>
