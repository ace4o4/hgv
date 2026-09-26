'use client';

import { communityData } from '@/data/community';
import { navigationData } from '@/data/navigation';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

// Mini Interactive Toggle Component for inline text
const MiniToggle = () => {
  const [isOn, setIsOn] = useState(true);
  return (
    <div 
      onClick={() => setIsOn(!isOn)}
      style={{ display: 'inline-flex', verticalAlign: 'middle', width: '3.5vw', height: '1.8vw', borderRadius: '100px', backgroundColor: isOn ? '#10B981' : '#E2E8F0', padding: '0.2vw', cursor: 'pointer', transition: 'background-color 0.3s', margin: '0 0.8vw 0.5vw 0.8vw' }}
    >
      <motion.div 
        animate={{ x: isOn ? '1.7vw' : '0vw' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ width: '1.4vw', height: '1.4vw', backgroundColor: '#FFF', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
      />
    </div>
  );
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      <div style={{
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
      }}>
        
        {/* --- TOP NAVIGATION --- */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2vw 4vw' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#2F80FF', borderRadius: '50%' }} />
              <div style={{ width: '8px', height: '8px', backgroundColor: '#1A1D20', borderRadius: '50%' }} />
              <div style={{ width: '8px', height: '8px', backgroundColor: '#1A1D20', borderRadius: '50%' }} />
              <div style={{ width: '8px', height: '8px', backgroundColor: '#1A1D20', borderRadius: '50%' }} />
            </div>
            <span style={{ fontSize: '1.4vw', fontWeight: 800, letterSpacing: '-0.02em', color: '#1A1D20' }}>HackGyanVerse</span>
          </div>

          {/* Links Center */}
          <div style={{ display: 'flex', gap: '3vw', alignItems: 'center' }}>
            {navigationData.desktop.map(link => (
              <div key={link.name} style={{ display: 'flex', alignItems: 'center', gap: '0.3vw', cursor: 'pointer' }}>
                <Link href={link.href} style={{ fontSize: '0.9vw', fontWeight: 600, color: '#1A1D20', textDecoration: 'none' }}>
                  {link.name}
                </Link>
                {/* Simulated dropdown arrow for some links if needed, matching the image */}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', gap: '1.5vw', alignItems: 'center' }}>
            <a href="#" style={{ fontSize: '0.9vw', fontWeight: 700, color: '#1A1D20', textDecoration: 'none' }}>Log in</a>
            <a href={communityData.whatsappLink} style={{ padding: '0.6vw 1.5vw', backgroundColor: '#2F80FF', borderRadius: '100px', fontSize: '0.9vw', fontWeight: 600, color: '#FFF', textDecoration: 'none' }}>
              Join us
            </a>
          </div>
        </nav>

        {/* --- MAIN HERO CONTENT --- */}
        <div style={{ flex: 1, display: 'flex', padding: '0 4vw 3vw 4vw', gap: '4vw' }}>
          
          {/* LEFT SIDE: TEXT CONTENT */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 6rem)', fontWeight: 500, color: '#1A1D20', lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: '1vw' }}>
              
              {/* Interactive Mini Toggle */}
              <MiniToggle />
              
              Empowering 
              <br />
              
              {/* Code Brackets Badge */}
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-flex', verticalAlign: 'middle', width: '2.5vw', height: '2.5vw', borderRadius: '8px', backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', margin: '0 0.8vw 0.5vw 0.8vw', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '1.2vw', fontWeight: 800, color: '#2F80FF' }}>{`</>`}</span>
              </motion.div>

              your journey from 
              <br />
              classroom to 
              
              {/* Inline Button "Community" */}
              <motion.div whileHover={{ scale: 1.05 }} animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5vw', padding: '0.5vw 1vw', border: '1px solid #1A1D20', borderRadius: '100px', fontSize: '1vw', verticalAlign: 'middle', margin: '0 1vw 0.5vw 1vw', cursor: 'pointer', backgroundColor: '#FFF' }}>
                <Play size={12} fill="#1A1D20" /> Community
              </motion.div>
              
              <br />
              tech career

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
            
            {/* Buttons Row */}
            <div style={{ marginTop: '2vw', display: 'flex', alignItems: 'center', gap: '2vw' }}>
              <a href={communityData.whatsappLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5vw', padding: '1vw 2vw', backgroundColor: '#2F80FF', color: '#FFF', borderRadius: '100px', fontSize: '1vw', fontWeight: 600, textDecoration: 'none' }}>
                Join community <ArrowUpRight size={16} />
              </a>
              <a href="#" style={{ fontSize: '1vw', fontWeight: 600, color: '#1A1D20', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                Live events
              </a>
            </div>

            {/* Bottom Left Paragraph & Logos */}
            <div style={{ marginTop: 'auto', paddingBottom: '1vw' }}>
              <p style={{ fontSize: '0.9vw', color: '#1A1D20', fontWeight: 500, maxWidth: '80%', lineHeight: 1.5, marginBottom: '2vw' }}>
                HackGyanVerse collaborates with professional-led organizations to foster the creation of innovative tech businesses.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5vw' }}>
                <span style={{ fontSize: '1.2vw', fontWeight: 800, color: '#1A1D20', display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                  <div style={{ width: '1vw', height: '1vw', backgroundColor: '#2F80FF', borderRadius: '4px' }} /> HGV Community
                </span>
                <span style={{ fontSize: '1.2vw', fontWeight: 800, color: '#1A1D20', letterSpacing: '1px' }}>AVORITE</span>
                <span style={{ fontSize: '1.2vw', fontWeight: 600, color: '#1A1D20', display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                   Unstop
                </span>
                <span style={{ fontSize: '1.2vw', fontWeight: 900, color: '#1A1D20', fontStyle: 'italic' }}>Work2Hire</span>
              </div>
            </div>
            
          </div>

          {/* RIGHT SIDE: BENTO GRID COMPOSITION */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1.5vw' }}>
            
            {/* Top Card (Full width) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              style={{ flex: '1.2', backgroundColor: '#2F80FF', borderRadius: '32px', padding: '3vw', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <h2 style={{ fontSize: '2.8vw', fontWeight: 500, color: '#FFF', lineHeight: 1.1, maxWidth: '80%', position: 'relative', zIndex: 2 }}>
                Build real-world projects and accelerate your tech career.
              </h2>
              
              <p style={{ fontSize: '0.9vw', color: 'rgba(255,255,255,0.8)', fontWeight: 500, maxWidth: '40%', position: 'relative', zIndex: 2 }}>
                Join a vibrant ecosystem of student developers, mentors, and open-source contributors.
              </p>

              {/* 3D Glass Sphere Mock */}
              <div style={{ position: 'absolute', right: '5%', top: '10%', width: '18vw', height: '18vw', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.1) 40%, transparent 80%)', boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.1), inset 10px 10px 40px rgba(255,255,255,0.5)', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))', mixBlendMode: 'overlay', zIndex: 1 }} />
              
              <div style={{ position: 'absolute', bottom: '2vw', right: '2vw', width: '3.5vw', height: '3.5vw', backgroundColor: '#FFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                <ArrowUpRight size={24} color="#1A1D20" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Bottom Row */}
            <div style={{ flex: '1', display: 'flex', gap: '1.5vw' }}>
              
              {/* Bottom Left Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                style={{ flex: '1', backgroundColor: '#1A1D20', borderRadius: '32px', padding: '2vw', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* 3D Sphere BG */}
                <div style={{ position: 'absolute', right: '-10%', top: '-10%', width: '15vw', height: '15vw', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(47,128,255,0.4), transparent 70%)', mixBlendMode: 'screen' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'auto', position: 'relative', zIndex: 2 }}>
                  <div style={{ padding: '0.4vw 1vw', backgroundColor: '#FFF', borderRadius: '100px', fontSize: '0.8vw', fontWeight: 700, color: '#1A1D20' }}>
                    campuses
                  </div>
                  <div style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#FFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight size={18} color="#1A1D20" strokeWidth={2.5} />
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: '2vw' }}>
                  <h3 style={{ fontSize: '1.8vw', fontWeight: 500, color: '#FFF', lineHeight: 1.1, marginBottom: '1vw' }}>
                    Active Student<br/>Chapters
                  </h3>
                  <p style={{ fontSize: '0.8vw', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                    Collaborating across campuses to build the next generation of tech leaders.
                  </p>
                </div>
              </motion.div>

              {/* Bottom Right Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                style={{ flex: '1', backgroundColor: '#EFF6FF', borderRadius: '32px', padding: '2vw', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Abstract shape BG */}
                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '100%', height: '60%', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(47,128,255,0.05) 10px, rgba(47,128,255,0.05) 20px)', zIndex: 1 }} />
                <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '15vw', height: '15vw', borderRadius: '50%', backgroundColor: 'rgba(47,128,255,0.1)', filter: 'blur(20px)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'auto', position: 'relative', zIndex: 2 }}>
                  <div style={{ padding: '0.4vw 1vw', backgroundColor: '#FFF', borderRadius: '100px', fontSize: '0.8vw', fontWeight: 700, color: '#1A1D20', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    members
                  </div>
                  <div style={{ display: 'flex' }}>
                    {[1,2,3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} style={{ width: '2vw', height: '2vw', borderRadius: '50%', border: '2px solid #EFF6FF', marginLeft: i > 1 ? '-0.8vw' : '0', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} alt="Avatar" />
                    ))}
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: '2vw' }}>
                  <h3 style={{ fontSize: '4vw', fontWeight: 500, color: '#1A1D20', lineHeight: 1, marginBottom: '0.5vw' }}>
                    5K+
                  </h3>
                  <p style={{ fontSize: '0.8vw', color: '#64748B', fontWeight: 500, lineHeight: 1.4 }}>
                    Active members learning, building, and growing together in our community.
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
