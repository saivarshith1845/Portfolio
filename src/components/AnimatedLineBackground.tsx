import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedLineBackgroundProps {
  variant?: 'light' | 'dark'; // 'light' for warm ivory (#FFF6E8), 'dark' for hackathons (#171515)
  className?: string;
}

export const AnimatedLineBackground: React.FC<AnimatedLineBackgroundProps> = ({
  variant = 'light',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Subtle parallax & cursor drift effect using GSAP quickTo
    const setX = gsap.quickTo(svgRef.current, 'x', { duration: 1.2, ease: 'power2.out' });
    const setY = gsap.quickTo(svgRef.current, 'y', { duration: 1.2, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const normX = (clientX / innerWidth - 0.5) * 2; // [-1, 1]
      const normY = (clientY / innerHeight - 0.5) * 2; // [-1, 1]

      // Extremely subtle cursor influence (max 10px shift)
      setX(normX * 10);
      setY(normY * 6);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isDark = variant === 'dark';

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none ${className}`}
    >
      <svg
        ref={svgRef}
        className={`w-full h-full ${isDark ? 'opacity-50 sm:opacity-65' : 'opacity-65 sm:opacity-75'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Light mode gradients (Ivory background) */}
          <linearGradient id="lineGradCrimsonLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C1121F" stopOpacity="0.30" />
            <stop offset="50%" stopColor="#A9C6EA" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C1121F" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id="lineGradPowderLight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A9C6EA" stopOpacity="0.40" />
            <stop offset="60%" stopColor="#C1121F" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#A9C6EA" stopOpacity="0.04" />
          </linearGradient>

          {/* Dark mode gradients (Hackathon background) */}
          <linearGradient id="lineGradCrimsonDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C1121F" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#A9C6EA" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#171515" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="lineGradPowderDark" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A9C6EA" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#C1121F" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#171515" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* LINE 1: Primary Flowing S-Curve (Top Wave) - Visible on all screens */}
        <path
          d="M -150 180 C 350 40, 780 340, 1600 120"
          fill="none"
          stroke={isDark ? "url(#lineGradPowderDark)" : "url(#lineGradPowderLight)"}
          strokeWidth="1.4"
          className="animate-line-drift-1 origin-center"
        />

        {/* LINE 2: Secondary Flowing Wave (Mid-Upper) - Visible on all screens */}
        <path
          d="M -100 420 C 480 580, 920 240, 1560 480"
          fill="none"
          stroke={isDark ? "url(#lineGradCrimsonDark)" : "url(#lineGradCrimsonLight)"}
          strokeWidth="1.3"
          className="animate-line-drift-2 origin-center"
        />

        {/* LINE 3: Tertiary Organic Flow (Lower Wave) - Visible on all screens */}
        <path
          d="M -180 680 C 400 780, 880 440, 1620 720"
          fill="none"
          stroke={isDark ? "url(#lineGradPowderDark)" : "url(#lineGradPowderLight)"}
          strokeWidth="1.4"
          className="animate-line-drift-3 origin-center"
        />

        {/* LINE 4: Quaternary Sweeping Curve (Bottom) - Visible on tablet & desktop */}
        <path
          d="M -120 820 C 450 640, 980 910, 1580 780"
          fill="none"
          stroke={isDark ? "url(#lineGradCrimsonDark)" : "url(#lineGradCrimsonLight)"}
          strokeWidth="1.1"
          className="animate-line-drift-1 origin-center hidden sm:block"
        />

        {/* LINE 5: Quintary Atmospheric Diagonal Flow - Visible on desktop */}
        <path
          d="M -80 260 C 520 760, 840 140, 1520 860"
          fill="none"
          stroke={isDark ? "url(#lineGradPowderDark)" : "url(#lineGradPowderLight)"}
          strokeWidth="1.2"
          className="animate-line-drift-2 origin-center hidden lg:block"
        />

        {/* Subtle Architectural Construction Arcs for Editorial Depth */}
        <g className="animate-arc-rotate-slow origin-[320px_320px]">
          <circle
            cx="320"
            cy="320"
            r="480"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="1.2"
            strokeOpacity={isDark ? "0.12" : "0.18"}
            strokeDasharray="14 10 4 10"
          />
          <circle
            cx="320"
            cy="320"
            r="450"
            fill="none"
            stroke="#C1121F"
            strokeWidth="0.8"
            strokeOpacity={isDark ? "0.10" : "0.14"}
          />
        </g>

        <g className="animate-arc-rotate-reverse origin-[1220px_680px]">
          <circle
            cx="1220"
            cy="680"
            r="620"
            fill="none"
            stroke="#A9C6EA"
            strokeWidth="1.4"
            strokeOpacity={isDark ? "0.12" : "0.16"}
            strokeDasharray="20 10 5 10"
          />
          <path
            d="M 600 680 A 620 620 0 0 1 1220 60"
            fill="none"
            stroke="#C1121F"
            strokeWidth="1"
            strokeOpacity={isDark ? "0.12" : "0.15"}
          />
        </g>
      </svg>
    </div>
  );
};
