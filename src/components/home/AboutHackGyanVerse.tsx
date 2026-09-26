'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe, MapPin, MousePointer2, Star, Zap } from 'lucide-react';

export default function AboutHackGyanVerse() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const rotateGlobe = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Floating Parallax transforms
  const floatUp = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const floatDown = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const floatRight = useTransform(scrollYProgress, [0, 1], [-50, 150]);

  const [isToggled, setIsToggled] = useState(false);
  const [hoverTerminal, setHoverTerminal] = useState(false);

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)', rotateX: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      rotateX: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.5, filter: 'blur(15px)', y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)', 
      y: 0,
      transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] } 
    }
  };

  return (
    <section 
      ref={containerRef} 
      style={{ 
        minHeight: '130vh', 
        backgroundColor: '#F8FAFC', 
        padding: '15vw 5vw', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      
      {/* Dynamic Background Blur Shapes */}
      <motion.div style={{ position: 'absolute', top: '5%', left: '5%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(47,128,255,0.07) 0%, transparent 70%)', filter: 'blur(60px)', y: yBg, zIndex: 0 }} />
      <motion.div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', filter: 'blur(60px)', y: useTransform(scrollYProgress, [0, 1], [-150, 150]), zIndex: 0 }} />
      <motion.div style={{ position: 'absolute', top: '40%', right: '20%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)', filter: 'blur(50px)', scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2]), zIndex: 0 }} />

      {/* Floating Extra Elements */}
      <motion.div style={{ position: 'absolute', top: '25%', left: '15%', y: floatUp, zIndex: 3 }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '8px 16px', borderRadius: '100px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
          <Star size={16} fill="#F59E0B" color="#F59E0B" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1D20' }}>Next-Gen</span>
        </div>
      </motion.div>
      
      <motion.div style={{ position: 'absolute', top: '55%', left: '10%', y: floatDown, zIndex: 3, rotate: -15 }}>
        <MousePointer2 size={40} fill="#10B981" color="#FFFFFF" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 10px 15px rgba(16,185,129,0.4))' }} />
      </motion.div>

      <motion.div style={{ position: 'absolute', bottom: '35%', right: '12%', y: floatUp, zIndex: 3 }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #EC4899 0%, #E11D48 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 30px rgba(236,72,153,0.3)', color: '#FFF' }}>
          <Zap size={24} />
        </div>
      </motion.div>

      <motion.div style={{ position: 'absolute', top: '15%', right: '18%', y: floatRight, zIndex: 3, rotate: 10 }}>
        <div style={{ backgroundColor: '#0F172A', padding: '8px 16px', borderRadius: '100px', boxShadow: '0 10px 30px rgba(15,23,42,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38BDF8' }}>#BuildInPublic</span>
        </div>
      </motion.div>


      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ 
          maxWidth: '1300px', 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: '1.2vw',
          rowGap: '1.8vw',
          zIndex: 2,
          textAlign: 'center'
        }}
      >
        
        {/* LINE 1 */}
        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          WE ARE ON A
        </motion.span>
        
        {/* Interactive Element 1: Map Pin Drop */}
        <motion.div variants={shapeVariants} whileHover={{ y: -10, scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ width: 'clamp(3.2rem, 5.5vw, 5.8rem)', height: 'clamp(3.2rem, 5.5vw, 5.8rem)', borderRadius: '50%', backgroundColor: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(239,68,68,0.3)', margin: '0 0.5vw', cursor: 'pointer' }}>
          <MapPin size={32} color="#FFF" />
        </motion.div>

        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          MISSION TO
        </motion.span>
        
        <div style={{ flexBasis: '100%', height: '0' }} /> {/* Break line */}

        {/* LINE 2 */}
        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          UNITE
        </motion.span>

        {/* Interactive Element 2: Expandable Avatar Stack */}
        <motion.div variants={shapeVariants} whileHover={{ width: 'clamp(13rem, 18vw, 20rem)' }} style={{ width: 'clamp(8rem, 11vw, 13rem)', height: 'clamp(3.5rem, 5.8vw, 5.8rem)', borderRadius: '100px', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', padding: '0 12px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)', margin: '0 0.5vw' }}>
          <div style={{ display: 'flex', zIndex: 2 }}>
            {[1, 2, 3, 4].map((_, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} style={{ width: 'clamp(2.2rem, 3.8vw, 3.8rem)', height: 'clamp(2.2rem, 3.8vw, 3.8rem)', borderRadius: '50%', backgroundColor: '#CBD5E1', border: '3px solid #FFF', marginLeft: i > 0 ? '-12px' : '0', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i + 20}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2F80FF', marginLeft: '12px', whiteSpace: 'nowrap' }}>+10K Devs</span>
        </motion.div>

        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          THE MOST
        </motion.span>

        <div style={{ flexBasis: '100%', height: '0' }} /> {/* Break line */}

        {/* LINE 3 */}
        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          AMBITIOUS
        </motion.span>

        {/* Interactive Element 3: Animated Gradient Button */}
        <motion.a variants={shapeVariants} href="#events" whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(139,92,246,0.5)' }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 'clamp(3.5rem, 5.8vw, 5.8rem)', padding: '0 clamp(1.8rem, 3.5vw, 3.5rem)', borderRadius: '100px', background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)', color: '#FFF', fontSize: 'clamp(1.3rem, 2.2vw, 2.5rem)', fontWeight: 800, textDecoration: 'none', boxShadow: '0 15px 35px rgba(139,92,246,0.3)', cursor: 'pointer', margin: '0 0.5vw' }}>
          BUILDERS <Sparkles size={24} color="#FFF" style={{ marginLeft: '10px' }} />
        </motion.a>

        <div style={{ flexBasis: '100%', height: '0' }} /> {/* Break line */}

        {/* LINE 4 */}
        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          FROM
        </motion.span>

        {/* Interactive Element 4: Terminal Window */}
        <motion.div variants={shapeVariants} onMouseEnter={() => setHoverTerminal(true)} onMouseLeave={() => setHoverTerminal(false)} whileHover={{ y: -5 }} style={{ width: 'clamp(9rem, 14vw, 16rem)', height: 'clamp(3.5rem, 5.8vw, 5.8rem)', borderRadius: '16px', backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', padding: '10px 15px', position: 'relative', overflow: 'hidden', cursor: 'text', margin: '0 0.5vw', boxShadow: '0 20px 40px rgba(15,23,42,0.4)' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          </div>
          <div style={{ color: '#10B981', fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            ~$ {hoverTerminal ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>npm start</motion.span> : <span style={{ opacity: 0 }}>_</span>}
            <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ width: '6px', height: '14px', backgroundColor: '#10B981', marginLeft: '4px' }} />
          </div>
        </motion.div>

        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          HACKATHONS TO
        </motion.span>

        <div style={{ flexBasis: '100%', height: '0' }} /> {/* Break line */}

        {/* LINE 5 */}
        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          GLOBAL
        </motion.span>

        {/* Interactive Element 5: Spinning Globe */}
        <motion.div variants={shapeVariants} style={{ width: 'clamp(3.5rem, 5.8vw, 5.8rem)', height: 'clamp(3.5rem, 5.8vw, 5.8rem)', margin: '0 0.5vw', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px dashed #3B82F6', rotate: rotateGlobe }} />
          <div style={{ width: '80%', height: '80%', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 4px 10px rgba(59,130,246,0.2)' }}>
            <Globe size={28} color="#3B82F6" />
          </div>
        </motion.div>

        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          STARTUPS, WE
        </motion.span>

        <div style={{ flexBasis: '100%', height: '0' }} /> {/* Break line */}

        {/* LINE 6 */}
        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          GIVE YOU THE
        </motion.span>

        {/* Interactive Element 6: Toggle Switch */}
        <motion.div variants={shapeVariants} onClick={() => setIsToggled(!isToggled)} style={{ display: 'flex', alignItems: 'center', padding: '6px', height: 'clamp(3.5rem, 5.8vw, 5.8rem)', width: 'clamp(12rem, 16vw, 18rem)', backgroundColor: isToggled ? '#1A1D20' : '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '100px', margin: '0 0.5vw', cursor: 'pointer', position: 'relative', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', transition: 'background-color 0.4s' }}>
          <motion.div animate={{ x: isToggled ? '100%' : '0%' }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} style={{ width: '50%', height: '100%', backgroundColor: isToggled ? '#FFFFFF' : '#10B981', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', zIndex: 2 }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isToggled ? '#1A1D20' : '#FFF' }}>{isToggled ? 'NETWORK' : 'TOOLS'}</span>
          </motion.div>
          <div style={{ position: 'absolute', right: '15%', zIndex: 1 }}>
             <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isToggled ? '#FFF' : '#94A3B8' }}>{isToggled ? '' : 'NETWORK'}</span>
          </div>
          <div style={{ position: 'absolute', left: '15%', zIndex: 1 }}>
             <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isToggled ? '#94A3B8' : '#FFF' }}>{isToggled ? 'TOOLS' : ''}</span>
          </div>
        </motion.div>

        <div style={{ flexBasis: '100%', height: '0' }} /> {/* Break line */}

        {/* LINE 7 */}
        <motion.span variants={wordVariants} style={{ fontSize: 'clamp(2.2rem, 5vw, 5.8rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          TO BUILD THE
        </motion.span>

        {/* Interactive Element 7: Glowing Neon Pill */}
        <motion.div variants={shapeVariants} whileHover={{ scale: 1.05 }} animate={{ boxShadow: ['0 0 20px rgba(59,130,246,0.4)', '0 0 50px rgba(59,130,246,0.8)', '0 0 20px rgba(59,130,246,0.4)'] }} transition={{ duration: 2, repeat: Infinity }} style={{ height: 'clamp(3.5rem, 5.8vw, 5.8rem)', padding: '0 clamp(1.5rem, 3vw, 3rem)', borderRadius: '100px', background: 'linear-gradient(90deg, #2563EB 0%, #06B6D4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0.5vw', cursor: 'pointer' }}>
          <span style={{ color: '#FFF', fontSize: 'clamp(1.3rem, 2.2vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>FUTURE.</span>
        </motion.div>

      </motion.div>

      {/* Interactive Subtext Paragraph */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginTop: '8vw', maxWidth: '700px', textAlign: 'center', zIndex: 2 }}
      >
        <p style={{ fontSize: '1.2rem', color: '#64748B', lineHeight: 1.7 }}>
          Join the most active ecosystem of makers, creators, and innovators. We provide the platform, you bring the vision. Dive into the HackGyanVerse today. 🌟
        </p>
        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', marginTop: '2.5rem' }}>
          <motion.a href="#events" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} style={{ padding: '16px 36px', backgroundColor: '#1A1D20', color: '#FFF', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 15px 30px rgba(0,0,0,0.15)', textDecoration: 'none' }}>
            Start Building
          </motion.a>
          <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} style={{ padding: '16px 36px', backgroundColor: 'transparent', color: '#1A1D20', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 600, border: '2px solid rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'border-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1A1D20'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}>
            View Community
          </motion.button>
        </div>
      </motion.div>

    </section>
  );
}
