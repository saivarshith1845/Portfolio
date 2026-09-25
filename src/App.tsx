import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { ProfileModal } from './components/ProfileModal';
import { CinematicIntro } from './components/CinematicIntro';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Hero } from './components/Hero';
import { IdentitySection } from './components/IdentitySection';
import { WorkSection } from './components/WorkSection';
import { JourneySection } from './components/JourneySection';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll globally
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6E8] text-[#171515] font-sans relative overflow-x-hidden selection:bg-[#C1121F] selection:text-[#FFF6E8]">
      {/* Global Animated Motion Background (Blobs, SVG lines, Arcs, Grain & Cursor Light) */}
      <AnimatedBackground />

      {/* Persistent Editorial Navigation */}
      <Header onOpenProfile={() => setProfileOpen(true)} />

      {/* Minimal Custom Cursor Interaction */}
      <CustomCursor />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onContactClick={scrollToContact}
      />

      {/* 1. Cinematic Initialization Intro */}
      {!introCompleted && (
        <CinematicIntro onComplete={() => setIntroCompleted(true)} />
      )}

      {/* Main Editorial Canvas */}
      <main className="w-full">
        {/* Phase 3 Hero Refinement */}
        <Hero isIntroComplete={introCompleted} onReplayIntro={() => setIntroCompleted(false)} />

        {/* Phase 4 Identity / About Section */}
        <IdentitySection />

        {/* Phase 5 Projects Chapter */}
        <WorkSection />

        {/* Phase 6 Hackathon Journey Section */}
        <JourneySection />

        {/* Phase 7 Final Contact & Closing Section */}
        <ContactSection />
      </main>
    </div>
  );
}





