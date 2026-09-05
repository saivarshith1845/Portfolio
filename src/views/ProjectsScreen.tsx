import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS, AI_PROJECT_IMAGE_URL } from '../data/portfolioData';

interface ProjectsScreenProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'systems'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return p.category === 'ai';
    if (activeFilter === 'systems') return p.category === 'systems';
    return true;
  });

  const flagshipProject = PROJECTS.find((p) => p.id === 'ai-platform') || PROJECTS[0];
  const gridProjects = filteredProjects.filter((p) => p.id !== 'ai-platform');

  return (
    <section id="projects" className="py-20 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#302922] border border-[#7B5E3C]/50 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#ffb86e] animate-pulse" />
          <span className="font-label-uppercase text-xs text-[#FBE9B3] tracking-widest font-semibold">
            PORTFOLIO ARCHIVE
          </span>
        </div>
        <h1 className="font-headline-xl text-4xl sm:text-6xl text-[#FBE9B3] tracking-tight font-bold mb-4">
          SELECTED WORK
        </h1>
        <p className="font-body-lg text-base sm:text-lg text-[#d7c3b2] max-w-2xl mb-8 leading-relaxed">
          Projects, experiments, and products I'm building while learning.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai', label: 'AI & ML' },
            { id: 'systems', label: 'Systems' },
          ].map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as 'all' | 'ai' | 'systems')}
                className={`px-4 py-2 rounded-xl text-xs font-label-uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ffb86e] text-[#2c1600] font-bold shadow-md shadow-[#ffb86e]/10'
                    : 'bg-[#251e18] text-[#d7c3b2] border border-[#7B5E3C]/40 hover:border-[#ffb86e]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Flagship Product Feature Card (Visible if 'all' or 'ai' is selected) */}
      {(activeFilter === 'all' || activeFilter === 'ai') && (
        <div className="border border-[#7B5E3C]/60 bg-[#18120c] p-6 sm:p-10 rounded-xl relative overflow-hidden group mb-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded bg-[#ffb86e]/10 text-[#ffb86e] font-label-uppercase text-xs tracking-widest border border-[#ffb86e]/20 font-semibold">
                  CURRENTLY BUILDING
                </span>
                <span className="text-xs font-label-uppercase text-[#9f8e7e] tracking-widest">
                  01 // FLAGSHIP PRODUCT
                </span>
              </div>

              <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#FBE9B3] font-bold mb-4 tracking-tight">
                AI STUDENT PLATFORM
              </h2>

              <p className="font-body-md text-sm sm:text-base text-[#d7c3b2] max-w-2xl mb-6 leading-relaxed">
                An advanced AI-powered student platform exploring how intelligent tools can radically
                improve learning retention, personal productivity, and complex academic workflows through
                bespoke LLM integrations and automated workspace synthesis.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Python', 'Artificial Intelligence', 'JavaScript', 'Web Architecture'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#251e18] text-[#ffb86e] rounded text-xs font-label-uppercase tracking-wider border border-[#7B5E3C]/40"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectProject(flagshipProject)}
                  className="bg-[#E49A48] hover:bg-[#F5C972] text-[#2c1600] px-6 py-3.5 rounded-xl font-label-uppercase text-xs font-bold tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 shadow-lg shadow-[#E49A48]/15"
                >
                  EXPLORE PROJECT
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#7B5E3C] hover:border-[#ffb86e] text-[#eee0d5] hover:text-[#ffb86e] px-6 py-3.5 rounded-xl font-label-uppercase text-xs font-semibold tracking-wider transition-all hover:bg-[#251e18] flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  Repository
                </a>
              </div>
            </div>

            {/* Right Visual Preview */}
            <div className="lg:col-span-5">
              <div
                onClick={() => onSelectProject(flagshipProject)}
                className="relative rounded-xl overflow-hidden border border-[#7B5E3C]/50 bg-[#060301] shadow-2xl group/img cursor-pointer"
              >
                <img
                  src={AI_PROJECT_IMAGE_URL}
                  alt="AI Student Platform Interface"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 object-cover object-center filter contrast-105 group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060301]/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-[#060301]/80 backdrop-blur-md px-3 py-1 rounded border border-[#7B5E3C]/40">
                    <span className="w-2 h-2 rounded-full bg-[#ffb86e] animate-pulse" />
                    <span className="text-[10px] font-label-uppercase text-[#ffb86e] tracking-widest font-semibold">
                      SYSTEM STATUS: ACTIVE SYNTHESIS
                    </span>
                  </div>
                  <span className="text-[10px] font-label-uppercase text-[#9f8e7e] tracking-widest bg-[#060301]/80 backdrop-blur-md px-2 py-1 rounded border border-[#7B5E3C]/30">
                    v0.8.2-beta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Micro Projects / Research Experiments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gridProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="bg-[#18120c] border border-[#7B5E3C]/40 p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#7B5E3C] transition-all duration-300 shadow-lg cursor-pointer group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 rounded bg-[#251e18] text-[#ffb86e] text-xs font-label-uppercase tracking-widest border border-[#7B5E3C]/40 font-semibold">
                  {project.badge}
                </span>
                <span className="text-xs font-label-uppercase text-[#9f8e7e] tracking-widest">
                  {project.number}
                </span>
              </div>

              <h3 className="font-headline-md text-2xl text-[#FBE9B3] font-bold mb-3 group-hover:text-[#ffb86e] transition-colors">
                {project.title}
              </h3>

              <p className="font-body-md text-sm text-[#d7c3b2] leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-[#251e18] text-[#ffb86e] rounded text-xs font-label-uppercase tracking-wider border border-[#7B5E3C]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#7B5E3C]/20 text-xs font-label-uppercase">
                <span className="text-[#9f8e7e]">{project.categoryLabel || 'Experiment'}</span>
                <span className="text-[#ffb86e] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  VIEW PROJECT
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
