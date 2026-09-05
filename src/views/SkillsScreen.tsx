import React from 'react';
import { NavScreen } from '../types';

interface SkillsScreenProps {
  onNavigate: (screen: NavScreen) => void;
}

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onNavigate }) => {
  return (
    <section id="skills" className="py-20 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#302922] border border-[#7B5E3C]/50 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#ffb86e] animate-pulse" />
          <span className="font-label-uppercase text-xs text-[#FBE9B3] tracking-widest font-semibold">
            TECHNICAL EXPERTISE & STACK
          </span>
        </div>
        <h1 className="font-headline-xl text-4xl sm:text-6xl text-[#FBE9B3] tracking-tight font-bold mb-4">
          THE TOOLS I BUILD WITH
        </h1>
        <p className="font-body-lg text-base sm:text-lg text-[#d7c3b2] max-w-2xl leading-relaxed">
          A curated arsenal of languages, systems, and theoretical frameworks driving modern
          algorithmic solutions.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* 01 / Core Languages */}
        <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                01 / CORE LANGUAGES
              </span>
              <span className="material-symbols-outlined text-[#ffb86e] text-xl">code</span>
            </div>
            <h2 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-2">
              PROGRAMMING
            </h2>
            <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
              High-performance execution and structured syntax foundations for scalable software engineering.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#7B5E3C]/20">
            {['C', 'Python', 'Java'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#251e18] text-[#ffb86e] rounded text-xs font-label-uppercase tracking-wider border border-[#7B5E3C]/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 02 / Persistence */}
        <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                02 / PERSISTENCE
              </span>
              <span className="material-symbols-outlined text-[#ffb86e] text-xl">database</span>
            </div>
            <h2 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-2">
              DATABASE
            </h2>
            <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
              Structured relational querying and efficient retrieval architectures for heavy transactional loads.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#7B5E3C]/20">
            <span className="px-3 py-1 bg-[#251e18] text-[#ffb86e] rounded text-xs font-label-uppercase tracking-wider border border-[#7B5E3C]/30">
              SQL
            </span>
          </div>
        </div>

        {/* 03 / Interface */}
        <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                03 / INTERFACE
              </span>
              <span className="material-symbols-outlined text-[#ffb86e] text-xl">globe</span>
            </div>
            <h2 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-2">
              WEB
            </h2>
            <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
              Client-side logic and dynamic interaction paradigms designed for responsive digital experiences.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#7B5E3C]/20">
            <span className="px-3 py-1 bg-[#251e18] text-[#ffb86e] rounded text-xs font-label-uppercase tracking-wider border border-[#7B5E3C]/30">
              JavaScript
            </span>
          </div>
        </div>

        {/* 04 / Horizon (Spans 2 columns on desktop) */}
        <div className="md:col-span-2 bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                04 / HORIZON
              </span>
              <span className="material-symbols-outlined text-[#ffb86e] text-xl">psychology</span>
            </div>
            <h2 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-2">
              EXPLORING
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#d7c3b2] leading-relaxed mb-6">
              Pushing the boundaries of intelligent systems, automated pattern recognition, and
              quantitative data pipelines.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#7B5E3C]/20">
            {['Artificial Intelligence', 'Machine Learning', 'Data Science'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#251e18] text-[#ffb86e] rounded text-xs font-label-uppercase tracking-wider border border-[#7B5E3C]/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* System Status / Active Evolution Card */}
        <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest font-semibold">
                SYSTEM STATUS
              </span>
              <span className="material-symbols-outlined text-[#ffb86e] text-xl">trending_up</span>
            </div>
            <h2 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-2">
              ACTIVE EVOLUTION
            </h2>
            <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
              Constantly refactoring legacy approaches and integrating new computational models into
              production pipelines.
            </p>
          </div>
          <div className="pt-4 border-t border-[#7B5E3C]/20 flex items-center justify-between text-xs font-label-uppercase">
            <span className="text-[#9f8e7e]">Continuous Learning</span>
            <span className="material-symbols-outlined text-[#ffb86e] text-lg">trending_up</span>
          </div>
        </div>
      </div>

      {/* The Core Philosophy Banner */}
      <div className="border border-[#7B5E3C]/40 bg-[#211a14] p-8 sm:p-12 rounded-xl relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <span className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest block mb-2 font-semibold">
            THE CORE PHILOSOPHY
          </span>
          <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#FBE9B3] font-bold mb-4 tracking-tight">
            LEARN SOMETHING. BUILD SOMETHING. REPEAT.
          </h2>
          <p className="font-body-md text-sm sm:text-base text-[#d7c3b2] leading-relaxed mb-8">
            Theory without execution is merely speculation. True mastery is achieved through relentless
            iteration, rigorous testing, and the disciplined creation of tangible software.
          </p>
          <button
            onClick={() => onNavigate('projects')}
            className="bg-[#E49A48] hover:bg-[#F5C972] text-[#2c1600] px-6 py-3.5 rounded-xl font-label-uppercase text-xs font-bold tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
          >
            Explore Projects
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
