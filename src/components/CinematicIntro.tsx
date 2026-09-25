import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0); // 0: particles, 1: SV emblem, 2: Name + Subtitle, 3: exit
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Canvas background particle system
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool forming into center
    const particleCount = 70;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      targetX: width / 2 + (Math.random() - 0.5) * 200,
      targetY: height / 2 + (Math.random() - 0.5) * 200,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? '#FFF6E8' : (Math.random() > 0.5 ? '#C1121F' : '#A9C6EA'),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render particles & connections
      particles.forEach((p, i) => {
        p.x += (p.targetX - p.x) * 0.02 + p.vx;
        p.y += (p.targetY - p.y) * 0.02 + p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#A9C6EA';
            ctx.globalAlpha = (1 - dist / 100) * 0.2;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Timed sequence
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800); // SV Emblem
    const t2 = setTimeout(() => setStage(2), 2200); // SAI VARSHITH + CSE
    const t3 = setTimeout(() => setStage(3), 3900); // Start fade out
    const t4 = setTimeout(() => onComplete(), 4600); // Done

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#171515] text-[#FFF6E8] overflow-hidden selection:bg-none"
        >
          {/* Canvas Background */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* Vignette & Grain */}
          <div className="absolute inset-0 cinematic-vignette pointer-events-none z-10" />
          <div className="absolute inset-0 grain-overlay opacity-40 pointer-events-none z-10" />

          {/* Central Sequence */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-3xl">
            {/* Stage 1: Abstract SV Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: stage >= 1 ? 1 : 0.8,
                opacity: stage >= 1 ? 1 : 0,
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 relative flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full border border-[#C1121F]/40 border-dashed absolute"
              />

              <div className="w-16 h-16 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#FFF6E8] fill-none">
                  <motion.path
                    d="M 65 28 C 65 18, 35 18, 35 34 C 35 50, 65 50, 65 66 C 65 82, 35 82, 35 72"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    stroke="#FFF6E8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 25 35 L 50 80 L 75 35"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
                    stroke="#C1121F"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Stage 2: Name + Subtitle */}
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <h1 className="font-cinzel text-3xl sm:text-5xl tracking-[0.25em] font-bold text-[#FFF6E8] uppercase">
                    SAI VARSHITH
                  </h1>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="h-px w-8 bg-[#C1121F]" />
                    <p className="font-syne text-xs sm:text-sm tracking-[0.35em] text-[#A9C6EA] uppercase">
                      CSE · DATA SCIENCE
                    </p>
                    <span className="h-px w-8 bg-[#C1121F]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip Button */}
          <button
            onClick={onComplete}
            className="absolute bottom-8 right-8 z-30 font-sans text-[10px] tracking-[0.3em] uppercase text-[#A9C6EA] hover:text-[#FFF6E8] transition-colors border-b border-transparent hover:border-[#C1121F] pb-0.5 cursor-pointer"
          >
            SKIP INITIALIZATION ↵
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
