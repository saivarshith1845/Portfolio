import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LiquidLightBackgroundProps {
  className?: string;
}

export const LiquidLightBackground: React.FC<LiquidLightBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);
  const blob5Ref = useRef<HTMLDivElement>(null);

  // Parallax on scroll for liquid forms
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollY = window.scrollY;

      // Parallax offsets for liquid forms at different speeds
      if (blob1Ref.current) {
        gsap.set(blob1Ref.current, { y: (scrollY - rect.top) * 0.04 });
      }
      if (blob2Ref.current) {
        gsap.set(blob2Ref.current, { y: (scrollY - rect.top) * -0.07 });
      }
      if (blob3Ref.current) {
        gsap.set(blob3Ref.current, { y: (scrollY - rect.top) * 0.09 });
      }
      if (blob4Ref.current) {
        gsap.set(blob4Ref.current, { y: (scrollY - rect.top) * -0.05 });
      }
      if (blob5Ref.current) {
        gsap.set(blob5Ref.current, { y: (scrollY - rect.top) * 0.03 });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#FFF6E8] ${className}`}
    >
      {/* 1. Subtle Editorial Paper Grain Texture Overlay */}
      <div className="absolute inset-0 grain-overlay opacity-25 z-10" />

      {/* 2. Soft Atmospheric Lighting & Translucent Refraction Base */}
      <div className="absolute inset-0 bg-[#FFF6E8] z-0" />

      {/* ========================================================================= */}
      {/* 3-5 HUGE SOFT ORGANIC TRANSLUCENT FORMS (30-60s Slow Breathing Cycles) */}
      {/* NO SVG LINES, NO MOVING CURVES, NO TECHNICAL GRIDS */}
      {/* ========================================================================= */}

      {/* FORM 1: Large Powder Blue Translucent Liquid Light Blob (Top-Left) */}
      <div
        ref={blob1Ref}
        className="absolute top-[-15%] left-[-10%] w-[700px] sm:w-[950px] h-[700px] sm:h-[950px] rounded-full bg-[#A9C6EA] opacity-35 blur-[140px] animate-liquid-morph-1 z-1"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* FORM 2: Subtle Crimson Translucent Atmospheric Glass Blob (Bottom-Right) */}
      <div
        ref={blob2Ref}
        className="absolute bottom-[-15%] right-[-10%] w-[650px] sm:w-[880px] h-[650px] sm:h-[880px] rounded-full bg-[#C1121F] opacity-18 blur-[160px] animate-liquid-morph-2 z-1"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* FORM 3: Warm Ivory & Powder Blue Refraction Layer (Center-Right Breathing Blob) */}
      <div
        ref={blob3Ref}
        className="absolute top-[30%] right-[10%] w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-radial from-[#A9C6EA]/40 via-[#FFF6E8]/20 to-transparent blur-[130px] animate-liquid-morph-3 z-2"
        style={{ mixBlendMode: 'normal' }}
      />

      {/* FORM 4: Dark Charcoal Soft Atmospheric Liquid Flare (Center-Left) */}
      <div
        ref={blob4Ref}
        className="absolute top-[45%] left-[5%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#171515] opacity-[0.06] blur-[150px] animate-liquid-morph-4 z-1"
      />

      {/* FORM 5: Overlapping Crimson-Powder Refraction Prism Form (Center Overlay) */}
      <div
        ref={blob5Ref}
        className="absolute top-[20%] left-[30%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-radial from-[#C1121F]/15 via-[#A9C6EA]/25 to-transparent blur-[120px] animate-liquid-morph-5 z-2"
        style={{ mixBlendMode: 'overlay' }}
      />
    </div>
  );
};
