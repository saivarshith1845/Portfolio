import React, { useState, useEffect } from 'react';

export type NavSection = 'home' | 'about' | 'projects' | 'journey' | 'contact';

interface HeaderProps {
  activeSection?: NavSection;
  onNavigate?: (section: NavSection) => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection = 'home', onNavigate, onOpenProfile }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<NavSection>(activeSection);

  const navItems: { id: NavSection; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'journey', label: 'HACKATHONS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  // Scroll spy to detect active section automatically
  useEffect(() => {
    const handleScroll = () => {
      const sections: NavSection[] = ['home', 'about', 'projects', 'journey', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: NavSection) => {
    setCurrentSection(section);
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(section);
    } else {
      const targetEl = document.getElementById(section);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-[#FFF6E8]/90 backdrop-blur-md border-b border-[#171515]/10 transition-all duration-300">
        <div className="h-16 max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          {/* LEFT: SV Monogram with Crimson Rule Line */}
          <button
            onClick={() => handleNavClick('home')}
            data-cursor="hover"
            className="group flex items-center gap-3 cursor-pointer focus:outline-none"
            title="Sai Varshith Portfolio"
          >
            <div className="w-7 h-7 rounded-full bg-[#171515] flex items-center justify-center border border-[#171515] group-hover:bg-[#C1121F] transition-colors">
              <span className="font-cinzel text-xs font-bold text-[#FFF6E8]">SV</span>
            </div>
            <span className="w-5 h-px bg-[#C1121F] transition-all duration-300 group-hover:w-8" />
            <span className="font-syne text-[10px] tracking-[0.25em] text-[#171515] uppercase font-bold hidden sm:inline">
              SAI VARSHITH
            </span>
          </button>

          {/* DESKTOP NAV (CENTER/LEFT) */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  data-cursor="hover"
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative text-[10px] tracking-[0.25em] font-syne font-bold uppercase py-1 transition-colors cursor-pointer ${
                    isActive ? 'text-[#C1121F]' : 'text-[#171515] hover:text-[#C1121F]'
                  }`}
                >
                  {item.label}
                  {/* Subtle hover/active underline animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C1121F] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* DESKTOP RIGHT: BUILD // LEARN // GROW & PROFILE TRIGGER */}
          <div className="hidden lg:flex items-center gap-6">
            <span className="text-[10px] tracking-[0.2em] font-mono text-[#171515]/70 uppercase hidden xl:inline">
              BUILD // LEARN // GROW
            </span>
            <button
              onClick={onOpenProfile}
              title="Sai Varshith profile card"
              data-cursor="hover"
              className="w-7 h-7 rounded-full bg-[#171515] hover:bg-[#C1121F] flex items-center justify-center border border-[#171515] transition-colors cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[#FFF6E8] group-hover:scale-110 transition-transform text-[16px]">
                person
              </span>
            </button>
          </div>

          {/* MOBILE TRIGGER */}
          <div className="flex md:hidden items-center gap-3">
            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                className="w-7 h-7 rounded-full bg-[#171515] flex items-center justify-center border border-[#171515] text-[#FFF6E8]"
              >
                <span className="material-symbols-outlined text-[16px]">person</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="font-syne text-[10px] tracking-[0.25em] uppercase font-bold text-[#171515] hover:text-[#C1121F] py-1 px-2.5 border border-[#171515]/20 rounded-xs cursor-pointer"
              aria-label="Open navigation menu"
            >
              MENU ↵
            </button>
          </div>

        </div>
      </header>

      {/* FULL-SCREEN EDITORIAL MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFF6E8] text-[#171515] flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#171515]/15 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#171515] flex items-center justify-center">
                <span className="font-cinzel text-xs font-bold text-[#FFF6E8]">SV</span>
              </div>
              <span className="font-syne text-xs tracking-[0.25em] text-[#C1121F] font-bold">
                NAVIGATION
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs tracking-widest text-[#171515] hover:text-[#C1121F] uppercase font-bold p-2 cursor-pointer"
            >
              CLOSE [✕]
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col space-y-6 my-auto py-8">
            {navItems.map((item, idx) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="group text-left flex items-baseline justify-between border-b border-[#171515]/10 pb-4 cursor-pointer"
                >
                  <span className="font-mono text-xs text-[#C1121F] font-bold">0{idx + 1}</span>
                  <span
                    className={`font-cinzel text-3xl sm:text-4xl font-bold tracking-tight uppercase transition-all ${
                      isActive ? 'text-[#C1121F] translate-x-2' : 'text-[#171515] group-hover:text-[#C1121F]'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="font-syne text-xs text-[#A9C6EA] font-bold">→</span>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="border-t border-[#171515]/15 pt-4 flex items-center justify-between font-mono text-[10px] text-[#171515]/70">
            <span>SAI VARSHITH · 2026</span>
            <span className="text-[#C1121F]">BUILD // LEARN // GROW</span>
          </div>
        </div>
      )}
    </>
  );
};
