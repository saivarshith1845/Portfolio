import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Clock, Users } from 'lucide-react';
import { HackathonBackground } from './HackathonBackground';

export const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  // Finathon refs
  const entryFinathonRef = useRef<HTMLDivElement>(null);
  const yearFinathonRef = useRef<HTMLSpanElement>(null);
  const lineFinathonRef = useRef<HTMLDivElement>(null);
  const nameFinathonRef = useRef<HTMLDivElement>(null);
  const descFinathonRef = useRef<HTMLDivElement>(null);

  // SIH refs
  const entrySihRef = useRef<HTMLDivElement>(null);
  const yearSihRef = useRef<HTMLSpanElement>(null);
  const lineSihRef = useRef<HTMLDivElement>(null);
  const nameSihRef = useRef<HTMLDivElement>(null);
  const descSihRef = useRef<HTMLDivElement>(null);

  // 2025 refs (Zignasa)
  const entry2025Ref = useRef<HTMLDivElement>(null);
  const year2025Ref = useRef<HTMLSpanElement>(null);
  const line2025Ref = useRef<HTMLDivElement>(null);
  const name2025Ref = useRef<HTMLDivElement>(null);
  const desc2025Ref = useRef<HTMLDivElement>(null);

  // 2026 refs (Ignitia)
  const entry2026Ref = useRef<HTMLDivElement>(null);
  const year2026Ref = useRef<HTMLSpanElement>(null);
  const line2026Ref = useRef<HTMLDivElement>(null);
  const name2026Ref = useRef<HTMLDivElement>(null);
  const desc2026Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background faint typography parallax shift
      if (bgTextRef.current) {
        gsap.fromTo(
          bgTextRef.current,
          { y: -70 },
          {
            y: 70,
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

      // Reusable GSAP Timeline Animation for Entry Cards
      const animateEntry = (
        entry: HTMLDivElement | null,
        year: HTMLSpanElement | null,
        line: HTMLDivElement | null,
        name: HTMLDivElement | null,
        desc: HTMLDivElement | null
      ) => {
        if (!entry) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        if (year) {
          tl.fromTo(
            year,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.1
          );
        }

        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: 'power2.out' },
            0.35
          );
        }

        if (name) {
          tl.fromTo(
            name,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
            0.55
          );
        }

        if (desc) {
          tl.fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.75
          );
        }
      };

      animateEntry(
        entryFinathonRef.current,
        yearFinathonRef.current,
        lineFinathonRef.current,
        nameFinathonRef.current,
        descFinathonRef.current
      );

      animateEntry(
        entrySihRef.current,
        yearSihRef.current,
        lineSihRef.current,
        nameSihRef.current,
        descSihRef.current
      );

      animateEntry(
        entry2025Ref.current,
        year2025Ref.current,
        line2025Ref.current,
        name2025Ref.current,
        desc2025Ref.current
      );

      animateEntry(
        entry2026Ref.current,
        year2026Ref.current,
        line2026Ref.current,
        name2026Ref.current,
        desc2026Ref.current
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative z-1 w-full min-h-[90vh] bg-[#171515] text-[#FFF6E8] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden selection:bg-[#C1121F] selection:text-[#FFF6E8] border-t border-[#FFF6E8]/15"
    >
      {/* Dedicated Hackathon Digital Night Background Component */}
      <HackathonBackground />

      {/* Faint Oversized Background Typography */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none"
      >
        <span className="font-cinzel text-[22vw] font-black text-stroke-powder opacity-05 uppercase tracking-tighter whitespace-nowrap">
          MILESTONES
        </span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Top Editorial Label */}
        <div className="w-full mb-16 sm:mb-24 pb-4 border-b border-[#FFF6E8]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
            <span className="font-syne text-[11px] tracking-[0.35em] text-[#C1121F] uppercase font-bold">
              JOURNEY // 04
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#FFF6E8]/60 uppercase hidden sm:inline font-bold">
            HACKATHON PARTICIPATION & ACHIEVEMENTS
          </span>
        </div>

        {/* Timeline Entries Container */}
        <div className="space-y-16 sm:space-y-24">
          
          {/* ============================================================ */}
          {/* ENTRY 1: FINATHON (FEATURED ACHIEVEMENT - 3RD PLACE WINNER)   */}
          {/* ============================================================ */}
          <div
            ref={entryFinathonRef}
            className="relative w-full flex flex-col space-y-6"
          >
            <div className="relative z-10 p-6 sm:p-10 rounded-xs bg-[#171515]/90 backdrop-blur-md border border-[#C1121F]/50 shadow-2xl shadow-[#C1121F]/15 transition-all duration-300 hover:border-[#C1121F] space-y-6 overflow-hidden">
              {/* Subtle Top Accent using Existing Highlight Color */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C1121F] via-[#A9C6EA]/60 to-transparent" />

              {/* Badges & Key Highlights Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {/* Prominent 3rd Place Winner Badge with Trophy Icon */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#C1121F]/20 text-[#FFF6E8] border border-[#C1121F] font-syne font-bold text-xs sm:text-sm tracking-widest uppercase shadow-md shadow-[#C1121F]/20">
                  <Trophy className="w-4 h-4 text-[#C1121F]" />
                  <span>3rd Place Winner</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* 150+ Participants Highlight */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#A9C6EA]/15 text-[#A9C6EA] border border-[#A9C6EA]/30 font-syne font-bold text-xs tracking-wider uppercase">
                    <Users className="w-3.5 h-3.5 text-[#A9C6EA]" />
                    <span>150+ Participants</span>
                  </div>

                  {/* 36-Hour Hackathon Label */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#FFF6E8]/10 text-[#FFF6E8] border border-[#FFF6E8]/20 font-syne font-bold text-xs tracking-wider uppercase">
                    <Clock className="w-3.5 h-3.5 text-[#C1121F]" />
                    <span>36-Hour Hackathon</span>
                  </div>
                </div>
              </div>

              {/* Header Line: Year + Connecting Line + Event Name */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-[#FFF6E8]/15 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10">
                  <span
                    ref={yearFinathonRef}
                    className="font-cinzel text-6xl sm:text-8xl lg:text-9xl font-black text-[#FFF6E8] tracking-tighter select-none leading-none"
                  >
                    2026
                  </span>

                  <div
                    ref={lineFinathonRef}
                    className="hidden md:block w-24 lg:w-40 h-px bg-[#C1121F] origin-left self-center"
                  />

                  <div ref={nameFinathonRef} className="self-baseline">
                    <h3 className="font-serif-italic font-normal italic text-4xl sm:text-6xl text-[#C1121F] tracking-tight leading-none drop-shadow-sm">
                      FINATHON
                    </h3>
                    <p className="font-syne text-xs tracking-[0.25em] text-[#A9C6EA] uppercase mt-2 font-bold">
                      36-Hour Finance Hackathon
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div
                ref={descFinathonRef}
                className="max-w-3xl border-l-2 border-[#C1121F] pl-5 sm:pl-8 ml-1 sm:ml-4 space-y-4"
              >
                <p className="font-sans font-light text-sm sm:text-base text-[#FFF6E8] leading-relaxed tracking-wide">
                  Secured 3rd place in Finathon, a 36-hour finance-focused hackathon with over 150 participants. Worked on an AI-powered bank transaction intelligence solution designed to help Indian SMEs automate transaction categorization, streamline financial workflows, and identify potentially fraudulent payments.
                </p>

                {/* Project Domains */}
                <div className="flex flex-wrap items-center gap-2 pt-1 font-syne text-[11px] font-bold tracking-wider uppercase">
                  <span className="text-[#A9C6EA]">Project Domain:</span>
                  <span className="px-2.5 py-0.5 rounded-xs bg-[#FFF6E8]/5 border border-[#FFF6E8]/15 text-[#FFF6E8]/90">FinTech</span>
                  <span className="px-2.5 py-0.5 rounded-xs bg-[#FFF6E8]/5 border border-[#FFF6E8]/15 text-[#FFF6E8]/90">AI</span>
                  <span className="px-2.5 py-0.5 rounded-xs bg-[#FFF6E8]/5 border border-[#FFF6E8]/15 text-[#FFF6E8]/90">Financial Automation</span>
                </div>
              </div>

              {/* Concise Finathon Project Summary & Technical Focus */}
              <div className="mt-6 pt-6 border-t border-[#FFF6E8]/15 space-y-4 bg-[#FFF6E8]/[0.02] -mx-6 sm:-mx-10 px-6 sm:px-10 -mb-6 sm:-mb-10 pb-6 sm:pb-10">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#A9C6EA] uppercase font-bold block mb-1">
                    PROJECT SUMMARY // FINTECH PROTOTYPE
                  </span>
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFF6E8]">
                    AI-Powered Bank Transaction Intelligence for Indian SMEs
                  </h4>
                  <p className="font-sans font-light text-xs sm:text-sm text-[#FFF6E8]/85 leading-relaxed mt-2 max-w-3xl">
                    An AI-focused fintech prototype exploring automated transaction categorization, intelligent financial-record matching, fraud alerts, and voice-based financial queries.
                  </p>
                </div>

                {/* Technical Focus */}
                <div>
                  <span className="font-syne text-[11px] tracking-wider text-[#C1121F] uppercase font-bold block mb-2">
                    Technical Focus:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#FFF6E8]/90">
                    {['AI-assisted classification', 'Financial automation', 'Transaction matching', 'Fraud detection'].map((focus) => (
                      <span key={focus} className="px-2.5 py-1 rounded-xs bg-[#FFF6E8]/5 border border-[#FFF6E8]/15">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Concepts from Problem Statement */}
                <div>
                  <span className="font-syne text-[11px] tracking-wider text-[#A9C6EA] uppercase font-bold block mb-2">
                    Problem Statement Concepts & Addressed Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-sans text-[#FFF6E8]/80">
                    {[
                      'Bank transaction categorization',
                      'Intelligent matching against known financial records',
                      'Transaction review workflows',
                      'Fraud alerts for recently changed beneficiary accounts',
                      'Voice-based financial queries',
                      'Indian payment methods (UPI, NEFT, RTGS, IMPS)',
                    ].map((concept, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 p-2 rounded-xs bg-[#171515]/60 border border-[#FFF6E8]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F] shrink-0" />
                        <span className="leading-snug">{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* ENTRY 2: SMART INDIA HACKATHON (SIH)                         */}
          {/* ============================================================ */}
          <div
            ref={entrySihRef}
            className="relative w-full flex flex-col space-y-6 md:pl-10 lg:pl-16"
          >
            <div className="relative z-10 p-6 sm:p-8 rounded-xs bg-[#171515]/80 backdrop-blur-md border border-[#A9C6EA]/20 shadow-2xl transition-all duration-300 hover:border-[#A9C6EA]/40 space-y-6">
              
              {/* Achievement Badge */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#A9C6EA]/15 text-[#A9C6EA] border border-[#A9C6EA]/30 font-syne font-bold text-xs tracking-wider uppercase">
                  <span>Selected in College-Level Internal Round</span>
                </div>
              </div>

              {/* Header Line: Year + Connecting Line + Event Name */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-[#FFF6E8]/15 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10">
                  <span
                    ref={yearSihRef}
                    className="font-cinzel text-6xl sm:text-8xl lg:text-9xl font-black text-[#FFF6E8] tracking-tighter select-none leading-none"
                  >
                    2025
                  </span>

                  <div
                    ref={lineSihRef}
                    className="hidden md:block w-20 lg:w-32 h-px bg-[#C1121F] origin-left self-center"
                  />

                  <div ref={nameSihRef} className="self-baseline">
                    <h3 className="font-serif-italic font-normal italic text-3xl sm:text-5xl text-[#A9C6EA] tracking-tight leading-none font-bold drop-shadow-sm">
                      SMART INDIA HACKATHON
                    </h3>
                    <p className="font-syne text-xs tracking-[0.25em] text-[#C1121F] uppercase mt-2 font-bold">
                      Internal Round Selection
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div
                ref={descSihRef}
                className="max-w-xl border-l-2 border-[#A9C6EA] pl-5 sm:pl-8 ml-1 sm:ml-4"
              >
                <p className="font-sans font-light text-sm sm:text-base text-[#FFF6E8] leading-relaxed tracking-wide">
                  Participated in Smart India Hackathon and was selected in the college-level internal round, gaining experience in collaborative problem-solving and developing innovative solutions to real-world challenges.
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* ENTRY 3: 2025 — ZIGNASA                                      */}
          {/* ============================================================ */}
          <div
            ref={entry2025Ref}
            className="relative w-full flex flex-col space-y-6"
          >
            <div className="relative z-10 p-6 sm:p-8 rounded-xs bg-[#171515]/75 backdrop-blur-md border border-[#FFF6E8]/10 shadow-2xl transition-all duration-300 hover:border-[#C1121F]/40 space-y-6">
              {/* Header Line: Year + Connecting Line + Event Name */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-[#FFF6E8]/15 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10">
                  <span
                    ref={year2025Ref}
                    className="font-cinzel text-6xl sm:text-8xl lg:text-9xl font-black text-[#FFF6E8] tracking-tighter select-none leading-none"
                  >
                    2025
                  </span>

                  <div
                    ref={line2025Ref}
                    className="hidden md:block w-24 lg:w-40 h-px bg-[#C1121F] origin-left self-center"
                  />

                  <div ref={name2025Ref} className="self-baseline">
                    <h3 className="font-serif-italic font-normal italic text-4xl sm:text-6xl text-[#C1121F] tracking-tight leading-none">
                      ZIGNASA
                    </h3>
                    <p className="font-syne text-xs tracking-[0.25em] text-[#FFF6E8]/70 uppercase mt-2 font-bold">
                      Hackathon participation
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div
                ref={desc2025Ref}
                className="max-w-xl border-l-2 border-[#C1121F] pl-5 sm:pl-8 ml-1 sm:ml-4"
              >
                <p className="font-sans font-light text-sm sm:text-base text-[#FFF6E8] leading-relaxed tracking-wide">
                  Selected a problem statement and turned the idea into a working website during the hackathon.
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* ENTRY 4: 2026 — IGNITIA (Asymmetric Right Offset)            */}
          {/* ============================================================ */}
          <div
            ref={entry2026Ref}
            className="relative w-full flex flex-col space-y-6 md:pl-16 lg:pl-32"
          >
            <div className="relative z-10 p-6 sm:p-8 rounded-xs bg-[#171515]/85 backdrop-blur-md border border-[#A9C6EA]/20 shadow-2xl transition-all duration-300 hover:border-[#A9C6EA]/40 space-y-6">
              {/* Header Line: Year + Connecting Line + Event Name */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-[#FFF6E8]/15 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10">
                  <span
                    ref={year2026Ref}
                    className="font-cinzel text-6xl sm:text-8xl lg:text-9xl font-black text-[#FFF6E8] tracking-tighter select-none leading-none"
                  >
                    2026
                  </span>

                  <div
                    ref={line2026Ref}
                    className="hidden md:block w-24 lg:w-40 h-px bg-[#C1121F] origin-left self-center"
                  />

                  <div ref={name2026Ref} className="self-baseline">
                    <h3 className="font-serif-italic font-normal italic text-4xl sm:text-6xl text-[#A9C6EA] tracking-tight leading-none font-bold drop-shadow-sm">
                      IGNITIA
                    </h3>
                    <p className="font-syne text-xs tracking-[0.25em] text-[#C1121F] uppercase mt-2 font-bold">
                      Hackathon participation
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div
                ref={desc2026Ref}
                className="max-w-xl border-l-2 border-[#C1121F] pl-5 sm:pl-8 ml-1 sm:ml-4"
              >
                <p className="font-sans font-normal text-sm sm:text-base text-[#FFF6E8] leading-relaxed tracking-wide">
                  Joined the challenge to build a website-based solution around a given real-world problem statement.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
