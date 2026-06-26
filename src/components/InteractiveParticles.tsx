import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: string;
  ty: string;
  tr: string;
  size: number;
  color: string;
}

interface InteractiveParticlesProps {
  trigger: boolean;
}

export const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({ trigger }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const colors = [
      'hsl(270, 85%, 65%)', // primary purple
      'hsl(185, 85%, 55%)', // secondary cyan
      'hsl(145, 75%, 50%)', // success emerald
      'hsl(35, 95%, 55%)',  // warning orange
      'hsl(330, 85%, 60%)'  // pink
    ];

    const newParticles: Particle[] = [];
    const count = 70;
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2 - 100;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 220;
      const tx = `${Math.cos(angle) * distance}px`;
      const ty = `${Math.sin(angle) * distance}px`;
      const size = 6 + Math.random() * 12;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const tr = `${360 + Math.random() * 720}deg`;

      newParticles.push({
        id: Date.now() + i,
        x: startX,
        y: startY,
        tx,
        ty,
        tr,
        size,
        color
      });
    }

    setParticles(newParticles);

    // Clean up particles after animation completes
    const timer = setTimeout(() => {
      setParticles([]);
    }, 1200);

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="particle-overlay">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            // @ts-ignore
            '--tx': p.tx,
            '--ty': p.ty,
            '--tr': p.tr,
          }}
        />
      ))}
    </div>
  );
};
