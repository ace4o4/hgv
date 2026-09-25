'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CommunityJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodes = ['LEARN', 'BUILD', 'COLLABORATE', 'LEAD', 'GROW'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    if (containerRef.current) {
      const steps = containerRef.current.querySelectorAll('.journey-step');
      
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => step.classList.add('active'),
          onLeaveBack: () => step.classList.remove('active'),
        });
      });
    }
  }, []);

  return (
    <section className="transparent-section" style={{ padding: '20vh 0', minHeight: '150vh' }}>
      <div className="container" ref={containerRef}>
        <div style={{ marginBottom: '10vh' }}>
          <span className="section-label">THE JOURNEY</span>
        </div>
        <div className="journey-spatial">
          {nodes.map((node, index) => (
            <div 
              key={node} 
              className="journey-step" 
              data-text={node}
              style={{ marginLeft: `${index * 5}vw` }}
            >
              {node}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
