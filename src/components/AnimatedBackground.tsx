import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AnimatedLineBackground } from './AnimatedLineBackground';

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
        className="absolute top-[-10%] left-[-15%] w-[800px] sm:w-[1000px] h-[800px] sm:h-[1000px] rounded-full bg-[#A9C6EA] opacity-25 blur-[140px] animate-blob-float-1 z-0"
      />

      {/* 3. LARGE CRIMSON ORGANIC BLOB (Slow continuous opposite float: 34s) */}
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-[#C1121F] opacity-12 blur-[150px] animate-blob-float-2 z-0"
      />

      {/* 4. SECONDARY POWDER-BLUE ATMOSPHERIC FIELD (Mid-page drift: 38s) */}
      <div
        className="absolute top-[45%] right-[-15%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[#A9C6EA] opacity-20 blur-[130px] animate-blob-float-3 z-0"
      />

      {/* 5. DYNAMIC CURSOR FOLLOWING LIGHT FIELD */}
      <div
        ref={cursorLightRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-[#A9C6EA]/20 via-[#FFF6E8]/10 to-transparent blur-[80px] z-1 transition-opacity duration-500"
        style={{ opacity: isNearPortrait ? 0.35 : 0.7 }}
      />

      {/* 6. PORTRAIT ILLUMINATION LIGHT FIELD */}
      <div
        ref={portraitLightRef}
        className={`fixed top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-[#A9C6EA]/35 via-[#C1121F]/12 to-transparent blur-[100px] z-1 transition-all duration-700 ease-out ${
          isNearPortrait ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
        }`}
      />

      {/* 7. REUSABLE ANIMATED FLOWING CURVED LINES */}
      <AnimatedLineBackground variant="light" />
    </div>
  );
};

