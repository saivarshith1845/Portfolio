import React from 'react';
import { NavScreen, Project } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: NavScreen) => void;
  onSelectProject: (project: Project) => void;
  featuredProject: Project;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectProject,
  featuredProject,
}) => {
  return (
    <section
      id="home"
      className="relative pt-24 pb-20 px-6 lg:px-16 max-w-7xl mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-between scroll-mt-20"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B46627]/10 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Hero Section */}
      <div className="relative z-10 pt-8 sm:pt-16 pb-16 lg:pb-24">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#302922] border border-[#7B5E3C]/50 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#ffb86e] animate-pulse" />
          <span className="font-label-uppercase text-xs text-[#FBE9B3] tracking-widest font-semibold">
            CURRENTLY BUILDING — AI STUDENT PLATFORM
          </span>
        </div>

        {/* Subtitle */}
        <p className="font-label-uppercase text-xs sm:text-sm text-[#d7c3b2] tracking-widest uppercase mb-4 font-semibold">
          CSE • DATA SCIENCE • BUILDER
        </p>

        {/* Main Headline */}
        <h1 className="font-headline-xl text-4xl sm:text-6xl lg:text-7xl text-[#FBE9B3] max-w-5xl tracking-tight mb-6 font-bold leading-none">
          I BUILD IDEAS INTO DIGITAL EXPERIENCES.
        </h1>

        {/* Supporting Narrative */}
        <p className="font-body-lg text-base sm:text-lg lg:text-xl text-[#d7c3b2] max-w-2xl mb-10 leading-relaxed font-light">
          Computer Science & Data Science student at MLRIT, crafting high-performance systems,
          machine learning architectures, and cinematic web interfaces with raw precision.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => onNavigate('projects')}
            className="bg-[#E49A48] hover:bg-[#F5C972] text-[#2c1600] px-8 py-4 rounded-xl font-label-uppercase text-xs font-bold tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#E49A48]/15 cursor-pointer"
          >
            EXPLORE MY WORK
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="border border-[#7B5E3C] hover:border-[#ffb86e] text-[#FBE9B3] px-8 py-4 rounded-xl font-label-uppercase text-xs font-semibold tracking-wider transition-all hover:bg-[#251e18] cursor-pointer"
          >
            LET'S CONNECT
          </button>
        </div>
      </div>

      {/* Quick Highlights Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 pb-6">
        {/* Featured Project Preview Card */}
        <div
          onClick={() => onSelectProject(featuredProject)}
          className="md:col-span-8 bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-all duration-300 group cursor-pointer shadow-lg"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-uppercase text-xs text-[#ffb86e] tracking-widest font-semibold">
                FEATURED PROJECT
              </span>
              <span className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest">
                01 / 03
              </span>
            </div>
            <h2 className="font-headline-md text-2xl sm:text-3xl text-[#FBE9B3] mb-2 group-hover:text-[#ffb86e] transition-colors font-bold tracking-tight">
              Neural Architecture Visualizer
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#d7c3b2] mb-6 leading-relaxed">
              An interactive web tool designed to parse deep learning layers in real-time, built
              with PyTorch and high-performance WebGL rendering.
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#7B5E3C]/20">
            <div className="flex flex-wrap gap-2">
              {['PyTorch', 'WebGL', 'Python'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[#251e18] text-[#ffb86e] text-xs font-label-uppercase rounded border border-[#7B5E3C]/30 tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs text-[#ffb86e] flex items-center gap-1 font-label-uppercase tracking-wider group-hover:translate-x-1 transition-transform font-semibold">
              View Project
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>
        </div>

        {/* The Architect / About Snippet Card */}
        <div
          onClick={() => onNavigate('about')}
          className="md:col-span-4 bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-all duration-300 cursor-pointer shadow-lg group"
        >
          <div>
            <div className="font-label-uppercase text-xs text-[#9f8e7e] tracking-widest mb-4 font-semibold">
              THE ARCHITECT
            </div>
            <h2 className="font-headline-md text-2xl text-[#FBE9B3] mb-2 group-hover:text-[#ffb86e] transition-colors font-bold tracking-tight">
              Driven by Data & Design
            </h2>
            <p className="font-body-md text-sm text-[#d7c3b2] mb-6 leading-relaxed">
              Bridging the gap between complex algorithmic backends and seamless, immersive
              frontends. Based in Hyderabad, engineering the future.
            </p>
          </div>

          <div className="pt-4 border-t border-[#7B5E3C]/20">
            <span className="text-xs text-[#ffb86e] flex items-center gap-1 font-label-uppercase tracking-wider group-hover:translate-x-1 transition-transform font-semibold">
              Read Full Bio
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
