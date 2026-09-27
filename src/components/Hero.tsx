import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface HeroProps {
  isIntroComplete?: boolean;
  onReplayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isIntroComplete = true, onReplayIntro }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation Target Refs
  const tagRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const saiRef = useRef<HTMLHeadingElement>(null);
  const varshithRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLButtonElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  // Background & Parallax Refs
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const portalGlowRef = useRef<HTMLDivElement>(null);
  const bgFormsRef = useRef<HTMLDivElement>(null);
  const bgArcsRef = useRef<SVGSVGElement>(null);

  // Interactive Hover State for Portal Entry
  const [isPortalHovered, setIsPortalHovered] = useState(false);

  // GSAP quickTo setters for 120fps smooth cursor reactivity
  const mouseTo = useRef<{
    lightX?: gsap.QuickToFunc;
    lightY?: gsap.QuickToFunc;
    saiX?: gsap.QuickToFunc;
    saiY?: gsap.QuickToFunc;
    varshithX?: gsap.QuickToFunc;
    varshithY?: gsap.QuickToFunc;
    bgFormsX?: gsap.QuickToFunc;
    bgFormsY?: gsap.QuickToFunc;
    arcsRotate?: gsap.QuickToFunc;
  }>({});

  // Initialize mouse parallax setters
  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ease = 'power2.out';
    const duration = 0.8;

    mouseTo.current = {
      lightX: cursorLightRef.current ? gsap.quickTo(cursorLightRef.current, 'x', { duration: 0.6, ease }) : undefined,
      lightY: cursorLightRef.current ? gsap.quickTo(cursorLightRef.current, 'y', { duration: 0.6, ease }) : undefined,

      saiX: saiRef.current ? gsap.quickTo(saiRef.current, 'x', { duration: 0.8, ease }) : undefined,
      saiY: saiRef.current ? gsap.quickTo(saiRef.current, 'y', { duration: 0.8, ease }) : undefined,

      varshithX: varshithRef.current ? gsap.quickTo(varshithRef.current, 'x', { duration: 1.1, ease }) : undefined,
      varshithY: varshithRef.current ? gsap.quickTo(varshithRef.current, 'y', { duration: 1.1, ease }) : undefined,

      bgFormsX: bgFormsRef.current ? gsap.quickTo(bgFormsRef.current, 'x', { duration: 1.4, ease }) : undefined,
      bgFormsY: bgFormsRef.current ? gsap.quickTo(bgFormsRef.current, 'y', { duration: 1.4, ease }) : undefined,
    };
  }, []);

  // Handle subtle cursor reactivity
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Mouse coordinates relative to viewport center [-1, 1]
    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;

    // Soft cursor light follow
    mouseTo.current.lightX?.(clientX);
    mouseTo.current.lightY?.(clientY);

    // Subtle 2D display parallax (SAI vs VARSHITH split rates)
    mouseTo.current.saiX?.(normX * -12);
    mouseTo.current.saiY?.(normY * -8);

    mouseTo.current.varshithX?.(normX * -22);
    mouseTo.current.varshithY?.(normY * -14);

    // Subtle ambient background forms shift
    mouseTo.current.bgFormsX?.(normX * 30);
    mouseTo.current.bgFormsY?.(normY * 20);
  };

  // Smooth scroll to ABOUT section when ENTER EXPERIENCE portal button is clicked
  const handleEnterExperience = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll Parallax Handler: Name slowly moves, background layers shift, natural transition to ABOUT
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      if (scrollY > viewportHeight * 1.5) return;

      const progress = Math.min(scrollY / viewportHeight, 1);

      if (saiRef.current) {
        gsap.set(saiRef.current, {
          y: scrollY * 0.35,
          opacity: 1 - progress * 0.85,
        });
      }

      if (varshithRef.current) {
        gsap.set(varshithRef.current, {
          y: scrollY * 0.22,
          opacity: 1 - progress * 0.85,
        });
      }

      if (roleRef.current) {
        gsap.set(roleRef.current, {
          y: scrollY * 0.15,
          opacity: 1 - progress * 1.2,
        });
      }

      if (bgFormsRef.current) {
        gsap.set(bgFormsRef.current, {
          y: scrollY * 0.45,
          scale: 1 + progress * 0.1,
          opacity: 1 - progress * 0.7,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Intro Timeline Sequence
  useEffect(() => {
    if (!isIntroComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Set initial states
      gsap.set([tagRef.current, statusRef.current], { opacity: 0, y: -20 });
      gsap.set(saiRef.current, { opacity: 0, y: 50, scale: 0.98 });
      gsap.set(varshithRef.current, { opacity: 0, y: 60, scale: 0.98 });
      gsap.set(roleRef.current, { opacity: 0, y: 25 });
      gsap.set(sublineRef.current, { opacity: 0, y: 20 });
      gsap.set(portalRef.current, { opacity: 0, scale: 0.9, y: 30 });
      gsap.set(scrollIndRef.current, { opacity: 0, y: 20 });

      // Sequential Reveal Sequence:
      // 1. 01 / PORTFOLIO appears
      tl.to([tagRef.current, statusRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
      }, 0.1)

      // 2. SAI appears
      .to(saiRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
      }, 0.35)

      // 3. VARSHITH reveals
      .to(varshithRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out',
      }, 0.55)

      // 4. SOFTWARE DEVELOPER fades in
      .to(roleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
      }, 0.8)

      // 5. CSE • DATA SCIENCE • WEB line
      .to(sublineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, 0.95)

      // 6. ENTER EXPERIENCE portal button appears
      .to(portalRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.85,
        ease: 'back.out(1.4)',
      }, 1.1)

      // 7. ↓ EXPLORE scroll indicator
      .to(scrollIndRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, 1.3);
    }, sectionRef);

    return () => ctx.revert();
  }, [isIntroComplete]);

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 w-full min-h-screen bg-[#FFF6E8] text-[#171515] overflow-hidden flex flex-col justify-between select-none pt-20 pb-8 px-4 sm:px-8 lg:px-12 bg-grid-lines"
    >
      {/* ========================================================================= */}
      {/* DYNAMIC CONTINUOUSLY MOVING HERO BACKGROUND */}
      {/* Colors: #FFF6E8 (Ivory), #C1121F (Crimson), #A9C6EA (Powder Blue), #171515 */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Paper Grain Overlay */}
        <div className="absolute inset-0 grain-overlay opacity-30 z-10" />

        {/* Dynamic Soft Cursor Follow Light (Subtle lighting aura) */}
        <div
          ref={cursorLightRef}
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-radial from-[#A9C6EA]/25 via-[#C1121F]/10 to-transparent blur-[90px] z-1 transition-opacity duration-700 pointer-events-none"
        />

        {/* Ambient Portal Reaction Glow (Expands when hovering portal button) */}
        <div
          ref={portalGlowRef}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-radial from-[#C1121F]/20 via-[#A9C6EA]/25 to-transparent blur-[120px] z-0 transition-all duration-700 ease-out ${
            isPortalHovered ? 'opacity-100 scale-125' : 'opacity-30 scale-90'
          }`}
        />

        {/* Large Abstract Continuous Moving Gradient Blobs */}
        <div ref={bgFormsRef} className="absolute inset-0 z-0">
          {/* Crimson Top-Right Atmospheric Form */}
          <div className="absolute -top-[15%] -right-[10%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[#C1121F] opacity-15 blur-[140px] animate-blob-float-1" />

          {/* Powder Blue Bottom-Left Organic Form */}
          <div className="absolute -bottom-[20%] -left-[10%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-[#A9C6EA] opacity-30 blur-[150px] animate-blob-float-2" />

          {/* Secondary Crimson Mid-Field Atmospheric Aura */}
          <div className="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#C1121F] opacity-10 blur-[130px] animate-blob-float-3" />
        </div>

        {/* Oversized Partial Arcs & Continuous Rotating Technical Arcs */}
        <svg
          ref={bgArcsRef}
          className="absolute inset-0 w-full h-full z-2 opacity-60 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="heroArcGradPowder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A9C6EA" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#C1121F" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFF6E8" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="heroArcGradCrimson" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C1121F" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#A9C6EA" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#171515" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Subtle Flowing Generative Wave Lines */}
          <path
            d="M -100 220 C 400 60, 850 380, 1550 140"
            fill="none"
            stroke="url(#heroArcGradPowder)"
            strokeWidth="1.5"
            className="animate-line-drift-1 origin-center"
          />
          <path
            d="M -150 480 C 450 620, 950 280, 1600 520"
            fill="none"
            stroke="url(#heroArcGradCrimson)"
            strokeWidth="1.3"
            className="animate-line-drift-2 origin-center"
          />
          <path
            d="M -120 740 C 380 840, 880 500, 1580 760"
            fill="none"
            stroke="url(#heroArcGradPowder)"
            strokeWidth="1.4"
            className="animate-line-drift-3 origin-center"
          />

          {/* Oversized Partial Arcs / Architectural Circle Geometry */}
          <g className="animate-arc-rotate-slow origin-[720px_450px]">
            <circle
              cx="720"
              cy="450"
              r="480"
              fill="none"
              stroke="#A9C6EA"
              strokeWidth="1.2"
              strokeOpacity="0.25"
              strokeDasharray="16 12 4 12"
            />
            <circle
              cx="720"
              cy="450"
              r="455"
              fill="none"
              stroke="#C1121F"
              strokeWidth="0.9"
              strokeOpacity="0.18"
            />
          </g>

          <g className="animate-arc-rotate-reverse origin-[200px_700px]">
            <circle
              cx="200"
              cy="700"
              r="580"
              fill="none"
              stroke="#A9C6EA"
              strokeWidth="1.4"
              strokeOpacity="0.2"
              strokeDasharray="24 12 6 12"
            />
            <path
              d="M -380 700 A 580 580 0 0 1 780 700"
              fill="none"
              stroke="#C1121F"
              strokeWidth="1.1"
              strokeOpacity="0.16"
            />
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* TOP / UPPER AREA: 01 / PORTFOLIO & REPLAY INTRO */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-2">
        <div ref={tagRef} className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C1121F] animate-pulse" />
          <span className="font-syne text-xs sm:text-sm tracking-[0.35em] text-[#C1121F] uppercase font-extrabold">
            01 / PORTFOLIO
          </span>
        </div>

        <div ref={statusRef} className="flex items-center gap-4">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#171515]/60 uppercase hidden sm:inline">
            SYS.ONLINE // 2026
          </span>
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              data-cursor="hover"
              className="text-[10px] tracking-[0.2em] uppercase font-syne text-[#171515]/70 hover:text-[#C1121F] border-b border-[#C1121F]/40 hover:border-[#C1121F] transition-colors py-0.5 cursor-pointer font-bold"
            >
              [ REPLAY INTRO ]
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN HERO CONTENT CANVAS: DOMINANT TYPOGRAPHY & PORTAL ENTRY */}
      {/* ========================================================================= */}
      <div
        ref={containerRef}
        className="relative z-20 w-full max-w-7xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8"
      >
        {/* EXTREMELY LARGE EDITORIAL TYPOGRAPHY: SAI VARSHITH */}
        <div className="w-full flex flex-col items-center justify-center space-y-0 sm:-space-y-2 select-none">
          <h1
            ref={saiRef}
            data-cursor="red"
            className="font-cinzel font-black text-6xl sm:text-8xl md:text-[13vw] lg:text-[13.5vw] tracking-tighter text-[#171515] leading-[0.82] uppercase w-full max-w-full drop-shadow-sm"
          >
            SAI
          </h1>

          <h1
            ref={varshithRef}
            className="font-serif-italic font-normal italic text-6xl sm:text-8xl md:text-[13vw] lg:text-[13.5vw] tracking-tighter text-[#C1121F] leading-[0.82] uppercase w-full max-w-full drop-shadow-xs"
          >
            VARSHITH
          </h1>
        </div>

        {/* ROLE IDENTIFIER: SOFTWARE DEVELOPER */}
        <div
          ref={roleRef}
          className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2"
        >
          <span className="h-px w-6 sm:w-12 bg-[#C1121F]" />
          <h2 className="font-syne font-extrabold text-sm sm:text-lg md:text-xl lg:text-2xl tracking-[0.35em] text-[#C1121F] uppercase">
            SOFTWARE DEVELOPER
          </h2>
          <span className="h-px w-6 sm:w-12 bg-[#C1121F]" />
        </div>

        {/* CONCISE SUPPORTING LINE: CSE • DATA SCIENCE • WEB */}
        <div ref={sublineRef} className="pt-0">
          <p className="font-sans font-semibold text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#171515]/80 uppercase">
            CSE <span className="text-[#C1121F] mx-1">•</span> DATA SCIENCE <span className="text-[#C1121F] mx-1">•</span> WEB
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE PORTAL ENTRY ELEMENT: [ ENTER EXPERIENCE → ] */}
        {/* ========================================================================= */}
        <div className="pt-4 sm:pt-6">
          <button
            ref={portalRef}
            onClick={handleEnterExperience}
            onMouseEnter={() => setIsPortalHovered(true)}
            onMouseLeave={() => setIsPortalHovered(false)}
            data-cursor="hover"
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-[#171515] text-[#FFF6E8] rounded-xs overflow-hidden border border-[#C1121F]/60 shadow-xl transition-all duration-500 hover:scale-105 hover:border-[#C1121F] hover:shadow-2xl hover:shadow-[#C1121F]/25 cursor-pointer"
          >
            {/* Soft Powder Blue & Crimson Atmospheric Response Background Layer */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-[#C1121F] via-[#171515] to-[#A9C6EA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out`}
            />

            {/* Subtle Animated Portal Glow Pulse */}
            <div className="absolute inset-0 bg-[#C1121F]/20 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none" />

            {/* Button Inner Text Content */}
            <span className="relative z-10 font-syne text-xs sm:text-sm font-bold tracking-[0.3em] uppercase flex items-center gap-3 group-hover:text-[#FFF6E8]">
              <span className="text-[#A9C6EA] group-hover:text-[#FFF6E8] transition-colors">[</span>
              <span>ENTER EXPERIENCE</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 text-[#C1121F] group-hover:text-[#FFF6E8]">
                →
              </span>
              <span className="text-[#A9C6EA] group-hover:text-[#FFF6E8] transition-colors">]</span>
            </span>

            {/* Directional Underline Movement */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFF6E8] transition-all duration-500 group-hover:w-full" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCROLL INTERACTION INDICATOR (BOTTOM OF HERO) */}
      {/* ========================================================================= */}
      <div
        ref={scrollIndRef}
        className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-4 border-t border-[#171515]/15 font-sans text-[10px] sm:text-xs tracking-[0.25em] text-[#171515]/70 uppercase"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
          <span className="font-syne font-bold text-[10px] sm:text-xs">SYSTEM ONLINE</span>
        </div>

        {/* Scroll Indicator: ↓ EXPLORE */}
        <button
          onClick={handleEnterExperience}
          data-cursor="hover"
          className="group flex items-center gap-2 text-[#171515] hover:text-[#C1121F] transition-colors cursor-pointer font-syne font-bold"
        >
          <span className="inline-block transition-transform duration-300 group-hover:translate-y-1 text-[#C1121F]">
            ↓
          </span>
          <span className="tracking-[0.3em]">EXPLORE</span>
        </button>
      </div>
    </section>
  );
};
