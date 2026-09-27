import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LiquidLightBackground } from './LiquidLightBackground';

export const IdentitySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const portraitAtmosphereRef = useRef<HTMLDivElement>(null);

  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  // GSAP quickTo setters for 120fps smooth cursor reactivity behind portrait
  const glowToX = useRef<gsap.QuickToFunc | null>(null);
  const glowToY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (portraitAtmosphereRef.current) {
      glowToX.current = gsap.quickTo(portraitAtmosphereRef.current, 'x', { duration: 0.8, ease: 'power2.out' });
      glowToY.current = gsap.quickTo(portraitAtmosphereRef.current, 'y', { duration: 0.8, ease: 'power2.out' });
    }

    const ctx = gsap.context(() => {
      // Timeline entry animation for About spread
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (leftColRef.current) {
        tl.fromTo(
          leftColRef.current,
          { opacity: 0, y: 50, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
          0.1
        );
      }

      if (rightColRef.current) {
        tl.fromTo(
          rightColRef.current,
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          0.3
        );
      }

      if (educationRef.current) {
        tl.fromTo(
          educationRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          0.5
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Proximity-based atmospheric lighting behind portrait
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!portraitCardRef.current || !portraitAtmosphereRef.current) return;

    const { clientX, clientY } = e;
    const cardRect = portraitCardRef.current.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    const dist = Math.hypot(clientX - cardCenterX, clientY - cardCenterY);
    const maxDist = 550; // 550px proximity threshold
    const proximity = Math.max(0, 1 - dist / maxDist);

    // Drift atmosphere glow slightly toward cursor behind frame
    const localX = (clientX - cardCenterX) * 0.35;
    const localY = (clientY - cardCenterY) * 0.35;

    glowToX.current?.(localX);
    glowToY.current?.(localY);

    // Soft powder blue & subtle crimson glow blooms behind portrait
    gsap.to(portraitAtmosphereRef.current, {
      opacity: Math.pow(proximity, 1.1) * 0.95,
      scale: 0.9 + proximity * 0.3,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (portraitAtmosphereRef.current) {
      gsap.to(portraitAtmosphereRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 w-full min-h-screen bg-transparent text-[#171515] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center selection:bg-[#C1121F] selection:text-[#FFF6E8] border-t border-[#171515]/15"
    >
      {/* Liquid Light / Paper Refraction Background (NO SVG lines, NO technical grids) */}
      <LiquidLightBackground />

      {/* Main Chapter Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto">
        
        {/* Top Editorial Section Header Marker */}
        <div className="w-full mb-12 sm:mb-16 pb-4 border-b border-[#171515]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
            <span className="font-syne text-[11px] tracking-[0.35em] text-[#C1121F] uppercase font-bold">
              CHAPTER // 02
            </span>
          </div>
          <span className="font-syne text-[10px] sm:text-xs tracking-[0.25em] text-[#171515]/60 uppercase font-semibold">
            ABOUT — EDITORIAL SPREAD
          </span>
        </div>

        {/* Asymmetrical Magazine Spread Layout (Left: Large Portrait, Right: About Me + Education) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ============================================================ */}
          {/* LEFT / CENTER: VERY LARGE EDITORIAL PORTRAIT (~5 Cols) */}
          {/* ============================================================ */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-[4/5]">
              
              {/* Soft Atmospheric Light BEHIND Portrait (Responds smoothly to cursor) */}
              <div
                ref={portraitAtmosphereRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[650px] h-[520px] sm:h-[650px] rounded-full bg-radial from-[#A9C6EA]/85 via-[#C1121F]/20 to-transparent blur-[110px] pointer-events-none z-0 transition-opacity duration-700 ease-out opacity-0 select-none"
              />

              {/* Editorial Outer Frame Offset Accent */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xs border border-[#171515]/20 bg-[#171515]/05 pointer-events-none z-1" />

              {/* Main Large Portrait Card Container */}
              <div
                ref={portraitCardRef}
                id="portrait-card"
                data-cursor="portrait"
                className="relative w-full h-full rounded-xs overflow-hidden border border-[#C1121F]/40 shadow-2xl bg-[#171515] group z-10 transition-all duration-500 hover:border-[#C1121F]"
              >
                {/* Natural Portrait Photograph (Un-altered, face clearly framed) */}
                <img
                  src="/images/sai-varshith.jpg"
                  alt="Sai Varshith Editorial Portrait"
                  loading="eager"
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out"
                />

                {/* Subtle Bottom Vignette Frame overlay for caption readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171515]/70 via-transparent to-transparent opacity-90 pointer-events-none" />

                {/* Editorial Caption Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                  <span className="font-syne text-[10px] tracking-[0.25em] text-[#FFF6E8] uppercase font-bold bg-[#171515]/90 px-3 py-1 border border-[#C1121F]/40">
                    SAI VARSHITH
                  </span>
                  <span className="font-syne text-[10px] tracking-[0.2em] text-[#A9C6EA] uppercase font-semibold bg-[#171515]/90 px-3 py-1 border border-[#171515]/40">
                    HYDERABAD, IN
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: ABOUT ME & EDUCATION (~7 Cols) */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col space-y-10 lg:pl-4">
            
            {/* ------------------------------------------------------------ */}
            {/* ABOUT ME SECTION */}
            {/* ------------------------------------------------------------ */}
            <div ref={rightColRef} className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
                <h2 className="font-syne text-xs sm:text-sm tracking-[0.35em] text-[#C1121F] uppercase font-bold">
                  ABOUT ME
                </h2>
              </div>

              {/* Heading */}
              <h3 className="font-cinzel text-3xl sm:text-5xl lg:text-5xl font-black text-[#171515] tracking-tight leading-tight">
                PERSPECTIVE & <br className="hidden sm:block" />
                <span className="font-serif-italic font-normal italic text-[#C1121F]">CREATIVE FOCUS</span>
              </h3>

              {/* Natural, Concise About Me Paragraph */}
              <div className="space-y-4 max-w-xl text-[#171515]/90 font-sans font-light text-base sm:text-lg leading-relaxed border-l-2 border-[#C1121F] pl-5 py-1">
                <p>
                  I am <strong className="font-semibold text-[#171515]">Sai Varshith</strong>, a 2nd-year B.Tech Computer Science and Engineering student specializing in Data Science at MLR Institute of Technology.
                </p>
                <p className="text-sm sm:text-base text-[#171515]/80">
                  I am interested in building web applications and creating interactive digital experiences, combining clean design with thoughtful visual details.
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* EDUCATION SECTION */}
            {/* ------------------------------------------------------------ */}
            <div ref={educationRef} className="space-y-6 pt-4 border-t border-[#171515]/15">
              {/* Section Header */}
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
                <h2 className="font-syne text-xs sm:text-sm tracking-[0.35em] text-[#C1121F] uppercase font-bold">
                  EDUCATION
                </h2>
              </div>

              <div className="space-y-6 max-w-xl">
                {/* MLRIT Entry */}
                <div className="group relative border-l-2 border-[#C1121F] pl-5 py-1.5 transition-all duration-300">
                  <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#171515] group-hover:text-[#C1121F] transition-colors">
                    MLR Institute of Technology (MLRIT)
                  </h4>
                  <p className="font-syne text-xs sm:text-sm text-[#C1121F] tracking-wider uppercase font-semibold mt-1">
                    B.Tech — Computer Science & Engineering
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 font-sans text-xs text-[#171515]/80">
                    <span className="px-3 py-1 border border-[#A9C6EA] bg-[#A9C6EA]/20 text-[#171515] rounded-xs font-semibold">
                      Specialization: Data Science
                    </span>
                    <span className="text-[#C1121F]">•</span>
                    <span className="font-medium text-[#171515]/90">Currently in 2nd year</span>
                  </div>
                </div>

                {/* Sri Chaitanya Entry */}
                <div className="group relative border-l-2 border-[#171515]/20 pl-5 py-1.5 hover:border-[#C1121F] transition-colors duration-300">
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#171515]/90 group-hover:text-[#C1121F] transition-colors">
                    Sri Chaitanya
                  </h4>
                  <p className="font-syne text-xs text-[#171515]/70 tracking-widest uppercase font-medium mt-0.5">
                    Schooling
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
