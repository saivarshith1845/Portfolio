import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FinathonAwardBackgroundProps {
  className?: string;
}

export const FinathonAwardBackground: React.FC<FinathonAwardBackgroundProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current?.parentElement;
    if (!container || !spotlightRef.current) return;

    // Smooth quickTo interpolation for interactive holographic foil light effect
    const setX = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
    const setY = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.6, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      setX(localX);
      setY(localY);

      gsap.to(spotlightRef.current, {
        opacity: 0.85,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(spotlightRef.current, {
        opacity: 0.35,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 rounded-xs bg-[#171515] ${className}`}
    >
      {/* 1. Film grain noise texture */}
      <div className="absolute inset-0 grain-overlay opacity-30 z-10" />

      {/* 2. Deep Obsidian Ambient Base with Subtle Metallic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1d1818] via-[#171515] to-[#121010] z-0" />

      {/* 3. Prestigious Trophy Stage Lighting (Crimson + Warm Bronze Glow) */}
      <div className="absolute top-[-20%] left-[25%] -translate-x-1/2 w-[550px] sm:w-[750px] h-[450px] sm:h-[550px] rounded-full bg-radial from-[#C1121F]/25 via-[#E49A48]/12 to-transparent blur-[110px] animate-pulse-glow z-1" />

      {/* 4. Opposing Rim Lighting (Cool Powder-Blue Reflection) */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] sm:w-[650px] h-[400px] sm:h-[500px] rounded-full bg-radial from-[#A9C6EA]/16 via-[#A9C6EA]/04 to-transparent blur-[120px] z-1" />

      {/* 5. Interactive Cursor Holographic Foil Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-radial from-[#FFF6E8]/14 via-[#C1121F]/10 via-[#A9C6EA]/08 to-transparent blur-[80px] z-2 opacity-35 transition-opacity duration-500"
      />

      {/* 6. FinTech Security Guilloche & Award Construction SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 sm:opacity-40 z-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="awardGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C1121F" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#E49A48" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A9C6EA" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="fintechWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C1121F" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#A9C6EA" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#171515" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="fintechWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A9C6EA" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#E49A48" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C1121F" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Financial Intelligence Wave Streams (Guilloche Curves) */}
        <path
          d="M -100 120 C 240 20, 480 260, 840 80 S 1220 220, 1340 100"
          fill="none"
          stroke="url(#fintechWaveGrad1)"
          strokeWidth="1.2"
        />
        <path
          d="M -80 150 C 260 50, 500 290, 860 110 S 1240 250, 1360 130"
          fill="none"
          stroke="url(#fintechWaveGrad1)"
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
        <path
          d="M -60 180 C 280 80, 520 320, 880 140 S 1260 280, 1380 160"
          fill="none"
          stroke="url(#fintechWaveGrad2)"
          strokeWidth="1.2"
        />
        <path
          d="M -40 210 C 300 110, 540 350, 900 170 S 1280 310, 1400 190"
          fill="none"
          stroke="url(#fintechWaveGrad2)"
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />

        {/* Lower Harmonic Curve */}
        <path
          d="M -120 420 C 320 540, 680 320, 1020 480 S 1280 360, 1380 440"
          fill="none"
          stroke="url(#fintechWaveGrad1)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />

        {/* Award Rosette Arcs & Precision Telemetry Rings */}
        <g className="origin-[1050px_160px] animate-arc-rotate-slow">
          <circle
            cx="1050"
            cy="160"
            r="280"
            fill="none"
            stroke="#E49A48"
            strokeWidth="1"
            strokeOpacity="0.22"
            strokeDasharray="16 8 4 8"
          />
          <circle
            cx="1050"
            cy="160"
            r="250"
            fill="none"
            stroke="#C1121F"
            strokeWidth="0.8"
            strokeOpacity="0.2"
          />
          <circle
            cx="1050"
            cy="160"
            r="220"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="1"
            strokeOpacity="0.18"
            strokeDasharray="8 6"
          />
        </g>

        {/* Secondary Decorative Telemetry Rings (Left Side) */}
        <g className="origin-[160px_460px] animate-arc-rotate-reverse">
          <circle
            cx="160"
            cy="460"
            r="190"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="0.9"
            strokeOpacity="0.18"
            strokeDasharray="12 6"
          />
          <circle
            cx="160"
            cy="460"
            r="160"
            fill="none"
            stroke="#C1121F"
            strokeWidth="0.7"
            strokeOpacity="0.15"
          />
        </g>
      </svg>

      {/* 7. Prestigious Award Watermark (Roman Numeral III / 3RD PLACE) */}
      <div className="absolute right-4 sm:right-10 bottom-2 pointer-events-none select-none z-1 overflow-hidden opacity-[0.06] flex flex-col items-end">
        <span className="font-cinzel text-8xl sm:text-[12rem] font-black text-[#FFF6E8] leading-none tracking-tighter">
          III
        </span>
      </div>

      {/* 8. Micro Dot Matrix Texture (FinTech Transaction Grid) */}
      <div
        className="absolute inset-0 opacity-[0.06] z-1 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 246, 232, 0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* 9. Perimeter Technical Registration Marks (Precision Award Crafting) */}
      <div className="absolute top-2.5 left-3 font-mono text-[9px] text-[#A9C6EA]/40 uppercase tracking-widest hidden sm:block">
        [AWARD_REF: FIN_2026_03]
      </div>
      <div className="absolute top-2.5 right-3 font-mono text-[9px] text-[#E49A48]/50 uppercase tracking-widest hidden sm:block">
        VERIFIED_PODIUM // 3RD PLACE
      </div>
    </div>
  );
};
