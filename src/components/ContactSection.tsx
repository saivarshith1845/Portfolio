import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);

  const contactRowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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
              scrub: 1.5,
            },
          }
        );
      }

      // Closing Statement Staggered Motion Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (line1Ref.current) {
        tl.fromTo(
          line1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          0.1
        );
      }

      if (line2Ref.current) {
        tl.fromTo(
          line2Ref.current,
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          0.25
        );
      }

      if (line3Ref.current) {
        tl.fromTo(
          line3Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          0.4
        );
      }

      if (contactRowRef.current) {
        tl.fromTo(
          contactRowRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.6
        );
      }

      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.75
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative z-1 w-full min-h-screen bg-transparent text-[#171515] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-between selection:bg-[#C1121F] selection:text-[#FFF6E8] border-t border-[#171515]/15 bg-grid-lines-blue"
    >
      {/* Background Texture & Atmospheric Crimson + Powder Blue Interaction */}
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#A9C6EA]/18 rounded-full blur-[170px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#C1121F]/08 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Faint Oversized Background Typography */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none"
      >
        <span className="font-cinzel text-[22vw] font-black text-stroke-crimson opacity-15 uppercase tracking-tighter whitespace-nowrap">
          COLLABORATE
        </span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-full flex-1">
        
        {/* Small Top Label */}
        <div className="w-full mb-12 sm:mb-16 pb-4 border-b border-[#171515]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
            <span className="font-syne text-[11px] tracking-[0.35em] text-[#C1121F] uppercase font-bold">
              GET IN TOUCH // 05
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#171515]/60 uppercase hidden sm:inline font-bold">
            OPEN FOR COLLABORATION
          </span>
        </div>

        {/* Huge Editorial Closing Statement */}
        <div className="relative w-full my-auto py-8 sm:py-16 flex flex-col space-y-2 sm:space-y-4 preserve-3d">
          <h2
            ref={line1Ref}
            className="font-cinzel text-5xl sm:text-8xl xl:text-9xl font-black text-[#171515] tracking-tight uppercase leading-[0.9] select-none self-start"
          >
            LET'S BUILD
          </h2>

          <h2
            ref={line2Ref}
            className="font-serif-italic font-normal italic text-6xl sm:text-9xl xl:text-[11rem] text-[#C1121F] leading-[0.8] tracking-tight select-none self-center ml-2 sm:ml-16"
          >
            SOMETHING
          </h2>

          <h2
            ref={line3Ref}
            className="font-syne font-extrabold text-4xl sm:text-7xl xl:text-8xl text-[#171515] uppercase leading-[0.95] select-none self-end"
          >
            WORTH SEEING<span className="text-[#C1121F]">.</span>
          </h2>
        </div>

        {/* Minimal Contact Row (Real Clickable Links) */}
        <div
          ref={contactRowRef}
          className="w-full my-10 sm:my-16 pt-8 border-t border-[#171515]/15 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Email */}
          <a
            href="mailto:tannerusaivarshith55@gmail.com"
            data-cursor="hover"
            className="group flex flex-col space-y-1.5 border-b md:border-b-0 md:border-r border-[#171515]/15 pb-6 md:pb-0 md:pr-6 transition-all duration-300"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#C1121F] uppercase flex items-center justify-between font-bold">
              <span>EMAIL</span>
              <span className="font-sans text-xs transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
            </span>
            <span className="font-sans text-xs sm:text-sm text-[#171515] group-hover:text-[#C1121F] transition-colors duration-300 truncate font-semibold">
              tannerusaivarshith55@gmail.com
            </span>
            <span className="w-0 group-hover:w-full h-px bg-[#C1121F] transition-all duration-300" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/saivarshith1845"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group flex flex-col space-y-1.5 border-b md:border-b-0 md:border-r border-[#171515]/15 pb-6 md:pb-0 md:pr-6 transition-all duration-300"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#C1121F] uppercase flex items-center justify-between font-bold">
              <span>GITHUB</span>
              <span className="font-sans text-xs transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
            </span>
            <span className="font-sans text-xs sm:text-sm text-[#171515] group-hover:text-[#C1121F] transition-colors duration-300 truncate font-semibold">
              github.com/saivarshith1845
            </span>
            <span className="w-0 group-hover:w-full h-px bg-[#C1121F] transition-all duration-300" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sai-varshith-5282413b5"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group flex flex-col space-y-1.5 transition-all duration-300"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#C1121F] uppercase flex items-center justify-between font-bold">
              <span>LINKEDIN</span>
              <span className="font-sans text-xs transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
            </span>
            <span className="font-sans text-xs sm:text-sm text-[#171515] group-hover:text-[#C1121F] transition-colors duration-300 truncate font-semibold">
              linkedin.com/in/sai-varshith-5282413b5
            </span>
            <span className="w-0 group-hover:w-full h-px bg-[#C1121F] transition-all duration-300" />
          </a>
        </div>

        {/* Minimal Editorial Footer Line */}
        <div
          ref={footerRef}
          className="w-full pt-6 border-t border-[#171515]/15 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.25em] text-[#171515]/70 uppercase font-sans gap-3"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
            <span className="font-syne font-bold text-[#171515]">SAI VARSHITH</span>
            <span className="text-[#C1121F]">|</span>
            <span className="font-medium">B.TECH CSE · DATA SCIENCE</span>
          </div>

          <div className="font-mono text-[#C1121F] font-bold">
            © 2026 ALL RIGHTS RESERVED
          </div>
        </div>

      </div>
    </footer>
  );
};
