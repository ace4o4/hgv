'use client';

import { eventsData } from '@/data/events';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, Trophy, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, Float, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function HappyDrone() {
  const droneRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/happy_drone.glb');
  const { actions } = useAnimations(animations, droneRef);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (actions) {
      // Play all available embedded animations
      Object.values(actions).forEach(action => action?.play());
    }
  }, [actions]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (isRolling || !droneRef.current) return;
    setIsRolling(true);
    
    // Barrel roll on Z axis
    gsap.to(droneRef.current.rotation, {
      z: droneRef.current.rotation.z + Math.PI * 2,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => setIsRolling(false)
    });
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <primitive 
        ref={droneRef}
        object={scene} 
        scale={8.4} 
        position={[-0.5, -0.5, 1.2]}
        rotation={[0, -Math.PI / -7, 0]}
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      />
    </Float>
  );
}

useGLTF.preload('/models/happy_drone.glb');
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- MAGNETIC WRAPPER FOR BUTTON ---
function MagneticWrap({ children, pull = 0.4 }: any) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const xTo = gsap.quickTo(el, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(el, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * pull);
      yTo(y * pull);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pull]);

  return <div ref={ref} style={{ display: 'inline-block' }}>{children}</div>;
}

export default function FeaturedEvent() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);

  const event = eventsData.find((e) => e.slug === 'ahgv-buildverse-2026');

  useEffect(() => {
    if (!sectionRef.current) return;

    fetch('https://assets9.lottiefiles.com/packages/lf20_bhebjzpu.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(err => console.error("Error loading lottie:", err));

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500;1,600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    gsap.fromTo(marqueeRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );

    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
      }
    );

    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.fromTo(pathRef.current,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut', scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' } }
      );
    }

    gsap.fromTo(iconsRef.current,
      { opacity: 0, scale: 0, rotation: -45 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)', scrollTrigger: { trigger: sectionRef.current, start: 'top 40%' } }
    );
    
    cardsRef.current.forEach((card, i) => {
      if(!card) return;
      gsap.to(card, { y: '+=8', duration: 2.5 + (i * 0.5), yoyo: true, repeat: -1, ease: 'sine.inOut' });
    });

  }, []);

  if (!event) return null;

  const marqueeWords = ["HACKGYANVERSE", "COMMUNITY", "AHGV BUILDVERSE 2026", "INNOVATION", "COLLABORATION", "LEADERSHIP"];

  const dataPoints = [
    { num: '36', unit: 'hrs', desc: 'Non-stop building and shipping.' },
    { num: '500', unit: '+', desc: 'Hackers joining the movement.' },
    { num: '10', unit: 'Lakh', desc: 'Prize pool for your next startup.' },
    { num: '0', unit: 'Limits', desc: 'No boundaries to your imagination.' }
  ];

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '24px',
    padding: '2.5vw',
    boxShadow: '0 20px 40px rgba(100, 130, 255, 0.1), 0 5px 15px rgba(100, 130, 255, 0.05), inset 0 0 0 1px rgba(255,255,255,0.8)',
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'absolute' as const,
    zIndex: 10,
    width: '18vw', // Reduced size
    minHeight: '12vw'
  };

  const iconBoxStyle = {
    background: '#FFFFFF',
    borderRadius: '16px',
    width: '3.5vw',
    height: '3.5vw',
    boxShadow: '0 10px 20px rgba(100, 130, 255, 0.1), 0 5px 10px rgba(100, 130, 255, 0.05), inset 0 0 0 1px rgba(255,255,255,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute' as const,
    zIndex: 15
  };

  // Public Lottie URL for a cool animation (Floating abstract shapes/innovation)
  const lottieUrl = "https://assets9.lottiefiles.com/packages/lf20_bhebjzpu.json"; 

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: '#F5F5F5', 
        color: '#111',
        fontFamily: "'Outfit', sans-serif",
        minHeight: '100vh',
        width: '100vw',
        padding: '6vw 4vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Aesthetic Marquee Section (Minimal & Premium) */}
      <div ref={marqueeRef} style={{ 
        height: '90px', 
        borderTop: '1px solid rgba(0,0,0,0.15)', 
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        whiteSpace: 'nowrap',
        backgroundColor: 'rgba(255,255,255,0.3)',
        backdropFilter: 'blur(10px)',
        marginBottom: '6vw',
        zIndex: 2,
        width: '100vw',
        marginLeft: '-4vw', // counteract section padding
        overflow: 'hidden'
      }}>
        <div className="marquee-content" style={{ display: 'flex', gap: '3vw', paddingLeft: '3vw', animation: 'marquee-scroll 35s linear infinite' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '3vw' }}>
              {marqueeWords.map((word, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '3vw' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#5F646B', letterSpacing: '0.15em' }}>
                    {word}
                  </span>
                  <div style={{ width: '5px', height: '5px', backgroundColor: '#2F80FF', borderRadius: '50%', opacity: 0.6 }}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '1400px', display: 'flex', flexDirection: 'column', gap: '1.5vw' }}>
        
        {/* TOP ROW */}
        <div style={{ display: 'flex', gap: '1.5vw', flexWrap: 'wrap', position: 'relative' }}>
          
          {/* 3D Happy Drone placed in the empty center space */}
          <div style={{ position: 'absolute', top: '50%', left: '55%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', zIndex: 10, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} style={{ pointerEvents: 'auto' }}>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 5]} intensity={2} />
              <Environment preset="city" />
              <HappyDrone />
            </Canvas>
          </div>

          {/* Huge Typography Area */}
          <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ 
              fontSize: 'clamp(3rem, 6.5vw, 8rem)', 
              fontWeight: 400, 
              lineHeight: 1, 
              letterSpacing: '-0.04em',
              margin: 0,
              textTransform: 'uppercase'
            }}>
              BUILD THE <span style={{ 
                display: 'inline-block', 
                border: '2px solid #111', 
                borderRadius: '100px', 
                padding: '0 2vw', 
                fontSize: 'clamp(1.5rem, 3vw, 4rem)', 
                transform: 'translateY(-10px)'
              }}>NEXT</span>
              <br/>
              STARTUP <br/>
              WITH US.
            </h2>
          </div>

          {/* Top Right Dark Card */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            style={{ 
              flex: '1 1 30%', 
              backgroundColor: '#0F0F0F', 
              borderRadius: '40px', 
              padding: '2.5vw', 
              color: '#FFF',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '350px'
            }}
          >
            {/* Wavy background lines (SVG) */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.15, zIndex: 0 }}>
              <path d="M0,50 Q100,10 200,50 T400,50" stroke="#2F80FF" fill="none" strokeWidth="3" />
              <path d="M0,100 Q100,60 200,100 T400,100" stroke="#2F80FF" fill="none" strokeWidth="3" />
              <path d="M0,150 Q100,110 200,150 T400,150" stroke="#2F80FF" fill="none" strokeWidth="3" />
              <path d="M0,200 Q100,160 200,200 T400,200" stroke="#2F80FF" fill="none" strokeWidth="3" />
            </svg>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: '30px', padding: '0.4vw 1.2vw', fontSize: '0.9rem' }}>Prize Pool</div>
              <div style={{ fontSize: '3rem', lineHeight: 1, color: '#2F80FF' }}>✱</div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 'clamp(3rem, 4vw, 5rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '1vw' }}>10 <span style={{ fontSize: '0.5em', color: '#2F80FF' }}>Lakh</span></div>
              <p style={{ fontSize: '1rem', color: '#A0A0A0', lineHeight: 1.5, margin: 0, maxWidth: '80%' }}>
                {dataPoints[2].desc}
              </p>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM ROW */}
        <div style={{ display: 'flex', gap: '1.5vw', flexWrap: 'wrap', minHeight: '400px' }}>
          
          {/* Bottom Left Column */}
          <div style={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column', gap: '1.5vw' }}>
            
            {/* Lottie / Glass Card */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              style={{ 
                flex: 1, 
                backgroundColor: '#EBEBEB', 
                borderRadius: '40px', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                minHeight: '220px'
              }}
            >
              {/* Circular spinning text graphic */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: '-10%', left: '-10%', width: '150px', height: '150px', border: '1px dashed #999', borderRadius: '50%' }}
              />
              {/* Abstract Glass Geometric Shape to replace Lottie */}
              <motion.div 
                animate={{ rotate: -180, scale: [1, 1.05, 1] }} 
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #2F80FF 0%, rgba(47,128,255,0) 100%)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
              />
            </motion.div>

            {/* Two Small Squares */}
            <div style={{ display: 'flex', gap: '1.5vw', height: '160px' }}>
              <motion.div 
                whileHover={{ y: -5 }}
                style={{ flex: 1, backgroundColor: '#EBEBEB', borderRadius: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1vw' }}
              >
                <span style={{ fontSize: 'clamp(2rem, 3vw, 4rem)', fontWeight: 500, lineHeight: 1 }}>500+</span>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>Hackers</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                style={{ flex: 1, backgroundColor: '#0F0F0F', color: '#FFF', borderRadius: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1vw' }}
              >
                <span style={{ fontSize: 'clamp(2rem, 3vw, 4rem)', fontWeight: 500, lineHeight: 1 }}>0</span>
                <span style={{ fontSize: '0.9rem', color: '#A0A0A0' }}>Limits</span>
              </motion.div>
            </div>
          </div>
          
          {/* Bottom Right Theme Blue Card */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            style={{ 
              flex: '1 1 60%', 
              backgroundColor: '#E6EFFF', // Theme soft blue
              borderRadius: '40px', 
              padding: '3vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {/* Pill tags */}
            <div style={{ display: 'flex', gap: '0.8vw', flexWrap: 'wrap', marginBottom: '2vw' }}>
              <span style={{ backgroundColor: '#2F80FF', color: '#FFF', padding: '0.5vw 1.2vw', borderRadius: '30px', fontSize: '0.9rem' }}>36 Hours</span>
              <span style={{ border: '1px solid #2F80FF', color: '#2F80FF', padding: '0.5vw 1.2vw', borderRadius: '30px', fontSize: '0.9rem' }}>Hackathon</span>
              <span style={{ border: '1px solid #2F80FF', color: '#2F80FF', padding: '0.5vw 1.2vw', borderRadius: '30px', fontSize: '0.9rem' }}>Innovation</span>
            </div>

            <div>
              <h3 style={{ fontSize: 'clamp(3rem, 5vw, 6rem)', fontWeight: 500, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#090A0B' }}>
                Non-stop
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2vw' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', color: '#475569', maxWidth: '60%', lineHeight: 1.5, fontWeight: 500 }}>
                  {dataPoints[0].desc} Experience the future of building today. Join forces with the brightest minds and create something extraordinary.
                </p>
                {/* Large Arrow Icon */}
                <div style={{ padding: '1vw', border: '2px solid #2F80FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: '#2F80FF' }}
                     onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2F80FF'; e.currentTarget.style.color = '#FFF'; }}
                     onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2F80FF'; }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="19" x2="19" y2="5"></line>
                    <polyline points="10 5 19 5 19 14"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Redesigned Button Below Grid */}
      <div style={{ marginTop: '4vw' }}>
        <MagneticWrap pull={0.4}>
          <Link href={`/events/${event.slug}`} style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '1.2vw 3vw', 
            backgroundColor: '#090A0B', 
            color: '#FFF', 
            borderRadius: '100px', 
            fontSize: '1rem', 
            fontWeight: 600, 
            letterSpacing: '0.05em',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            EXPLORE AHGV BUILDVERSE 2026 &rarr;
          </Link>
        </MagneticWrap>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
