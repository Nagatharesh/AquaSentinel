# AquaSentinal

AquaSentinal is a browser-based prototype for environmental compliance review and field inspection planning. Its operator console brings facility risk summaries, inspection dossiers, industrial maps, satellite-themed anomaly reports, and common-effluent-treatment-plant (CETP) reconciliation into one interface.

## Project Status

This repository contains a front-end demonstration, not a production regulatory system. The inspection, facility, cluster, coverage, and satellite-anomaly records are bundled sample data under `src/data/`; they are not a verified feed from regulators, factories, sensors, or satellite analysis services. The satellite dossiers are illustrative scenarios. The map can request third-party basemap and imagery tiles, but the application does not ingest or analyze live satellite passes.

The sign-in form is also a demonstration gate, not authentication. It does not verify credentials or protect data. Do not enter real credentials or use the application to make enforcement decisions.

## Capabilities

- **Inspection itinerary:** Review prioritized field visits, inspection prompts, and printable day sheets.
- **Facility review:** Browse plant risk indicators, telemetry summaries, and supporting evidence.
- **Industrial map:** Search and filter mapped facilities by town, sector, and risk band.
- **Satellite dossiers:** Browse illustrative anomaly records and related imagery panels alongside the map.
- **Findings and clusters:** Review sample enforcement statuses and compare member-reported CETP flow with inlet totals.
- **Client-side database module:** A separate SQLite WebAssembly query-console module is present under `src/pages/Database/`; it is not the data source for the main operator console.

## Technology

- React 19 and Vite 8
- MapLibre GL JS, with CARTO vector map styling and Esri World Imagery raster tiles
- React Leaflet and Leaflet for map-related UI components
- `sql.js` for the separate in-browser SQLite module
- Three.js, React Three Fiber, and Drei for the standalone 3D viewer components
- Plain CSS stylesheets and shared CSS variables

## Getting Started

### Requirements

- Node.js 20.19+ or 22.12+
- npm
- Network access for the remotely hosted map style and imagery tiles

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal, usually `http://localhost:5173`.

### Available scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

There is currently no test or type-check script configured in `package.json`.

## Repository Layout

```text
src/
	assets/styles/       Global styles and visual themes
	components/
		canvas/            Three.js viewer components
		coverage/          Coverage and submission views
		layout/            Console navigation and header
		map/               MapLibre map, markers, filters, and controls
		satellite/         Satellite dossier and evidence components
		ui/                Shared charts, drawers, and visualizations
	data/                Bundled demonstration records
	db/                  SQLite client and schema
	hooks/               SQLite and imagery hooks
	pages/
		Console/           Operator console sections
		Database/          Separate database query-console module
		Home/              Landing page and demo sign-in
	utils/               Geographic helpers
public/
	images/              Local illustrative imagery and page assets
```

The primary experience is assembled in `src/App.jsx` and `src/pages/Console/AquaConsoleLayout.jsx`. The repository's architecture and component-size guidance is documented in `AGENTS.md`.

## External Services and Data

The map uses a CARTO-hosted style and Esri World Imagery raster tiles. These services require an internet connection and are subject to their providers' availability, attribution, and usage terms. Facility coordinates and displayed compliance/anomaly values are supplied by local demonstration datasets; they should not be interpreted as verified geospatial or regulatory records.

## References

- [Vite documentation](https://vite.dev/guide/)
- [React documentation](https://react.dev/learn)
- [MapLibre GL JS documentation](https://maplibre.org/maplibre-gl-js/docs/)
- [`sql.js` project documentation](https://github.com/sql-js/sql.js)
- [Esri World Imagery](https://www.esri.com/en-us/arcgis/products/arcgis-world-imagery/overview)

## License

No license is currently declared in this repository. Add a license before redistributing or reusing the project.