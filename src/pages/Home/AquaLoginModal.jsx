import React, { useState } from 'react';
import { X, LogIn, ShieldCheck, MapPin, Mail, Lock, CheckCircle2 } from 'lucide-react';
import './AquaLoginModal.css';

export function AquaLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [zone, setZone] = useState('tiruppur');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your TNPCB Officer Email / ID.');
      return;
    }
    alert(`TNPCB Officer Authenticated! Zone: ${zone.toUpperCase()}`);
    onClose();
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-accent-bar"></div>
        
        <button className="modal-close-btn" onClick={onClose} title="Close Modal">
          <X size={18} />
        </button>

        <div className="modal-header">
          <div className="modal-icon-ring">
            <ShieldCheck size={28} />
          </div>
          <h2 className="modal-title">AquaSentinel Sign In</h2>
          <p className="modal-subtitle">Tamil Nadu Pollution Control Board (TNPCB) Gateway</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group-aqua">
            <label className="label-aqua">TAMIL NADU AUDIT ZONE</label>
            <div className="input-icon-wrapper">
              <MapPin size={16} className="input-left-icon" />
              <select className="select-aqua-iconic" value={zone} onChange={(e) => setZone(e.target.value)}>
                <option value="tiruppur">Tiruppur Textile Dyeing Belt</option>
                <option value="ranipet">Ranipet Leather Tannery Complex</option>
                <option value="cuddalore">Cuddalore SIPCOT Chemical Hub</option>
                <option value="manali">Manali Petrochem Zone (Chennai)</option>
                <option value="tnpcb_hq">TNPCB Headquarters (Guindy)</option>
              </select>
            </div>
          </div>

          <div className="form-group-aqua">
            <label className="label-aqua">OFFICER EMAIL / ID</label>
            <div className="input-icon-wrapper">
              <Mail size={16} className="input-left-icon" />
              <input 
                type="email" 
                className="input-aqua-iconic"
                placeholder="officer.tiruppur@tnpcb.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group-aqua">
            <label className="label-aqua">PASSWORD</label>
            <div className="input-icon-wrapper">
              <Lock size={16} className="input-left-icon" />
              <input 
                type="password" 
                className="input-aqua-iconic"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-modal-submit">
            <LogIn size={18} /> Authenticate & Access TN Dashboard
          </button>
        </form>

        <div className="modal-security-badge">
          <CheckCircle2 size={13} color="#16a34a" /> SSL 256-Bit Encrypted Gateway • TNPCB v4.2
        </div>
      </div>
    </div>
  );
}
