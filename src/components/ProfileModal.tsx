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
      className="fixed inset-0 bg-[#171515]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#171515] border border-[#C1121F]/40 max-w-lg w-full p-6 sm:p-8 rounded-xs shadow-2xl relative text-[#FFF6E8]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close profile card"
          className="absolute top-4 right-4 text-[#FFF6E8]/70 hover:text-[#C1121F] transition-colors p-1 rounded-xs hover:bg-[#FFF6E8]/10"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src="/images/sai-varshith.jpg"
            alt="Sai Varshith"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#C1121F] shadow-md"
          />
          <div>
            <span className="text-[10px] font-syne font-bold text-[#C1121F] tracking-widest block mb-0.5 uppercase">
              DATA SCIENCE & CSE BUILDER
            </span>
            <h3 className="font-cinzel text-2xl text-[#FFF6E8] font-bold">
              Sai Varshith
            </h3>
            <p className="text-xs text-[#A9C6EA] font-sans">MLRIT Hyderabad, India • 2nd Year B.Tech</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-[#FFF6E8]/90 mb-6 leading-relaxed font-sans font-light">
          <p>
            Passionate developer specialized in full-stack web platforms and applied artificial intelligence.
            Focused on crafting high-throughput algorithmic backends, autonomous reasoning loops, and refined editorial interfaces.
          </p>
          <div className="p-3.5 bg-[#FFF6E8]/5 rounded-xs border border-[#C1121F]/20 flex flex-col gap-1.5 text-xs font-sans">
            <div className="flex justify-between">
              <span className="text-[#A9C6EA]">Current Focus:</span>
              <span className="text-[#FFF6E8] font-semibold">AI Student Platform</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A9C6EA]">Availability:</span>
              <span className="text-[#FFF6E8]">Open for Research & Collaborations</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A9C6EA]">Location:</span>
              <span className="text-[#FFF6E8]">Hyderabad, India</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#FFF6E8]/15">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-syne text-[#FFF6E8]/70 hover:text-[#C1121F] transition-colors uppercase font-bold"
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="px-5 py-2.5 bg-[#C1121F] hover:bg-[#FFF6E8] text-[#FFF6E8] hover:text-[#171515] rounded-xs font-syne text-xs font-bold tracking-wider transition-all uppercase"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};
