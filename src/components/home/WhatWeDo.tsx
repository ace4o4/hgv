'use client';

import { communityData } from '@/data/community';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.wwd-spatial-item');
      
      // Pin the container and scrub the items
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        animation: gsap.timeline()
          .to(engineRef.current, { scale: 0.8, opacity: 0.5, duration: 1 })
          .to(items, { 
            y: (i) => -window.innerHeight * (0.5 + i * 0.2), 
            opacity: 1, 
            stagger: 0.5,
            duration: 2
          }, 0)
      });
    }
  }, []);

  return (
    <section className="transparent-section" style={{ minHeight: '100vh' }} ref={containerRef}>
      <div className="container" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Central Engine Text */}
        <div ref={engineRef} style={{ position: 'absolute', textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--electric-blue)', marginBottom: '1rem' }}>CORE SYSTEM</div>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 700, textTransform: 'uppercase' }}>
            COMMUNITY<br/>ENGINE
          </h2>
        </div>

        {/* Orbiting Items */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
          {communityData.whatWeDo.map((item, i) => {
            const positions = [
              { top: '120%', left: '10%' },
              { top: '150%', left: '60%' },
              { top: '180%', left: '20%' },
              { top: '210%', left: '70%' },
              { top: '240%', left: '15%' },
              { top: '270%', left: '65%' },
            ];
            return (
              <div 
                key={item.title} 
                className="wwd-spatial-item glass-panel"
                style={{ 
                  position: 'absolute', 
                  ...positions[i], 
                  width: '300px', 
                  opacity: 0,
                  pointerEvents: 'auto'
                }}
              >
                <div style={{ fontSize: '2rem', color: 'var(--electric-blue)', marginBottom: '1rem', fontWeight: 700 }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
