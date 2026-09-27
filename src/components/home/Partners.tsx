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
    // Add ~10% luminance to make the model glow slightly without losing its textures
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        // If it doesn't have an emissive map, we can give it a baseline emissive color and low intensity
        if (!child.material.emissive) {
          child.material.emissive = new THREE.Color(0xffffff);
        }
        child.material.emissiveIntensity = 0.2;
        child.material.needsUpdate = true;
      }
    });

    // Just play the animation
    if (actions && Object.keys(actions).length > 0) {
      const actionName = Object.keys(actions)[0];
      actions[actionName]?.reset().play();
    }
  }, [actions, scene]);

  useFrame((state) => {
    if (group.current) {
      // Added Math.PI to rotate the drone 180 degrees so its face points towards the camera
      group.current.rotation.y = Math.PI - 0.8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
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
        <div className="partners-drone-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6, pointerEvents: 'none' }}>
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
            <h2 className="partners-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 5rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              PARTNERS &<br/>
              <span style={{ color: '#2F80FF', fontStyle: 'italic', fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>COLLABORATORS</span>
            </h2>
            <p style={{ color: '#5F646B', fontSize: '1.1rem', marginTop: '1.5vw', maxWidth: '600px', margin: '1.5vw auto 0' }}>
              Supported by industry leaders who believe in the power of community-driven innovation.
            </p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div 
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '32px',
                padding: '5vw',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.2)',
                textAlign: 'center',
                maxWidth: '800px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative elements */}
              <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(47,128,255,0.2) 0%, transparent 70%)', mixBlendMode: 'screen' }} />
              <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '60%', background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)', mixBlendMode: 'screen' }} />
              
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2vw', boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.1)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2F80FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>

              <h3 style={{ fontSize: 'clamp(2rem, 3vw, 4rem)', fontWeight: 700, color: '#FFF', letterSpacing: '-0.02em', marginBottom: '1.5vw' }}>
                Build the future with us
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '3vw', maxWidth: '90%', margin: '0 auto 3vw' }}>
                Join our ecosystem of innovators and tech leaders. We are actively looking for visionary organizations to partner with HackGyanVerse and empower the next generation of builders.
              </p>

              <button style={{ 
                background: '#FFF', color: '#1A1D20', padding: '1vw 3vw', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 600,
                border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.8vw',
                boxShadow: '0 10px 20px rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease'
              }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Become a Partner
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

        </div>
    </section>
  );
}
