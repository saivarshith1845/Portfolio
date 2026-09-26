import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedLightBackgroundProps {
  className?: string;
  seed?: number;
}

export const AnimatedLightBackground: React.FC<AnimatedLightBackgroundProps> = ({
  className = '',
  seed = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Subtle non-aggressive cursor influence
    const setX = gsap.quickTo(svgRef.current, 'x', { duration: 1.4, ease: 'power2.out' });
    const setY = gsap.quickTo(svgRef.current, 'y', { duration: 1.4, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      setX(normX * 10);
      setY(normY * 6);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Compute slight variation per section seed so each section has unique organic line flows
  const offset = (seed - 1) * 75;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#FFF6E8] ${className}`}
    >
      {/* 1. SUBTLE PAPER GRAIN OVERLAY */}
      <div className="absolute inset-0 grain-overlay opacity-30 z-10" />

      {/* 2. ATMOSPHERIC DRIFTING LIGHTING (70% Warm Ivory, 20% Powder Blue, 10% Crimson) */}
      {/* Soft powder-blue glow (Top Left / Mid) */}
      <div
        className="absolute top-[-10%] left-[-15%] w-[750px] sm:w-[950px] h-[750px] sm:h-[950px] rounded-full bg-[#A9C6EA] opacity-20 sm:opacity-25 blur-[140px] animate-blob-float-1 z-0"
      />

      {/* Very subtle crimson glow (Bottom Right / Mid) */}
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[#C1121F] opacity-10 sm:opacity-12 blur-[150px] animate-blob-float-2 z-0"
      />

      {/* Secondary powder-blue atmosphere field */}
      <div
        className="absolute top-[40%] right-[-15%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-[#A9C6EA] opacity-15 sm:opacity-20 blur-[130px] animate-blob-float-3 z-0"
      />

      {/* 3. 3-5 LARGE CONTINUOUSLY MOVING FLOWING CURVED SVG LINES */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full z-2 opacity-75 sm:opacity-85"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`lightGradPowder_${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A9C6EA" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#C1121F" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#A9C6EA" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id={`lightGradCrimson_${seed}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C1121F" stopOpacity="0.38" />
            <stop offset="65%" stopColor="#A9C6EA" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FFF6E8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* LINE 1: Primary S-Curve (Top Wave) */}
        <path
          d={`M -150 ${180 + offset * 0.2} C 350 ${40 - offset * 0.3}, 780 ${340 + offset * 0.2}, 1600 120`}
          fill="none"
          stroke={`url(#lightGradPowder_${seed})`}
          strokeWidth="1.5"
          className="animate-line-drift-1 origin-center"
        />

        {/* LINE 2: Secondary Wave (Mid-Upper) */}
        <path
          d={`M -100 ${420 - offset * 0.2} C 480 ${580 + offset * 0.2}, 920 ${240 - offset * 0.3}, 1560 480`}
          fill="none"
          stroke={`url(#lightGradCrimson_${seed})`}
          strokeWidth="1.3"
          className="animate-line-drift-2 origin-center"
        />

        {/* LINE 3: Tertiary Wave (Lower Organic Flow) */}
        <path
          d={`M -180 ${680 + offset * 0.1} C 400 ${780 - offset * 0.2}, 880 ${440 + offset * 0.3}, 1620 720`}
          fill="none"
          stroke={`url(#lightGradPowder_${seed})`}
          strokeWidth="1.4"
          className="animate-line-drift-3 origin-center"
        />

        {/* LINE 4: Sweeping Curve (Tablet & Desktop) */}
        <path
          d={`M -120 ${820 - offset * 0.3} C 450 ${640 + offset * 0.1}, 980 ${910 - offset * 0.2}, 1580 780`}
          fill="none"
          stroke={`url(#lightGradCrimson_${seed})`}
          strokeWidth="1.1"
          className="animate-line-drift-4 origin-center hidden sm:block"
        />

        {/* LINE 5: Atmospheric Diagonal Flow (Desktop) */}
        <path
          d={`M -80 ${260 + offset * 0.4} C 520 ${760 - offset * 0.2}, 840 ${140 + offset * 0.1}, 1520 860`}
          fill="none"
          stroke={`url(#lightGradPowder_${seed})`}
          strokeWidth="1.2"
          className="animate-line-drift-2 origin-center hidden lg:block"
        />

        {/* Architectural Construction Arcs */}
        <g className="animate-arc-rotate-slow origin-[350px_350px]">
          <circle
            cx="350"
            cy="350"
            r="480"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="1.2"
            strokeOpacity="0.20"
            strokeDasharray="14 10 4 10"
          />
          <circle
            cx="350"
            cy="350"
            r="450"
            fill="none"
            stroke="#C1121F"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />
        </g>

        <g className="animate-arc-rotate-reverse origin-[1200px_680px]">
          <circle
            cx="1200"
            cy="680"
            r="620"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="1.4"
            strokeOpacity="0.18"
            strokeDasharray="20 10 5 10"
          />
          <path
            d="M 580 680 A 620 620 0 0 1 1200 60"
            fill="none"
            stroke="#C1121F"
            strokeWidth="1"
            strokeOpacity="0.15"
          />
        </g>
      </svg>
    </div>
  );
};
