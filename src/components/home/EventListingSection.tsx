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
    <section ref={sectionRef} style={{ position: 'relative', backgroundColor: '#FFFFFF', color: '#090A0B', zIndex: 10, overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
      
      {/* Top Cutout Transition from #EBEBEB */}
      <div style={{
        position: 'absolute',
        top: '-4.9vw',
        left: 0,
        width: '100%',
        height: '5vw',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: '50% 100%',
        borderTopRightRadius: '50% 100%',
        zIndex: -1
      }}></div>

      <div style={{ paddingTop: '8vw', paddingBottom: '8vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
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
            maxWidth: '960px',
            backgroundColor: '#F4F5F6',
            borderRadius: '48px',
            padding: '1.5vw',
            display: 'flex',
            gap: '3vw',
            position: 'relative',
            zIndex: 5,
            boxShadow: '0 30px 60px rgba(0,0,0,0.08)'
          }}>
            
            {/* Left Huge Dark Image Cutout */}
            <div style={{
              flex: '1.1',
              backgroundColor: '#16181A',
              borderRadius: '40px',
              minHeight: '400px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)'
            }}>
              {/* Central Abstract 3D-like Element (mimicking the drop from the image) */}
              <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', width: '160px', height: '60px', backgroundColor: '#000', borderRadius: '50%', filter: 'blur(10px)', opacity: 0.8 }}></div>
                <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px', background: 'radial-gradient(circle at 30% 30%, #4A5568, #1A1D20 70%)', borderRadius: '50%', boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.5)' }}></div>
                <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '20px', background: 'linear-gradient(to bottom, #A0AEC0, #4A5568)', borderRadius: '50% 50% 40% 40%', boxShadow: '0 5px 10px rgba(0,0,0,0.3)' }}></div>
              </div>
            </div>

            {/* Right Text Content */}
            <div style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              padding: '2.5vw 2.5vw 2.5vw 0',
              justifyContent: 'space-between'
            }}>
              
              <div>
                {/* Logo / Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5vw' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#1A1D20', transform: 'skewX(-15deg)' }}></div>
                    <div style={{ width: '8px', height: '12px', backgroundColor: '#1A1D20', transform: 'skewX(-15deg)', opacity: 0.6 }}></div>
                    <div style={{ width: '4px', height: '12px', backgroundColor: '#1A1D20', transform: 'skewX(-15deg)', opacity: 0.3 }}></div>
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.05em', color: '#1A1D20' }}>HGV</span>
                </div>

                <h3 style={{ fontSize: 'clamp(1.5rem, 2vw, 2.2rem)', fontWeight: 600, color: '#1A1D20', lineHeight: 1.1, marginBottom: '1vw', letterSpacing: '-0.02em' }}>
                  {liveEvent.name}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#5F646B', lineHeight: 1.5, marginBottom: '1.5vw', fontWeight: 400, maxWidth: '90%' }}>
                  We analyze your workflows, bottlenecks, and revenue opportunities to build meaningful solutions in this flagship event.
                </p>

                <Link href={`/events/${liveEvent.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#1A1D20', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                  Read More
                  <div style={{ width: '16px', height: '16px', backgroundColor: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight size={10} color="#1A1D20" />
                  </div>
                </Link>
              </div>

              {/* Stats at bottom right */}
              <div style={{ display: 'flex', gap: '3vw', marginTop: '2vw' }}>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1A1D20', letterSpacing: '-0.02em' }}>36<span style={{ fontSize: '1.2rem' }}>hr</span></div>
                  <div style={{ fontSize: '0.7rem', color: '#5F646B', fontWeight: 500 }}>Duration</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1A1D20', letterSpacing: '-0.02em' }}>500<span style={{ fontSize: '1.2rem' }}>+</span></div>
                  <div style={{ fontSize: '0.7rem', color: '#5F646B', fontWeight: 500 }}>Hackers</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1A1D20', letterSpacing: '-0.02em' }}>10<span style={{ fontSize: '1.2rem' }}>L</span></div>
                  <div style={{ fontSize: '0.7rem', color: '#5F646B', fontWeight: 500 }}>Prize Pool</div>
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
