import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const AnimatedBackground: React.FC = () => {
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const portraitLightRef = useRef<HTMLDivElement>(null);
  const [isNearPortrait, setIsNearPortrait] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Smooth lerp cursor light tracking
    const lightToX = gsap.quickTo(cursorLightRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
    const lightToY = gsap.quickTo(cursorLightRef.current, 'y', { duration: 0.6, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      lightToX(e.clientX);
      lightToY(e.clientY);

      // Check proximity to portrait card
      const portraitEl = document.getElementById('portrait-card');
      if (portraitEl) {
        const rect = portraitEl.getBoundingClientRect();
        const padding = 160;
        const near =
          e.clientX >= rect.left - padding &&
          e.clientX <= rect.right + padding &&
          e.clientY >= rect.top - padding &&
          e.clientY <= rect.bottom + padding;

        setIsNearPortrait(near);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#FFF6E8]">
      {/* 1. SUBTLE PAPER GRAIN OVERLAY */}
      <div className="absolute inset-0 grain-overlay opacity-35 z-10" />

      {/* 2. LARGE POWDER-BLUE ORGANIC BLOB (Slow continuous float: 28s) */}
      <div
        className="absolute top-[-10%] left-[-15%] w-[800px] sm:w-[1000px] h-[800px] sm:h-[1000px] rounded-full bg-[#A9C6EA] opacity-30 blur-[130px] animate-blob-float-1 z-0"
      />

      {/* 3. LARGE CRIMSON ORGANIC BLOB (Slow continuous opposite float: 34s) */}
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-[#C1121F] opacity-15 blur-[140px] animate-blob-float-2 z-0"
      />

      {/* 4. SECONDARY POWDER-BLUE ATMOSPHERIC FIELD (Mid-page drift: 38s) */}
      <div
        className="absolute top-[45%] right-[-15%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[#A9C6EA] opacity-25 blur-[120px] animate-blob-float-3 z-0"
      />

      {/* 5. DYNAMIC CURSOR FOLLOWING LIGHT FIELD */}
      <div
        ref={cursorLightRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-[#A9C6EA]/25 via-[#FFF6E8]/10 to-transparent blur-[80px] z-1 transition-opacity duration-500"
        style={{ opacity: isNearPortrait ? 0.35 : 0.8 }}
      />

      {/* 6. PORTRAIT ILLUMINATION LIGHT FIELD (Active when hovering near portrait) */}
      <div
        ref={portraitLightRef}
        className={`fixed top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-[#A9C6EA]/40 via-[#C1121F]/15 to-transparent blur-[100px] z-1 transition-all duration-700 ease-out ${
          isNearPortrait ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
        }`}
      />

      {/* 7. VISIBLE FLOWING CURVED SVG LINES & PARTIAL ARCS */}
      <svg
        className="absolute inset-0 w-full h-full z-2 opacity-80"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="blueLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A9C6EA" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#C1121F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#A9C6EA" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="redLineGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C1121F" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#A9C6EA" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFF6E8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Huge Rotating Construction Arc 1 (Top Left / Hero Area) */}
        <g className="animate-arc-rotate-slow origin-[350px_350px]">
          <circle
            cx="350"
            cy="350"
            r="480"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="1.2"
            strokeOpacity="0.3"
            strokeDasharray="12 8 4 8"
          />
          <circle
            cx="350"
            cy="350"
            r="450"
            fill="none"
            stroke="#C1121F"
            strokeWidth="0.8"
            strokeOpacity="0.2"
          />
        </g>

        {/* Huge Rotating Construction Arc 2 (Bottom Right / Projects & Contact) */}
        <g className="animate-arc-rotate-reverse origin-[1200px_700px]">
          <circle
            cx="1200"
            cy="700"
            r="620"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="1.5"
            strokeOpacity="0.25"
            strokeDasharray="20 10 5 10"
          />
          <path
            d="M 580 700 A 620 620 0 0 1 1200 80"
            fill="none"
            stroke="#C1121F"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
        </g>

        {/* Flowing Curved Contour Line 1 (Top Wave) */}
        <path
          d="M -100 200 C 350 50, 750 380, 1540 120"
          fill="none"
          stroke="url(#blueLineGrad)"
          strokeWidth="1.6"
          className="animate-line-drift-1"
        />

        {/* Flowing Curved Contour Line 2 (Mid Wave) */}
        <path
          d="M -50 480 C 450 620, 950 310, 1500 550"
          fill="none"
          stroke="url(#redLineGrad)"
          strokeWidth="1.4"
          className="animate-line-drift-2"
        />

        {/* Flowing Curved Contour Line 3 (Lower Wave) */}
        <path
          d="M -150 750 C 400 600, 850 880, 1600 700"
          fill="none"
          stroke="url(#blueLineGrad)"
          strokeWidth="1.5"
          className="animate-line-drift-3"
        />

        {/* Sparse Editorial Technical Markers */}
        <g opacity="0.4">
          <text x="60" y="90" fill="#171515" fontSize="10" fontFamily="monospace" fontWeight="bold">
            + 01 // ANIMATED CANVAS
          </text>
          <line x1="45" y1="86" x2="190" y2="86" stroke="#C1121F" strokeWidth="0.8" />

          <text x="1280" y="420" fill="#C1121F" fontSize="10" fontFamily="monospace" fontWeight="bold">
            02 // ATMOSPHERIC FIELD
          </text>
          <line x1="1265" y1="416" x2="1420" y2="416" stroke="#171515" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
};
