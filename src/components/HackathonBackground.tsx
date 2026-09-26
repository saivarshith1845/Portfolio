import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AnimatedLineBackground } from './AnimatedLineBackground';

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
      <div className="absolute inset-0 grain-overlay opacity-25 z-10" />

      {/* 2. RESTRAINED CRIMSON ATMOSPHERIC GLOW (Shifted away from text content) */}
      <div
        className="absolute top-[-25%] left-[-15%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[#C1121F] opacity-12 blur-[180px] animate-blob-float-1 z-0"
      />

      {/* 3. RESTRAINED POWDER-BLUE ATMOSPHERIC GLOW (Shifted further out to bottom-right corner, low opacity) */}
      <div
        className="absolute bottom-[-25%] right-[-15%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-[#A9C6EA] opacity-10 blur-[180px] animate-blob-float-2 z-0"
      />

      {/* 4. MID-SECTION FOG LIGHT FIELD */}
      <div
        className="absolute top-[35%] left-[20%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#FFF6E8] opacity-04 blur-[160px] animate-blob-float-3 z-0"
      />

      {/* 5. RESTRAINED CURSOR-REACTIVE LIGHT FIELD (Subtle background ambience) */}
      <div
        ref={cursorLightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-radial from-[#A9C6EA]/12 via-[#C1121F]/08 to-transparent blur-[120px] z-1 opacity-40"
      />

      {/* 6. REUSABLE ANIMATED FLOWING CURVED LINES (DARK CINEMATIC VARIANT) */}
      <AnimatedLineBackground variant="dark" />

      {/* 7. SPARSE TECHNICAL COORDINATES */}
      <div className="absolute bottom-6 left-8 font-mono text-[9px] text-[#A9C6EA]/40 uppercase tracking-widest hidden sm:block pointer-events-none">
        + 04 // HACKATHON ATMOSPHERE
      </div>
      <div className="absolute bottom-6 right-8 font-mono text-[9px] text-[#C1121F]/40 uppercase tracking-widest hidden sm:block pointer-events-none">
        SYS_MODE: DIGITAL NIGHT
      </div>
    </div>
  );
};
