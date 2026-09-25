'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const words = [
  { text: 'learner', color: '#FF7A00' },
  { text: 'designer', color: '#FFD700' },
  { text: 'developer', color: '#00FF66' },
  { text: 'builder', color: '#FFFFFF' }, // Center word (Index 3)
  { text: 'creator', color: '#00BFFF' },
  { text: 'visionary', color: '#9D4EDD' },
  { text: 'hacker', color: '#FF007F' }
];

export default function CommunityIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());

    const section = sectionRef.current;
    const leftText = leftTextRef.current;
    
    if (section && leftText) {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=4000', // Massive scroll distance for slow scrub
          scrub: 1.5, // 1.5s lag gives the overall springy feel to the scroll
          pin: true 
        }
      });

      // 1. "everyone's a" slides in
      tl.to(leftText, { opacity: 1, x: 0, duration: 1.5, ease: 'none' });
      
      // Pause
      tl.to({}, { duration: 0.8 });

      // 2. Center word (builder) pops in with a SPRING bounce
      if (wordsRef.current[3]) {
        tl.to(wordsRef.current[3], { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'back.out(2)' });
      }

      // Pause
      tl.to({}, { duration: 0.8 });

      // 3. Expand outwards simultaneously (Top and Bottom pairs) with SPRING motion
      // Top words animate to y: 0 from 80px (slide UP). Bottom words animate to y: 0 from -80px (slide DOWN).
      for (let i = 1; i <= 3; i++) {
        const topEl = wordsRef.current[3 - i];
        const bottomEl = wordsRef.current[3 + i];
        
        const pairTimeline = gsap.timeline();
        if (topEl) {
          pairTimeline.to(topEl, { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 2, ease: 'back.out(1.5)' }, 0);
        }
        if (bottomEl) {
          pairTimeline.to(bottomEl, { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 2, ease: 'back.out(1.5)' }, 0);
        }
        
        // Add pair animation to main timeline with a slight overlap
        tl.add(pairTimeline, `-=${1}`);
      }
      
      // Hold at the end
      tl.to({}, { duration: 3 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: '#050505', 
        height: '100vh',
        width: '100vw',
        position: 'relative',
        color: '#FFF',
        fontFamily: "'Outfit', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 20
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '1.5vw',
        fontSize: 'clamp(3rem, 7vw, 8rem)',
        fontWeight: 800,
        letterSpacing: '-0.05em',
        width: '100%'
      }}>
        
        {/* Left Fixed Text */}
        <div 
          ref={leftTextRef}
          style={{
            color: '#FFFFFF',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
            opacity: 0,
            transform: 'translateX(-100px)'
          }}
        >
          everyone's a
        </div>

        {/* Right Expanding Words Column */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          whiteSpace: 'nowrap',
          position: 'relative'
        }}>
          {words.map((word, i) => {
            const isCenter = i === 3;
            // Opposite direction: Top words start closer to center (y: 80px) and slide UP. 
            // Bottom words start closer to center (y: -80px) and slide DOWN.
            const yOffset = i < 3 ? '80px' : i > 3 ? '-80px' : '0px';

            return (
              <div 
                key={i}
                ref={el => { wordsRef.current[i] = el; }}
                style={{
                  color: word.color,
                  lineHeight: 1.1, // ~20% space
                  paddingBottom: '0.1em',
                  textShadow: `0 0 40px ${word.color}90, 0 0 80px ${word.color}60`, // Free glowing neon
                  opacity: 0,
                  transform: `translateY(${yOffset}) ${isCenter ? 'scale(0.8)' : 'scale(1)'}`, 
                  filter: 'blur(20px)',
                  willChange: 'transform, opacity, filter'
                }}
              >
                {word.text}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
