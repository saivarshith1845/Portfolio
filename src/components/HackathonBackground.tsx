import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const HackathonBackground: React.FC = () => {
  const cursorLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Smooth lerp cursor light tracking within the hackathon section bounds
    const lightToX = gsap.quickTo(cursorLightRef.current, 'x', { duration: 0.7, ease: 'power2.out' });
    const lightToY = gsap.quickTo(cursorLightRef.current, 'y', { duration: 0.7, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const container = cursorLightRef.current?.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Calculate cursor position relative to the hackathon section container
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      lightToX(localX);
      lightToY(localY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#171515]">
      {/* 1. DIGITAL NIGHT PAPER GRAIN OVERLAY */}
      <div className="absolute inset-0 grain-overlay opacity-30 z-10" />

      {/* 2. LARGE CRIMSON ATMOSPHERIC GLOW (Slow continuous float: 26s) */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[#C1121F] opacity-20 blur-[150px] animate-blob-float-1 z-0"
      />

      {/* 3. LARGE POWDER-BLUE ATMOSPHERIC GLOW (Slow continuous opposite float: 32s) */}
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-[#A9C6EA] opacity-25 blur-[160px] animate-blob-float-2 z-0"
      />

      {/* 4. MID-SECTION FOG LIGHT FIELD (36s drift) */}
      <div
        className="absolute top-[35%] left-[25%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#FFF6E8] opacity-05 blur-[140px] animate-blob-float-3 z-0"
      />

      {/* 5. RESTRAINED CURSOR-REACTIVE LIGHT FIELD */}
      <div
        ref={cursorLightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-radial from-[#A9C6EA]/30 via-[#C1121F]/15 to-transparent blur-[90px] z-1 opacity-75"
      />

      {/* 6. TECHNICAL SVG ORBITAL CURVES & HUGE CONSTRUCTION ARCS */}
      <svg
        className="absolute inset-0 w-full h-full z-2 opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="hackathonBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A9C6EA" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#C1121F" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#171515" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="hackathonCrimsonGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C1121F" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#A9C6EA" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#171515" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Huge Rotating Construction Circle 1 (Top Left / 2025 Area) */}
        <g className="animate-arc-rotate-slow origin-[300px_300px]">
          <circle
            cx="300"
            cy="300"
            r="520"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="1.2"
            strokeOpacity="0.25"
            strokeDasharray="14 10 4 10"
          />
          <circle
            cx="300"
            cy="300"
            r="490"
            fill="none"
            stroke="#C1121F"
            strokeWidth="0.8"
            strokeOpacity="0.2"
          />
        </g>

        {/* Huge Rotating Construction Arc 2 (Bottom Right / 2026 Area) */}
        <g className="animate-arc-rotate-reverse origin-[1250px_650px]">
          <circle
            cx="1250"
            cy="650"
            r="650"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="1.4"
            strokeOpacity="0.2"
            strokeDasharray="24 12"
          />
          <path
            d="M 600 650 A 650 650 0 0 1 1250 0"
            fill="none"
            stroke="#C1121F"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </g>

        {/* Technical Curved Line 1 (Top Wave) */}
        <path
          d="M -80 180 C 400 30, 800 350, 1520 140"
          fill="none"
          stroke="url(#hackathonBlueGrad)"
          strokeWidth="1.5"
          className="animate-line-drift-1"
        />

        {/* Technical Curved Line 2 (Mid Wave) */}
        <path
          d="M -50 520 C 500 650, 920 340, 1500 580"
          fill="none"
          stroke="url(#hackathonCrimsonGrad)"
          strokeWidth="1.4"
          className="animate-line-drift-2"
        />

        {/* Sparse Technical Crosshairs & Coordinates */}
        <g opacity="0.45">
          <text x="60" y="80" fill="#A9C6EA" fontSize="10" fontFamily="monospace" fontWeight="bold">
            + 04 // HACKATHON NIGHT ATMOSPHERE
          </text>
          <line x1="45" y1="76" x2="240" y2="76" stroke="#C1121F" strokeWidth="0.8" />

          <text x="1250" y="380" fill="#C1121F" fontSize="10" fontFamily="monospace" fontWeight="bold">
            SYS_MODE: DIGITAL NIGHT
          </text>
          <line x1="1235" y1="376" x2="1410" y2="376" stroke="#A9C6EA" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
};
