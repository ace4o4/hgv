'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CommunityImpact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    if (containerRef.current) {
      const impacts = containerRef.current.querySelectorAll('.impact-row');
      
      impacts.forEach((impact, i) => {
        gsap.fromTo(impact, 
          { y: 100, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            scrollTrigger: {
              trigger: impact,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: 1
            }
          }
        );
      });
    }
  }, []);

  return (
    <section className="transparent-section" style={{ minHeight: '120vh', padding: '10vh 0' }} ref={containerRef}>
      <div className="container">
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15vh' }}>
          
          <div className="impact-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 className="impact-typography">
              <span className="impact-highlight">GROWING</span> ACROSS<br/>CAMPUSES.
            </h2>
          </div>

          <div className="impact-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
            <h2 className="impact-typography">
              <span className="impact-highlight">BUILDING</span> STRONGER<br/>NETWORKS.
            </h2>
          </div>

          <div className="impact-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h2 className="impact-typography">
              <span className="impact-highlight">CREATING</span> REAL<br/>OPPORTUNITIES.
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}
