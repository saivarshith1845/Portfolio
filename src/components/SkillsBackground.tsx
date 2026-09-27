import React, { useEffect, useRef } from 'react';

export const SkillsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    // Dark control room signal pulse animation
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Dark technical grid
      ctx.strokeStyle = 'rgba(169, 198, 234, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Continuous horizontal telemetry pulse lines
      const pulseLines = [
        { yRatio: 0.25, color: 'rgba(169, 198, 234, 0.12)', speed: 0.8 },
        { yRatio: 0.55, color: 'rgba(193, 18, 31, 0.15)', speed: 1.2 },
        { yRatio: 0.8, color: 'rgba(169, 198, 234, 0.1)', speed: 0.6 },
      ];

      pulseLines.forEach((line) => {
        const lineY = height * line.yRatio;
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();

        for (let x = 0; x < width; x += 15) {
          const wave = Math.sin(x * 0.01 + time * line.speed) * 8 + Math.cos(x * 0.02 - time * 0.5) * 4;
          if (x === 0) ctx.moveTo(x, lineY + wave);
          else ctx.lineTo(x, lineY + wave);
        }
        ctx.stroke();
      });

      // 3. Subtle background radial glows
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, 400);
      grad1.addColorStop(0, 'rgba(169, 198, 234, 0.08)');
      grad1.addColorStop(1, 'rgba(23, 21, 21, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, 450);
      grad2.addColorStop(0, 'rgba(193, 18, 31, 0.06)');
      grad2.addColorStop(1, 'rgba(23, 21, 21, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#171515] pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 grain-overlay opacity-30" />
    </div>
  );
};
