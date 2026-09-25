import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const WorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  // Heading word refs
  const wordIdeasRef = useRef<HTMLHeadingElement>(null);
  const wordTakeRef = useRef<HTMLHeadingElement>(null);
  const wordFormRef = useRef<HTMLHeadingElement>(null);

  // Project 01 — StudyFlow refs
  const studyflowCanvasRef = useRef<HTMLDivElement>(null);
  const studyflowNumRef = useRef<HTMLDivElement>(null);
  const studyflowTitleRef = useRef<HTMLHeadingElement>(null);
  const studyflowDescRef = useRef<HTMLDivElement>(null);
  const studyflowMetaRef = useRef<HTMLDivElement>(null);

  // Project 02 — Time Pilot Aid refs
  const timepilotCanvasRef = useRef<HTMLDivElement>(null);
  const timepilotNumRef = useRef<HTMLDivElement>(null);
  const timepilotTitleRef = useRef<HTMLHeadingElement>(null);
  const timepilotDescRef = useRef<HTMLDivElement>(null);
  const timepilotMetaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Oversized background typography parallax shift
      if (bgTextRef.current) {
        gsap.fromTo(
          bgTextRef.current,
          { y: -90 },
          {
            y: 90,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // 2. Heading words independent scroll parallax
      if (wordIdeasRef.current) {
        gsap.fromTo(
          wordIdeasRef.current,
          { y: 30, x: -15 },
          {
            y: -40,
            x: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: wordIdeasRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      if (wordTakeRef.current) {
        gsap.fromTo(
          wordTakeRef.current,
          { y: 50, x: 30 },
          {
            y: -30,
            x: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: wordTakeRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      if (wordFormRef.current) {
        gsap.fromTo(
          wordFormRef.current,
          { scale: 0.95, y: 20 },
          {
            scale: 1.05,
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: wordFormRef.current,
              start: 'top 85%',
              end: 'bottom 35%',
              scrub: 1,
            },
          }
        );
      }

      // 3. Project 01 (StudyFlow): LEFT -> RIGHT Motion Sequence
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: studyflowCanvasRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (studyflowNumRef.current) {
        tl1.fromTo(
          studyflowNumRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          0.1
        );
      }

      if (studyflowTitleRef.current) {
        tl1.fromTo(
          studyflowTitleRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' },
          0.25
        );
      }

      if (studyflowDescRef.current) {
        tl1.fromTo(
          studyflowDescRef.current,
          { opacity: 0, x: -30, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out' },
          0.45
        );
      }

      if (studyflowMetaRef.current) {
        tl1.fromTo(
          studyflowMetaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.65
        );
      }

      // 4. Project 02 (Time Pilot Aid): RIGHT -> LEFT Motion Sequence (Reversed)
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: timepilotCanvasRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (timepilotNumRef.current) {
        tl2.fromTo(
          timepilotNumRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          0.1
        );
      }

      if (timepilotTitleRef.current) {
        tl2.fromTo(
          timepilotTitleRef.current,
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' },
          0.25
        );
      }

      if (timepilotDescRef.current) {
        tl2.fromTo(
          timepilotDescRef.current,
          { opacity: 0, x: 30, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out' },
          0.45
        );
      }

      if (timepilotMetaRef.current) {
        tl2.fromTo(
          timepilotMetaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.65
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-1 w-full min-h-screen bg-transparent text-[#171515] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden selection:bg-[#C1121F] selection:text-[#FFF6E8] border-t border-[#171515]/15 bg-grid-lines"
    >
      {/* Background Subtle Grain Texture & Ambient Lighting */}
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-[#C1121F]/08 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-[#A9C6EA]/12 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Faint Oversized Background Typography */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none"
      >
        <span className="font-cinzel text-[22vw] font-black text-stroke-crimson opacity-15 uppercase tracking-tighter whitespace-nowrap">
          CREATIONS
        </span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* ============================================================ */}
        {/* 1. PROJECT CHAPTER HEADING */}
        {/* ============================================================ */}

        {/* Small Label Marker */}
        <div className="w-full mb-12 sm:mb-20 pb-4 border-b border-[#171515]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
            <span className="font-syne text-[11px] tracking-[0.35em] text-[#C1121F] uppercase font-bold">
              SELECTED WORK / 03
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#171515]/60 uppercase hidden sm:inline">
            EDITORIAL COMPOSITIONS
          </span>
        </div>

        {/* Enormous Editorial Opening Statement */}
        <div className="relative w-full my-12 sm:my-20 flex flex-col space-y-2 sm:space-y-4 preserve-3d">
          <h1
            ref={wordIdeasRef}
            className="font-cinzel text-6xl sm:text-9xl xl:text-[11rem] font-black tracking-tighter text-[#171515] uppercase leading-[0.85] select-none self-start -ml-2 sm:-ml-6"
          >
            IDEAS
          </h1>

          <h1
            ref={wordTakeRef}
            className="font-serif-italic font-normal italic text-7xl sm:text-[11rem] xl:text-[13rem] text-[#C1121F] leading-[0.8] tracking-tight select-none self-end md:mr-16 lg:mr-24"
          >
            TAKE
          </h1>

          <h1
            ref={wordFormRef}
            className="font-syne font-extrabold text-5xl sm:text-8xl xl:text-[10rem] tracking-tight text-[#171515] uppercase leading-[0.9] select-none self-center ml-6 sm:ml-20 lg:ml-36"
          >
            FORM<span className="text-[#C1121F]">.</span>
          </h1>
        </div>

        {/* Hairline Separator */}
        <div className="w-full my-16 sm:my-24 border-t border-[#171515]/15 flex items-center justify-between text-[10px] font-mono text-[#C1121F] pt-4 font-bold">
          <span>INDEX // 01 – 02</span>
          <span className="w-16 h-px bg-[#C1121F]/40" />
          <span>CANVAS SPREADS</span>
        </div>

        {/* ============================================================ */}
        {/* 2. PROJECT 01 — STUDYFLOW (Asymmetric Left-to-Right Flow) */}
        {/* ============================================================ */}
        <div
          ref={studyflowCanvasRef}
          className="relative w-full min-h-[75vh] py-12 sm:py-20 flex flex-col justify-between border-t border-[#171515]/15 group"
        >
          {/* Top Info Bar */}
          <div ref={studyflowNumRef} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 font-mono text-xs text-[#C1121F]">
              <span className="font-bold text-sm">01</span>
              <span className="w-6 h-px bg-[#C1121F]/40" />
              <span className="font-syne text-[11px] tracking-[0.25em] text-[#171515] uppercase font-bold">
                STUDENT PRODUCTIVITY
              </span>
            </div>

            {/* Minimal Arrow Interaction Indicator */}
            <div
              data-cursor="hover"
              className="flex items-center gap-2 font-mono text-xs text-[#171515] hover:text-[#C1121F] transition-colors cursor-pointer font-bold"
            >
              <span>EXPLORE</span>
              <span className="font-sans text-sm transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                ↗
              </span>
            </div>
          </div>

          {/* Large Off-Center Project Title (Positioned Upper-Right) */}
          <div className="my-8 sm:my-14 self-end text-right max-w-full">
            <h2
              ref={studyflowTitleRef}
              data-cursor="hover"
              className="font-cinzel text-5xl sm:text-8xl xl:text-9xl font-black text-[#171515] tracking-tight hover:text-[#C1121F] group-hover:translate-x-2 transition-all duration-500 block select-none"
            >
              STUDYFLOW
            </h2>
          </div>

          {/* Description (Positioned Lower-Left with Accent Border) */}
          <div
            ref={studyflowDescRef}
            className="self-start max-w-2xl border-l-2 border-[#C1121F] pl-5 sm:pl-8 my-4"
          >
            <p className="font-sans font-light text-base sm:text-xl text-[#171515]/90 leading-relaxed tracking-wide">
              StudyFlow is an AI-powered student productivity platform that transforms exam preparation into a personalized daily workflow with intelligent planning, progress analytics, quizzes, study notes, and an AI learning assistant.
            </p>
          </div>

          {/* Slash-Separated Metadata (Positioned Bottom-Right) */}
          <div
            ref={studyflowMetaRef}
            className="self-end pt-6 border-t border-[#171515]/15 w-full flex justify-end font-syne text-[10px] sm:text-xs tracking-[0.25em] text-[#C1121F] uppercase font-bold"
          >
            <span>AI &nbsp;/&nbsp; STUDENT PRODUCTIVITY &nbsp;/&nbsp; WEB APPLICATION</span>
          </div>
        </div>

        {/* Asymmetric Section Divider Line */}
        <div className="w-full my-12 sm:my-20 flex items-center justify-between font-mono text-[10px] text-[#C1121F] font-bold">
          <span className="w-16 h-px bg-[#C1121F]/40" />
          <span>TRANSITION // 01 → 02</span>
          <span className="w-32 h-px bg-[#C1121F]/40" />
        </div>

        {/* ============================================================ */}
        {/* 3. PROJECT 02 — TIME PILOT AID (Reversed Right-to-Left Flow) */}
        {/* ============================================================ */}
        <div
          ref={timepilotCanvasRef}
          className="relative w-full min-h-[75vh] py-12 sm:py-20 flex flex-col justify-between border-t border-[#171515]/15 group mt-8 sm:mt-16"
        >
          {/* Top Info Bar (Reversed Direction) */}
          <div ref={timepilotNumRef} className="flex items-center justify-between w-full">
            {/* Minimal Arrow Interaction Indicator */}
            <div
              data-cursor="hover"
              className="flex items-center gap-2 font-mono text-xs text-[#171515] hover:text-[#C1121F] transition-colors cursor-pointer font-bold"
            >
              <span className="font-sans text-sm transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                ↖
              </span>
              <span>EXPLORE</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-[#171515]">
              <span className="font-syne text-[11px] tracking-[0.25em] text-[#171515] uppercase font-bold">
                EMERGENCY SYSTEM
              </span>
              <span className="w-6 h-px bg-[#C1121F]/40" />
              <span className="font-bold text-sm text-[#C1121F]">02</span>
            </div>
          </div>

          {/* Large Project Title (Positioned Upper-Left, Serif Italic Style) */}
          <div className="my-8 sm:my-14 self-start text-left max-w-full">
            <h2
              ref={timepilotTitleRef}
              data-cursor="hover"
              className="font-serif-italic font-normal italic text-5xl sm:text-8xl xl:text-9xl text-[#C1121F] tracking-tight hover:text-[#171515] group-hover:translate-x-2 transition-all duration-500 block select-none"
            >
              TIME PILOT AID
            </h2>
          </div>

          {/* Description (Positioned Lower-Right with Accent Border) */}
          <div
            ref={timepilotDescRef}
            className="self-end max-w-2xl border-r-2 border-[#C1121F] pr-5 sm:pr-8 text-right my-4"
          >
            <p className="font-sans font-light text-base sm:text-xl text-[#171515]/90 leading-relaxed tracking-wide">
              Emergency assistance platform focused on immediate guidance and nearby blood donor discovery.
            </p>
          </div>

          {/* Vertical List Metadata (Positioned Bottom-Left) */}
          <div
            ref={timepilotMetaRef}
            className="self-start pt-6 border-t border-[#171515]/15 w-full flex flex-col space-y-1 font-syne text-[10px] sm:text-xs tracking-[0.25em] text-[#171515]/80 uppercase font-bold"
          >
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#C1121F]" />
              <span>EMERGENCY ASSISTANCE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#C1121F]" />
              <span>WEB APPLICATION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#C1121F]" />
              <span>BLOOD DONOR DISCOVERY</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
