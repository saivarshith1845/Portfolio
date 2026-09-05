import React, { useEffect } from 'react';
import { PORTRAIT_IMAGE_URL } from '../data/portfolioData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onContactClick }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#18120c] border border-[#7B5E3C] max-w-lg w-full p-6 sm:p-8 rounded-xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close profile card"
          className="absolute top-4 right-4 text-[#d7c3b2] hover:text-[#ffb86e] transition-colors p-1 rounded-lg hover:bg-[#302922]"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={PORTRAIT_IMAGE_URL}
            alt="Sai Varshith"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#ffb86e] shadow-md shadow-[#ffb86e]/20"
          />
          <div>
            <span className="text-[10px] font-label-uppercase text-[#ffb86e] tracking-widest block mb-0.5">
              DATA SCIENCE & CSE BUILDER
            </span>
            <h3 className="font-headline-md text-2xl text-[#FBE9B3] font-bold">
              Sai Varshith
            </h3>
            <p className="text-xs text-[#9f8e7e]">MLRIT Hyderabad, India • 2nd Year B.Tech</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-[#eee0d5]/90 mb-6 leading-relaxed">
          <p>
            Passionate developer specialized in full-stack web platforms and applied artificial intelligence.
            Focused on crafting high-throughput algorithmic backends, autonomous reasoning loops, and obsidian-level aesthetic interfaces.
          </p>
          <div className="p-3.5 bg-[#211a14] rounded-lg border border-[#7B5E3C]/30 flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[#9f8e7e]">Current Focus:</span>
              <span className="text-[#ffb86e] font-medium">AI Student Platform</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9f8e7e]">Availability:</span>
              <span className="text-[#eee0d5]">Open for Research & Collaborations</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9f8e7e]">Location:</span>
              <span className="text-[#eee0d5]">Hyderabad, India</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#7B5E3C]/30">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-label-uppercase text-[#d7c3b2] hover:text-[#ffb86e] transition-colors"
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="px-5 py-2 bg-[#E49A48] hover:bg-[#F5C972] text-[#2c1600] rounded-xl font-label-uppercase text-xs font-bold tracking-wider transition-all transform hover:-translate-y-0.5"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};
