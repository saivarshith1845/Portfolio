import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Point {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
}

interface ContourLine {
  points: Point[];
  color: string;
  width: number;
  alpha: number;
  sectionOffset: number;
}

interface OrganicBlob {
  xRatio: number;
  yRatio: number;
  radius: number;
  color: 'blue' | 'red';
  speedX: number;
  speedY: number;
  phase: number;
}

export const LivingBlueprint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse tracking with smooth lerp interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 380,
      isNearPortrait: false,
    };

    // Scroll position tracking for parallax
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    // Large Translucent Organic Light Blobs (Moving slowly 15–30s cycles)
    const blobs: OrganicBlob[] = [
      {
        xRatio: 0.2,
        yRatio: 0.25,
        radius: 650,
        color: 'blue',
        speedX: 0.0003,
        speedY: 0.0002,
        phase: 0,
      },
      {
        xRatio: 0.8,
        yRatio: 0.55,
        radius: 600,
        color: 'red',
        speedX: -0.00025,
        speedY: 0.00035,
        phase: Math.PI * 0.5,
      },
      {
        xRatio: 0.35,
        yRatio: 0.85,
        radius: 700,
        color: 'blue',
        speedX: 0.0002,
        speedY: -0.0002,
        phase: Math.PI,
      },
      {
        xRatio: 0.7,
        yRatio: 0.15,
        radius: 500,
        color: 'red',
        speedX: -0.0003,
        speedY: -0.00015,
        phase: Math.PI * 1.5,
      },
    ];

    // Handle canvas sizing & high DPI rendering
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initLines();
    };

    // Store generated contour field lines
    let contourLines: ContourLine[] = [];

    const initLines = () => {
      contourLines = [];
      const lineCount = isMobile ? 8 : 16;
      const pointsPerLine = isMobile ? 10 : 20;

      for (let i = 0; i < lineCount; i++) {
        const points: Point[] = [];
        const yRatio = i / (lineCount - 1);
        const baseY = height * 0.04 + yRatio * (height * 0.92);

        // Color selection: mix of powder blue (#A9C6EA) and crimson (#C1121F)
        const isCrimson = i % 4 === 1;
        const color = isCrimson ? '#C1121F' : '#A9C6EA';
        const alpha = isCrimson ? 0.14 : 0.24;
        const strokeWidth = isCrimson ? 0.9 : 1.1;

        for (let j = 0; j < pointsPerLine; j++) {
          const xRatio = j / (pointsPerLine - 1);
          const baseX = xRatio * width;

          // Organic topographic curve mathematics
          const sineWave1 = Math.sin(xRatio * Math.PI * 2.8 + yRatio * Math.PI * 1.8) * 38;
          const sineWave2 = Math.cos(xRatio * Math.PI * 1.8 - yRatio * Math.PI * 3.2) * 28;
          const initialY = baseY + sineWave1 + sineWave2;

          points.push({
            x: baseX,
            y: initialY,
            baseX: baseX,
            baseY: initialY,
          });
        }

        contourLines.push({
          points,
          color,
          width: strokeWidth,
          alpha,
          sectionOffset: (i % 3) * 0.15,
        });
      }
    };

    // Mouse & Scroll Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Check if mouse is near hero portrait element
      const portraitEl = document.getElementById('portrait-card');
      if (portraitEl) {
        const rect = portraitEl.getBoundingClientRect();
        const padding = 150;
        mouse.isNearPortrait =
          e.clientX >= rect.left - padding &&
          e.clientX <= rect.right + padding &&
          e.clientY >= rect.top - padding &&
          e.clientY <= rect.bottom + padding;
      }
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    resize();

    let time = 0;

    // Render loop for Abstract Flow Field
    const render = () => {
      time += 0.016; // Approx 60fps time delta

      // Smooth lerp for mouse and scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Calculate total page scroll progress [0 to 1]
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      ctx.clearRect(0, 0, width, height);

      // Save context
      ctx.save();

      // -------------------------------------------------------------
      // 1. ABSTRACT MOTION LIGHT BLOBS (SHELTERED UNDER WARM IVORY)
      // -------------------------------------------------------------
      blobs.forEach((blob) => {
        // Slow organic movement over 15–30s cycle
        const offsetX = Math.sin(time * blob.speedX * 60 + blob.phase) * (width * 0.12);
        const offsetY = Math.cos(time * blob.speedY * 60 + blob.phase) * (height * 0.1);

        const currentX = blob.xRatio * width + offsetX;
        const currentY = blob.yRatio * height + offsetY - scrollY * 0.04;

        // Dynamic Section Balance Adjustment:
        // Hero: Blue dominant; Projects: Crimson dominant; Contact: Subtle mix
        let intensity = 0.18;
        if (blob.color === 'red') {
          // Boost crimson near middle/projects section
          intensity = 0.12 + Math.sin(scrollProgress * Math.PI) * 0.08;
        } else {
          // Powder blue strong near top/bottom
          intensity = 0.22 - Math.sin(scrollProgress * Math.PI) * 0.06;
        }

        const grad = ctx.createRadialGradient(
          currentX,
          currentY,
          10,
          currentX,
          currentY,
          blob.radius
        );

        if (blob.color === 'blue') {
          grad.addColorStop(0, `rgba(169, 198, 234, ${intensity.toFixed(3)})`);
          grad.addColorStop(0.55, `rgba(169, 198, 234, ${(intensity * 0.35).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(169, 198, 234, 0)');
        } else {
          grad.addColorStop(0, `rgba(193, 18, 31, ${intensity.toFixed(3)})`);
          grad.addColorStop(0.5, `rgba(193, 18, 31, ${(intensity * 0.3).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(193, 18, 31, 0)');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // -------------------------------------------------------------
      // 2. CURSOR ATMOSPHERIC LIGHT SOURCE INTERACTION
      // -------------------------------------------------------------
      if (!isMobile && mouse.x > 0 && mouse.y > 0) {
        const lightRadius = mouse.isNearPortrait ? 460 : 340;
        const gradCursor = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          lightRadius
        );

        if (mouse.isNearPortrait) {
          // Enhanced powder-blue & crimson halo bloom around portrait card
          gradCursor.addColorStop(0, 'rgba(169, 198, 234, 0.32)');
          gradCursor.addColorStop(0.45, 'rgba(193, 18, 31, 0.14)');
          gradCursor.addColorStop(1, 'rgba(255, 246, 232, 0)');
        } else {
          gradCursor.addColorStop(0, 'rgba(169, 198, 234, 0.20)');
          gradCursor.addColorStop(0.65, 'rgba(169, 198, 234, 0.04)');
          gradCursor.addColorStop(1, 'rgba(255, 246, 232, 0)');
        }

        ctx.fillStyle = gradCursor;
        ctx.fillRect(0, 0, width, height);
      }

      // -------------------------------------------------------------
      // 3. OVERSIZED ARCHITECTURAL CONSTRUCTION ARCS & GEOMETRY
      // -------------------------------------------------------------
      ctx.save();
      ctx.lineWidth = 0.85;

      // Hero Portrait Framing Arc
      const arc1X = width * 0.24;
      const arc1Y = height * 0.38 - scrollY * 0.05;
      const rotateArc1 = time * 0.02;

      ctx.strokeStyle = 'rgba(169, 198, 234, 0.24)';
      ctx.beginPath();
      ctx.arc(arc1X, arc1Y, 490, rotateArc1 + Math.PI * 0.1, rotateArc1 + Math.PI * 1.3);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(193, 18, 31, 0.16)';
      ctx.beginPath();
      ctx.arc(arc1X, arc1Y, 465, rotateArc1 + Math.PI * 0.45, rotateArc1 + Math.PI * 0.95);
      ctx.stroke();

      // Large Projects Section Construction Arc (Right Side)
      const arc2X = width * 0.88;
      const arc2Y = height * 0.62 - scrollY * 0.035;
      ctx.strokeStyle = 'rgba(169, 198, 234, 0.2)';
      ctx.beginPath();
      ctx.arc(arc2X, arc2Y, 680, Math.PI * 0.75, Math.PI * 1.75);
      ctx.stroke();

      // Contact Section Geometry Circle (Bottom Left)
      const arc3X = width * 0.18;
      const arc3Y = height * 0.92 - scrollY * 0.02;
      ctx.strokeStyle = 'rgba(193, 18, 31, 0.14)';
      ctx.beginPath();
      ctx.arc(arc3X, arc3Y, 420, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // -------------------------------------------------------------
      // 4. FLOWING CONTOUR LINES WITH MAGNETIC CURSOR WARP
      // -------------------------------------------------------------
      contourLines.forEach((line) => {
        const lineParallaxY = -scrollY * (0.045 + line.sectionOffset * 0.025);

        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.globalAlpha = line.alpha;
        ctx.lineWidth = line.width;

        line.points.forEach((p, idx) => {
          let currX = p.baseX;
          let currY = p.baseY + lineParallaxY;

          // Slow organic wave drift
          const waveShift = Math.sin(time * 0.5 + idx * 0.3) * 6;
          currY += waveShift;

          // Magnetic Cursor Distortion
          if (!isMobile && mouse.x > 0 && mouse.y > 0) {
            const dx = mouse.x - currX;
            const dy = mouse.y - currY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const force = (1 - dist / mouse.radius);
              const warpAmount = force * force * 42;
              const angle = Math.atan2(dy, dx);

              currX += Math.cos(angle) * warpAmount;
              currY += Math.sin(angle) * warpAmount;
            }
          }

          p.x = currX;
          p.y = currY;

          if (idx === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            const prev = line.points[idx - 1];
            const midX = (prev.x + p.x) / 2;
            const midY = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        });

        ctx.stroke();
      });

      // -------------------------------------------------------------
      // 5. SPARSE EDITORIAL TECHNICAL MARKS & CROSSHAIRS
      // -------------------------------------------------------------
      ctx.save();
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(23, 21, 21, 0.4)';
      ctx.strokeStyle = 'rgba(193, 18, 31, 0.3)';
      ctx.lineWidth = 0.6;

      // Annotation 01: Top Left Hero Header
      const m1Y = 75 - scrollY * 0.02;
      if (m1Y > -50 && m1Y < height + 50) {
        ctx.fillText('+ 01 // ABSTRACT FLOW FIELD', 44, m1Y);
        ctx.fillText(`COORDS: [${(width * 0.2).toFixed(0)}, ${(m1Y + scrollY).toFixed(0)}]`, 44, m1Y + 14);

        ctx.beginPath();
        ctx.moveTo(32, m1Y - 4);
        ctx.lineTo(175, m1Y - 4);
        ctx.stroke();
      }

      // Annotation 02: Center Projects Marker
      const m2Y = height * 0.48 - scrollY * 0.025;
      if (m2Y > -50 && m2Y < height + 50) {
        ctx.fillStyle = 'rgba(193, 18, 31, 0.5)';
        ctx.fillText('02 // EDITORIAL GEOMETRY', width - 210, m2Y);
        ctx.fillStyle = 'rgba(23, 21, 21, 0.4)';
        ctx.fillText('FLOW_RATE: 60 FPS', width - 210, m2Y + 14);

        const chX = width - 225;
        const chY = m2Y + 4;
        ctx.beginPath();
        ctx.moveTo(chX - 6, chY);
        ctx.lineTo(chX + 6, chY);
        ctx.moveTo(chX, chY - 6);
        ctx.lineTo(chX, chY + 6);
        ctx.stroke();
      }

      // Annotation 03: Bottom Hackathons/Contact Spec Marker
      const m3Y = height * 0.82 - scrollY * 0.015;
      if (m3Y > -50 && m3Y < height + 50) {
        ctx.fillText('03 // CONTINUOUS CANVAS SYSTEM', 64, m3Y);
        ctx.fillText('PALETTE: #FFF6E8 · #C1121F · #A9C6EA', 64, m3Y + 14);

        ctx.beginPath();
        ctx.arc(48, m3Y + 4, 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};
