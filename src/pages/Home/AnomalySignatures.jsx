import React from 'react';
import { BarChart3, AlertOctagon, Hash, CalendarOff } from 'lucide-react';
import './AnomalySignatures.css';

export function AnomalySignatures() {
  const signatures = [
    {
      icon: <BarChart3 size={24} />,
      title: 'Zero-Variance Flatline',
      text: 'Detects artificial sensor freezes where reported pH, BOD, or COD values sit unnaturally constant over consecutive days without physical fluctuation.',
      signatureTag: 'Detection Method: Rolling Standard Deviation'
    },
    {
      icon: <AlertOctagon size={24} />,
      title: 'Threshold Hugging',
      text: 'Flags instances where effluent concentrations cluster artificially 1–2% below legal consent limits (e.g. 29.8 mg/L vs 30 mg/L threshold) far more than random chance.',
      signatureTag: 'Detection Method: Statistical Bin Skewness'
    },
    {
      icon: <Hash size={24} />,
      title: "Benford's Law & Digit Preference",
      text: 'Examines leading and trailing digits in reported monitoring logs. Uncovers human typing habits, forced rounding, and synthetic data generation.',
      signatureTag: 'Detection Method: Chi-Square Goodness of Fit'
    },
    {
      icon: <CalendarOff size={24} />,
      title: 'Strategic Maintenance Gaps',
      text: 'Cross-checks telemetry offline periods marked as "instrument maintenance" against industrial boiler load, power consumption, rain events, and festival dates.',
      signatureTag: 'Detection Method: Temporal Correlation Engine'
    }
  ];

  return (
    <section className="signatures-container">
      <div className="signatures-header">
        <div className="signatures-tag">DATA FORENSICS ALGORITHMS</div>
        <h2 className="signatures-title">Four Tell-Tale Signatures of OCEMS Fabrication</h2>
        <p className="signatures-desc">
          Instead of physical sampling delays, AquaSentinal applies statistical forensics to continuous stream telemetry to catch data manipulation in real-time.
        </p>
      </div>

      <div className="signatures-grid">
        {signatures.map((sig, idx) => (
          <div className="signature-card" key={idx}>
            <div className="signature-icon-box">{sig.icon}</div>
            <h3 className="signature-title">{sig.title}</h3>
            <p className="signature-text">{sig.text}</p>
            <div className="signature-indicator">{sig.signatureTag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
