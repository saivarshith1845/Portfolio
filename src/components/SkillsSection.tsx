import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillsBackground } from './SkillsBackground';

interface SkillItem {
  id: string;
  name: string;
  category: 'PROGRAMMING' | 'DATA';
  code: string;
  signalBars: number; // 1 to 5 signal level
}

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeSkill, setActiveSkill] = useState<string>('C');

  // ONLY 5 actual skills
  const skillsList: SkillItem[] = [
    { id: 'c', name: 'C', category: 'PROGRAMMING', code: 'DEV_LANG_01 // C', signalBars: 5 },
    { id: 'python', name: 'Python', category: 'PROGRAMMING', code: 'DEV_LANG_02 // PY', signalBars: 5 },
    { id: 'java', name: 'Java', category: 'PROGRAMMING', code: 'DEV_LANG_03 // JV', signalBars: 4 },
    { id: 'sql', name: 'SQL', category: 'DATA', code: 'DEV_DATA_01 // SQL', signalBars: 5 },
    { id: 'javascript', name: 'JavaScript', category: 'PROGRAMMING', code: 'DEV_LANG_04 // JS', signalBars: 4 },
  ];

  // Animated Waveform Oscilloscope Canvas
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 240);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = canvas.parentElement?.clientHeight || 240;
    };
    window.addEventListener('resize', handleResize);

    let phase = 0;

    const render = () => {
      phase += 0.04;
      ctx.clearRect(0, 0, width, height);

      // Grid background inside waveform scope
      ctx.strokeStyle = 'rgba(169, 198, 234, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Primary Powder Blue Waveform
      ctx.strokeStyle = '#A9C6EA';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#A9C6EA';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const centerY = height / 2;
      for (let x = 0; x < width; x += 2) {
        const freq1 = Math.sin(x * 0.02 + phase) * 35;
        const freq2 = Math.cos(x * 0.04 - phase * 0.7) * 15;
        const freq3 = Math.sin(x * 0.008 + phase * 1.2) * 20;
        const y = centerY + freq1 + freq2 + freq3;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary Crimson Waveform
      ctx.strokeStyle = '#C1121F';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#C1121F';
      ctx.shadowBlur = 6;
      ctx.beginPath();

      for (let x = 0; x < width; x += 3) {
        const freq = Math.sin(x * 0.025 - phase * 1.5) * 25 + Math.cos(x * 0.015 + phase) * 12;
        const y = centerY + freq;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.shadowBlur = 0; // Reset shadow

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeSkill]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 w-full min-h-screen bg-[#171515] text-[#FFF6E8] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center border-t border-[#C1121F]/20 selection:bg-[#C1121F] selection:text-[#FFF6E8]"
    >
      {/* Dark Technical Control Room Background */}
      <SkillsBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto space-y-12">
        
        {/* Top Technical Section Marker */}
        <div className="w-full pb-4 border-b border-[#FFF6E8]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C1121F] animate-ping" />
            <span className="font-syne text-[11px] tracking-[0.35em] text-[#C1121F] uppercase font-bold">
              CHAPTER // 03
            </span>
          </div>
          <span className="font-syne text-[10px] sm:text-xs tracking-[0.25em] text-[#A9C6EA] uppercase font-semibold">
            DEVELOPER CONTROL ROOM
          </span>
        </div>

        {/* Section Heading */}
        <div className="space-y-3">
          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black text-[#FFF6E8] tracking-tight uppercase">
            TECHNICAL <span className="font-serif-italic font-normal italic text-[#A9C6EA]">CAPABILITIES</span>
          </h2>
          <p className="font-syne text-xs sm:text-sm text-[#A9C6EA] tracking-widest uppercase font-semibold">
            CORE LANGUAGES & DATA MANAGEMENT
          </p>
        </div>

        {/* Developer Control Room Layout Grid (Left: Language Matrix, Right: Signal Waveform & Categories) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ============================================================ */}
          {/* LEFT: LANGUAGE MATRIX (5 actual skills) */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#FFF6E8]/10 text-xs font-syne text-[#A9C6EA] tracking-widest uppercase font-bold">
              <span>01 // LANGUAGE MATRIX</span>
              <span>SIGNAL STATUS</span>
            </div>

            <div className="space-y-3">
              {skillsList.map((skill, idx) => {
                const isActive = activeSkill === skill.name;
                return (
                  <div
                    key={skill.id}
                    onClick={() => setActiveSkill(skill.name)}
                    data-cursor="hover"
                    className={`group relative p-4 sm:p-5 rounded-xs border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'border-[#C1121F] bg-[#FFF6E8]/10 shadow-lg shadow-[#C1121F]/15'
                        : 'border-[#FFF6E8]/15 bg-[#171515]/60 hover:border-[#A9C6EA]/60 hover:bg-[#FFF6E8]/05'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-[#C1121F] font-bold">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFF6E8] group-hover:text-[#A9C6EA] transition-colors">
                          {skill.name}
                        </h3>
                        <span className="font-mono text-[9px] text-[#A9C6EA]/70 uppercase tracking-wider block">
                          {skill.code}
                        </span>
                      </div>
                    </div>

                    {/* Signal Intensity Meter (5 Bars) */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, barIdx) => (
                        <div
                          key={barIdx}
                          className={`w-1.5 h-6 rounded-xs transition-all duration-300 ${
                            barIdx < skill.signalBars
                              ? isActive
                                ? 'bg-[#C1121F]'
                                : 'bg-[#A9C6EA]'
                              : 'bg-[#FFF6E8]/15'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: TECHNICAL PROFILE & INTERACTIVE WAVEFORM SCOPE */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* TECHNICAL CATEGORIES BREAKDOWN */}
            <div className="p-6 rounded-xs border border-[#FFF6E8]/15 bg-[#171515]/80 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#FFF6E8]/10 font-syne text-xs text-[#C1121F] tracking-widest uppercase font-bold">
                <span>02 // TECHNICAL PROFILE</span>
                <span className="text-[#A9C6EA]">SYS_ACTIVE</span>
              </div>

              {/* PROGRAMMING CATEGORY */}
              <div className="space-y-2">
                <span className="block font-mono text-[10px] tracking-[0.25em] text-[#A9C6EA] uppercase font-bold">
                  PROGRAMMING
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {['C', 'Python', 'Java', 'JavaScript'].map((lang) => (
                    <span
                      key={lang}
                      className={`px-3 py-1.5 text-xs font-syne font-bold uppercase rounded-xs border transition-colors ${
                        activeSkill === lang
                          ? 'border-[#C1121F] bg-[#C1121F] text-[#FFF6E8]'
                          : 'border-[#FFF6E8]/20 bg-[#FFF6E8]/5 text-[#FFF6E8]/90'
                      }`}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* DATA CATEGORY */}
              <div className="space-y-2 pt-2 border-t border-[#FFF6E8]/10">
                <span className="block font-mono text-[10px] tracking-[0.25em] text-[#A9C6EA] uppercase font-bold">
                  DATA
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <span
                    className={`px-3 py-1.5 text-xs font-syne font-bold uppercase rounded-xs border transition-colors ${
                      activeSkill === 'SQL'
                        ? 'border-[#C1121F] bg-[#C1121F] text-[#FFF6E8]'
                        : 'border-[#FFF6E8]/20 bg-[#FFF6E8]/5 text-[#FFF6E8]/90'
                    }`}
                  >
                    SQL
                  </span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE WAVEFORM / SIGNAL VISUALIZATION */}
            <div className="p-6 rounded-xs border border-[#C1121F]/30 bg-[#171515]/90 space-y-4">
              <div className="flex items-center justify-between font-syne text-xs text-[#A9C6EA] tracking-widest uppercase font-bold">
                <span>03 // TELEMETRY WAVEFORM OSCILLOSCOPE</span>
                <span className="text-[#C1121F] font-mono text-[10px]">FREQ: 60Hz</span>
              </div>

              {/* Waveform Scope Canvas */}
              <div className="relative w-full h-44 rounded-xs border border-[#FFF6E8]/15 bg-[#171515] overflow-hidden">
                <canvas ref={waveCanvasRef} className="w-full h-full block" />
                
                {/* Active Skill Telemetry Overlay */}
                <div className="absolute top-2 left-3 font-mono text-[10px] text-[#A9C6EA] tracking-wider uppercase font-semibold">
                  TARGET: <span className="text-[#FFF6E8] font-bold">{activeSkill}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
