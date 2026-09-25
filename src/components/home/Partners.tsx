'use client';

import { partnersData } from '@/data/partners';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

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
      <mesh ref={meshRef} scale={1.8} position={[-2, -1, -2]}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial 
          color="#1A4A7C" 
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

// --- 3D Mech Drone Model (Fresh Load) ---
function MechDroneModel() {
  const group = useRef<THREE.Group>(null);
  // Fresh load trick with completely new filename (v3 is converted to modern Metal/Roughness standard)
  const { scene, animations } = useGLTF('/models/mech_drone_v3.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Just play the animation, absolutely no texture/material modification needed for standard models
    if (actions && Object.keys(actions).length > 0) {
      const actionName = Object.keys(actions)[0];
      actions[actionName]?.reset().play();
    }
  }, [actions]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = -0.8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      group.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.5;
    }
  });

  return (
    <group ref={group} position={[7.5, -5.5, -7.2]} scale={15.0} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
useGLTF.preload('/models/mech_drone_v3.glb');

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(itemsRef.current, 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, []);

  // Interactive Cursor Tracking for Ripple Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set variables for liquid cursor shine and ripple center
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Reset if needed, but keeping the last cursor position for the fade out is usually fine.
  };

  // Generate unique custom cutouts AND modern base shapes for each card
  const getCustomShapeForIndex = (i: number) => {
    switch (i % 4) {
      case 0:
        // Left & Right Edge Bites + Modern Leaf Shape
        return {
          borderRadius: '50px 12px 50px 12px',
          WebkitMaskImage: `radial-gradient(circle at 0% 50%, transparent 30px, black 31px), radial-gradient(circle at 100% 50%, transparent 30px, black 31px)`,
          WebkitMaskSize: `51% 100%, 51% 100%`,
          WebkitMaskPosition: `left, right`,
          WebkitMaskRepeat: `no-repeat`
        };
      case 1:
        // Top-Right & Bottom-Left Corner Bites + Reverse Leaf Shape
        return {
          borderRadius: '12px 50px 12px 50px',
          WebkitMaskImage: `radial-gradient(circle at 100% 0%, transparent 40px, black 41px), radial-gradient(circle at 0% 100%, transparent 40px, black 41px)`,
          WebkitMaskSize: `100% 51%, 100% 51%`,
          WebkitMaskPosition: `top, bottom`,
          WebkitMaskRepeat: `no-repeat`
        };
      case 2:
        // Top & Bottom Edge Bites + Reverse Leaf Shape
        return {
          borderRadius: '12px 50px 12px 50px',
          WebkitMaskImage: `radial-gradient(circle at 50% 0%, transparent 30px, black 31px), radial-gradient(circle at 50% 100%, transparent 30px, black 31px)`,
          WebkitMaskSize: `100% 51%, 100% 51%`,
          WebkitMaskPosition: `top, bottom`,
          WebkitMaskRepeat: `no-repeat`
        };
      case 3:
        // Top-Left & Bottom-Right Corner Bites + Modern Leaf Shape
        return {
          borderRadius: '50px 12px 50px 12px',
          WebkitMaskImage: `radial-gradient(circle at 0% 0%, transparent 40px, black 41px), radial-gradient(circle at 100% 100%, transparent 40px, black 41px)`,
          WebkitMaskSize: `100% 51%, 100% 51%`,
          WebkitMaskPosition: `top, bottom`,
          WebkitMaskRepeat: `no-repeat`
        };
      default:
        return {};
    }
  };

  return (
    <section style={{ backgroundColor: '#080A0C', padding: '10vw 5vw', fontFamily: "'Outfit', sans-serif", position: 'relative', overflow: 'hidden' }}>
      
      {/* Cutout and Liquid Animation Styles */}
      <style>{`
        .partner-card {
          transform-style: preserve-3d;
        }

        /* Liquid Cursor Shine */
        .partner-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle 120px at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.1), transparent 80%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }
        .partner-card:hover::before {
          opacity: 1;
        }

        /* Realistic Refractive Pani Ripple Effect */
        .partner-card::after {
          content: '';
          position: absolute;
          top: var(--y, 50%);
          left: var(--x, 50%);
          width: 0;
          height: 0;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.4);
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%);
          backdrop-filter: blur(2px) contrast(120%) brightness(110%);
          -webkit-backdrop-filter: blur(2px) contrast(120%) brightness(110%);
          box-shadow: inset 0 0 20px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.2);
          transform: translate(-50%, -50%);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }
        .partner-card:hover::after {
          animation: ripple-water 1.2s ease-out infinite;
        }

        @keyframes ripple-water {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
            border-width: 4px;
          }
          100% {
            width: 600px;
            height: 600px;
            opacity: 0;
            border-width: 0px;
          }
        }

        /* Text Gradient on Hover */
        .partner-name {
          background: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.4s ease;
        }
        .partner-card:hover .partner-name {
          background: linear-gradient(135deg, #2F80FF 0%, #00F0FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transform: scale(1.05); /* Slight pop instead of 3D tilt */
        }
      `}</style>

      {/* 3D Background Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 5, 2]} intensity={2.5} color="#FFF" />
          <directionalLight position={[-2, -5, -2]} intensity={1} color="#2F80FF" />
          <AbstractBackgroundShape />
          <MechDroneModel />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div ref={containerRef} style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '8vw' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 5rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            PARTNERS &<br/>
            <span style={{ color: '#2F80FF', fontStyle: 'italic', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>COLLABORATORS</span>
          </h2>
          <p style={{ color: '#5F646B', fontSize: '1.1rem', marginTop: '1.5vw', maxWidth: '600px', margin: '1.5vw auto 0' }}>
            Supported by industry leaders who believe in the power of community-driven innovation.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3vw' }}>
          {partnersData.map((partner, i) => (
            <div 
              key={partner.name} 
              ref={el => { itemsRef.current[i] = el; }}
              className="partner-card"
              style={{ 
                ...getCustomShapeForIndex(i),
                // Provide standard mask properties as a fallback for non-webkit browsers
                maskImage: (getCustomShapeForIndex(i) as any).WebkitMaskImage,
                maskSize: (getCustomShapeForIndex(i) as any).WebkitMaskSize,
                maskPosition: (getCustomShapeForIndex(i) as any).WebkitMaskPosition,
                maskRepeat: (getCustomShapeForIndex(i) as any).WebkitMaskRepeat,
                
                // Intense Apple-style Premium Refractive Glass with Subtle Tech Grid
                background: `
                  linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.02) 20%, rgba(255,255,255,0.0) 60%, rgba(255,255,255,0.05) 100%),
                  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 15px 15px, 15px 15px',
                backdropFilter: 'blur(30px) saturate(200%) brightness(1.15) contrast(1.1)',
                WebkitBackdropFilter: 'blur(30px) saturate(200%) brightness(1.15) contrast(1.1)',
                padding: '4vw 2vw',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: `
                  inset 0 1px 3px rgba(255,255,255,0.6), 
                  inset 1px 0 3px rgba(255,255,255,0.3), 
                  inset -1px 0 2px rgba(255,255,255,0.05), 
                  inset 0 -1px 2px rgba(255,255,255,0.05), 
                  0 30px 60px rgba(0,0,0,0.6), 
                  0 0 30px rgba(47,128,255,0.15)
                `,
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              
              {/* Abstract Glowing Orb (Fills empty space with premium tech vibe) */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.0))',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 0 10px 20px rgba(0,0,0,0.5)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00F0FF, #2F80FF)',
                  boxShadow: '0 0 20px #00F0FF, 0 0 40px #2F80FF'
                }} />
              </div>

              <div style={{ 
                fontSize: '0.75rem', 
                color: '#FFFFFF', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em', 
                marginBottom: '1rem', 
                fontWeight: 700,
                padding: '0.4vw 1vw',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.05)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
                position: 'relative',
                zIndex: 2
              }}>
                {partner.tier}
              </div>
              <h3 className="partner-name" style={{ 
                fontSize: '2rem', 
                fontWeight: 800, 
                textAlign: 'center', 
                letterSpacing: '-0.02em', 
                position: 'relative', 
                zIndex: 2
              }}>
                {partner.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
