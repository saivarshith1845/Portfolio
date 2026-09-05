import React from 'react';

interface FooterProps {
  onOpenProfile: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProfile, onNavigateHome }) => {
  return (
    <footer className="border-t border-[#7B5E3C]/20 bg-[#060301] py-8 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-label-uppercase text-[#d7c3b2]">
        <button
          onClick={onNavigateHome}
          className="hover:text-[#ffb86e] transition-colors tracking-widest uppercase font-bold text-left"
        >
          Sai Varshith
        </button>
        <p className="text-center text-[#9f8e7e]">
          © 2024 Sai Varshith. Engineered with precision and obsidian depth.
        </p>
        <button
          onClick={onOpenProfile}
          title="Sai Varshith Profile"
          className="w-6 h-6 rounded-full bg-[#3b332c] flex items-center justify-center border border-[#7B5E3C] hover:border-[#ffb86e] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[14px] text-[#ffb86e]">person</span>
        </button>
      </div>
    </footer>
  );
};
