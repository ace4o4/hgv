'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    handleScroll();
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Show toggle globally, or if scrolled past hero, or ALWAYS if on mobile
  const shouldShow = pathname !== '/' || scrolled || isMobile;

  return (
    <AnimatePresence>
      {shouldShow && (
        <>
          {/* Floating Toggle Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed',
              top: '2rem',
              right: '2rem',
              zIndex: 100,
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu color="#333" size={28} />
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
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {/* Header Close Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem' }}>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                >
                  <div style={{ width: '28px', height: '3px', backgroundColor: '#333', borderRadius: '2px' }} />
                </button>
              </div>

              {/* Main Animated Links */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: '2rem' }}>
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

              {/* Footer Pills */}
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginTop: 'auto' }}>
                <a href={communityData.whatsappLink} target="_blank" rel="noopener noreferrer" style={{ padding: '0.8rem 1.5rem', backgroundColor: '#F3F4F6', borderRadius: '100px', fontSize: '1rem', fontWeight: 500, color: '#333', textDecoration: 'none' }}>
                  Community
                </a>
                <Link href={`/events/${communityData.currentEventSlug}`} onClick={() => setIsOpen(false)} style={{ padding: '0.8rem 1.5rem', backgroundColor: '#F3F4F6', borderRadius: '100px', fontSize: '1rem', fontWeight: 500, color: '#333', textDecoration: 'none' }}>
                  Events
                </Link>
                
                <div style={{ flex: 1 }} />
                
                <a href="#" style={{ width: '40px', height: '40px', backgroundColor: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#333', fontWeight: 700, fontSize: '0.9rem' }}>
                  ig
                </a>
                <a href="#" style={{ width: '40px', height: '40px', backgroundColor: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#333', fontWeight: 700, fontSize: '0.9rem' }}>
                  in
                </a>
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
