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
      className="fixed inset-0 bg-[#171515]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#171515] border border-[#C1121F]/40 max-w-2xl w-full p-6 sm:p-8 rounded-xs shadow-2xl relative my-8 text-[#FFF6E8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 text-[#FFF6E8]/70 hover:text-[#C1121F] transition-colors p-1 rounded-xs hover:bg-[#FFF6E8]/10"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-2.5 py-1 rounded-xs bg-[#C1121F]/20 text-[#C1121F] font-syne font-bold text-xs tracking-widest border border-[#C1121F]/40 uppercase">
            {project.badge}
          </span>
          <span className="text-xs font-mono text-[#A9C6EA] tracking-widest uppercase font-bold">
            {project.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FFF6E8] font-bold mb-3 tracking-tight">
          {project.title}
        </h3>

        {/* Project Image Preview if available */}
        {project.imageUrl && (
          <div className="relative mb-6 rounded-xs overflow-hidden border border-[#C1121F]/30 bg-[#171515]">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-56 object-cover object-center"
            />
            {project.systemStatus && (
              <div className="absolute top-3 left-3 bg-[#171515]/90 backdrop-blur-md px-2.5 py-1 rounded-xs border border-[#C1121F]/40 text-[10px] font-syne font-bold text-[#A9C6EA] tracking-widest flex items-center gap-2 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#C1121F] animate-pulse"></span>
                {project.systemStatus}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="font-sans font-light text-sm sm:text-base text-[#FFF6E8]/90 mb-6 leading-relaxed">
          {project.fullDescription || project.description}
        </p>

        {/* Key Metrics / Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6 bg-[#FFF6E8]/5 p-4 rounded-xs border border-[#C1121F]/20">
            <h4 className="text-xs font-syne font-bold text-[#C1121F] tracking-widest uppercase mb-2">
              Performance & Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#FFF6E8]">
              {project.metrics.map((metric, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]"></span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-8">
          <h4 className="text-xs font-syne text-[#A9C6EA] tracking-widest uppercase mb-3 font-bold">
            Core Architecture & Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#A9C6EA]/15 text-[#FFF6E8] rounded-xs border border-[#A9C6EA]/30 text-xs font-syne font-semibold tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#FFF6E8]/15">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xs text-xs font-syne text-[#FFF6E8]/70 hover:text-[#C1121F] transition-colors uppercase font-bold"
          >
            Dismiss
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xs border border-[#A9C6EA]/40 hover:border-[#C1121F] text-xs font-syne text-[#FFF6E8] hover:text-[#C1121F] transition-colors flex items-center gap-1.5 uppercase font-bold"
            >
              <span className="material-symbols-outlined text-sm">code</span>
              View Source
            </a>
          )}
          <button
            onClick={() => {
              alert(`Launching preview session for ${project.title}. Initializing environment...`);
            }}
            className="px-5 py-2.5 bg-[#C1121F] hover:bg-[#FFF6E8] text-[#FFF6E8] hover:text-[#171515] rounded-xs font-syne text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 uppercase"
          >
            Launch Live Demo
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
