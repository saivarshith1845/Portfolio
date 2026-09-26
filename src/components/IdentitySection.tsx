import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedLightBackground } from './AnimatedLightBackground';

export const IdentitySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skillsList = ['C', 'PYTHON', 'JAVA', 'SQL', 'JAVASCRIPT'];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background faint typography parallax shift
      if (bgTextRef.current) {
        gsap.fromTo(
          bgTextRef.current,
          { y: -60 },
          {
            y: 60,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Timeline entry sequence:
      // 1. ABOUT ME (left) enters first
      // 2. EDUCATION (top right) reveals slightly afterward
      // 3. TECHNICAL SKILLS (bottom right) follows
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
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          0.1
        );
      }

      if (educationRef.current) {
        tl.fromTo(
          educationRef.current,
          { opacity: 0, y: 45, x: 15 },
          { opacity: 1, y: 0, x: 0, duration: 0.9, ease: 'power3.out' },
          0.3
        );
      }

      if (skillsRef.current) {
        tl.fromTo(
          skillsRef.current,
          { opacity: 0, y: 50, x: 15 },
          { opacity: 1, y: 0, x: 0, duration: 0.9, ease: 'power3.out' },
          0.5
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-1 w-full min-h-[100vh] bg-transparent text-[#171515] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center selection:bg-[#C1121F] selection:text-[#FFF6E8] border-t border-[#171515]/15 bg-grid-lines-blue"
    >
      {/* Reusable Living Canvas Background for Light Sections */}
      <AnimatedLightBackground seed={2} />

      {/* Faint Oversized Background Typography */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none"
      >
        <span className="font-cinzel text-[20vw] font-black text-stroke-powder opacity-20 uppercase tracking-tighter whitespace-nowrap">
          PERSPECTIVE
        </span>
      </div>

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
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#171515]/60 uppercase hidden sm:inline">
            IDENTITY & FOUNDATIONS
          </span>
        </div>

        {/* Desktop 2-Column Editorial Grid (Left ~45%, Right ~55%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: ABOUT ME (~45%) */}
          {/* ============================================================ */}
          <div
            ref={leftColRef}
            className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:pr-6 border-b lg:border-b-0 lg:border-r border-[#171515]/15 pb-12 lg:pb-0"
          >
            <div>
              {/* Small Label */}
              <div className="flex items-center gap-2.5 font-syne text-[11px] tracking-[0.3em] text-[#C1121F] uppercase font-bold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
                <span>ABOUT ME</span>
              </div>

              {/* Visually Balanced Editorial Statement */}
              <div className="space-y-1.5 select-none">
                <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-[#171515] leading-tight block">
                  I BUILD
                </h2>

                <h2 className="font-serif-italic font-normal italic text-3xl sm:text-5xl lg:text-5xl text-[#C1121F] leading-tight block">
                  WEB APPLICATIONS
                </h2>

                <h3 className="font-syne font-extrabold text-xl sm:text-3xl lg:text-3xl tracking-wide text-[#171515] uppercase pt-1 block">
                  AND EXPLORE
                </h3>

                <p className="font-cinzel text-xs sm:text-base text-[#C1121F] tracking-wider font-bold border-l-2 border-[#C1121F] pl-3 py-1 mt-3 block">
                  AI · DATA · INTERACTIVE EXPERIENCES.
                </p>
              </div>

              {/* Exact Personal Description */}
              <div className="pt-6 max-w-lg">
                <p className="font-sans font-light text-sm sm:text-base text-[#171515]/90 leading-relaxed tracking-wide">
                  I'm Sai Varshith, a B.Tech CSE student specializing in Data Science. I enjoy building web applications and exploring AI-driven experiences.
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: EDUCATION & TECHNICAL SKILLS (~55%) */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col space-y-12 lg:pl-2">
            
            {/* ------------------------------------------------------------ */}
            {/* EDUCATION */}
            {/* ------------------------------------------------------------ */}
            <div ref={educationRef} className="space-y-5">
              {/* Small Label */}
              <div className="flex items-center gap-2.5 font-syne text-[11px] tracking-[0.3em] text-[#C1121F] uppercase font-bold border-b border-[#171515]/15 pb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
                <span>EDUCATION</span>
              </div>

              <div className="space-y-5 pl-1">
                {/* Entry 1: MLRIT */}
                <div className="group relative border-l-2 border-[#C1121F] pl-4 py-1 hover:border-[#171515] transition-colors duration-300">
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#171515] tracking-tight group-hover:text-[#C1121F] transition-colors">
                    MLR Institute of Technology
                  </h3>

                  <p className="font-syne text-xs sm:text-sm text-[#C1121F] tracking-wider uppercase font-semibold mt-1">
                    B.Tech — Computer Science & Engineering
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 mt-2 font-sans text-xs text-[#171515]/80">
                    <span className="px-2.5 py-0.5 border border-[#A9C6EA] bg-[#A9C6EA]/20 text-[#171515] rounded-xs font-medium">
                      Specialization: Data Science
                    </span>
                    <span className="text-[#C1121F]">·</span>
                    <span className="text-[#171515]/80 font-medium">2nd Year</span>
                  </div>
                </div>

                {/* Entry 2: Sri Chaitanya */}
                <div className="group relative border-l-2 border-[#171515]/20 pl-4 py-1 hover:border-[#C1121F] transition-colors duration-300">
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#171515]/90 tracking-tight group-hover:text-[#C1121F] transition-colors">
                    Sri Chaitanya
                  </h3>
                  <p className="font-syne text-xs text-[#171515]/60 tracking-widest uppercase font-medium mt-0.5">
                    Schooling
                  </p>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* TECHNICAL SKILLS (Only 5 technologies, no descriptions) */}
            {/* ------------------------------------------------------------ */}
            <div ref={skillsRef} className="space-y-5 pt-2">
              {/* Small Label */}
              <div className="flex items-center gap-2.5 font-syne text-[11px] tracking-[0.3em] text-[#C1121F] uppercase font-bold border-b border-[#171515]/15 pb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
                <span>TECHNICAL SKILLS</span>
              </div>

              {/* Display ONLY: C, PYTHON, JAVA, SQL, JAVASCRIPT */}
              <div className="space-y-1">
                {skillsList.map((skill, idx) => (
                  <div
                    key={skill}
                    data-cursor="hover"
                    className="group relative flex items-center justify-between py-3 px-3 border-b border-[#171515]/15 hover:border-[#C1121F] transition-colors duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] text-[#C1121F] group-hover:text-[#171515] transition-colors font-bold">
                        0{idx + 1}
                      </span>
                      <span className="font-cinzel text-lg sm:text-2xl font-bold tracking-wider text-[#171515] group-hover:text-[#C1121F] group-hover:translate-x-3 transition-all duration-300">
                        {skill}
                      </span>
                    </div>

                    <span className="font-syne text-xs text-[#C1121F] group-hover:text-[#A9C6EA] group-hover:translate-x-1 transition-all duration-300 font-bold">
                      →
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
