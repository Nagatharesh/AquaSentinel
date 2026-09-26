import React, { useState } from 'react';
import { AquaHeader } from './AquaHeader';
import { AquaHero } from './AquaHero';
import { AnomalySignatures } from './AnomalySignatures';
import { CrossCheckMetrics } from './CrossCheckMetrics';
import { AuditInspectionList } from './AuditInspectionList';
import { AquaLoginModal } from './AquaLoginModal';
import './AquaLandingPage.css';

export function AquaLandingPage({ onLoginSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="aqua-landing-container">
      <AquaHeader onOpenLogin={() => setIsModalOpen(true)} />
      <AquaHero onOpenLogin={() => setIsModalOpen(true)} />
      <AnomalySignatures />
      <CrossCheckMetrics />
      <AuditInspectionList />
      
      <AquaLoginModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
}
