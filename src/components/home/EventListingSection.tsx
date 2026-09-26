'use client';

import { eventsData } from '@/data/events';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Trophy, ExternalLink, Code2, Globe, Users, Target, CalendarDays, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EventListingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const nextEvent = () => {
    setActiveIndex((prev) => (prev + 1) % eventsData.length);
  };

  const prevEvent = () => {
    setActiveIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length);
  };

  const liveEvent = eventsData[activeIndex];
  
  useEffect(() => {
    // Inject Lottie Player script for SSR-safe animations
    if (!document.getElementById('lottie-player-script')) {
      const script = document.createElement('script');
      script.id = 'lottie-player-script';
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      document.head.appendChild(script);
    }

    if (!sectionRef.current) return;

    gsap.fromTo(carouselRef.current,
      { y: 80, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  // Premium transition ease for Framer Motion
  const transitionConfig = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

  return (
    <section ref={sectionRef} style={{ 
      position: 'relative', 
      backgroundColor: '#E4E7EB', // Slightly deeper Titanium Off-White Contrast Background
      color: '#1A1D20', 
      zIndex: 10, 
      overflow: 'hidden', 
      fontFamily: "'Outfit', sans-serif",
      borderTopLeftRadius: '80px',
      borderTopRightRadius: '80px',
      marginTop: '-80px',
      paddingTop: '80px',
      boxShadow: '0 -30px 60px rgba(0,0,0,0.06)' 
    }}>
      {/* Animated Dynamic Background Gradients */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-20%', left: '-10%', width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
          filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0
        }} 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(47,128,255,0.15) 0%, transparent 70%)',
          filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0
        }} 
      />
      
      {/* Subtle Dot Grid Background Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.7, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ paddingTop: '5vw', paddingBottom: '10vw', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4vw' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '40px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#1A1D20', marginBottom: '2vw', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 16px rgba(0,0,0,0.04)' }}>
            <span style={{ opacity: 0.5 }}>001</span>
            <div style={{ width: '4px', height: '4px', backgroundColor: '#2F80FF', borderRadius: '50%' }}></div>
            <span>HACKATHONS & EVENTS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1A1D20' }}>Current & Upcoming</h2>
        </div>

        {/* Floating Bento Carousel Area */}
        <div ref={carouselRef} style={{ position: 'relative', width: '100%', maxWidth: '1440px', height: '700px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1vw' }}>

          {/* SVG Connecting Lines (Smooth Bezier Curves) */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }}>
            {/* Curves Layer (Stretched viewBox for percentage-based curves) */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.25, overflow: 'visible' }}>
              <motion.path d="M 50 50 C 36 50, 36 42, 22 42" fill="none" stroke="#1A1D20" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
              <motion.path d="M 50 50 C 64 50, 64 15, 78 15" fill="none" stroke="#1A1D20" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} />
              <motion.path d="M 50 50 C 65 50, 65 82, 80 82" fill="none" stroke="#1A1D20" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} />
              <motion.path d="M 50 50 C 37 50, 37 85, 25 85" fill="none" stroke="#1A1D20" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} />
              <motion.path d="M 50 50 C 70 54, 70 46, 90 50" fill="none" stroke="#1A1D20" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} />
              <motion.path d="M 50 50 C 33 50, 33 15, 16 15" fill="none" stroke="#1A1D20" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }} />
              <motion.path d="M 50 50 C 62 50, 62 45, 75 45" fill="none" stroke="#1A1D20" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }} />
            </svg>

            {/* Connection Anchors (Tiny sleek dots connecting lines to cards) */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible', opacity: 0.8 }}>
              <circle cx="22%" cy="42%" r="4" fill="#FFFFFF" stroke="#1A1D20" strokeWidth="1.5" />
              <circle cx="78%" cy="15%" r="4" fill="#FFFFFF" stroke="#1A1D20" strokeWidth="1.5" />
              <circle cx="80%" cy="82%" r="4" fill="#FFFFFF" stroke="#1A1D20" strokeWidth="1.5" />
              <circle cx="25%" cy="85%" r="4" fill="#FFFFFF" stroke="#1A1D20" strokeWidth="1.5" />
              <circle cx="90%" cy="50%" r="4" fill="#FFFFFF" stroke="#1A1D20" strokeWidth="1.5" />
              <circle cx="16%" cy="15%" r="4" fill="#FFFFFF" stroke="#1A1D20" strokeWidth="1.5" />
              <circle cx="75%" cy="45%" r="4" fill="#FFFFFF" stroke="#1A1D20" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Nav Arrows */}
          <button onClick={prevEvent} style={{ position: 'absolute', left: '2%', zIndex: 20, width: '56px', height: '56px', backgroundColor: '#FFFFFF', color: '#1A1D20', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', boxShadow: '0 12px 30px rgba(0,0,0,0.08)', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextEvent} style={{ position: 'absolute', right: '2%', zIndex: 20, width: '56px', height: '56px', backgroundColor: '#FFFFFF', color: '#1A1D20', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer', boxShadow: '0 12px 30px rgba(0,0,0,0.08)', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <ChevronRight size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >

              {/* CENTER PORTRAIT CARD */}
              <motion.div 
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={transitionConfig}
                style={{
                  width: '460px', height: '620px', background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%)', borderRadius: '36px', position: 'relative', zIndex: 5, boxShadow: '0 40px 80px rgba(0,0,0,0.12), inset 0 2px 10px rgba(255,255,255,1)', border: '1px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.6)', width: '100%', height: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))', zIndex: 2 }} dangerouslySetInnerHTML={{__html: `<lottie-player src="https://assets9.lottiefiles.com/packages/lf20_bhebjzpu.json" background="transparent" speed="1" style="width: 100%; height: 100%;" loop autoplay></lottie-player>`}} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(180deg, rgba(241,245,249,0) 0%, rgba(241,245,249,1) 100%)', zIndex: 3 }} />
              </motion.div>


              {/* FLOATING CARD 1: Left Mid (Main Info & CTA) */}
              <motion.div 
                initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileHover={{ scale: 1.03, y: -5 }} transition={{ ...transitionConfig, delay: 0.1 }}
                style={{
                  position: 'absolute', left: '8%', top: '26%', width: '360px', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(30px)', borderRadius: '28px', padding: '2rem', border: '1px solid rgba(255,255,255,1)', boxShadow: '0 25px 50px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,1)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1.2rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2F80FF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{liveEvent.category}</span>
                  <ExternalLink size={18} color="#94A3B8" />
                </div>
                <div>
                  <h3 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#1A1D20', lineHeight: 1.1, marginBottom: '10px', letterSpacing: '-0.03em' }}>{liveEvent.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{liveEvent.description}</p>
                </div>
                
                {/* Status and Action Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #2F80FF 0%, #1A5BFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(47,128,255,0.4)' }}>
                      <Sparkles size={16} color="#FFF" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>Status</span>
                      <span style={{ fontSize: '0.8rem', color: '#1A1D20', fontWeight: 800 }}>{liveEvent.status}</span>
                    </div>
                  </div>
                  
                  {/* Elegant Register Button */}
                  <motion.a 
                    href={liveEvent.link || "#"}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ background: '#1A1D20', color: '#FFF', padding: '10px 20px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
                  >
                    Register
                    <ArrowRight size={14} />
                  </motion.a>
                </div>
              </motion.div>


              {/* FLOATING CARD 2: Top Right (Registration Date) */}
              <motion.div 
                initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.05 }} transition={{ ...transitionConfig, delay: 0.2 }}
                style={{
                  position: 'absolute', right: '12%', top: '2%', width: '230px', backgroundColor: '#FFFFFF', borderRadius: '28px', padding: '1.4rem', boxShadow: '0 25px 50px rgba(0,0,0,0.06), inset 0 2px 4px rgba(255,255,255,1)', border: '1px solid rgba(255,255,255,1)', zIndex: 8, display: 'flex', flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1A1D20' }}>Registration</span>
                  <div style={{ backgroundColor: '#EF4444', color: '#FFF', fontSize: '0.75rem', fontWeight: 700, padding: '6px 10px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}>Urgent</div>
                </div>
                <div style={{ width: '100%', height: '80px', borderRadius: '16px', background: 'linear-gradient(45deg, #F8FAFC 0%, #F1F5F9 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <CalendarDays size={20} color="#64748B" style={{ marginBottom: '4px' }} />
                  <span style={{ color: '#1A1D20', fontWeight: 800, fontSize: '1.2rem', zIndex: 1 }}>20 Oct 2026</span>
                </div>
              </motion.div>


              {/* FLOATING CARD 3: Bottom Right (Prize Pool) */}
              <motion.div 
                initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileHover={{ scale: 1.05 }} transition={{ ...transitionConfig, delay: 0.3 }}
                style={{
                  position: 'absolute', right: '6%', bottom: '10%', width: '280px', background: 'linear-gradient(135deg, #FF6B6B 0%, #D94B2B 100%)', borderRadius: '28px', padding: '1.6rem', boxShadow: '0 30px 60px rgba(217,75,43,0.35), inset 0 2px 10px rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.2)', zIndex: 9, display: 'flex', flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>Prize Pool</span>
                  <ArrowRight size={18} color="#FFF" />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6px', height: '60px', marginBottom: '1.5rem' }}>
                  {[20, 40, 70, 90, 100, 80, 50, 30].map((h, i) => (
                    <div key={i} style={{ width: '8px', height: `${h}%`, backgroundColor: '#FFF', borderRadius: '6px', opacity: 0.95, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 15px rgba(0,0,0,0.15)' }}>
                    <Trophy size={20} color="#D94B2B" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.1rem', color: '#FFF', fontWeight: 800 }}>₹1,00,000+</span>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)' }}>Total Rewards</span>
                  </div>
                </div>
              </motion.div>


              {/* FLOATING CARD 4: Location (Bottom Left) */}
              <motion.div 
                initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.05 }} transition={{ ...transitionConfig, delay: 0.4 }}
                style={{
                  position: 'absolute', left: '18%', bottom: '5%', backgroundColor: '#FFFFFF', borderRadius: '100px', padding: '16px 32px', boxShadow: '0 20px 40px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,1)', border: '1px solid rgba(255,255,255,1)', zIndex: 11, display: 'flex', alignItems: 'center', gap: '14px'
                }}
              >
                <div style={{ width: '40px', height: '40px', backgroundColor: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={18} color="#1A1D20" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1A1D20' }}>Hybrid Mode</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>Online + Offline</span>
                </div>
              </motion.div>


              {/* FLOATING CARD 5: Team Size (Far Right) */}
              <motion.div 
                initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileHover={{ scale: 1.05 }} transition={{ ...transitionConfig, delay: 0.5 }}
                style={{
                  position: 'absolute', right: '4%', top: '45%', backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '1.4rem', boxShadow: '0 20px 40px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,1)', border: '1px solid rgba(255,255,255,1)', zIndex: 11, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
                }}
              >
                <div style={{ padding: '12px', background: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)', borderRadius: '14px' }}>
                  <Users size={24} color="#4F46E5" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1D20' }}>1-4</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>TEAM SIZE</span>
                </div>
              </motion.div>


              {/* FLOATING CARD 6: Global Reach (Far Top Left) */}
              <motion.div 
                initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.05 }} transition={{ ...transitionConfig, delay: 0.6 }}
                style={{
                  position: 'absolute', left: '10%', top: '12%', backgroundColor: '#FFFFFF', borderRadius: '100px', padding: '12px 24px', boxShadow: '0 15px 30px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,1)', border: '1px solid rgba(255,255,255,1)', zIndex: 6, display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                <Globe size={18} color="#2F80FF" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1D20' }}>Global Scale</span>
              </motion.div>


              {/* FLOATING CARD 7: Audience Avatars (Center Right) */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.7 }}
                style={{
                  position: 'absolute', right: '18%', top: '35%', backgroundColor: '#FFFFFF', borderRadius: '100px', padding: '10px', boxShadow: '0 20px 40px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,1)', border: '1px solid rgba(255,255,255,1)', zIndex: 12, display: 'flex', alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#CBD5E1', border: '2px solid #FFF', marginLeft: i > 0 ? '-12px' : '0', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i + 10}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
                <div style={{ padding: '0 12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1A1D20' }}>500+</span>
                </div>
              </motion.div>


              {/* FLOATING CARD 8: Registrations Open (Top Center) */}
              <motion.div 
                initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.05 }} transition={{ ...transitionConfig, delay: 0.8 }}
                style={{
                  position: 'absolute', left: '38%', top: '-2%', backgroundColor: '#1A1D20', color: '#FFF', borderRadius: '100px', padding: '10px 20px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', zIndex: 15, display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                <div style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', boxShadow: '0 0 10px rgba(16,185,129,0.5)' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>REGISTRATIONS OPEN</span>
              </motion.div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Pagination Dots */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '6vw', alignItems: 'center', zIndex: 2 }}>
          {eventsData.map((_, idx) => (
            <motion.div 
              key={idx}
              animate={{ width: activeIndex === idx ? '32px' : '10px', backgroundColor: activeIndex === idx ? '#1A1D20' : 'rgba(0,0,0,0.15)' }}
              style={{ height: '10px', borderRadius: '10px', cursor: 'pointer' }}
              onClick={() => setActiveIndex(idx)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Bottom Redesigned Button */}
        <div style={{ marginTop: '3vw', zIndex: 2 }}>
          <Link href="/events" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', padding: '18px 48px', backgroundColor: '#1A1D20', color: '#FFFFFF', borderRadius: '100px', fontSize: '1.05rem', fontWeight: 600, boxShadow: '0 15px 35px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <span>Explore all Events</span>
              <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowRight size={16} color="#FFF" />
              </div>
            </motion.div>
          </Link>
        </div>

      </div>
    </section>
  );
}
