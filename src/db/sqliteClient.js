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
    console.log('[SQLite Client] Forensic Inspection Database initialized.');
    return dbInstance;
  } catch (error) {
    console.error('[SQLite Client] Failed to initialize SQLite WASM:', error);
    throw error;
  }
}

function initSchema(db) {
  const ddl = `
    CREATE TABLE IF NOT EXISTS inspection_targets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plant_name TEXT NOT NULL,
      industry_sector TEXT NOT NULL,
      location TEXT NOT NULL,
      risk_score INTEGER NOT NULL,
      primary_anomaly TEXT NOT NULL,
      forensic_evidence TEXT NOT NULL,
      recommended_action TEXT NOT NULL,
      cto_limit_bod INTEGER NOT NULL,
      reported_max_bod REAL NOT NULL,
      etp_power_kwh REAL NOT NULL
    );
  `;
  db.run(ddl);

  // Seed data if empty
  const countRes = db.exec("SELECT COUNT(*) as count FROM inspection_targets");
  if (!countRes[0] || countRes[0].values[0][0] === 0) {
    db.run(`
      INSERT INTO inspection_targets 
      (plant_name, industry_sector, location, risk_score, primary_anomaly, forensic_evidence, recommended_action, cto_limit_bod, reported_max_bod, etp_power_kwh)
      VALUES 
      ('Apex Dyes & Chemicals Ltd', 'Textiles & Dyes', 'Surat, Gujarat', 96, 'Zero-Variance Flatline & Digit Bias', 'BOD reported exactly at 28.4 mg/L for 19 consecutive days. Benford frequency shows 94% preference for digit 4.', 'Inspect OCEMS sensor probe calibration logbook & raw DAHS buffer tomorrow morning', 30, 28.4, 120.5),
      ('Vanguard Paper Mills', 'Pulp & Paper', 'Yamunanagar, Haryana', 89, 'Threshold Hugging & Selective Outage', 'Outages registered as maintenance coincided with 3x peak production & night shifts (02:00-06:00).', 'Cross-examine ETP power meter logs against boiler steam generation records', 30, 29.8, 45.0),
      ('Godavari Distilleries Corp', 'Distillery', 'Nashik, Maharashtra', 84, 'ETP Power Discrepancy & Downstream Spike', 'Reported Zero Liquid Discharge (ZLD) while downstream sensor DS-04 recorded 450 mg/L COD spike.', 'Physical verification of hidden bypass valve #3 and aeration blower energy draw', 100, 12.0, 15.2);
    `);
  }
}
