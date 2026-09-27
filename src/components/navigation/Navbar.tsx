'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowRight } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import { communityData } from '@/data/community';
import './navigation.css';

import { Home, Info, Calendar, Users, Mail } from 'lucide-react';

const LottieIcon = ({ name, isHovered, isActive }: { name: string, isHovered: boolean, isActive: boolean }) => {
  let IconCmp = Home;
  if (name.toLowerCase() === 'about') IconCmp = Info;
  if (name.toLowerCase() === 'events') IconCmp = Calendar;
  if (name.toLowerCase() === 'team') IconCmp = Users;
  if (name.toLowerCase() === 'contact') IconCmp = Mail;

  return (
    <motion.div 
      variants={{
        initial: { width: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5, marginRight: isActive ? '1.5rem' : 0 },
        hover: { width: 'auto', opacity: 1, scale: 1, marginRight: '1.5rem' }
      }}
      style={{ overflow: 'visible', display: 'flex', alignItems: 'center' }}
    >
      <motion.div
        animate={isHovered ? {
          y: [-3, 3, -3],
          rotate: [0, -10, 10, -5, 0],
          scale: [1, 1.1, 1],
          filter: ['drop-shadow(0 0 5px rgba(47,128,255,0.8))', 'drop-shadow(0 0 20px rgba(147,51,234,0.9))', 'drop-shadow(0 0 5px rgba(47,128,255,0.8))']
        } : {
          filter: isActive ? 'drop-shadow(0 0 10px rgba(47,128,255,0.5))' : 'none'
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ color: '#1A1D20' }}
      >
        <IconCmp size={32} strokeWidth={2.5} />
      </motion.div>
    </motion.div>
  );
};

