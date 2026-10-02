'use client';

import { communityData } from '@/data/community';
import { navigationData } from '@/data/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, ArrowRight, Code2, Rocket, Cpu, Sparkles, Menu, X, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

// Mini Interactive Toggle Component for inline text
const MiniToggle = () => {
  const [isOn, setIsOn] = useState(true);
  return (
    <div 
      onClick={() => setIsOn(!isOn)}
      style={{ display: 'inline-flex', verticalAlign: 'middle', width: '3vw', height: '1.5vw', borderRadius: '100px', backgroundColor: isOn ? '#2F80FF' : '#E2E8F0', padding: '0.2vw', cursor: 'pointer', transition: 'background-color 0.3s', margin: '0 0.8vw 0.5vw 0.8vw' }}
    >
      <motion.div 
        animate={{ x: isOn ? '1.5vw' : '0vw' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ width: '1.4vw', height: '1.4vw', backgroundColor: '#FFF', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
      />
    </div>
  );
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();


  useEffect(() => {
    // Basic font setup
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="hero-root-section"
      style={{
        backgroundColor: '#F1F5F9', // Light gray/blue outer background
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5vw' // Small padding to make it almost full screen
      }}
    >
      
      {/* Inner White Frame - Almost Full Screen */}
      <div 
        className="hero-inner-frame"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '94vh',
          borderRadius: '40px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 25px 50px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: "'Outfit', sans-serif",
          position: 'relative'
      }}>
        
        {/* Premium Background Morphing Orbs (Framer Motion) */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} 
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(47,128,255,0.03) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} 
          />
          <motion.div 
            animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }} 
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} 
          />
        </div>

        {/* --- TOP NAVIGATION --- */}
        <nav className="hero-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2vw 4vw', position: 'relative', zIndex: 100 }}>
          
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8vw', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(47,128,255,0.18)',
              border: '1.5px solid rgba(47,128,255,0.15)',
              background: '#fff',
            }}>
              <Image
                src="/logos/hgv-og.png"
                alt="HackGyanVerse logo"
                width={40}
                height={40}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>
            <span className="nav-logo-text" style={{ fontSize: '1.4vw', fontWeight: 800, letterSpacing: '-0.02em', color: '#1A1D20' }}>HackGyanVerse</span>
          </Link>

          {/* Links Center */}
          <div className="nav-links" style={{ display: 'flex', gap: '3vw', alignItems: 'center' }}>
            {navigationData.desktop.map(link => (
              <motion.div key={link.name} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: '0.3vw', cursor: 'pointer' }}>
                <Link href={link.href} style={{ fontSize: '0.9vw', fontWeight: 600, color: '#1A1D20', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#2F80FF'} onMouseLeave={(e) => e.currentTarget.style.color = '#1A1D20'}>
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="nav-actions" style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
            <a href={communityData.whatsappLink} className="hgv-explore-btn" style={{ padding: '0.5vw 1vw', fontSize: '0.9vw' }}>
              Join us
              <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5vw', height: '1.5vw', padding: '0.2vw' }}>
                <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"></path>
              </svg>
            </a>
            
          </div>
        </nav>

        {/* --- MAIN HERO CONTENT --- */}
        <div className="hero-content-stack" style={{ flex: 1, display: 'flex', padding: '0 4vw 3vw 4vw', gap: '4vw' }}>
          
          {/* LEFT SIDE: TEXT CONTENT */}
          <div style={{ flex: '1', minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            
            <span style={{ fontSize: '1vw', fontWeight: 700, color: '#2F80FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1vw', display: 'block' }}>HACKGYANVERSE COMMUNITY</span>
            <h1 style={{ fontSize: 'clamp(3rem, 4vw, 5.5rem)', fontWeight: 500, color: '#1A1D20', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              
              {/* Interactive Mini Toggle */}
              <MiniToggle />
              
              The Community Where Students
              
              {/* Code Brackets Badge */}
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-flex', verticalAlign: 'middle', width: '2.5vw', height: '2.5vw', borderRadius: '8px', backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', margin: '0 0.8vw 0.5vw 0.8vw', border: '1px solid #E2E8F0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '1.2vw', fontWeight: 800, color: '#2F80FF' }}>{`</>`}</span>
              </motion.div>

              Build Their Future.
              
              {/* Mini Animated Activity Graph */}
              <motion.div style={{ display: 'inline-flex', verticalAlign: 'middle', width: '4vw', height: '2vw', backgroundColor: '#1A1D20', borderRadius: '8px', margin: '0 0.8vw 0.5vw 0.8vw', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <svg width="3vw" height="1vw" viewBox="0 0 100 30">
                  <motion.path 
                    d="M0,15 L20,15 L35,0 L50,30 L65,15 L100,15"
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </svg>
              </motion.div>

            </h1>
            
            {/* Subtext Paragraph */}
            <div style={{ marginTop: '2vw', paddingBottom: '1vw' }}>
              <p style={{ fontSize: '1vw', color: '#1A1D20', fontWeight: 800, maxWidth: '80%', lineHeight: 1.4, marginBottom: '0.5vw' }}>
                Classroom to Career — Together
              </p>
              <p style={{ fontSize: '0.9vw', color: '#475569', fontWeight: 500, maxWidth: '80%', lineHeight: 1.5, marginBottom: '1vw' }}>
                A student-driven community building a bridge from classroom to career through technology, innovation, collaboration, events and real-world opportunities.
              </p>
              <p style={{ fontSize: '0.85vw', color: '#2F80FF', fontWeight: 700, maxWidth: '80%' }}>
                Learn → Build → Collaborate → Lead → Grow
              </p>
            </div>

            {/* Buttons Row */}
            <div className="hero-buttons-row" style={{ marginTop: '1vw', display: 'flex', alignItems: 'center', gap: '2vw' }}>
              <a href="https://chat.whatsapp.com/BbMMWNI2uLGCUEKXzrub30" target="_blank" rel="noopener noreferrer" className="hgv-explore-btn" style={{ padding: '0.75vw 1.5vw', fontSize: '1.2vw' }}>
                Join Our Community
                <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"></path>
                </svg>
              </a>
              <motion.div whileHover={{ scale: 1.05, color: '#2F80FF' }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block' }}>
                <Link href="/events" style={{ fontSize: '1vw', fontWeight: 600, color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '4px', display: 'inline-block' }}>
                  Explore Events
                </Link>
              </motion.div>
            </div>

            
          </div>

          {/* RIGHT SIDE: BENTO GRID COMPOSITION */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1.5vw', position: 'relative', zIndex: 10 }}>
            
            {/* Top Card (Full width) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(47, 128, 255, 0.3)' }}
              style={{ flex: '1.2', backgroundColor: '#2F80FF', borderRadius: '32px', padding: '3vw', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <h2 style={{ fontSize: '2.8vw', fontWeight: 500, color: '#FFF', lineHeight: 1.1, maxWidth: '80%', position: 'relative', zIndex: 2 }}>
                Build real-world projects and accelerate your tech career.
              </h2>
              
              <p style={{ fontSize: '0.9vw', color: 'rgba(255,255,255,0.8)', fontWeight: 500, maxWidth: '40%', position: 'relative', zIndex: 2 }}>
                Join a vibrant ecosystem of student developers, mentors, and open-source contributors.
              </p>

              {/* Premium 3D Glass Sphere Illustration (Morphing & Rotating) */}
              <motion.div 
                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', right: '5%', top: '10%', width: '18vw', height: '18vw', zIndex: 1, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))' }}
              >
                {/* Main Sphere */}
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.2) 40%, transparent 80%)', boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.1), inset 10px 10px 40px rgba(255,255,255,0.6)', mixBlendMode: 'overlay' }} />
                {/* Inner glowing core */}
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', inset: '20%', borderRadius: '50%', background: 'radial-gradient(circle, #FFF 0%, transparent 70%)', mixBlendMode: 'soft-light' }} />
                {/* Orbiting Tech Sparkle */}
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)' }}>
                  <Sparkles size={32} color="#FFF" />
                </motion.div>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.15, rotate: 15 }} whileTap={{ scale: 0.9 }} style={{ position: 'absolute', bottom: '2vw', right: '2vw', width: '3.5vw', height: '3.5vw', backgroundColor: '#FFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                <ArrowUpRight size={24} color="#1A1D20" strokeWidth={2.5} />
              </motion.div>
            </motion.div>

            {/* Bottom Row */}
            <div className="hero-bento-bottom-row" style={{ flex: '1', display: 'flex', gap: '1.5vw' }}>
              
              {/* Bottom Left Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}
                style={{ flex: '1', backgroundColor: '#1A1D20', borderRadius: '32px', padding: '2vw', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              >
                {/* 3D Sphere BG */}
                <div style={{ position: 'absolute', right: '-10%', top: '-10%', width: '15vw', height: '15vw', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(47,128,255,0.4), transparent 70%)', mixBlendMode: 'screen' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'auto', position: 'relative', zIndex: 2 }}>
                  <div style={{ padding: '0.4vw 1vw', backgroundColor: '#FFF', borderRadius: '100px', fontSize: '0.8vw', fontWeight: 700, color: '#1A1D20' }}>
                    reach
                  </div>
                  <motion.div whileHover={{ scale: 1.15, rotate: 15 }} whileTap={{ scale: 0.95 }} style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#FFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight size={18} color="#1A1D20" strokeWidth={2.5} />
                  </motion.div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: '2vw' }}>
                  <h3 style={{ fontSize: '1.8vw', fontWeight: 500, color: '#FFF', lineHeight: 1.1, marginBottom: '1vw' }}>
                    40+ College<br/>Reach
                  </h3>
                  <p style={{ fontSize: '0.8vw', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                    Connecting students across campuses through technology and innovation.
                  </p>
                </div>
              </motion.div>

              {/* Bottom Right Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(47, 128, 255, 0.15)' }}
                style={{ flex: '1', backgroundColor: '#EFF6FF', borderRadius: '32px', padding: '2vw', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              >
                {/* Abstract shape BG */}
                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '100%', height: '60%', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(47,128,255,0.05) 10px, rgba(47,128,255,0.05) 20px)', zIndex: 1 }} />
                <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '15vw', height: '15vw', borderRadius: '50%', backgroundColor: 'rgba(47,128,255,0.1)', filter: 'blur(20px)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'auto', position: 'relative', zIndex: 2 }}>
                  <div style={{ padding: '0.4vw 1vw', backgroundColor: '#FFF', borderRadius: '100px', fontSize: '0.8vw', fontWeight: 700, color: '#1A1D20', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    members
                  </div>
                  <div style={{ display: 'flex' }}>
                    {/* Replaced generic avatars with real-like or empty based on new directive, keeping empty circles to avoid AI generated people as requested, or use empty placeholders */}
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: '2vw' }}>
                  <h3 style={{ fontSize: '4vw', fontWeight: 500, color: '#1A1D20', lineHeight: 1, marginBottom: '0.5vw' }}>
                    1300+
                  </h3>
                  <p style={{ fontSize: '0.8vw', color: '#64748B', fontWeight: 500, lineHeight: 1.4 }}>
                    Community members learning, building, and growing together.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
