import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const [hoverState, setHoverState] = useState<'default' | 'interactive' | 'portrait' | 'red'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable completely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const light = lightRef.current;

    if (!dot || !ring || !light) return;

    // Fast tracking for micro dot (120fps)
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });

    // Smooth lag tracking for cursor ring
    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'power3.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'power3.out' });

    // Soft interpolated physical light lag (250-400px light beam)
    const xLightTo = gsap.quickTo(light, 'x', { duration: 0.6, ease: 'power2.out' });
    const yLightTo = gsap.quickTo(light, 'y', { duration: 0.6, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const { clientX, clientY } = e;
      xDotTo(clientX);
      yDotTo(clientY);
      xRingTo(clientX);
      yRingTo(clientY);
      xLightTo(clientX);
      yLightTo(clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const portraitTarget = target.closest('[data-cursor="portrait"], #portrait-card, .portrait-container');
      const redTextTarget = target.closest('[data-cursor="red"], .text-\\[\\#C1121F\\], .text-[#C1121F]');
      const interactiveTarget = target.closest(
        'a, button, [role="button"], input, select, textarea, .interactive, [data-cursor="hover"]'
      );

      if (portraitTarget) {
        setHoverState('portrait');
      } else if (redTextTarget) {
        setHoverState('red');
      } else if (interactiveTarget) {
        setHoverState('interactive');
      } else {
        setHoverState('default');
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  // Calculate dynamic light halo styles based on hover context
  let lightScale = 1;
  let lightOpacity = 0.25;
  let lightBackground =
    'radial-gradient(circle, rgba(169, 198, 234, 0.3) 0%, rgba(255, 246, 232, 0.2) 45%, transparent 70%)';

  if (hoverState === 'portrait') {
    lightScale = 1.65;
    lightOpacity = 0.48;
    lightBackground =
      'radial-gradient(circle, rgba(169, 198, 234, 0.45) 0%, rgba(255, 246, 232, 0.4) 40%, rgba(193, 18, 31, 0.12) 65%, transparent 80%)';
  } else if (hoverState === 'red') {
    lightScale = 1.35;
    lightOpacity = 0.38;
    lightBackground =
      'radial-gradient(circle, rgba(193, 18, 31, 0.32) 0%, rgba(169, 198, 234, 0.2) 50%, transparent 75%)';
  } else if (hoverState === 'interactive') {
    lightScale = 1.25;
    lightOpacity = 0.35;
    lightBackground =
      'radial-gradient(circle, rgba(255, 246, 232, 0.45) 0%, rgba(169, 198, 234, 0.25) 50%, transparent 75%)';
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-40 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Soft Cursor-Following Light Beam (350px Radius, Extremely Blurred) */}
      <div
        ref={lightRef}
        className="fixed top-0 left-0 w-[350px] h-[350px] -ml-[175px] -mt-[175px] rounded-full pointer-events-none z-30 transition-all duration-700 ease-out blur-[70px]"
        style={{
          transform: `scale(${lightScale})`,
          opacity: lightOpacity,
          background: lightBackground,
        }}
      />

      {/* Subtle Outer Micro Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#A9C6EA]/40 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          transform: `scale(${hoverState !== 'default' ? 1.6 : 1})`,
          borderColor: hoverState === 'red' ? 'rgba(193, 18, 31, 0.7)' : 'rgba(169, 198, 234, 0.45)',
          backgroundColor: hoverState === 'portrait' ? 'rgba(169, 198, 234, 0.15)' : 'transparent',
        }}
      />

      {/* Center Micro Point */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-0.75 -mt-0.75 bg-[#C1121F] rounded-full pointer-events-none z-50 transition-transform duration-150 ease-out"
        style={{
          transform: `scale(${hoverState !== 'default' ? 1.4 : 1})`,
        }}
      />
    </div>
  );
};
