'use client';

import { partnersData } from '@/data/partners';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.partner-plaque');
      
      gsap.fromTo(items, 
        { y: 100, opacity: 0, rotationX: 20 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: 1
          }
        }
      );
    }
  }, []);

  return (
    <section className="transparent-section" style={{ padding: '15vh 0' }}>
      <div className="container" ref={containerRef}>
        <h2 className="editorial-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '10vh' }}>
          PARTNER<br/>NETWORK
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
          {partnersData.map((partner) => (
            <div 
              key={partner.name} 
              className="partner-plaque glass-panel"
              style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                {partner.tier}
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-light)', textAlign: 'center' }}>
                {partner.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
