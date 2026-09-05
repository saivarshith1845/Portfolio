import React from 'react';
import { NavScreen } from '../types';
import { PORTRAIT_IMAGE_URL } from '../data/portfolioData';

interface AboutScreenProps {
  onNavigate: (screen: NavScreen) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <section id="about" className="py-20 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#7B5E3C]/30 pb-8 mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-[1px] bg-[#ffb86e]" />
            <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
              About Sai Varshith
            </span>
          </div>
          <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl text-[#FBE9B3] tracking-tight font-bold leading-tight">
            CURIOUS BY DEFAULT.<br />BUILDER BY CHOICE.
          </h1>
        </div>

        <div className="md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#ffb86e] pl-4 md:pl-0 md:pr-4">
          <span className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest block mb-1">
            LOCATION
          </span>
          <span className="font-headline-md text-xl sm:text-2xl text-[#FBE9B3] font-semibold">
            Hyderabad, India
          </span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait & Narrative */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Portrait Card */}
          <div className="relative rounded-xl overflow-hidden border border-[#7B5E3C] bg-[#251e18] aspect-[4/5] shadow-2xl group">
            <img
              src={PORTRAIT_IMAGE_URL}
              alt="Sai Varshith - Developer & Data Scientist"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060301] via-transparent to-transparent opacity-80" />

            {/* Overlaid Badges */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#18120c]/90 backdrop-blur-md border border-[#7B5E3C]/50 font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold shadow-md">
                AI + CSE SCHOLAR
              </span>
              <div
                title="Active Terminal System"
                className="w-8 h-8 rounded-full bg-[#18120c]/90 backdrop-blur-md border border-[#7B5E3C]/50 flex items-center justify-center text-[#ffb86e] shadow-md"
              >
                <span className="material-symbols-outlined text-sm">terminal</span>
              </div>
            </div>
          </div>

          {/* Narrative Card */}
          <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="font-headline-md text-2xl text-[#FBE9B3] font-bold mb-4">
              Engineering Intelligence
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#d7c3b2] leading-relaxed mb-4">
              My journey into computing began with a simple desire to understand how logic translates
              into interactive digital behavior. Currently pursuing a B.Tech in Computer Science and
              Engineering with a focus on Data Science at MLRIT, I operate at the intersection of raw
              mathematics and user-facing software.
            </p>
            <p className="font-body-md text-sm sm:text-base text-[#d7c3b2] leading-relaxed">
              Whether tuning neural network architectures or architecting full-stack web
              applications, I prioritize robust performance, modular engineering patterns, and
              ruthless simplicity. I view code as a medium for pragmatic problem solving.
            </p>
          </div>
        </div>

        {/* Right Column: 4 Bento Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 01: Academics */}
          <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-7 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                  01 / ACADEMICS
                </span>
                <span className="material-symbols-outlined text-[#ffb86e] text-xl">school</span>
              </div>
              <span className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest block mb-1">
                EDUCATION
              </span>
              <h3 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-3">
                B.Tech — CSE Data Science
              </h3>
              <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
                Focused on modern machine learning, distributed systems, and core data architecture.
              </p>
            </div>
            <div className="pt-4 border-t border-[#7B5E3C]/20 flex items-center justify-between text-xs font-label-uppercase">
              <span className="text-[#9f8e7e]">Current Standing</span>
              <span className="text-[#ffb86e] font-bold">2nd Year</span>
            </div>
          </div>

          {/* Card 02: Institution */}
          <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-7 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                  02 / INSTITUTION
                </span>
                <span className="material-symbols-outlined text-[#ffb86e] text-xl">apartment</span>
              </div>
              <span className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest block mb-1">
                COLLEGE
              </span>
              <h3 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-3">
                MLR Institute of Technology
              </h3>
              <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
                Engaged in research labs, developer clubs, and high-impact hackathons across campus.
              </p>
            </div>
            <div className="pt-4 border-t border-[#7B5E3C]/20 flex items-center justify-between text-xs font-label-uppercase">
              <span className="text-[#9f8e7e]">Location</span>
              <span className="text-[#ffb86e] font-bold">Hyderabad, MLRIT</span>
            </div>
          </div>

          {/* Card 03: Specialization */}
          <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-7 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                  03 / SPECIALIZATION
                </span>
                <span className="material-symbols-outlined text-[#ffb86e] text-xl">psychology</span>
              </div>
              <span className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest block mb-1">
                CURRENT FOCUS
              </span>
              <h3 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-3">
                AI + Web Applications
              </h3>
              <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
                Developing bespoke intelligent applications with responsive, low-latency interfaces.
              </p>
            </div>
            <div className="pt-4 border-t border-[#7B5E3C]/20 flex flex-wrap gap-2">
              {['Python', 'React', 'PyTorch'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#251e18] text-[#ffb86e] rounded text-xs font-label-uppercase border border-[#7B5E3C]/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 04: Philosophy */}
          <div className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-7 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                  04 / PHILOSOPHY
                </span>
                <span className="material-symbols-outlined text-[#ffb86e] text-xl">bolt</span>
              </div>
              <span className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest block mb-1">
                MINDSET
              </span>
              <h3 className="font-headline-md text-xl text-[#FBE9B3] font-bold mb-3">
                Learn → Build → Iterate
              </h3>
              <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
                Execution over endless theorizing. Deploying software into real hands is the truest metric.
              </p>
            </div>
            <div className="pt-4 border-t border-[#7B5E3C]/20 flex items-center justify-between text-xs font-label-uppercase">
              <span className="text-[#9f8e7e]">Execution</span>
              <span className="text-[#ffb86e] font-bold">Agile & Continuous</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Collaboration Callout Bar */}
      <div className="mt-16 border border-[#7B5E3C]/40 bg-[#211a14] p-6 sm:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffb86e] animate-pulse" />
          <span className="font-label-uppercase text-xs sm:text-sm text-[#FBE9B3] tracking-widest font-semibold">
            READY FOR COLLABORATION & RESEARCH INITIATIVES
          </span>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="bg-[#E49A48] hover:bg-[#F5C972] text-[#2c1600] px-6 py-3 rounded-xl font-label-uppercase text-xs font-bold tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
        >
          Get in Touch
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </section>
  );
};
