'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { communityData } from '@/data/community';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowUpRight, Plus, Activity } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- 3D Background Abstract Object ---
function AbstractBackgroundShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      {/* Reduced scale and shifted to the right so it acts as an accent rather than covering everything */}
      <mesh ref={meshRef} scale={1.4} position={[1.5, 0.5, -1]}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial 
          color="#1A4A7C" // Rich, jewel-like premium blue
          envMapIntensity={2.5} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={1} 
          roughness={0.05} 
          distort={0.3} 
          speed={1.5} 
        />
      </mesh>
    </Float>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.fromTo(contentRef.current, 
      { y: '-15%' }, 
      { 
        y: '0%', 
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', 
          end: 'top top',      
          scrub: true
        }
      }
    );

    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        }
      }
    );

  }, []);

  // Premium Glassmorphic styling base with micro-borders
  const glassStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255,255,255,0.05)',
    borderRadius: '24px',
    padding: '2.5vw',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s ease'
  };

  const pillStyle = {
    padding: '0.4vw 0.8vw',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    color: '#819CB6',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  };

  return (
    <section 
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#080A0C', // Very rich, deep premium dark background
        color: '#FFFFFF',
        fontFamily: "'Outfit', sans-serif",
        zIndex: 5, 
        overflow: 'hidden'
      }}
    >
      {/* 3D Background Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.9 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 5, 2]} intensity={2.5} color="#FFF" />
          <directionalLight position={[-2, -5, -2]} intensity={1} color="#2F80FF" />
          <AbstractBackgroundShape />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Very faint grid overlay for the premium technical look */}
      <div style={{ 
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div 
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: '10vw',
          paddingBottom: '10vw',
          willChange: 'transform'
        }}
      >
        <div style={{ 
          maxWidth: '1440px', 
          margin: '0 auto', 
          padding: '0 4vw',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.2vw',
          alignItems: 'stretch'
        }}>
          
          {/* TITLE CARD (Spans 2 columns) */}
          <div 
            ref={el => { cardsRef.current[0] = el; }}
            style={{ ...glassStyle, gridColumn: 'span 2', justifyContent: 'center', background: 'rgba(255,255,255,0.01)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1vw', marginBottom: '2vw' }}>
              <div style={pillStyle}>
                Discover new opportunities
              </div>
              <div style={pillStyle}>
                System Core
              </div>
            </div>
            
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 7.5rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: '1.5vw' }}>
              COMMUNITY<br/>
              <span style={{ color: '#2F80FF', fontStyle: 'italic', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>ENGINE.</span>
            </h2>
            
            <div style={{ width: '100%', height: '1px', backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.2) 50%, transparent 50%)', backgroundSize: '10px 1px', margin: '1vw 0' }}></div>
            
            <p style={{ color: '#819CB6', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '80%' }}>
              We build the infrastructure for the next generation of creators, developers, and visionaries to thrive in an interconnected ecosystem.
            </p>

            <div style={{ position: 'absolute', bottom: '2.5vw', right: '2.5vw', width: '4vw', height: '4vw', backgroundColor: '#1A1D20', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={20} color="#FFF" />
            </div>
          </div>

          {/* ITEM 1 - Innovation (Micro Chart) */}
          <div 
            ref={el => { cardsRef.current[1] = el; }}
            style={{ ...glassStyle, gridColumn: 'span 1' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2vw' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>{communityData.whatWeDo[0].title}</span>
              <Activity size={18} color="#2F80FF" />
            </div>
            <p style={{ fontSize: '0.95rem', color: '#819CB6', lineHeight: 1.6, marginBottom: '2vw' }}>{communityData.whatWeDo[0].description}</p>
            
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5vw' }}>
                <span style={{ fontSize: '0.8rem', color: '#5F646B' }}>Execution</span>
                <span style={{ fontSize: '0.8rem', color: '#FFF', fontWeight: 600 }}>90%</span>
              </div>
              <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '90%', height: '100%', backgroundColor: '#2F80FF', borderRadius: '2px' }} />
              </div>
            </div>
          </div>

          {/* ITEM 2 - Hackathons (Mini Calendar UI) */}
          <div 
            ref={el => { cardsRef.current[2] = el; }}
            style={{ ...glassStyle, gridColumn: 'span 1' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
          >
            <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5vw' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            </div>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', display: 'block', marginBottom: '0.5vw' }}>{communityData.whatWeDo[1].title}</span>
            <p style={{ fontSize: '0.95rem', color: '#819CB6', lineHeight: 1.6 }}>{communityData.whatWeDo[1].description}</p>
            
            <div style={{ display: 'flex', gap: '0.5vw', marginTop: 'auto', paddingTop: '2vw' }}>
              {[1, 2, 3, 4, 5].map(day => (
                <div key={day} style={{ flex: 1, height: '2vw', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: day === 3 ? '#1A1D20' : '#819CB6', backgroundColor: day === 3 ? '#FFF' : 'transparent', fontWeight: day === 3 ? 700 : 400 }}>
                  {day + 10}
                </div>
              ))}
            </div>
          </div>

          {/* ITEM 3 - Events (Large Metric) */}
          <div 
            ref={el => { cardsRef.current[3] = el; }}
            style={{ ...glassStyle, gridColumn: 'span 1' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
          >
            <div style={pillStyle}>Live Sessions</div>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', display: 'block', margin: '1.5vw 0 0.5vw' }}>{communityData.whatWeDo[2].title}</span>
            <p style={{ fontSize: '0.95rem', color: '#819CB6', lineHeight: 1.6 }}>{communityData.whatWeDo[2].description}</p>
            
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '3.5vw', fontWeight: 800, color: '#FFF', lineHeight: 0.9, letterSpacing: '-0.05em' }}>24</span>
              <span style={{ color: '#2F80FF', fontWeight: 700 }}>/7</span>
            </div>
          </div>

          {/* ITEM 4 - Mentorship (Avatar Stack) */}
          <div 
            ref={el => { cardsRef.current[4] = el; }}
            style={{ ...glassStyle, gridColumn: 'span 1' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
          >
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', display: 'block', marginBottom: '0.5vw' }}>{communityData.whatWeDo[3].title}</span>
            <p style={{ fontSize: '0.95rem', color: '#819CB6', lineHeight: 1.6 }}>{communityData.whatWeDo[3].description}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', paddingTop: '2vw' }}>
              {[20, 21, 22].map((img, i) => (
                <div key={i} style={{ width: '2.5vw', height: '2.5vw', borderRadius: '50%', backgroundColor: '#1A1D20', marginLeft: i > 0 ? '-1vw' : '0', border: '2px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <img src={`https://i.pravatar.cc/100?img=${img}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
              <div style={{ width: '2.5vw', height: '2.5vw', borderRadius: '50%', backgroundColor: '#2F80FF', marginLeft: '-1vw', border: '2px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={14} color="#FFF" />
              </div>
            </div>
          </div>

          {/* ITEM 5 & 6 COMBINED (Wide Metric Box) */}
          <div 
            ref={el => { cardsRef.current[5] = el; }}
            style={{ ...glassStyle, gridColumn: 'span 2', flexDirection: 'row', alignItems: 'stretch' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
          >
            <div style={{ flex: 1, paddingRight: '2vw', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={pillStyle}>Network</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', margin: '1vw 0' }}>{communityData.whatWeDo[5].title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#819CB6', lineHeight: 1.6 }}>{communityData.whatWeDo[5].description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '1vw' }}>
                <span style={{ fontSize: '2.5vw', fontWeight: 800, color: '#FFF' }}>10k+</span>
                <span style={{ fontSize: '0.9rem', color: '#5F646B' }}>Members</span>
              </div>
            </div>
            
            <div style={{ flex: 1, paddingLeft: '2vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={pillStyle}>Projects</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', margin: '1vw 0' }}>{communityData.whatWeDo[4].title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#819CB6', lineHeight: 1.6 }}>{communityData.whatWeDo[4].description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '1vw' }}>
                <span style={{ fontSize: '2.5vw', fontWeight: 800, color: '#FFF' }}>500+</span>
                <span style={{ fontSize: '0.9rem', color: '#5F646B' }}>Shipped</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
