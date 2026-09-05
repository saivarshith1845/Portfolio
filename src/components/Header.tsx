import React, { useState } from 'react';
import { NavScreen } from '../types';

interface HeaderProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onOpenProfile }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavScreen; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (screen: NavScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#060301]/85 backdrop-blur-xl border-b border-[#7B5E3C]/30 transition-all">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left font-headline-md text-[#FBE9B3] font-bold tracking-tight hover:text-[#ffb86e] transition-colors focus:outline-none"
        >
          SAI VARSHITH
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-body-sm tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#ffb86e] font-bold font-label-uppercase border-b border-[#ffb86e] pb-1'
                    : 'text-[#d7c3b2] hover:text-[#ffb86e] font-label-uppercase font-normal'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('contact')}
            className="bg-[#E49A48] hover:bg-[#F5C972] text-[#2c1600] px-4 py-2 rounded-xl font-label-uppercase font-bold tracking-wider transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#E49A48]/10 cursor-pointer"
          >
            Let's Build
          </button>
          <button
            onClick={onOpenProfile}
            title="Sai Varshith profile card"
            className="w-8 h-8 rounded-full bg-[#3b332c] hover:bg-[#3E220C] flex items-center justify-center border border-[#7B5E3C] hover:border-[#ffb86e] transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[#ffb86e] group-hover:scale-110 transition-transform text-[18px]">
              person
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#3b332c] flex items-center justify-center border border-[#7B5E3C] text-[#ffb86e]"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#eee0d5] p-2 hover:text-[#ffb86e] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18120c] border-b border-[#7B5E3C]/40 px-6 py-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm tracking-widest uppercase py-2 transition-colors font-label-uppercase ${
                  isActive ? 'text-[#ffb86e] font-bold pl-2 border-l-2 border-[#ffb86e]' : 'text-[#d7c3b2] hover:text-[#ffb86e]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#7B5E3C]/30 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full bg-[#E49A48] hover:bg-[#F5C972] text-[#2c1600] py-2.5 rounded-xl font-label-uppercase font-bold tracking-wider text-center"
            >
              Let's Build
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
