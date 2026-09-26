import React, { useState } from 'react';
import { Lock, ShieldCheck, RefreshCw, LogIn } from 'lucide-react';
import './GovtOfficerCard.css';

export function GovtOfficerCard({ onLoginSuccess }) {
  const [board, setBoard] = useState('cpcb_hq');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K9M2P');

  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your Official Government Email / Inspector ID');
      return;
    }
    if (captchaInput.toUpperCase() !== captchaCode) {
      alert('Security CAPTCHA verification failed. Please try again.');
      refreshCaptcha();
      return;
    }
    alert(`Authentication Successful! Logging in as Authorized Inspector (${email})`);
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="govt-card-container">
      <div className="govt-card-header">
        <div className="official-badge-tag">
          <ShieldCheck size={14} /> AUTHORIZED OFFICER AUTHENTICATION
        </div>
        <h2 className="govt-card-title">Regulator Inspection Portal</h2>
        <p className="govt-card-subtitle">
          Sign in to access real-time OCEMS data forensics and tomorrow-morning inspection lists.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="govt-form-group">
          <label className="govt-form-label">POLLUTION CONTROL BOARD JURISDICTION</label>
          <select className="govt-select" value={board} onChange={(e) => setBoard(e.target.value)}>
            <option value="cpcb_hq">Central Pollution Control Board (CPCB HQ, New Delhi)</option>
            <option value="spcb_gj">Gujarat State Pollution Control Board (GSPCB)</option>
            <option value="spcb_mh">Maharashtra Pollution Control Board (MPCB)</option>
            <option value="spcb_hr">Haryana State Pollution Control Board (HSPCB)</option>
            <option value="spcb_tn">Tamil Nadu Pollution Control Board (TNPCB)</option>
          </select>
        </div>

        <div className="govt-form-group">
          <label className="govt-form-label">OFFICER GOVERNMENT EMAIL / ID</label>
          <input 
            type="email" 
            className="govt-input"
            placeholder="e.g. inspector.surat@spcb.gov.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="govt-form-group">
          <label className="govt-form-label">SECURITY PIN / PASSWORD</label>
          <input 
            type="password" 
            className="govt-input"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="govt-form-group">
          <label className="govt-form-label">SECURITY CAPTCHA VERIFICATION</label>
          <div className="captcha-box">
            <div className="captcha-display">{captchaCode}</div>
            <button type="button" className="captcha-refresh-btn" onClick={refreshCaptcha} title="Refresh CAPTCHA">
              <RefreshCw size={16} />
            </button>
            <input 
              type="text" 
              className="govt-input"
              placeholder="Enter text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-govt-signin">
          <LogIn size={18} /> Authenticate & Access Inspection Dashboard
        </button>
      </form>

      <div className="security-seal-footer">
        <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
        Protected under the Environment (Protection) Act, 1986. <br />
        Unauthorized access attempts are monitored and prosecuted under Indian Penal Code Section 43.
      </div>
    </div>
  );
}
