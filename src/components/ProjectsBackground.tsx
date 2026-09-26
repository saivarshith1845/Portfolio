import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const ProjectsBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 at StudyFlow, 1 at Time Pilot Aid

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Scroll progress tracking inside Projects section to shift powder blue -> crimson current
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Subtle non-aggressive cursor reaction (bending current slightly toward mouse)
    const setX = gsap.quickTo(svgRef.current, 'x', { duration: 1.4, ease: 'power2.out' });
    const setY = gsap.quickTo(svgRef.current, 'y', { duration: 1.4, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      // Subtle current disturbance (max 14px shift)
      setX(normX * 14);
      setY(normY * 10);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#171515]"
    >
      {/* 1. DIGITAL NIGHT PAPER GRAIN NOISE OVERLAY */}
      <div className="absolute inset-0 grain-overlay opacity-25 z-10" />

      {/* 2. LAYER 1: BACK ATMOSPHERIC GLOW FIELDS */}
      {/* Powder Blue Atmosphere (Emphasized near StudyFlow, top-left) */}
      <div
        className="absolute top-[-10%] left-[-15%] w-[800px] sm:w-[1100px] h-[800px] sm:h-[1100px] rounded-full bg-[#A9C6EA] blur-[170px] animate-blob-float-1 z-0 transition-opacity duration-1000 ease-out"
        style={{ opacity: 0.28 * (1 - scrollProgress * 0.5) }}
      />

      {/* Crimson Atmosphere (Emphasized near Time Pilot Aid, bottom-right) */}
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[850px] sm:w-[1150px] h-[850px] sm:h-[1150px] rounded-full bg-[#C1121F] blur-[180px] animate-blob-float-2 z-0 transition-opacity duration-1000 ease-out"
        style={{ opacity: 0.12 + scrollProgress * 0.18 }}
      />

      {/* Mid-Section Secondary Flow Field */}
      <div
        className="absolute top-[45%] left-[25%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[#FFF6E8] opacity-05 blur-[150px] animate-blob-float-3 z-0"
      />

      {/* 3. LAYER 2 & 3: ENORMOUS MOVING "PROJECT CURRENT" BANDS & CONTOUR LINES */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full z-2 opacity-80 sm:opacity-90"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Main Current Gradient 1 (Powder Blue Dominant -> Crimson Accent) */}
          <linearGradient id="currentGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A9C6EA" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#C1121F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFF6E8" stopOpacity="0.08" />
          </linearGradient>

          {/* Main Current Gradient 2 (Crimson Dominant -> Powder Blue Accent) */}
          <linearGradient id="currentGradRed" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C1121F" stopOpacity="0.42" />
            <stop offset="60%" stopColor="#A9C6EA" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#171515" stopOpacity="0" />
          </linearGradient>

          {/* Ribbon Fill Gradient 1 */}
          <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#A9C6EA" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#C1121F" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#171515" stopOpacity="0" />
          </linearGradient>

          {/* Ribbon Fill Gradient 2 */}
          <linearGradient id="ribbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C1121F" stopOpacity="0.14" />
            <stop offset="70%" stopColor="#A9C6EA" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#171515" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ============================================================ */}
        {/* ENORMOUS ABSTRACT FLOWING BANDS / RIBBONS (MIDDLE LAYER) */}
        {/* ============================================================ */}

        {/* BAND 1: Upper Powder Blue Current Ribbon */}
        <path
          d="M -250 120 Q 380 -80, 850 280 T 1750 140 L 1750 320 Q 950 420, 320 60 Z"
          fill="url(#ribbonGrad1)"
          className="animate-current-flow-1 origin-center"
        />

        {/* BAND 2: Mid-Section Diagonal Crimson Ribbon */}
        <path
          d="M -200 480 Q 420 680, 980 320 T 1700 580 L 1700 740 Q 920 480, 350 820 Z"
          fill="url(#ribbonGrad2)"
          className="animate-current-flow-2 origin-center"
        />

        {/* BAND 3: Lower Sweeping Current Ribbon */}
        <path
          d="M -220 720 Q 480 920, 1050 540 T 1720 820 L 1720 950 Q 980 720, 380 1020 Z"
          fill="url(#ribbonGrad1)"
          className="animate-current-flow-3 origin-center hidden sm:block"
        />

        {/* ============================================================ */}
        {/* 5-8 THIN TOPOGRAPHIC / DATA CONTOUR LINES (FRONT LAYER) */}
        {/* ============================================================ */}

        {/* Contour Line 1: Upper Sweeping Wave */}
        <path
          d="M -180 160 C 320 20, 750 360, 1650 100"
          fill="none"
          stroke="url(#currentGradBlue)"
          strokeWidth="1.6"
          className="animate-current-flow-1 origin-center"
        />

        {/* Contour Line 2: Upper Complement Wave */}
        <path
          d="M -150 220 C 350 80, 780 420, 1620 160"
          fill="none"
          stroke="#A9C6EA"
          strokeWidth="1.1"
          strokeOpacity="0.25"
          className="animate-current-flow-3 origin-center"
        />

        {/* Contour Line 3: Mid-Upper S-Curve */}
        <path
          d="M -120 420 C 450 620, 920 260, 1600 440"
          fill="none"
          stroke="url(#currentGradRed)"
          strokeWidth="1.5"
          className="animate-current-flow-2 origin-center"
        />

        {/* Contour Line 4: Mid-Lower Topographic Flow */}
        <path
          d="M -160 560 C 420 720, 950 380, 1640 580"
          fill="none"
          stroke="#C1121F"
          strokeWidth="1.2"
          strokeOpacity="0.28"
          className="animate-current-flow-4 origin-center"
        />

        {/* Contour Line 5: Lower Sweeping Wave */}
        <path
          d="M -200 740 C 380 880, 880 480, 1680 760"
          fill="none"
          stroke="url(#currentGradBlue)"
          strokeWidth="1.6"
          className="animate-current-flow-3 origin-center"
        />

        {/* Contour Line 6: Bottom Edge Accent */}
        <path
          d="M -140 840 C 420 680, 980 940, 1620 820"
          fill="none"
          stroke="url(#currentGradRed)"
          strokeWidth="1.2"
          className="animate-current-flow-1 origin-center hidden sm:block"
        />

        {/* Contour Line 7: Warm Ivory Fine Data Stream (Topography) */}
        <path
          d="M -100 320 C 520 180, 840 620, 1550 280"
          fill="none"
          stroke="#FFF6E8"
          strokeWidth="1.0"
          strokeOpacity="0.20"
          strokeDasharray="12 6"
          className="animate-current-flow-4 origin-center hidden sm:block"
        />

        {/* Contour Line 8: Powder Blue Fine Data Stream */}
        <path
          d="M -220 640 C 350 480, 890 780, 1600 520"
          fill="none"
          stroke="#A9C6EA"
          strokeWidth="1.0"
          strokeOpacity="0.22"
          strokeDasharray="16 8 4 8"
          className="animate-current-flow-2 origin-center hidden lg:block"
        />
      </svg>
    </div>
  );
};
