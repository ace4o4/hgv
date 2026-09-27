'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Info, Calendar, Users, Mail, Sparkles } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import { communityData } from '@/data/community';
import './navigation.css';

const getIcon = (name: string) => {
  switch(name.toLowerCase()) {
    case 'home': return <Home size={20} />;
    case 'about': return <Info size={20} />;
    case 'events': return <Calendar size={20} />;
    case 'team': return <Users size={20} />;
    case 'contact': return <Mail size={20} />;
    default: return <Sparkles size={20} />;
  }
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
              background: 'linear-gradient(145deg, rgba(16, 20, 28, 0.9), rgba(10, 12, 16, 1))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu color="#00F0FF" size={28} />
          </motion.button>

          {/* Premium Sidebar Overlay */}
          {isOpen && (
            <motion.div
              initial={{ x: '120%', opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: '120%', opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                width: '360px',
                height: 'calc(100vh - 2rem)',
                background: 'linear-gradient(145deg, rgba(16, 20, 28, 0.85), rgba(10, 12, 16, 0.98))',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '40px 16px 40px 40px',
                zIndex: 101,
                padding: '3rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(47, 128, 255, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.15)',
                overflow: 'hidden'
              }}
            >
              {/* Decorative Glows */}
              <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(47,128,255,0.2) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF', letterSpacing: '-0.03em' }}>
                  HGV<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ color: '#00F0FF' }}>_</motion.span>
                </span>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', padding: '0.6rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}
                >
                  <X color="#E2E8F0" size={20} />
                </motion.button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 2 }}>
                {navigationData.desktop.map((link) => (
                  <motion.div key={link.name} whileHover={{ x: 10, scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontSize: '1.1rem', 
                        fontWeight: 600, 
                        color: '#E2E8F0', 
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        padding: '1.2rem 1.5rem',
                        borderRadius: '24px 8px 24px 24px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#00F0FF';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#E2E8F0';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <span style={{ opacity: 0.7 }}>{getIcon(link.name)}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 2 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href={`/events/${communityData.currentEventSlug}`}
                    onClick={() => setIsOpen(false)}
                    style={{ padding: '1rem', display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '24px 8px 24px 24px', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', textDecoration: 'none', fontWeight: 600 }}
                  >
                    AHGV BUILDVERSE 2026
                  </Link>
                </motion.div>
                <motion.a 
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(147, 51, 234, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  href={communityData.whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ padding: '1rem', display: 'block', textAlign: 'center', background: 'linear-gradient(135deg, #3B82F6, #9333EA)', borderRadius: '24px 8px 24px 24px', color: '#FFF', textDecoration: 'none', fontWeight: 700 }}
                >
                  Join Community
                </motion.a>
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
                background: 'rgba(0,0,0,0.6)',
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
