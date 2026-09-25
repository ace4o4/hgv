'use client';

import { communityData } from '@/data/community';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    if (containerRef.current) {
      const content = containerRef.current.querySelector('.cta-content');
      
      gsap.fromTo(content, 
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1
          }
        }
      );
    }
  }, []);

  return (
    <section className="transparent-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} ref={containerRef}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="cta-content">
          <h2 className="editorial-title" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', marginBottom: '4rem', textTransform: 'uppercase' }}>
            LET'S BUILD<br/>SOMETHING<br/>
            <span style={{ color: 'var(--electric-blue)' }}>TOGETHER.</span>
          </h2>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '10vh' }}>
            <a href={communityData.whatsappLink} className="btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', letterSpacing: '0.1em' }}>
              JOIN COMMUNITY
            </a>
            <a href={communityData.collaborationLink} className="btn-secondary" style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', letterSpacing: '0.1em' }}>
              COLLABORATE
            </a>
          </div>
          
          <div style={{ color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            HackGyanVerse Community <br/>
            Classroom to Career — Together
          </div>
        </div>
      </div>
    </section>
  );
}
