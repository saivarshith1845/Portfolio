import { useState, useEffect } from 'react';
import { NavScreen, Project } from './types';
import { PROJECTS } from './data/portfolioData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProfileModal } from './components/ProfileModal';
import { HomeScreen } from './views/HomeScreen';
import { AboutScreen } from './views/AboutScreen';
import { SkillsScreen } from './views/SkillsScreen';
import { ProjectsScreen } from './views/ProjectsScreen';
import { JourneyScreen } from './views/JourneyScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const featuredProject =
    PROJECTS.find((p) => p.id === 'neural-visualizer') || PROJECTS[0];

  // Smooth scroll to a target section accounting for the fixed header
  const handleNavigate = (screen: NavScreen) => {
    setCurrentScreen(screen);
    const targetElement = document.getElementById(screen);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else if (screen === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll spy to highlight active section in the header as the visitor scrolls down
  useEffect(() => {
    const sectionOrder: NavScreen[] = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // If near the bottom of the page, activate Contact
      if (scrollY + windowHeight >= documentHeight - 120) {
        setCurrentScreen('contact');
        return;
      }

      // Check sections from bottom to top
      const scrollMid = scrollY + 220;
      for (let i = sectionOrder.length - 1; i >= 0; i--) {
        const id = sectionOrder[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollMid >= top) {
            setCurrentScreen(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#060301] text-[#eee0d5] flex flex-col selection:bg-[#E49A48]/30 selection:text-[#FFF5D9] relative overflow-x-hidden font-sans">
      {/* Primary Fixed Navigation Bar with Scroll Spy */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Main Single Page Layout — All Pages Visible via Scroll Down */}
      <main className="flex-1">
        {/* 01: Home Hero Section */}
        <HomeScreen
          onNavigate={handleNavigate}
          onSelectProject={setSelectedProject}
          featuredProject={featuredProject}
        />

        {/* Divider */}
        <div className="border-t border-[#7B5E3C]/20 max-w-7xl mx-auto px-6 lg:px-16" />

        {/* 02: About Sai Varshith Section */}
        <AboutScreen onNavigate={handleNavigate} />

        {/* Divider */}
        <div className="border-t border-[#7B5E3C]/20 max-w-7xl mx-auto px-6 lg:px-16" />

        {/* 03: Skills & Technical Stack Section */}
        <SkillsScreen onNavigate={handleNavigate} />

        {/* Divider */}
        <div className="border-t border-[#7B5E3C]/20 max-w-7xl mx-auto px-6 lg:px-16" />

        {/* 04: Selected Projects Archive Section */}
        <ProjectsScreen onSelectProject={setSelectedProject} />

        {/* Divider */}
        <div className="border-t border-[#7B5E3C]/20 max-w-7xl mx-auto px-6 lg:px-16" />

        {/* 05: Chronology / Journey & Contact Section */}
        <JourneyScreen />
      </main>

      {/* Footer */}
      <Footer
        onOpenProfile={() => setProfileModalOpen(true)}
        onNavigateHome={() => handleNavigate('home')}
      />

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Profile Bio Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onContactClick={() => handleNavigate('contact')}
      />
    </div>
  );
}
