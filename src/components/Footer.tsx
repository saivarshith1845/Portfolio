import React from 'react';

interface FooterProps {
  onOpenProfile: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProfile, onNavigateHome }) => {
  return (
    <footer className="border-t border-[#171515]/15 bg-[#FFF6E8] py-8 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-widest text-[#171515]">
        <button
          onClick={onNavigateHome}
          className="hover:text-[#C1121F] transition-colors tracking-widest uppercase font-bold text-left"
        >
          Sai Varshith
        </button>
        <p className="text-center text-[#171515]/70 font-sans">
          © 2026 Sai Varshith. Engineered with precision and editorial craft.
        </p>
        <button
          onClick={onOpenProfile}
          title="Sai Varshith Profile"
          className="w-6 h-6 rounded-full bg-[#171515] hover:bg-[#C1121F] flex items-center justify-center border border-[#171515] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[14px] text-[#FFF6E8]">person</span>
        </button>
      </div>
    </footer>
  );
};
