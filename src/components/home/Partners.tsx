'use client';

import { partnersData } from '@/data/partners';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    if (containerRef.current) {
      gsap.fromTo(itemsRef.current, 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, []);

  return (
    <section style={{ backgroundColor: '#050505', padding: '10vw 5vw', fontFamily: "'Outfit', sans-serif" }}>
      <div ref={containerRef} style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '6vw' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 5rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            PARTNERS &<br/>
            <span style={{ color: '#819CB6', fontStyle: 'italic', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>COLLABORATORS</span>
          </h2>
          <p style={{ color: '#5F646B', fontSize: '1.1rem', marginTop: '1.5vw', maxWidth: '600px', margin: '1.5vw auto 0' }}>
            Supported by industry leaders who believe in the power of community-driven innovation.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2vw' }}>
          {partnersData.map((partner, i) => (
            <div 
              key={partner.name} 
              ref={el => { itemsRef.current[i] = el; }}
              style={{ 
                backgroundColor: '#111315', 
                border: '1px solid rgba(255,255,255,0.03)',
                borderRadius: '24px',
                padding: '4vw 2vw',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.backgroundColor = '#16191C';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(47, 128, 255, 0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#111315';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#2F80FF', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', fontWeight: 700 }}>
                {partner.tier}
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF', textAlign: 'center', letterSpacing: '-0.02em' }}>
                {partner.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
