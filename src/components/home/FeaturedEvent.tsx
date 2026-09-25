'use client';

import { eventsData } from '@/data/events';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedEvent() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const event = eventsData.find((e) => e.slug === 'ahgv-buildverse-2026');

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animation for marquee opacity
    gsap.fromTo(marqueeRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Staggered animation for data cards
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
        }
      }
    );

    // Hover effects setup for cards
    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', scale: 1.02, duration: 0.4, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', scale: 1, duration: 0.4, ease: 'power2.out' });
      });
    });
  }, []);

  if (!event) return null;

  const marqueeWords = ["HACKGYANVERSE", "COMMUNITY", "AHGV BUILDVERSE 2026", "INNOVATION", "COLLABORATION", "LEADERSHIP", "NEXT-GEN BUILDERS"];

  const dataPoints = [
    { num: '36', unit: 'hrs', desc: 'Non-stop building, ideating, and shipping real-world solutions.' },
    { num: '500', unit: '+', desc: 'Hackers and creators from across the country joining the movement.' },
    { num: '10', unit: 'Lakh', desc: 'Prize pool to fuel your next big startup idea or project.' },
    { num: '0', unit: 'Limits', desc: 'No boundaries to your imagination. Build what truly matters.' }
  ];

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#EBEBEB', color: '#1A1D20', paddingTop: '4vw', paddingBottom: '8vw', fontFamily: "'Outfit', sans-serif", overflow: 'hidden' }}>
      
      {/* Aesthetic Marquee Section */}
      <div ref={marqueeRef} style={{ 
        height: '90px', 
        borderTop: '1px solid rgba(0,0,0,0.06)', 
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        whiteSpace: 'nowrap',
        backgroundColor: 'rgba(255,255,255,0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="marquee-content" style={{ display: 'flex', gap: '3vw', paddingLeft: '3vw', animation: 'marquee-scroll 35s linear infinite' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '3vw' }}>
              {marqueeWords.map((word, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '3vw' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#5F646B', letterSpacing: '0.15em' }}>
                    {word}
                  </span>
                  <div style={{ width: '5px', height: '5px', backgroundColor: '#2F80FF', borderRadius: '50%', opacity: 0.6 }}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Data Placeholders Section (Hero-style Cutouts) */}
      <div className="container" style={{ marginTop: '8vw' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '2vw',
          alignItems: 'stretch'
        }}>
          
          {dataPoints.map((data, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '32px',
                padding: '3vw',
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                position: 'relative',
                cursor: 'default',
                border: '1px solid rgba(255,255,255,0.8)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: 'clamp(4rem, 5vw, 6rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', color: '#090A0B' }}>
                  {data.num}
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, marginLeft: '6px', color: '#819CB6' }}>
                  {data.unit}
                </span>
              </div>
              <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#5F646B', fontWeight: 500 }}>
                {data.desc}
              </p>
              
              {/* Micro element (dot) */}
              <div style={{ position: 'absolute', top: '2vw', right: '2vw', width: '8px', height: '8px', backgroundColor: index % 2 === 0 ? '#2F80FF' : '#1A1D20', borderRadius: '50%', opacity: 0.2 }}></div>
            </div>
          ))}

        </div>

        <div style={{ marginTop: '5vw', display: 'flex', justifyContent: 'center' }}>
          <Link href={`/events/${event.slug}`} style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '1vw 2.5vw', 
            backgroundColor: '#1A1D20', 
            color: '#FFF', 
            borderRadius: '40px', 
            fontSize: '1rem', 
            fontWeight: 700, 
            letterSpacing: '0.05em',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'; }}
          >
            EXPLORE {event.name.toUpperCase()}
            <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