// Animated Menu Item with Roll-up effect
const MenuItem = ({ name, href, isActive, onClick }: { name: string, href: string, isActive: boolean, onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial="initial" 
      whileHover="hover" 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '2.5rem', overflow: 'visible', width: 'fit-content' }}
    >
      <Link href={href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', position: 'relative' }}>
        
        {/* Dynamic Lottie-Style Illustration */}
        <LottieIcon name={name} isHovered={isHovered} isActive={isActive} />

        {/* Text Roll Up Container */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '4rem', paddingRight: '1rem' }}>
          {/* Main Text */}
          <motion.div 
            variants={{
              initial: { y: 0 },
              hover: { y: '-100%' }
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '3.5rem', fontWeight: 800, color: '#1A1D20', opacity: (isActive || isHovered) ? 1 : 0.3, lineHeight: '4rem', letterSpacing: '-0.02em', transition: 'opacity 0.3s' }}
          >
            {name}
          </motion.div>
          {/* Hover Text (Rolls up from below) */}
          <motion.div 
            variants={{
              initial: { y: '100%', position: 'absolute', top: 0, left: 0 },
              hover: { y: 0, position: 'absolute', top: 0, left: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '3.5rem', fontWeight: 800, color: '#1A1D20', opacity: 1, lineHeight: '4rem', letterSpacing: '-0.02em' }}
          >
            {name}
          </motion.div>
        </div>

        {/* Premium Glowing S-Curve Underline */}
        <motion.div 
          variants={{
            initial: { opacity: isActive ? 1 : 0 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            bottom: -10,
            left: isActive ? '4.5rem' : 0, // Offset for the icon if active
            right: 0,
            height: '18px',
            overflow: 'visible',
            filter: 'drop-shadow(0 4px 12px rgba(147,51,234,0.8)) drop-shadow(0 0 20px rgba(47,128,255,0.6))'
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 18" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="gradientPremiumFlow" x1="0%" y1="0%" x2="200%" y2="0%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="33%" stopColor="#9333EA" />
                <stop offset="66%" stopColor="#FF0055" />
                <stop offset="100%" stopColor="#00F0FF" />
                <animate attributeName="x1" values="0%; -100%" dur="2s" repeatCount="indefinite" />
                <animate attributeName="x2" values="200%; 100%" dur="2s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <motion.path 
              d="M0,9 Q25,18 50,9 T100,9" 
              fill="none" 
              stroke="url(#gradientPremiumFlow)" 
              strokeWidth="5" 
              strokeLinecap="round"
              variants={{
                initial: { pathLength: isActive ? 1 : 0 },
                hover: { pathLength: 1 }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > window.innerHeight * 0.8);

      if (currentScrollY <= 40) {
        // Near the top: always show
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down: slide up & hide
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up: slide down & show
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    handleScroll();
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // When drawer is open, keep navbar visible
  const isNavbarVisible = visible || isOpen;

  // Show toggle globally, or if scrolled past hero, or ALWAYS if on mobile
  const shouldShow = pathname !== '/' || scrolled || isMobile;

  return (
    <AnimatePresence>
      {shouldShow && (
        <>
          {/* ── Logo lockup — top left ── */}
          <motion.div
            className="fixed-logo-lockup"
            initial={{ opacity: 0, y: -40 }}
            animate={{ 
              opacity: isNavbarVisible ? 1 : 0, 
              y: isNavbarVisible ? 0 : -80,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '1.4rem',
              left: '1.8rem',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              pointerEvents: isNavbarVisible ? 'auto' : 'none',
            }}
          >
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{
                width: 40, height: 40,
                borderRadius: 12,
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
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1rem',
                fontWeight: 800,
                color: '#0A0C10',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                userSelect: 'none',
              }}>
                HackGyanVerse
              </span>
            </Link>
          </motion.div>
          {/* Floating Toggle Button */}
          <motion.button
            className="floating-menu-btn"
            initial={{ scale: 0, opacity: 0, y: -40 }}
            animate={{ 
              scale: isNavbarVisible ? 1 : 0.85, 
              opacity: isNavbarVisible ? 1 : 0,
              y: isNavbarVisible ? 0 : -80,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed',
              top: '1.4rem',
              right: '1.8rem',
              zIndex: 100,
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              pointerEvents: isNavbarVisible ? 'auto' : 'none',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu color="#333" size={26} />
          </motion.button>

          {/* Premium Light Sidebar Overlay */}
          {isOpen && (
            <motion.div
              initial={{ x: '120%', opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: '120%', opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                width: 'calc(100vw - 2rem)',
                maxWidth: '400px',
                height: 'calc(100vh - 2rem)',
                background: '#FFFFFF',
                borderRadius: '40px',
                zIndex: 101,
                padding: '2.5rem 2rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {/* Header Top Row: Logo Centered Mid-Top with Close Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '1.2rem', position: 'relative' }}>
                <div style={{ width: '36px' }} /> {/* Spacer to keep logo centered */}

                {/* Center / Mid-Top Logo (2x size) */}
                <Link href="/" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                  <Image
                    src="/logos/hgv.png"
                    alt="HackGyanVerse Logo"
                    width={112}
                    height={112}
                    style={{ objectFit: 'contain', width: '112px', height: '112px' }}
                    priority
                  />
                </Link>

                {/* Header Close Button */}
                <button 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', width: '36px' }}
                >
                  <div style={{ width: '28px', height: '3px', backgroundColor: '#333', borderRadius: '2px' }} />
                </button>
              </div>

              {/* Main Animated Links */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: '0.5rem' }}>
                {navigationData.desktop.map((link) => (
                  <MenuItem 
                    key={link.name} 
                    name={link.name} 
                    href={link.href} 
                    isActive={pathname === link.href} 
                    onClick={() => setIsOpen(false)} 
                  />
                ))}
              </div>

              {/* Bottom Actions & Social */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto', paddingTop: '1.2rem' }}>
                {/* Highlighted Primary Join Community Button */}
                <motion.a 
                  href={communityData.whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    padding: '0.9rem 1.6rem', 
                    backgroundColor: '#2F80FF', 
                    borderRadius: '100px', 
                    fontSize: '1rem', 
                    fontWeight: 700, 
                    color: '#FFFFFF', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    boxShadow: '0 8px 24px rgba(47, 128, 255, 0.35)',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>Join Community</span>
                  <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
                </motion.a>

                {/* Subtler Events Button + Black Social Logos */}
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  <Link 
                    href="/events" 
                    onClick={() => setIsOpen(false)} 
                    style={{ 
                      flex: 1,
                      padding: '0.8rem 1.4rem', 
                      backgroundColor: '#F3F4F6', 
                      borderRadius: '100px', 
                      fontSize: '0.95rem', 
                      fontWeight: 600, 
                      color: '#1A1D20', 
                      textDecoration: 'none',
                      textAlign: 'center',
                      border: '1px solid rgba(0,0,0,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    Events
                  </Link>
                  
                  {/* Instagram Logo (Real SVG in Black) */}
                  <a 
                    href={communityData.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                    style={{ 
                      width: '44px', 
                      height: '44px', 
                      backgroundColor: '#F3F4F6', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      textDecoration: 'none',
                      flexShrink: 0,
                      border: '1px solid rgba(0,0,0,0.06)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>

                  {/* LinkedIn Logo (Real SVG in Black) */}
                  <a 
                    href={communityData.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    style={{ 
                      width: '44px', 
                      height: '44px', 
                      backgroundColor: '#F3F4F6', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      textDecoration: 'none',
                      flexShrink: 0,
                      border: '1px solid rgba(0,0,0,0.06)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Backdrop for Sidebar */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(4px)',
                zIndex: 100
              }}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
