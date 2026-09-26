import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AnimatedLightBackground } from './AnimatedLightBackground';

interface HeroProps {
  isIntroComplete?: boolean;
  onReplayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isIntroComplete = true, onReplayIntro }) => {
  // DOM References for GSAP timeline and interactive parallax
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const portraitAtmosphereRef = useRef<HTMLDivElement>(null);
  const portraitLayerBack1Ref = useRef<HTMLDivElement>(null);
  const portraitLayerBack2Ref = useRef<HTMLDivElement>(null);
  
  const saiTextRef = useRef<HTMLHeadingElement>(null);
  const varshithTextRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // GSAP quickTo setters for 120fps smooth mouse movement
  const mouseTo = useRef<{
    portraitRotateX?: gsap.QuickToFunc;
    portraitRotateY?: gsap.QuickToFunc;
    portraitX?: gsap.QuickToFunc;
    portraitY?: gsap.QuickToFunc;
    glowX?: gsap.QuickToFunc;
    glowY?: gsap.QuickToFunc;
    backLayer1X?: gsap.QuickToFunc;
    backLayer1Y?: gsap.QuickToFunc;
    backLayer2X?: gsap.QuickToFunc;
    backLayer2Y?: gsap.QuickToFunc;
    saiX?: gsap.QuickToFunc;
    saiY?: gsap.QuickToFunc;
    varshithX?: gsap.QuickToFunc;
    varshithY?: gsap.QuickToFunc;
    bgTextX?: gsap.QuickToFunc;
    bgTextY?: gsap.QuickToFunc;
  }>({});

  // Initialize GSAP mouse parallax setters
  useEffect(() => {
    if (!portraitCardRef.current) return;

    const ease = 'power2.out';
    const duration = 0.6;

    mouseTo.current = {
      portraitRotateX: gsap.quickTo(portraitCardRef.current, 'rotateX', { duration, ease }),
      portraitRotateY: gsap.quickTo(portraitCardRef.current, 'rotateY', { duration, ease }),
      portraitX: gsap.quickTo(portraitCardRef.current, 'x', { duration, ease }),
      portraitY: gsap.quickTo(portraitCardRef.current, 'y', { duration, ease }),

      glowX: portraitAtmosphereRef.current ? gsap.quickTo(portraitAtmosphereRef.current, 'x', { duration: 0.8, ease }) : undefined,
      glowY: portraitAtmosphereRef.current ? gsap.quickTo(portraitAtmosphereRef.current, 'y', { duration: 0.8, ease }) : undefined,

      backLayer1X: portraitLayerBack1Ref.current ? gsap.quickTo(portraitLayerBack1Ref.current, 'x', { duration: 0.8, ease }) : undefined,
      backLayer1Y: portraitLayerBack1Ref.current ? gsap.quickTo(portraitLayerBack1Ref.current, 'y', { duration: 0.8, ease }) : undefined,

      backLayer2X: portraitLayerBack2Ref.current ? gsap.quickTo(portraitLayerBack2Ref.current, 'x', { duration: 1.0, ease }) : undefined,
      backLayer2Y: portraitLayerBack2Ref.current ? gsap.quickTo(portraitLayerBack2Ref.current, 'y', { duration: 1.0, ease }) : undefined,

      saiX: saiTextRef.current ? gsap.quickTo(saiTextRef.current, 'x', { duration: 0.7, ease }) : undefined,
      saiY: saiTextRef.current ? gsap.quickTo(saiTextRef.current, 'y', { duration: 0.7, ease }) : undefined,

      varshithX: varshithTextRef.current ? gsap.quickTo(varshithTextRef.current, 'x', { duration: 0.9, ease }) : undefined,
      varshithY: varshithTextRef.current ? gsap.quickTo(varshithTextRef.current, 'y', { duration: 0.9, ease }) : undefined,

      bgTextX: bgTextRef.current ? gsap.quickTo(bgTextRef.current, 'x', { duration: 1.2, ease }) : undefined,
      bgTextY: bgTextRef.current ? gsap.quickTo(bgTextRef.current, 'y', { duration: 1.2, ease }) : undefined,
    };
  }, []);

  // Mouse Move Handler for subtle 3D perspective & independent parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on mobile touch
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // Skip reduced motion

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalized [-1, 1]
    const normX = (clientX / innerWidth) * 2 - 1;
    const normY = (clientY / innerHeight) * 2 - 1;

    // 1. Portrait motion: slow & sophisticated 3D tilt & offset
    mouseTo.current.portraitRotateX?.(-normY * 4); // Max ±4 deg
    mouseTo.current.portraitRotateY?.(normX * 5);  // Max ±5 deg
    mouseTo.current.portraitX?.(normX * 8);       // Max ±8 px
    mouseTo.current.portraitY?.(normY * 6);       // Max ±6 px

    // 1b. Proximity-based soft powder blue atmospheric glow BEHIND portrait
    if (portraitCardRef.current && portraitAtmosphereRef.current) {
      const cardRect = portraitCardRef.current.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const dist = Math.hypot(clientX - cardCenterX, clientY - cardCenterY);
      const maxDist = 550; // 550px proximity threshold
      const proximity = Math.max(0, 1 - dist / maxDist); // 0 (far) -> 1 (hovering over portrait)

      // Drift atmosphere glow slightly toward cursor
      const localX = (clientX - cardCenterX) * 0.35;
      const localY = (clientY - cardCenterY) * 0.35;

      mouseTo.current.glowX?.(localX);
      mouseTo.current.glowY?.(localY);

      // Smoothly scale & adjust opacity based on cursor proximity
      gsap.to(portraitAtmosphereRef.current, {
        opacity: Math.pow(proximity, 1.2) * 0.95,
        scale: 0.85 + proximity * 0.35,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // 2. Depth layers behind portrait (opposite or delayed parallax)
    mouseTo.current.backLayer1X?.(-normX * 12);
    mouseTo.current.backLayer1Y?.(-normY * 8);
    mouseTo.current.backLayer2X?.(-normX * 18);
    mouseTo.current.backLayer2Y?.(-normY * 12);

    // 3. Independent Typography motion (SAI vs VARSHITH split speeds)
    mouseTo.current.saiX?.(-normX * 10);
    mouseTo.current.saiY?.(-normY * 6);

    mouseTo.current.varshithX?.(-normX * 18);
    mouseTo.current.varshithY?.(-normY * 12);

    // 4. Oversized background typography motion
    mouseTo.current.bgTextX?.(normX * 22);
    mouseTo.current.bgTextY?.(normY * 14);
  };

  // Mouse Leave Handler to smoothly fade glow when cursor exits hero section
  const handleMouseLeave = () => {
    if (portraitAtmosphereRef.current) {
      gsap.to(portraitAtmosphereRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  // Scroll listener for independent typography & portrait parallax & fade scaling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight * 1.5) return; // Pause calculations when scrolled far away

      const progress = Math.min(scrollY / (window.innerHeight * 0.8), 1);

      // Scroll shifts: portrait vs typography move at different rates
      if (portraitContainerRef.current) {
        gsap.set(portraitContainerRef.current, {
          y: scrollY * 0.14,
          opacity: 1 - progress * 0.6,
        });
      }

      if (saiTextRef.current) {
        gsap.set(saiTextRef.current, {
          y: scrollY * 0.28,
          scale: 1 - progress * 0.05,
        });
      }

      if (varshithTextRef.current) {
        gsap.set(varshithTextRef.current, {
          y: scrollY * 0.18,
          scale: 1 - progress * 0.05,
        });
      }

      if (bgTextRef.current) {
        gsap.set(bgTextRef.current, {
          y: scrollY * 0.4,
          opacity: 0.12 * (1 - progress),
        });
      }

      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, {
          opacity: 1 - progress * 0.8,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Timeline Hero Entry Animation
  useEffect(() => {
    if (!isIntroComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Set initial states before timeline starts
      gsap.set(headerRef.current, { opacity: 0, y: -15 });
      gsap.set(bgTextRef.current, { opacity: 0, scale: 1.04 });
      gsap.set(portraitCardRef.current, { opacity: 0, filter: 'brightness(0.1) blur(10px)', scale: 0.95 });
      gsap.set(portraitLayerBack1Ref.current, { opacity: 0, x: -10 });
      gsap.set(portraitLayerBack2Ref.current, { opacity: 0, x: -20 });
      gsap.set(taglineRef.current, { opacity: 0, x: -15 });
      gsap.set(saiTextRef.current, { opacity: 0, y: 35 });
      gsap.set(varshithTextRef.current, { opacity: 0, y: 45 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
      gsap.set(metadataRef.current, { opacity: 0, y: 20 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 15 });

      // Step 1: Background & Header Reveal
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .to(bgTextRef.current, { opacity: 0.12, scale: 1, duration: 1.2, ease: 'power2.out' }, 0.2);

      // Step 2: Portrait reveal from darkness (Sophisticated, zero bounce)
      tl.to(portraitCardRef.current, {
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        scale: 1,
        duration: 1.3,
        ease: 'power3.out',
      }, 0.3)
      .to([portraitLayerBack1Ref.current, portraitLayerBack2Ref.current], {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 1.0,
      }, 0.6);

      // Step 3: Main typography reveals with vertical motion (staggered SAI & VARSHITH)
      tl.to(taglineRef.current, { opacity: 1, x: 0, duration: 0.7 }, 0.5)
        .to(saiTextRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.6)
        .to(varshithTextRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.75);

      // Step 4: Small metadata & Description
      tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .to(metadataRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.05)
        .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.2);
    }, sectionRef);

    return () => ctx.revert();
  }, [isIntroComplete]);

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-1 w-full min-h-screen bg-transparent text-[#171515] overflow-hidden flex flex-col justify-between select-none perspective-container bg-grid-lines pt-16 sm:pt-20"
    >
      {/* Reusable Living Canvas Background for Light Sections */}
      <AnimatedLightBackground seed={1} />

      {/* Visual Depth Background Layers */}
      <div className="absolute inset-0 paper-vignette pointer-events-none z-10 opacity-70" />

      {/* Geometric Vector Crosshair Accents */}
      <div className="absolute top-8 left-8 text-[#C1121F]/40 font-mono text-xs pointer-events-none z-20 hidden sm:block">+ 01</div>
      <div className="absolute top-8 right-8 text-[#C1121F]/40 font-mono text-xs pointer-events-none z-20 hidden sm:block">+ 02</div>
      <div className="absolute bottom-8 left-8 text-[#C1121F]/40 font-mono text-xs pointer-events-none z-20 hidden sm:block">+ 03</div>

      {/* Sub Header Status Row */}
      <header
        ref={headerRef}
        className="relative z-30 w-full px-6 sm:px-12 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
          <span className="font-syne text-[11px] tracking-[0.3em] text-[#C1121F] uppercase font-bold">
            FOUNDATION // 01
          </span>
        </div>

        {/* Status Pill & Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.2em] font-sans text-[#171515]/80 uppercase border border-[#171515]/20 px-3.5 py-1.5 rounded-full bg-[#171515]/5 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F] animate-ping" />
            <span>CSE · DATA SCIENCE</span>
            <span className="text-[#C1121F] mx-0.5">|</span>
            <span>MLRIT</span>
          </div>

          <button
            onClick={onReplayIntro}
            data-cursor="hover"
            className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#171515]/70 hover:text-[#C1121F] border-b border-[#C1121F]/40 hover:border-[#C1121F] transition-colors py-1 cursor-pointer"
          >
            [ REPLAY INTRO ]
          </button>
        </div>
      </header>

      {/* Main Editorial Hero Canvas Container */}
      <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-center my-auto py-8 lg:py-12">
        
        {/* LAYER 0: Faint Oversized Background Typography */}
        <div
          ref={bgTextRef}
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 overflow-hidden select-none"
        >
          <h1 className="font-cinzel text-[16vw] sm:text-[14vw] lg:text-[12vw] leading-[0.85] font-black text-stroke-dark opacity-10 tracking-tighter text-center uppercase whitespace-nowrap">
            SAI VARSHITH
          </h1>
          <p className="font-serif-italic text-[7vw] sm:text-[5vw] text-[#C1121F]/15 tracking-wider text-center mt-[-1vw]">
            CSE Data Science
          </p>
        </div>

        {/* Central Editorial Grid Layout (Desktop Left-Right, Mobile Stacked) */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14 z-10">
          
          {/* LAYER 1 & 2: Editorial Portrait with Subtle 3D Depth Layers (Left Column) */}
          <div
            ref={portraitContainerRef}
            className="lg:col-span-5 flex justify-center lg:justify-start preserve-3d"
          >
            <div className="relative w-full max-w-[310px] sm:max-w-md aspect-[4/5] preserve-3d">
              
              {/* Interactive Soft Atmospheric Halo BEHIND Portrait (Responds smoothly to cursor proximity) */}
              <div
                ref={portraitAtmosphereRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[620px] h-[480px] sm:h-[620px] rounded-full bg-radial from-[#A9C6EA]/80 via-[#A9C6EA]/35 to-[#C1121F]/15 blur-[100px] pointer-events-none z-0 transition-opacity duration-700 ease-out opacity-0 select-none"
                style={{ transform: 'translateZ(-50px)' }}
              />

              {/* Depth Layer 2 (Far Back Frame Offset) */}
              <div
                ref={portraitLayerBack2Ref}
                className="absolute inset-0 -translate-x-5 translate-y-5 rounded-xs border border-[#171515]/20 bg-[#171515]/05 pointer-events-none z-1"
                style={{ transform: 'translateZ(-30px)' }}
              />

              {/* Depth Layer 1 (Mid Back Frame Accent - Powder Blue Glow behind silhouette) */}
              <div
                ref={portraitLayerBack1Ref}
                className="absolute inset-0 translate-x-3 -translate-y-3 rounded-xs border border-[#A9C6EA]/60 bg-[#A9C6EA]/20 pointer-events-none shadow-lg shadow-[#A9C6EA]/10"
                style={{ transform: 'translateZ(-15px)' }}
              />

              {/* Foreground Main Portrait Card (3D Tilt Target & Cursor Light Reaction Anchor) */}
              <div
                ref={portraitCardRef}
                id="portrait-card"
                data-cursor="portrait"
                className="relative w-full h-full rounded-xs overflow-hidden border border-[#C1121F]/40 shadow-2xl bg-[#171515] group transition-all duration-500 hover:border-[#C1121F]"
                style={{ transform: 'translateZ(20px)' }}
              >
                {/* Corner Editorial Accents */}
                <div className="absolute top-3 left-3 z-30 font-sans text-[9px] tracking-[0.3em] uppercase text-[#FFF6E8] bg-[#171515] px-2.5 py-1 border border-[#C1121F]/40">
                  FIG. 01 — PORTRAIT
                </div>

                <div className="absolute bottom-3 right-3 z-30 font-sans text-[9px] tracking-[0.25em] uppercase text-[#A9C6EA] bg-[#171515] px-2.5 py-1 border border-[#C1121F]/40 font-bold">
                  B.TECH 2ND YEAR
                </div>

                {/* Main Portrait Image (Preserving natural facial proportions & skin tones, NO color filter) */}
                <img
                  src="/images/sai-varshith.jpg"
                  alt="Sai Varshith Editorial Portrait"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Subtle Framing Edge Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171515]/40 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 border border-[#FFF6E8]/20 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* LAYER 3: Editorial Typography with Independent Motion (Right Column) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 lg:-ml-6 lg:pl-4 text-left preserve-3d">
            
            {/* Tagline */}
            <div ref={taglineRef} className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-[#C1121F]" />
              <span className="font-syne text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#C1121F] font-bold">
                SOFTWARE DEVELOPER
              </span>
            </div>

            {/* Independent Heading Typography (SAI in Crimson, VARSHITH in Powder Blue) */}
            <div className="space-y-0.5 w-full overflow-visible">
              <h1
                ref={saiTextRef}
                data-cursor="red"
                className="font-cinzel text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-[#C1121F] leading-[0.9] block"
              >
                SAI
              </h1>

              <h1
                ref={varshithTextRef}
                className="font-serif-italic font-normal text-5xl sm:text-7xl xl:text-8xl text-[#A9C6EA] italic leading-[0.9] block drop-shadow-xs"
              >
                VARSHITH
              </h1>
            </div>

            {/* Approved Editorial Copy Block */}
            <div
              ref={descriptionRef}
              className="space-y-2 pt-2 max-w-md border-l-2 border-[#C1121F] pl-5"
            >
              <p className="font-sans text-sm sm:text-base text-[#171515]/90 font-light leading-relaxed tracking-wide">
                CSE · DATA SCIENCE
              </p>
              <p className="font-syne text-xs sm:text-sm text-[#C1121F] tracking-widest uppercase font-bold">
                B.Tech Student · Developer
              </p>
            </div>

            {/* Subtle Metadata Grid */}
            <div
              ref={metadataRef}
              className="pt-6 grid grid-cols-2 gap-6 border-t border-[#171515]/15 w-full max-w-md"
            >
              <div>
                <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C1121F] uppercase font-bold">
                  INSTITUTION
                </span>
                <span className="font-syne text-xs sm:text-sm text-[#171515] font-semibold tracking-wider">
                  MLRIT
                </span>
              </div>
              <div>
                <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C1121F] uppercase font-bold">
                  LOCATION
                </span>
                <span className="font-syne text-xs sm:text-sm text-[#171515] font-semibold tracking-wider">
                  HYDERABAD, IN
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Refined Minimal Scroll Indicator near Bottom */}
      <footer
        ref={scrollIndicatorRef}
        className="relative z-30 w-full px-6 sm:px-12 py-5 flex items-center justify-between border-t border-[#171515]/15 text-[10px] tracking-[0.25em] text-[#171515]/80 uppercase font-sans"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
          <span className="font-syne text-[10px] tracking-[0.25em]">INITIALIZED · PHASE 03</span>
        </div>

        {/* Scroll Indicator with animated line/arrow */}
        <div className="flex items-center gap-4 group cursor-pointer" data-cursor="hover">
          <span className="font-syne text-[10px] tracking-[0.3em] text-[#171515]/80 group-hover:text-[#C1121F] transition-colors font-medium">
            SCROLL TO EXPLORE
          </span>
          <div className="relative w-4 h-7 border border-[#C1121F]/60 rounded-full flex justify-center p-1 group-hover:border-[#C1121F] transition-colors">
            {/* Animated vertical line bar */}
            <div className="w-0.5 h-2 bg-[#C1121F] rounded-full animate-scroll-line" />
          </div>
        </div>
      </footer>
    </section>
  );
};
