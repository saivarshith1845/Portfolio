import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HackathonBackground } from './HackathonBackground';

export const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  // 2025 refs
  const entry2025Ref = useRef<HTMLDivElement>(null);
  const year2025Ref = useRef<HTMLSpanElement>(null);
  const line2025Ref = useRef<HTMLDivElement>(null);
  const name2025Ref = useRef<HTMLDivElement>(null);
  const desc2025Ref = useRef<HTMLDivElement>(null);

  // 2026 refs
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

      // 1. Entry 2025 GSAP Timeline Sequence
      if (entry2025Ref.current) {
        const tl2025 = gsap.timeline({
          scrollTrigger: {
            trigger: entry2025Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        if (year2025Ref.current) {
          tl2025.fromTo(
            year2025Ref.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.1
          );
        }

        if (line2025Ref.current) {
          tl2025.fromTo(
            line2025Ref.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: 'power2.out' },
            0.35
          );
        }

        if (name2025Ref.current) {
          tl2025.fromTo(
            name2025Ref.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
            0.55
          );
        }

        if (desc2025Ref.current) {
          tl2025.fromTo(
            desc2025Ref.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.75
          );
        }
      }

      // 2. Entry 2026 GSAP Timeline Sequence
      if (entry2026Ref.current) {
        const tl2026 = gsap.timeline({
          scrollTrigger: {
            trigger: entry2026Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        if (year2026Ref.current) {
          tl2026.fromTo(
            year2026Ref.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.1
          );
        }

        if (line2026Ref.current) {
          tl2026.fromTo(
            line2026Ref.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: 'power2.out' },
            0.35
          );
        }

        if (name2026Ref.current) {
          tl2026.fromTo(
            name2026Ref.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
            0.55
          );
        }

        if (desc2026Ref.current) {
          tl2026.fromTo(
            desc2026Ref.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.75
          );
        }
      }
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
        <span className="font-cinzel text-[22vw] font-black text-stroke-powder opacity-10 uppercase tracking-tighter whitespace-nowrap">
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
            HACKATHON PARTICIPATION
          </span>
        </div>

        {/* Timeline Entries Container */}
        <div className="space-y-20 sm:space-y-32">
          
          {/* ============================================================ */}
          {/* ENTRY 1: 2025 — ZIGNASA */}
          {/* ============================================================ */}
          <div
            ref={entry2025Ref}
            className="relative w-full flex flex-col space-y-6"
          >
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
              <p className="font-sans font-light text-sm sm:text-base text-[#FFF6E8]/90 leading-relaxed tracking-wide">
                Selected a problem statement and turned the idea into a working website during the hackathon.
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* ENTRY 2: 2026 — IGNITIA (Asymmetric Right Offset) */}
          {/* ============================================================ */}
          <div
            ref={entry2026Ref}
            className="relative w-full flex flex-col space-y-6 md:pl-16 lg:pl-32"
          >
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
                  <h3 className="font-serif-italic font-normal italic text-4xl sm:text-6xl text-[#A9C6EA] tracking-tight leading-none font-semibold">
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
              <p className="font-sans font-light text-sm sm:text-base text-[#FFF6E8]/90 leading-relaxed tracking-wide">
                Joined the challenge to build a website-based solution around a given real-world problem statement.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
