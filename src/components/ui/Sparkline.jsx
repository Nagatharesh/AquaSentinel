import React from 'react';
import './Sparkline.css';

export function Sparkline({ isFlat }) {
  const bars = Array.from({ length: 28 }, (_, i) => {
    const flatBar = isFlat && i > 8 && i < 24;
    const heightPercent = flatBar ? 46 : 22 + Math.abs(Math.sin(i * 1.7)) * 70;
    return { heightPercent, flatBar };
  });

  return (
    <div className="spark" aria-hidden="true">
      {bars.map((bar, idx) => (
        <i 
          key={idx} 
          style={{ height: `${bar.heightPercent}%` }} 
          className={bar.flatBar ? 'flat' : ''} 
        />
      ))}
    </div>
  );
}
