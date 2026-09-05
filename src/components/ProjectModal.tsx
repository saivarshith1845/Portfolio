import React, { useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#18120c] border border-[#7B5E3C] max-w-2xl w-full p-6 sm:p-8 rounded-xl shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 text-[#d7c3b2] hover:text-[#ffb86e] transition-colors p-1 rounded-lg hover:bg-[#302922]"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-2.5 py-1 rounded bg-[#ffb86e]/10 text-[#ffb86e] font-label-uppercase text-xs tracking-widest border border-[#ffb86e]/20">
            {project.badge}
          </span>
          <span className="text-xs font-label-uppercase text-[#9f8e7e] tracking-widest">
            {project.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline-md text-2xl sm:text-3xl text-[#FBE9B3] font-bold mb-3 tracking-tight">
          {project.title}
        </h3>

        {/* Project Image Preview if available */}
        {project.imageUrl && (
          <div className="relative mb-6 rounded-lg overflow-hidden border border-[#7B5E3C]/40 bg-[#060301]">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-56 object-cover object-center filter contrast-105"
            />
            {project.systemStatus && (
              <div className="absolute top-3 left-3 bg-[#060301]/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#7B5E3C]/50 text-[10px] font-label-uppercase text-[#ffb86e] tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffb86e] animate-pulse"></span>
                {project.systemStatus}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-body-md text-[#eee0d5]/90 mb-6 leading-relaxed">
          {project.fullDescription || project.description}
        </p>

        {/* Key Metrics / Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6 bg-[#211a14] p-4 rounded-lg border border-[#7B5E3C]/30">
            <h4 className="text-xs font-label-uppercase text-[#ffb86e] tracking-widest uppercase mb-2">
              Performance & Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#eee0d5]">
              {project.metrics.map((metric, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb86e]"></span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-8">
          <h4 className="text-xs font-label-uppercase text-[#9f8e7e] tracking-widest uppercase mb-3">
            Core Architecture & Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#251e18] text-[#ffb86e] rounded border border-[#7B5E3C]/40 text-xs font-label-uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#7B5E3C]/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-label-uppercase text-[#d7c3b2] hover:text-[#ffb86e] transition-colors"
          >
            Dismiss
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl border border-[#7B5E3C] hover:border-[#ffb86e] text-xs font-label-uppercase text-[#eee0d5] hover:text-[#ffb86e] transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">code</span>
              View Source
            </a>
          )}
          <button
            onClick={() => {
              alert(`Launching preview session for ${project.title}. Initializing environment...`);
            }}
            className="px-5 py-2 bg-[#E49A48] hover:bg-[#F5C972] text-[#2c1600] rounded-xl font-label-uppercase text-xs font-bold tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
          >
            Launch Live Demo
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
