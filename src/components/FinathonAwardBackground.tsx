import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FinathonAwardBackgroundProps {
  className?: string;
}

export const FinathonAwardBackground: React.FC<FinathonAwardBackgroundProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current?.parentElement;
    if (!container || !mouseLightRef.current) return;

    const setX = gsap.quickTo(mouseLightRef.current, 'x', { duration: 0.7, ease: 'power2.out' });
    const setY = gsap.quickTo(mouseLightRef.current, 'y', { duration: 0.7, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      setX(localX);
      setY(localY);

      gsap.to(mouseLightRef.current, {
        opacity: 0.9,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(mouseLightRef.current, {
        opacity: 0.35,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 rounded-xs bg-[#090705] ${className}`}
    >
      {/* 1. Ultra-fine Luxury Film Grain & Velvet Texture */}
      <div className="absolute inset-0 grain-overlay opacity-35 z-10 mix-blend-overlay" />

      {/* 2. Deep Charcoal & Rich Espresso Base Vignette */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 75% 35%, #24170E 0%, #150E09 35%, #0B0805 70%, #050403 100%)',
        }}
      />

      {/* 3. Warm Ambient Bronze Backlight Aura */}
      <div className="absolute top-[10%] right-[10%] w-[500px] sm:w-[650px] h-[400px] sm:h-[550px] rounded-full bg-radial from-[#C88A3A]/22 via-[#824F18]/12 to-transparent blur-[120px] animate-pulse-glow z-1" />

      {/* 4. Deep Espresso Floor Lighting */}
      <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[350px] rounded-full bg-radial from-[#B07228]/15 via-[#4A2C0D]/10 to-transparent blur-[110px] z-1" />

      {/* 5. DRAMATIC GOLDEN SPOTLIGHT SHINING DIAGONALLY ACROSS THE BACKGROUND */}
      {/* Primary Golden Spotlight Beam (Conical Slicing Shaft) */}
      <div
        className="absolute -top-[25%] -left-[15%] w-[130%] h-[160%] z-2 pointer-events-none transform -rotate-[28deg] origin-top-left"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 235, 175, 0.03) 15%, rgba(255, 218, 130, 0.16) 32%, rgba(230, 168, 64, 0.22) 42%, rgba(255, 238, 185, 0.28) 46%, rgba(210, 145, 45, 0.18) 50%, rgba(135, 82, 22, 0.08) 62%, transparent 80%)',
          filter: 'blur(12px)',
        }}
      />

      {/* Secondary Razor-Sharp Spotlight Sheen */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[120%] h-[140%] z-2 pointer-events-none transform -rotate-[28deg] origin-top-left opacity-75"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 248, 220, 0) 38%, rgba(255, 235, 175, 0.22) 44%, rgba(255, 255, 240, 0.35) 45.5%, rgba(245, 195, 95, 0.2) 47%, transparent 55%)',
          filter: 'blur(3px)',
        }}
      />

      {/* Golden Stage Light Motes / Shimmering Bokeh in the Spotlight */}
      <div className="absolute inset-0 z-2 pointer-events-none opacity-40">
        <div className="absolute top-[22%] left-[38%] w-1.5 h-1.5 rounded-full bg-[#FFE8A8] shadow-[0_0_8px_#FFE8A8] animate-ping" />
        <div className="absolute top-[35%] left-[52%] w-2 h-2 rounded-full bg-[#F5C768] shadow-[0_0_12px_#F5C768] opacity-70" />
        <div className="absolute top-[48%] left-[64%] w-1 h-1 rounded-full bg-[#FFFFFF] shadow-[0_0_6px_#FFF] opacity-80" />
        <div className="absolute top-[28%] left-[72%] w-1.5 h-1.5 rounded-full bg-[#E5A844] shadow-[0_0_10px_#E5A844] opacity-60" />
        <div className="absolute top-[65%] left-[58%] w-2 h-2 rounded-full bg-[#C9842C] shadow-[0_0_14px_#C9842C] opacity-50" />
      </div>

      {/* 6. Dynamic Interactive Mouse-Tracking Warm Bronze/Gold Aura */}
      <div
        ref={mouseLightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-radial from-[#FFE3A0]/20 via-[#D49438]/12 via-[#5E3710]/06 to-transparent blur-[85px] z-3 opacity-35 transition-opacity duration-700 pointer-events-none"
      />

      {/* 7. CENTRAL VISUAL ELEMENT: SCULPTURAL 3D METALLIC NUMBER "3" & AWARD PEDESTAL */}
      <div className="absolute right-0 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] lg:w-[500px] h-[340px] sm:h-[460px] lg:h-[540px] pointer-events-none z-2 flex items-center justify-center">
        <svg
          viewBox="0 0 600 660"
          className="w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Front Polished Champagne Gold Gradient */}
            <linearGradient id="sculptGoldFront" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FFF4D4" />
              <stop offset="18%" stopColor="#FDE29D" />
              <stop offset="45%" stopColor="#E5B258" />
              <stop offset="75%" stopColor="#B87D28" />
              <stop offset="100%" stopColor="#8C5815" />
            </linearGradient>

            {/* Chamfer Top Rim Highlight (Specular Platinum-Gold) */}
            <linearGradient id="sculptSpecular" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#FFF2D0" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#E2A846" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#875317" stopOpacity="0.1" />
            </linearGradient>

            {/* Extruded Deep Bronze 3D Side Shadow */}
            <linearGradient id="sculptBronzeExtrude" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5E3814" />
              <stop offset="30%" stopColor="#412409" />
              <stop offset="70%" stopColor="#291404" />
              <stop offset="100%" stopColor="#150A02" />
            </linearGradient>

            {/* Midriff Chamfer Facet Gradient */}
            <linearGradient id="sculptChamferMid" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8C551C" />
              <stop offset="50%" stopColor="#E0AA50" />
              <stop offset="100%" stopColor="#FFF1CC" />
            </linearGradient>

            {/* Pedestal Bronze Base Gradient */}
            <linearGradient id="pedestalBronze" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3D2612" />
              <stop offset="25%" stopColor="#5E3C1B" />
              <stop offset="50%" stopColor="#855424" />
              <stop offset="75%" stopColor="#3F250F" />
              <stop offset="100%" stopColor="#1C0E04" />
            </linearGradient>

            {/* Pedestal Gold Rim Line */}
            <linearGradient id="pedestalGoldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6E4416" stopOpacity="0.2" />
              <stop offset="25%" stopColor="#E5B258" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFF4D4" stopOpacity="1" />
              <stop offset="75%" stopColor="#E5B258" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6E4416" stopOpacity="0.2" />
            </linearGradient>

            {/* Drop Shadow Filter */}
            <filter id="monumentDropShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="28" dy="36" stdDeviation="22" floodColor="#040201" floodOpacity="0.95" />
              <feDropShadow dx="-10" dy="-8" stdDeviation="15" floodColor="#E5A844" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Ambient Glow Aura Behind Monument */}
          <ellipse
            cx="320"
            cy="310"
            rx="210"
            ry="230"
            fill="url(#sculptBronzeExtrude)"
            opacity="0.35"
            filter="blur(45px)"
          />

          {/* ============================================================ */}
          {/* ARCHITECTURAL TROPHY PEDESTAL / BASE PLINTH                 */}
          {/* ============================================================ */}
          <g className="pedestal-group">
            {/* Pedestal Cast Shadow */}
            <ellipse cx="320" cy="590" rx="220" ry="26" fill="#040201" opacity="0.8" filter="blur(10px)" />
            
            {/* Lower Pedestal Slab */}
            <polygon
              points="120,590 520,590 500,612 140,612"
              fill="url(#pedestalBronze)"
              stroke="#211206"
              strokeWidth="1"
            />
            {/* Lower Pedestal Front Face */}
            <rect x="140" y="612" width="360" height="14" fill="#180C04" />
            
            {/* Upper Pedestal Plinth */}
            <polygon
              points="160,570 480,570 465,588 175,588"
              fill="url(#pedestalBronze)"
              stroke="#7A4C1C"
              strokeWidth="0.8"
            />
            
            {/* Polished Gold Accent Bevel Trims on Pedestal */}
            <line x1="160" y1="570" x2="480" y2="570" stroke="url(#pedestalGoldTrim)" strokeWidth="2.5" />
            <line x1="175" y1="588" x2="465" y2="588" stroke="url(#pedestalGoldTrim)" strokeWidth="1.2" opacity="0.7" />
            <line x1="120" y1="590" x2="520" y2="590" stroke="url(#pedestalGoldTrim)" strokeWidth="1.8" />

            {/* Pedestal Trophy Plaque Inscription */}
            <text
              x="320"
              y="604"
              textAnchor="middle"
              fill="#E5B258"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="3"
              opacity="0.85"
            >
              FINATHON // 3RD PLACE PODIUM
            </text>
          </g>

          {/* ============================================================ */}
          {/* 3D SCULPTURAL NUMBER "3" MONUMENT                            */}
          {/* ============================================================ */}
          <g filter="url(#monumentDropShadow)">

            {/* LAYER A: EXTRUDED DEEP 3D SIDE/BOTTOM FACETS (Tangible Bronze Relief) */}
            {/* Top Bar Extrusion */}
            <polygon
              points="200,100 440,100 480,140 240,140"
              fill="url(#sculptBronzeExtrude)"
              stroke="#3D2108"
              strokeWidth="1"
            />
            {/* Top Right Bevel Extrusion */}
            <polygon
              points="440,100 480,140 480,240 440,200"
              fill="#2E1705"
            />
            {/* Upper Loop Outer 3D Depth Curve */}
            <path
              d="M 440,100 Q 520,100 520,230 Q 520,310 420,330 
                 L 456,366 
                 Q 560,344 560,256 Q 560,132 476,132 Z"
              fill="url(#sculptBronzeExtrude)"
              stroke="#1C0A02"
              strokeWidth="1"
            />
            {/* Center Waist Cusp 3D Inward Facet */}
            <polygon
              points="340,320 420,330 456,366 376,356"
              fill="#1C0D03"
            />
            {/* Lower Loop Outer 3D Depth Curve */}
            <path
              d="M 420,330 Q 540,360 540,470 Q 540,570 380,570 L 396,606 Q 580,606 580,496 Q 580,380 456,366 Z"
              fill="url(#sculptBronzeExtrude)"
              stroke="#180A02"
              strokeWidth="1"
            />
            {/* Lower Terminal Underside Extrusion */}
            <polygon
              points="210,510 246,546 396,606 380,570"
              fill="#261205"
            />

            {/* LAYER B: SCULPTURAL CHAMFERED FACET BEVELS (Catching Directional Spotlight) */}
            {/* Top Bar Forward Chamfer */}
            <polygon
              points="200,100 440,100 425,122 220,122"
              fill="url(#sculptSpecular)"
            />
            {/* Upper Arc Chamfered Outer Crest */}
            <path
              d="M 440,100 Q 520,100 520,230 Q 520,285 465,310 L 448,295 Q 498,272 498,225 Q 498,122 425,122 Z"
              fill="url(#sculptChamferMid)"
              opacity="0.85"
            />
            {/* Central Waist Diamond Bevel Facet */}
            <polygon
              points="330,320 420,330 385,348 315,338"
              fill="url(#sculptChamferMid)"
            />
            {/* Lower Arc Chamfered Outer Crest */}
            <path
              d="M 420,330 Q 540,360 540,470 Q 540,570 380,570 L 368,548 Q 512,548 512,460 Q 512,365 385,348 Z"
              fill="url(#sculptChamferMid)"
              opacity="0.9"
            />

            {/* LAYER C: FRONT SCULPTURAL FACE OF NUMBER "3" (Brushed Champagne Gold & Bronze) */}
            <path
              d="M 210,122
                 L 435,122
                 Q 498,122 498,220
                 Q 498,292 410,318
                 L 330,328
                 L 330,342
                 L 395,350
                 Q 512,370 512,468
                 Q 512,548 370,548
                 Q 280,548 220,500
                 L 245,465
                 Q 295,502 365,502
                 Q 455,502 455,446
                 Q 455,390 365,382
                 L 285,375
                 L 285,295
                 L 365,290
                 Q 445,282 445,210
                 Q 445,162 385,162
                 L 210,162
                 Z"
              fill="url(#sculptGoldFront)"
              stroke="#6E4416"
              strokeWidth="1.2"
            />

            {/* LAYER D: SPECULAR POLISHED RIM LIGHTING (Razor Edge Light Gleam) */}
            {/* Top Horizontal Razor Reflection */}
            <path
              d="M 210,122 L 435,122 Q 498,122 498,175"
              fill="none"
              stroke="url(#sculptSpecular)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Fine Specular Hairline */}
            <path
              d="M 225,123 L 430,123 Q 492,123 492,170"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.85"
            />
            {/* Upper Inner Crest Specular */}
            <path
              d="M 385,162 Q 445,162 445,210"
              fill="none"
              stroke="#FFF8E0"
              strokeWidth="1.8"
              strokeOpacity="0.75"
            />
            {/* Central Cusp Specular Glint */}
            <circle cx="330" cy="335" r="3" fill="#FFFFFF" filter="blur(0.5px)" />
            <circle cx="330" cy="335" r="7" fill="#FFEAA8" opacity="0.6" filter="blur(2px)" />

            {/* Lower Arc Razor Specular Edge */}
            <path
              d="M 465,360 Q 525,385 525,465 Q 525,548 375,548"
              fill="none"
              stroke="url(#sculptSpecular)"
              strokeWidth="2.4"
            />
            <path
              d="M 475,372 Q 518,395 518,460"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeOpacity="0.7"
            />

            {/* Precision Micro-Engraved Telemetry on Sculpture Surface */}
            <g opacity="0.35" transform="translate(230, 142)">
              <line x1="0" y1="0" x2="60" y2="0" stroke="#4A2D10" strokeWidth="1" />
              <line x1="0" y1="4" x2="40" y2="4" stroke="#4A2D10" strokeWidth="0.8" />
              <text x="0" y="14" fill="#6E4416" fontFamily="monospace" fontSize="6" letterSpacing="1">
                AWARD_SCULPT // III
              </text>
            </g>
          </g>

          {/* Golden Ambient Particle Corona */}
          <circle cx="498" cy="180" r="14" fill="#FFEAA8" opacity="0.15" filter="blur(6px)" />
          <circle cx="512" cy="450" r="18" fill="#E5B258" opacity="0.18" filter="blur(8px)" />
        </svg>
      </div>

      {/* 8. Luxury Guilloche Security Wave Lines (Micro FinTech Currency Lines) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-18 z-1 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fintechGoldWave1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C88A3A" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#E5B258" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5E3814" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="fintechGoldWave2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D4" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#C88A3A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#150E09" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Diagonal Wave Ribbon Harmonic Curves */}
        <path
          d="M -100 180 C 260 40, 520 320, 880 120 S 1220 280, 1380 160"
          fill="none"
          stroke="url(#fintechGoldWave1)"
          strokeWidth="1.2"
        />
        <path
          d="M -80 210 C 280 70, 540 350, 900 150 S 1240 310, 1400 190"
          fill="none"
          stroke="url(#fintechGoldWave1)"
          strokeWidth="0.8"
          strokeOpacity="0.7"
        />
        <path
          d="M -60 240 C 300 100, 560 380, 920 180 S 1260 340, 1420 220"
          fill="none"
          stroke="url(#fintechGoldWave2)"
          strokeWidth="1.2"
        />
        <path
          d="M -40 270 C 320 130, 580 410, 940 210 S 1280 370, 1440 250"
          fill="none"
          stroke="url(#fintechGoldWave2)"
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
      </svg>

      {/* 9. Perimeter Technical Hallmarks (Awards Exhibition Registry) */}
      <div className="absolute top-3 left-4 font-mono text-[9px] text-[#C8923C]/50 uppercase tracking-[0.25em] hidden sm:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E5B258] animate-pulse" />
        <span>GALA SHOWCASE // FINTECH PODIUM HONORS</span>
      </div>
      <div className="absolute top-3 right-4 font-mono text-[9px] text-[#E5B258]/60 uppercase tracking-[0.25em] hidden sm:block">
        AWARD_RECORD: FIN_3RD_PLACE_WINNER
      </div>
      <div className="absolute bottom-3 left-4 font-mono text-[8.5px] text-[#8C5815]/50 uppercase tracking-[0.2em] hidden sm:block">
        AUTHENTICATED TROPHY EXHIBITION • CSE DATA SCIENCE
      </div>
    </div>
  );
};
