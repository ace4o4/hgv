'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowRight } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import { communityData } from '@/data/community';
import './navigation.css';

// Animated Menu Item with Roll-up effect
const MenuItem = ({ name, href, isActive, onClick }: { name: string, href: string, isActive: boolean, onClick: () => void }) => {
  return (
    <motion.div 
      initial="initial" 
      whileHover="hover" 
      onClick={onClick}
      style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '2rem', overflow: 'hidden', width: 'fit-content' }}
    >
      <Link href={href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', position: 'relative' }}>
        
        {/* Active Arrow */}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ width: 0, opacity: 0, marginRight: 0 }} 
              animate={{ width: 'auto', opacity: 1, marginRight: '1rem' }} 
              exit={{ width: 0, opacity: 0, marginRight: 0 }}
              style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}
            >
              <ArrowRight size={36} color="#333" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Roll Up Container */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '4rem', paddingRight: '1rem' }}>
          {/* Main Text */}
          <motion.div 
            variants={{
              initial: { y: 0 },
              hover: { y: '-100%' }
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '3.5rem', fontWeight: 700, color: '#333', lineHeight: '4rem' }}
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
            style={{ fontSize: '3.5rem', fontWeight: 700, color: '#333', lineHeight: '4rem' }}
          >
            {name}
          </motion.div>
        </div>

        {/* Animated Squiggly S-Curve Underline */}
        <motion.div 
          variants={{
            initial: { opacity: isActive ? 1 : 0 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            bottom: -6,
            left: isActive ? '3.5rem' : 0,
            right: 0,
            height: '12px',
            overflow: 'visible',
            filter: 'drop-shadow(0 0 6px rgba(47, 128, 255, 0.6))'
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 12" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="gradientFlow" x1="0%" y1="0%" x2="200%" y2="0%">
                <stop offset="0%" stopColor="#2F80FF" />
                <stop offset="50%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#2F80FF" />
                <animate attributeName="x1" values="0%; -100%" dur="3s" repeatCount="indefinite" />
                <animate attributeName="x2" values="200%; 100%" dur="3s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <motion.path 
              d="M0,6 Q25,12 50,6 T100,6" 
              fill="none" 
              stroke="url(#gradientFlow)" 
              strokeWidth="4" 
              strokeLinecap="round"
              variants={{
                initial: { pathLength: isActive ? 1 : 0 },
                hover: { pathLength: 1 }
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only hide completely if on homepage and NOT scrolled past hero
  const shouldShow = pathname !== '/' || scrolled;

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
                width: '400px',
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
