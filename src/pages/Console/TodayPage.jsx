import React from 'react';
import { PLANTS_DATA } from '../../data/aquasentinalData';
import { DistrictAuditChart } from '../../components/ui/DistrictAuditChart';
import { Info, Printer, ExternalLink, ArrowRight } from 'lucide-react';
import './TodayPage.css';

export function TodayPage({ onOpenPlant, onNavigateTab }) {
  const actNowPlants = PLANTS_DATA.filter((p) => p.band === 'red');

  const getBandClass = (b) => {
    switch (b) {
      case 'red': return ['t-red', 'Act now'];
      case 'amber': return ['t-amber', 'Look into'];
      case 'clear': return ['t-green', 'Nothing found'];
      default: return ['t-grey', "Can't check"];
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="wrap">
      {/* Interactive KPI Summary Cells */}
      <div className="kpi" style={{ marginBottom: '16px' }}>
        <div className="cell" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab && onNavigateTab('list')}>
          <div className="n">3</div>
          <div className="k">Plants to visit tomorrow</div>
        </div>
        <div className="cell">
          <div className="n">68 km</div>
          <div className="k">Driving, in the order below</div>
        </div>
        <div className="cell" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab && onNavigateTab('find')}>
          <div className="n">2</div>
          <div className="k">Replies due back today</div>
        </div>
        <div className="cell" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab && onNavigateTab('cluster')}>
          <div className="n">1</div>
          <div className="k">Cluster needing a decision</div>
        </div>
      </div>

      {/* Tomorrow's Field Inspection Route */}
      <div className="panel" style={{ marginBottom: '16px' }}>
        <div className="panel-h">
          <h2>Tomorrow's Field Inspection Route</h2>
          <span className="muted">Erode → Bhavani → Karur</span>
          <div className="spacer" />
          <button className="btn primary" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Printer size={15} /> Print Day Sheet
          </button>
        </div>

        <ol className="steps" style={{ padding: '6px 18px 10px' }}>
          {actNowPlants.map((plant, idx) => {
            const [tagClass, tagLabel] = getBandClass(plant.band);
            return (
              <li key={plant.id}>
                <span className="num">{idx + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '9px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <b style={{ color: '#0f172a' }}>{plant.name}</b>
                    <span className={`tag ${tagClass}`}><span className="dot" />{tagLabel}</span>
                    <span className="muted mono">{plant.id}</span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#334155' }}>
                    {plant.reason}
                  </p>
                  <p className="muted" style={{ margin: '5px 0 0' }}>
                    First thing to check: {plant.check[0]}
                  </p>
                </div>
                <button 
                  className="btn" 
                  onClick={() => onOpenPlant(plant.id)} 
                  style={{ flex: 'none', alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Open Details <ExternalLink size={14} />
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="two">
        {/* Waiting Actions Section */}
        <div className="panel">
          <div className="panel-h"><h2>Waiting on You</h2></div>
          <div style={{ padding: '16px 18px', display: 'grid', gap: '12px' }}>
            <div className="flag amber">
              <div style={{ flex: 1 }}>
                <b>Tiruppur CETP-5 — 7 plants narrowed down</b>
                <p>Members report 18% less than common plant receives. Seven units can be told apart from the rest. Decide whether to inspect all seven or start with top three.</p>
                <button 
                  className="btn primary" 
                  style={{ marginTop: '10px', fontSize: '12px', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => onNavigateTab && onNavigateTab('cluster')}
                >
                  Review 7 Narrowed Units <ArrowRight size={13} />
                </button>
              </div>
            </div>

            <div className="flag">
              <div style={{ flex: 1 }}>
                <b>Sri Amman Processing Mills replied to notice</b>
                <p>They have sent calibration certificates. Their reply needs a yes or no before the notice can close.</p>
                <button 
                  className="btn" 
                  style={{ marginTop: '10px', fontSize: '12px', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => onOpenPlant('TN-ER-0412')}
                >
                  Review Reply Document <ExternalLink size={13} />
                </button>
              </div>
            </div>

            <div className="flag">
              <div style={{ flex: 1 }}>
                <b>Pallipalayam CETP-3 inlet meter still dead</b>
                <p>Down since March. Until it reports, 47 plants in that cluster cannot be checked at all.</p>
                <button 
                  className="btn" 
                  style={{ marginTop: '10px', fontSize: '12px', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => onNavigateTab && onNavigateTab('cluster')}
                >
                  Inspect Cluster Meter Logs <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced District Audit Donut Chart Panel */}
        <div className="panel">
          <div className="panel-h">
            <h2>This Month's District Audit Chart</h2>
          </div>
          <div style={{ padding: '16px 18px' }}>
            <DistrictAuditChart onCategoryClick={(tabKey) => onNavigateTab && onNavigateTab(tabKey)} />

            <div className="month-breakdown-grid" style={{ marginTop: '12px' }}>
              <div className="month-breakdown-item" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab && onNavigateTab('list')}>
                <div className="month-breakdown-left">
                  <span className="tag t-red"><span className="dot" />Act now</span>
                </div>
                <div className="month-breakdown-val">24 <span className="month-breakdown-pct">(2.7%)</span></div>
              </div>

              <div className="month-breakdown-item" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab && onNavigateTab('list')}>
                <div className="month-breakdown-left">
                  <span className="tag t-amber"><span className="dot" />Look into</span>
                </div>
                <div className="month-breakdown-val">79 <span className="month-breakdown-pct">(8.9%)</span></div>
              </div>

              <div className="month-breakdown-item" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab && onNavigateTab('list')}>
                <div className="month-breakdown-left">
                  <span className="tag t-green"><span className="dot" />Nothing found</span>
                </div>
                <div className="month-breakdown-val">502 <span className="month-breakdown-pct">(56.3%)</span></div>
              </div>

              <div className="month-breakdown-item" style={{ cursor: 'pointer' }} onClick={() => onNavigateTab && onNavigateTab('cov')}>
                <div className="month-breakdown-left">
                  <span className="tag t-grey"><span className="dot" />Can't check</span>
                </div>
                <div className="month-breakdown-val">287 <span className="month-breakdown-pct">(32.2%)</span></div>
              </div>
            </div>

            <div className="cant-check-info-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#0f172a', marginBottom: '3px' }}>
                <Info size={14} color="#0284c7" /> Regulatory Note on “Can't Check” Status
              </div>
              Indicates no independent external record (such as TANGEDCO dedicated ETP feeder meters) is available to cross-verify. These units are dispatched for unannounced random physical sampling.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
