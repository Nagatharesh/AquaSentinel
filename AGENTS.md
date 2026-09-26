# AI Agent Coding Guidelines & Architecture Rules

This repository defines the common architecture and code organization for a client-side Vite + React application using **Three.js** (3D Model rendering) and **SQLite WASM** (in-browser database with no backend server).

---

## 🚨 MANDATORY FILE LENGTH THRESHOLDS & MODULARITY RULES

Below are strict instructions that all developers and AI agents must follow when creating or modifying files in this codebase:

<ul>
  <li>
    <strong>Page & Component Line Length Threshold (150 Lines Max):</strong> 
    No individual page file (e.g., <code>src/pages/*/*.jsx</code>) or UI/Canvas component file (e.g., <code>src/components/*/*.jsx</code>) should exceed <strong>150 lines of code</strong> (absolute maximum cap: 200 lines for top-level router wrappers).
  </li>
  <li>
    <strong>Component Splitting Rule:</strong> 
    If a page or component file approaches or exceeds the 150-line threshold, you <strong>MUST</strong> decompose and split the file into smaller, focused sub-components (placed in a subfolder for that page/feature), custom React hooks (in <code>src/hooks/</code>), or utility modules (in <code>src/utils/</code>).
  </li>
  <li>
    <strong>Strict CSS Separation (No Inline Styles):</strong> 
    <strong>DO NOT write inline CSS style objects</strong> (e.g., <code>style={{ ... }}</code> or JS <code>const styles = { ... }</code>) inside JSX page or component files. All styles MUST be written in separate CSS files (e.g., <code>Component.css</code> or <code>Component.module.css</code>) located alongside the component or in <code>src/assets/styles/</code>.
  </li>
  <li>
    <strong>Single Responsibility Principle (SRP):</strong> 
    Each React component must handle only ONE visual responsibility or logical slice. Do not combine database queries, 3D render loops, and complex UI layouts into a single file.
  </li>
  <li>
    <strong>Three.js Canvas Decoupling:</strong> 
    All 3D Three.js canvas logic (lighting, camera controls, mesh loaders, animation frames) MUST be separated from standard HTML/UI overlay elements. Store 3D elements inside <code>src/components/canvas/</code> and logic inside <code>src/hooks/useThreeScene.js</code>.
  </li>
  <li>
    <strong>SQLite WASM Logic Isolation:</strong> 
    No raw SQL queries or SQLite connection setups are allowed directly inside React component bodies. Database initialization, schema DDL, and CRUD operations MUST reside strictly within <code>src/db/</code> services, repositories, or <code>src/hooks/useSQLite.js</code>.
  </li>
</ul>

---

## 📁 Standard Directory Structure & File Guidelines

```
AquaSentinal/
├── .agents/
│   └── AGENTS.md               # Customization rules for Antigravity & AI agents
├── AGENTS.md                   # Project architecture, line thresholds & CSS rules
├── public/
│   ├── models/                 # 3D assets (.gltf, .glb, .obj, .fbx)
│   ├── textures/               # 3D texture maps & HDRIs
│   └── sqlite/                 # SQLite WASM binaries (sql-wasm.wasm)
├── src/
│   ├── assets/                 # Static images, icons, global styles
│   │   ├── styles/             # CSS design tokens & global CSS stylesheet
│   │   │   ├── variables.css   # Color palette, font variables
│   │   │   └── global.css      # Reset & base application styles
│   │   └── icons/              # SVG assets
│   ├── components/             # Modular React components (<150 lines each)
│   │   ├── ui/                 # Reusable UI primitives (Button, Modal, Card, Input)
│   │   ├── layout/             # Header (Header.jsx + Header.css), Sidebar, PageWrapper
│   │   ├── canvas/             # Three.js 3D Viewport components (Scene, Lights, ModelViewer)
│   │   └── db/                 # Database tables, query consoles, status indicators
│   ├── db/                     # SQLite WASM client, schema DDL, repository methods
│   │   ├── sqliteClient.js     # WASM database initialization & connection singleton
│   │   ├── schema.sql          # Table DDL & initial seed data
│   │   └── repositories/       # Data Access Objects (DAO) for entities
│   ├── hooks/                  # Custom React hooks (useSQLite, useThree, useModelLoader)
│   ├── pages/                  # Page modules (strictly split into sub-components)
│   │   ├── Home/               # HomePage.jsx + HeroSection.jsx + HeroSection.css
│   │   ├── Viewer/             # ViewerPage.jsx + ViewerPage.css + ModelToolbar.jsx + ModelToolbar.css
│   │   └── Database/           # DbPage.jsx + DbPage.css + TableViewer.jsx
│   ├── utils/                  # Helper functions, math utils, formatters
│   ├── App.jsx                 # Main layout & router container (<100 lines)
│   ├── main.jsx                # React DOM root entry
│   └── index.css               # App entry CSS import
├── vite.config.js              # Vite build setup
└── package.json
```

---

## 🛠️ Step-by-Step Refactoring Workflow When Exceeding Thresholds

When a page file `ExamplePage.jsx` reaches >150 lines:
1. Create a dedicated folder `src/pages/Example/`.
2. Extract sub-views into separate files (e.g., `ExampleHeader.jsx`, `ExampleTable.jsx`).
3. Extract styles into separate CSS files (`ExampleHeader.css`, `ExampleTable.css`).
4. Extract inline state & side-effects into a custom hook `src/hooks/useExamplePage.js`.
5. Keep `ExamplePage.jsx` as a concise layout container (<60 lines) that delegates render and state to sub-components and hooks.
