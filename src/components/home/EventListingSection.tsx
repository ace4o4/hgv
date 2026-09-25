'use client';

import { eventsData } from '@/data/events';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EventListingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);

  const liveEvent = eventsData.find((e) => e.status === 'NOW BUILDING') || eventsData[0];
  
  useEffect(() => {
    if (!sectionRef.current || !mainCardRef.current) return;

    gsap.fromTo(mainCardRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} style={{ 
      position: 'relative', 
      backgroundColor: '#FFFFFF', 
      color: '#090A0B', 
      zIndex: 10, 
      overflow: 'hidden', 
      fontFamily: "'Outfit', sans-serif",
      borderTopLeftRadius: '80px',
      borderTopRightRadius: '80px',
      marginTop: '-80px',
      paddingTop: '80px',
      boxShadow: '0 -20px 50px rgba(0,0,0,0.06)' // Premium soft shadow overlapping previous section
    }}>

      <div style={{ paddingTop: '6vw', paddingBottom: '8vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '5vw' }}>
          {/* Top Pill Badge */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 16px', 
            border: '1px solid #E2E8F0', 
            borderRadius: '40px', 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            letterSpacing: '0.1em',
            color: '#1A1D20',
            marginBottom: '2vw',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
          }}>
            <span style={{ opacity: 0.6 }}>001</span>
            <div style={{ width: '4px', height: '4px', backgroundColor: '#1A1D20', borderRadius: '50%' }}></div>
            <span>LIVE EVENTS</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#1A1D20' }}>
            Current & Upcoming
          </h2>
        </div>

        {/* Carousel Area */}
        <div ref={carouselRef} style={{ 
          position: 'relative', 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '0 5vw',
          minHeight: '500px'
        }}>

          {/* Left Adjacent Card (Partial) */}
          <div style={{
            position: 'absolute',
            left: '-10vw',
            width: '60vw',
            maxWidth: '900px',
            height: '400px',
            backgroundColor: '#F4F5F6',
            borderRadius: '40px',
            opacity: 0.5,
            transform: 'scale(0.85)',
            zIndex: 1,
            filter: 'blur(4px)'
          }}></div>

          {/* Right Adjacent Card (Partial) */}
          <div style={{
            position: 'absolute',
            right: '-10vw',
            width: '60vw',
            maxWidth: '900px',
            height: '400px',
            backgroundColor: '#F4F5F6',
            borderRadius: '40px',
            opacity: 0.5,
            transform: 'scale(0.85)',
            zIndex: 1,
            filter: 'blur(4px)'
          }}></div>

          {/* Nav Arrows */}
          <div style={{ position: 'absolute', left: '15vw', zIndex: 10, cursor: 'pointer', display: 'none' /* hidden on mobile, handle via CSS or leave as is if we center exactly */ }}></div>
          
          <button style={{ 
            position: 'absolute', 
            left: '12vw', 
            zIndex: 15,
            width: '40px', 
            height: '40px', 
            backgroundColor: '#1A1D20', 
            color: '#FFF',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            border: 'none',
            cursor: 'pointer'
          }}>
            <ChevronLeft size={20} />
          </button>

          <button style={{ 
            position: 'absolute', 
            right: '12vw', 
            zIndex: 15,
            width: '40px', 
            height: '40px', 
            backgroundColor: '#1A1D20', 
            color: '#FFF',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            border: 'none',
            cursor: 'pointer'
          }}>
            <ChevronRight size={20} />
          </button>

          {/* Main Card */}
          <div ref={mainCardRef} style={{
            width: '100%',
            maxWidth: '1000px',
            backgroundColor: '#F7F8F9',
            borderRadius: '48px',
            padding: '1.2vw',
            display: 'flex',
            gap: '4vw',
            position: 'relative',
            zIndex: 5,
            boxShadow: '0 30px 60px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.8)',
            border: '1px solid rgba(0,0,0,0.03)'
          }}>
            
            {/* Left Huge Dark Cutout (Premium Matte) */}
            <div style={{
              flex: '1.2',
              background: 'linear-gradient(145deg, #1C1E22 0%, #0A0B0C 100%)',
              borderRadius: '40px',
              minHeight: '420px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.15)'
            }}>
              {/* Refined 3D Element (Abstract Glass Sphere / Liquid Drop) */}
              <div style={{ position: 'relative', width: '240px', height: '240px' }}>
                
                {/* Base Ground Shadow */}
                <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%) scaleY(0.25)', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(10px)', zIndex: 1 }}></div>
                
                {/* Main 3D Liquid Pool / Base */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: '25%', 
                  left: '50%', 
                  transform: 'translateX(-50%) scaleY(0.4)', 
                  width: '180px', 
                  height: '180px', 
                  background: 'radial-gradient(circle at 40% 30%, #374151 0%, #0F1115 50%, #000000 100%)', 
                  borderRadius: '50%', 
                  boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.9), inset 5px 5px 15px rgba(255,255,255,0.1)',
                  zIndex: 2 
                }}>
                   {/* Ring Highlight on the pool */}
                   <div style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', borderTop: '2px solid rgba(255,255,255,0.15)', borderRadius: '50%' }}></div>
                </div>

                {/* Ascending Drop (The splash/pull up) */}
                <div style={{ 
                  position: 'absolute', 
                  top: '35%', 
                  left: '50%', 
                  transform: 'translate(-50%, 0)', 
                  width: '60px', 
                  height: '80px', 
                  background: 'linear-gradient(180deg, #6B7280 0%, #111827 80%, #000000 100%)', 
                  borderRadius: '50% 50% 45% 45% / 80% 80% 20% 20%', 
                  boxShadow: 'inset -8px -5px 15px rgba(0,0,0,0.9), inset 5px 5px 15px rgba(255,255,255,0.25)',
                  zIndex: 3 
                }}>
                   {/* Main specular highlight */}
                   <div style={{ position: 'absolute', top: '10%', left: '15%', width: '20%', height: '60%', background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)', borderRadius: '50%', transform: 'rotate(-15deg)' }}></div>
                </div>

                {/* Top Tiny Separated Droplet */}
                <div style={{ 
                  position: 'absolute', 
                  top: '20%', 
                  left: '50%', 
                  transform: 'translateX(-50%)', 
                  width: '14px', 
                  height: '22px', 
                  background: 'radial-gradient(circle at 30% 30%, #D1D5DB 0%, #374151 50%, #030712 100%)', 
                  borderRadius: '50% 50% 40% 40%', 
                  boxShadow: '0 8px 10px rgba(0,0,0,0.6)',
                  zIndex: 4 
                }}>
                  <div style={{ position: 'absolute', top: '2px', left: '2px', width: '3px', height: '6px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%' }}></div>
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              padding: '3vw 4vw 3vw 0',
              justifyContent: 'center'
            }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vw' }}>
                {/* Logo / Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#1A1D20', transform: 'skewX(-15deg)' }}></div>
                    <div style={{ width: '8px', height: '12px', backgroundColor: '#1A1D20', transform: 'skewX(-15deg)', opacity: 0.6 }}></div>
                    <div style={{ width: '4px', height: '12px', backgroundColor: '#1A1D20', transform: 'skewX(-15deg)', opacity: 0.3 }}></div>
                  </div>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.05em', color: '#1A1D20' }}>HGV</span>
                </div>

                <h3 style={{ fontSize: 'clamp(1.8rem, 2.2vw, 2.5rem)', fontWeight: 600, color: '#1A1D20', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {liveEvent.name}
                </h3>

                <p style={{ fontSize: '0.95rem', color: '#5F646B', lineHeight: 1.6, fontWeight: 400, maxWidth: '95%' }}>
                  We analyze your workflows, bottlenecks, and revenue opportunities to build meaningful solutions in this flagship event.
                </p>

                <div style={{ marginTop: '0.5vw' }}>
                  <Link href={`/events/${liveEvent.slug}`} style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    fontSize: '0.9rem', 
                    fontWeight: 600, 
                    color: '#1A1D20', 
                    textDecoration: 'underline', 
                    textUnderlineOffset: '6px',
                    transition: 'opacity 0.3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Read More
                    <div style={{ width: '18px', height: '18px', backgroundColor: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowRight size={10} color="#1A1D20" strokeWidth={3} />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Stats at bottom right */}
              <div style={{ display: 'flex', gap: '3.5vw', marginTop: '4vw' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1D20', letterSpacing: '-0.02em', lineHeight: 1 }}>+36<span style={{ fontSize: '1.2rem', marginLeft: '2px' }}>hr</span></div>
                  <div style={{ fontSize: '0.75rem', color: '#5F646B', fontWeight: 500, marginTop: '8px' }}>Duration</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1D20', letterSpacing: '-0.02em', lineHeight: 1 }}>+500</div>
                  <div style={{ fontSize: '0.75rem', color: '#5F646B', fontWeight: 500, marginTop: '8px' }}>Hackers</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1D20', letterSpacing: '-0.02em', lineHeight: 1 }}>10x</div>
                  <div style={{ fontSize: '0.75rem', color: '#5F646B', fontWeight: 500, marginTop: '8px' }}>Prize Pool (L)</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '3vw', alignItems: 'center' }}>
          <div style={{ width: '6px', height: '6px', backgroundColor: '#CBD5E1', borderRadius: '50%' }}></div>
          <div style={{ width: '24px', height: '6px', background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)', borderRadius: '10px' }}></div>
          <div style={{ width: '6px', height: '6px', backgroundColor: '#CBD5E1', borderRadius: '50%' }}></div>
          <div style={{ width: '6px', height: '6px', backgroundColor: '#CBD5E1', borderRadius: '50%' }}></div>
        </div>

        {/* Bottom Button */}
        <div style={{ marginTop: '3vw' }}>
          <Link href="/events" style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#1A1D20',
            color: '#FFFFFF',
            borderRadius: '40px',
            fontSize: '0.9rem',
            fontWeight: 500,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2), 0 0 20px rgba(47, 128, 255, 0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3), 0 0 25px rgba(47, 128, 255, 0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2), 0 0 20px rgba(47, 128, 255, 0.1)'; }}
          >
            Explore all Events
          </Link>
        </div>

      </div>
    </section>
  );
}
