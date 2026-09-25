'use client';

import { eventsData } from '@/data/events';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PastEvents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const events = eventsData.slice(0, 3); // Get all events to showcase

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.event-spatial-item');
      
      items.forEach((item, i) => {
        gsap.fromTo(item, 
          { y: 150, opacity: 0, rotationX: 10, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            rotationX: 0,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 50%',
              scrub: 1
            }
          }
        );
      });
    }
  }, []);

  return (
    <section className="transparent-section" style={{ minHeight: '100vh', padding: '10vh 0' }}>
      <div className="container" ref={containerRef}>
        <div style={{ marginBottom: '10vh' }}>
          <span className="section-label">EVENT ARCHIVE</span>
        </div>
        
        <div className="event-spatial-container">
          {events.map((event, i) => (
            <div key={event.slug} className="event-spatial-item">
              
              <div className="event-spatial-image">
                {/* Simulated depth and image */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.8))' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.2, fontSize: '10vw', fontWeight: 900, whiteSpace: 'nowrap' }}>
                  {event.name}
                </div>
              </div>

              <div className="event-spatial-content">
                <div style={{ color: 'var(--electric-blue)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  {event.category} — {event.date}
                </div>
                <h3 className="event-spatial-title">{event.name}</h3>
                <Link href={`/events/${event.slug}`} className="btn-secondary" style={{ marginTop: '2rem' }}>
                  ENTER ARCHIVE
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
