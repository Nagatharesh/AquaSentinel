import React from 'react';
import { TelemetryChart } from './TelemetryChart';
import { MiniPlantMap } from '../map/MiniPlantMap';
import './PlantDrawer.css';

export function PlantDrawer({ plant, isOpen, onClose }) {
  if (!plant) return null;

  const bandConfig = {
    red: ['t-red', 'Act now'],
    amber: ['t-amber', 'Look into'],
    clear: ['t-green', 'Nothing found'],
    grey: ['t-grey', "Can't check"]
  };

  const [tagClass, tagLabel] = bandConfig[plant.band] || ['t-grey', 'Unknown'];

  return (
    <>
      <div className={`scrim ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${isOpen ? 'open' : ''}`} aria-label="Plant Details">
        <div className="drawer-h">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '4px' }}>
              <span className={`tag ${tagClass}`}><span className="dot" />{tagLabel}</span>
              <span className="mono" style={{ fontSize: '11.5px', color: '#64748b' }}>{plant.id}</span>
            </div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{plant.name}</h2>
            <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
              {plant.sector} • {plant.town}{plant.cluster !== '—' ? ` • ${plant.cluster}` : ''}
            </div>
          </div>
          <button className="x-btn" onClick={onClose} aria-label="Close">&times;</button>
        </div>

        <div className="drawer-b">
          <div className={`flag ${plant.band === 'red' ? 'red' : plant.band === 'amber' ? 'amber' : ''}`} style={{ marginBottom: '14px' }}>
            <div>
              <b>{plant.reason}</b>
              <p>{plant.why}</p>
            </div>
          </div>

          <MiniPlantMap plant={plant} />

          <h3 className="sec">WHAT THE READING LOOKS LIKE</h3>
          <TelemetryChart plantId={plant.id} isFlat={plant.band === 'red'} param={plant.param} />

          <h3 className="sec">WHAT IT RESTS ON</h3>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#334155', lineHeight: '1.6' }}>
            {plant.evid && plant.evid.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '5px' }}>{item}</li>
            ))}
          </ul>

          {plant.check && plant.check.length > 0 && (
            <>
              <h3 className="sec">WHEN YOU ARE THERE (INSPECTION PROTOCOL)</h3>
              <ol className="steps">
                {plant.check.map((item, idx) => (
                  <li key={idx}>
                    <span className="num">{idx + 1}</span>
                    <div style={{ color: '#0f172a', fontWeight: 500 }}>{item}</div>
                  </li>
                ))}
              </ol>
            </>
          )}

          <h3 className="sec">STRENGTH OF THE FINDING</h3>
          <dl className="kv">
            <dt>Class</dt><dd>{plant.tier}</dd>
            <dt>Basis</dt><dd>{plant.tierNote}</dd>
            <dt>Monitoring agency</dt><dd>{plant.vendor}</dd>
            <dt>Data uptime</dt><dd className="mono">{plant.uptime}%</dd>
            <dt>What lying saves them</dt><dd className="mono">{plant.motive}</dd>
          </dl>
        </div>

        <div className="drawer-f">
          {plant.check && plant.check.length > 0 ? (
            <>
              <button className="btn primary">Add to tomorrow's route</button>
              <button className="btn">Issue notice</button>
            </>
          ) : (
            <button className="btn">Download clearance</button>
          )}
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </aside>
    </>
  );
}
