import initSqlJs from 'sql.js';

let dbInstance = null;

/**
 * Singleton to initialize and return the in-browser SQLite database instance.
 */
export async function getDatabase() {
  if (dbInstance) return dbInstance;

  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
    
    dbInstance = new SQL.Database();
    initSchema(dbInstance);
    console.log('[SQLite Client] In-memory SQLite DB initialized successfully.');
    return dbInstance;
  } catch (error) {
    console.error('[SQLite Client] Failed to initialize SQLite WASM:', error);
    throw error;
  }
}

/**
 * Initial DDL execution
 */
function initSchema(db) {
  const schemaSQL = `
    CREATE TABLE IF NOT EXISTS models_metadata (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      format TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    INSERT OR IGNORE INTO models_metadata (id, name, file_path, format) 
    VALUES (1, 'Sample Cube', '/models/cube.gltf', 'gltf');
  `;
  db.run(schemaSQL);
}
