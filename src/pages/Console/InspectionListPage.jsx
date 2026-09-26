import React from 'react';
import { PLANTS_DATA } from '../../data/aquasentinalData';
import { MiniAnomalyGraph } from '../../components/ui/MiniAnomalyGraph';
import './InspectionListPage.css';

export function InspectionListPage({ onOpenPlant }) {
  const getBandClass = (b) => {
    switch (b) {
      case 'red': return ['t-red', 'Act now'];
      case 'amber': return ['t-amber', 'Look into'];
      case 'clear': return ['t-green', 'Nothing found'];
      default: return ['t-grey', "Can't check"];
    }
  };

  return (
    <div className="wrap">
      <div className="panel">
        <div className="panel-h">
          <h2>Ranked by probability × harm × what lying saves them</h2>
          <div className="spacer" />
          <span className="muted">Small toxic units are ranked against each other, not against large ones</span>
        </div>

        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th style={{ width: '34px' }} />
                <th>Plant</th>
                <th>Why it is here</th>
                <th>28-Day Telemetry</th>
                <th>Harm</th>
                <th>Saves them</th>
                <th>Uptime</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {PLANTS_DATA.map((plant, idx) => {
                const [tagClass, tagLabel] = getBandClass(plant.band);
                return (
                  <tr key={plant.id} className="click" onClick={() => onOpenPlant(plant.id)}>
                    <td className="mono muted">{idx + 1}</td>
                    <td>
                      <b>{plant.name}</b>
                      <div className="muted mono" style={{ fontSize: '11.5px' }}>{plant.id} • {plant.town}</div>
                    </td>
                    <td style={{ maxWidth: '380px' }}>
                      <span className={`tag ${tagClass}`}><span className="dot" />{tagLabel}</span>
                      <div style={{ marginTop: '5px', color: 'var(--ink-2)' }}>{plant.reason}</div>
                    </td>
                    <td style={{ width: '150px' }}>
                      <MiniAnomalyGraph plantId={plant.id} band={plant.band} />
                    </td>
                    <td>{plant.harm}</td>
                    <td className="mono">{plant.motive}</td>
                    <td className="mono" style={{ color: plant.uptime < 80 ? 'var(--red)' : 'inherit' }}>
                      {plant.uptime}%
                    </td>
                    <td>
                      <button className="btn" onClick={(e) => { e.stopPropagation(); onOpenPlant(plant.id); }}>
                        Open
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="muted" style={{ marginTop: '12px', maxWidth: '70ch' }}>
        If 5 in 100 plants are falsifying, expect about half of the “act now” entries to turn out innocent. If 3 in 10 are, expect about one in eight. The list tells you where to look first — the sample you take decides.
      </p>
    </div>
  );
}
