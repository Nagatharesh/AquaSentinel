-- SQLite Schema DDL Definition for AquaSentinal Data Forensics

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
  etp_power_kwh REAL NOT NULL,
  status TEXT DEFAULT 'FLAGGED_FOR_INSPECTION'
);

INSERT OR IGNORE INTO inspection_targets 
(id, plant_name, industry_sector, location, risk_score, primary_anomaly, forensic_evidence, recommended_action, cto_limit_bod, reported_max_bod, etp_power_kwh)
VALUES 
(1, 'Apex Dyes & Chemicals Ltd', 'Textiles & Dyes', 'Surat Industrial Belt, Gujarat', 96, 'Zero-Variance Flatline & Digit Bias', 'BOD reported exactly 28.4 mg/L for 19 straight days. Benford digit distribution shows 94% frequency of digit 4.', 'Inspect OCEMS sensor probe calibration logbook & raw DAHS buffer tomorrow morning', 30, 28.4, 120.5),
(2, 'Vanguard Paper Mills', 'Pulp & Paper', 'Yamunanagar, Haryana', 89, 'Threshold Hugging & Selective Outage', 'Outages registered as maintenance coincided exactly with 3x peak boiler steam output & night shifts.', 'Audit ETP power meter logs vs boiler fuel consumption during 02:00-06:00 window', 30, 29.8, 45.0),
(3, 'Godavari Distilleries Corp', 'Distillery', 'Nashik Cluster, Maharashtra', 84, 'ETP Power Discrepancy & Downstream Spike', 'Reported zero discharge while downstream sensor DS-04 recorded 450 mg/L COD spike during rain event.', 'Physical audit of bypass valve #3 and ETP aeration blower electricity meters', 100, 12.0, 15.2);
