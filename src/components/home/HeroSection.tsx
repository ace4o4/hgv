'use client';

import { communityData } from '@/data/community';
import { navigationData } from '@/data/navigation';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Expand, Target, ArrowUpRight } from 'lucide-react';

// --- PREMIUM 3D OBJECTS FOR TILES ---
function FloatingTechObject() {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={meshRef} scale={1.4}>
        <mesh>
          <torusGeometry args={[0.8, 0.3, 16, 48]} />
          <meshStandardMaterial color="#1A1D20" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[0.6, 0.1, 16, 48]} />
          <meshPhysicalMaterial color="#FFFFFF" transmission={0.9} opacity={1} roughness={0.1} clearcoat={1} />
        </mesh>
      </group>
    </Float>
  );
}

function GlassCubeObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={2.2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#819CB6" transmission={0.95} opacity={1} ior={1.5} roughness={0.1} clearcoat={1} />
      </mesh>
    </Float>
  );
}

export default function HeroSection() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital@1&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const tl = gsap.timeline();
    tl.fromTo('.hero-tile',
      { opacity: 0, scale: 0.95, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1.4, stagger: 0.08, ease: 'expo.out' }
    )
    .fromTo('.hero-text-anim',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' },
      "-=1"
    );

    // Interactive Hover Animations setup
    const tiles = document.querySelectorAll('.interactive-tile');
    tiles.forEach(tile => {
      tile.addEventListener('mouseenter', () => {
        gsap.to(tile, { scale: 1.03, y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', duration: 0.4, ease: 'power2.out' });
      });
      tile.addEventListener('mouseleave', () => {
        gsap.to(tile, { scale: 1, y: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.04)', duration: 0.4, ease: 'power2.out' });
      });
    });

  }, []);

  return (
    <section 
      style={{
        backgroundColor: '#DEE3EA', 
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        color: '#1A1D20',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      
      {/* 1. TOP LEFT LOGO PILL */}
      <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '4vw', top: '4vh', width: '18vw', height: '10vh', background: 'linear-gradient(135deg, #819CB6 0%, #6b89a6 100%)', borderRadius: '40px', display: 'flex', alignItems: 'center', padding: '0 2vw', zIndex: 10, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#FFF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '1vw', height: '1vw', backgroundColor: '#1A1D20', borderRadius: '50%' }} />
          </div>
          <span style={{ fontSize: '1.3vw', fontWeight: 700, color: '#FFF', letterSpacing: '0.02em' }}>HGV Community</span>
        </div>
      </div>

      {/* 2. TALL PORTRAIT */}
      <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '4vw', top: '16vh', width: '13vw', height: '36vh', backgroundColor: '#C0C0C0', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Student Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />
      </div>

      {/* 3. BLUE 3D MODULE */}
      <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '18.5vw', top: '16vh', width: '15vw', height: '17vh', background: 'linear-gradient(135deg, #819CB6 0%, #6b89a6 100%)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 4, 2]} intensity={2.5} color="#FFF" />
            <FloatingTechObject />
          </Canvas>
        </div>
      </div>

      {/* 4. WHITE INFO TILE (NFT Design Awards) */}
      <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '18.5vw', top: '35vh', width: '15vw', height: '17vh', backgroundColor: '#FFFFFF', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <div style={{ width: '3vw', height: '3vw', backgroundColor: '#1A1D20', borderRadius: '10px', marginBottom: '1.5vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '1vw', height: '1vw', border: '2px solid #FFF', borderRadius: '3px' }} />
        </div>
        <span style={{ fontSize: '0.85vw', fontWeight: 800, color: '#1A1D20', letterSpacing: '0.05em', lineHeight: 1.2 }}>COMMUNITY<br/>DESIGN AWARDS</span>
      </div>

      {/* 5. WHITE CREATOR TILE */}
      <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '4vw', top: '54vh', width: '13vw', height: '18vh', backgroundColor: '#FFFFFF', borderRadius: '40px', padding: '1.8vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <span style={{ fontSize: '1.1vw', fontWeight: 800, color: '#1A1D20', lineHeight: 1.1 }}>Our<br/>creators</span>
        <div style={{ display: 'flex', marginLeft: '0.5vw' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ width: '2.8vw', height: '2.8vw', borderRadius: '50%', backgroundColor: '#DEE3EA', marginLeft: '-0.8vw', border: '3px solid #FFF', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <img src={`https://i.pravatar.cc/100?img=${i+20}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      {/* 6. ROTATING BLACK STAMP */}
      <div className="hero-tile" style={{ position: 'absolute', left: '18vw', top: '53vh', width: '13vw', height: '13vw', backgroundColor: '#1A1D20', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 15px 40px rgba(0,0,0,0.15)' }}>
        <Target size={30} color="#FFF" />
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%', animation: 'spin 12s linear infinite' }}>
          <path id="stamp-text" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
          <text fontSize="10" fill="#FFFFFF" fontWeight="700" letterSpacing="2.5">
            <textPath href="#stamp-text">LEARN • BUILD • COLLABORATE • LEAD • </textPath>
          </text>
        </svg>
      </div>

      {/* 7. BOTTOM DARK CUBE */}
      <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '4vw', top: '74vh', width: '14vw', height: '30vh', backgroundColor: '#1A1D20', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={1} />
            <directionalLight position={[0, 5, 2]} intensity={2} color="#FFF" />
            <GlassCubeObject />
          </Canvas>
        </div>
      </div>


      {/* --- RIGHT SIDE CONTENT --- */}

      {/* 8. TOP NAVIGATION */}
      <nav className="hero-tile interactive-tile" style={{ position: 'absolute', left: '42vw', top: '4vh', width: '53vw', height: '8vh', backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5vw 0 3vw', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', zIndex: 50 }}>
        <div style={{ display: 'flex', gap: '3.5vw' }}>
          {navigationData.desktop.map(link => (
            <Link key={link.name} href={link.href} style={{ position: 'relative', color: '#5F646B', fontSize: '0.95vw', fontWeight: 600, transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => { e.currentTarget.style.color = '#1A1D20'; e.currentTarget.style.transform = 'translateY(-2px)'; const dot = e.currentTarget.querySelector('.nav-dot') as HTMLElement; if(dot) { dot.style.opacity = '1'; dot.style.transform = 'scale(1)'; } }} onMouseLeave={e => { e.currentTarget.style.color = '#5F646B'; e.currentTarget.style.transform = 'translateY(0)'; const dot = e.currentTarget.querySelector('.nav-dot') as HTMLElement; if(dot) { dot.style.opacity = '0'; dot.style.transform = 'scale(0)'; } }}>
              {link.name}
              <div className="nav-dot" style={{ position: 'absolute', bottom: '-0.8vh', width: '0.4vw', height: '0.4vw', backgroundColor: '#2F80FF', borderRadius: '50%', opacity: 0, transform: 'scale(0)', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
            </Link>
          ))}
        </div>
        <a href={communityData.whatsappLink} target="_blank" rel="noopener noreferrer" style={{ padding: '0.8vw 2.2vw', border: '1px solid rgba(26, 29, 32, 0.1)', backgroundColor: '#FFFFFF', borderRadius: '40px', fontSize: '0.9vw', fontWeight: 700, color: '#1A1D20', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }} onMouseEnter={e => {e.currentTarget.style.backgroundColor = '#1A1D20'; e.currentTarget.style.color = '#FFF'; e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(26,29,32,0.2)';}} onMouseLeave={e => {e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#1A1D20'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';}}>
          Sign Up
        </a>
      </nav>

      {/* 9. MAIN RIGHT PANEL */}
      <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '42vw', top: '16vh', width: '53vw', height: '42vh', backgroundColor: '#FAFBFC', borderRadius: '40px', padding: '3.5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #FFFFFF', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
        <h1 className="hero-text-anim" style={{ fontSize: 'clamp(2.5rem, 3.8vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, color: '#090A0B', marginBottom: '2vh', letterSpacing: '-0.03em' }}>
          CLASSROOM TO<br/>CAREER <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500, color: '#2F80FF' }}>TOGETHER.</span>
        </h1>
        <p className="hero-text-anim" style={{ fontSize: 'clamp(0.9rem, 1vw, 1.2rem)', color: '#5F646B', maxWidth: '32vw', lineHeight: 1.6, marginBottom: '4vh', fontWeight: 500 }}>
          The student-driven community building a bridge from classroom to career through technology, innovation, and real-world opportunities.
        </p>
        
        <div className="hero-text-anim" style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
          <a href={communityData.whatsappLink} style={{ padding: '1.1vw 2.8vw', backgroundColor: '#1A1D20', color: '#FFF', borderRadius: '40px', fontSize: '0.95vw', fontWeight: 700, letterSpacing: '0.02em', transition: 'all 0.3s', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} onMouseEnter={e => {e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)'}} onMouseLeave={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'}}>
            JOIN COMMUNITY
          </a>
          
          {/* Micro Controls */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.8vw' }}>
            <div className="interactive-tile" style={{ width: '4.5vw', height: '4.5vw', backgroundColor: '#1A1D20', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
              <Expand size={20} color="#FFF" />
            </div>
            <div className="interactive-tile" style={{ width: '4.5vw', height: '4.5vw', background: 'linear-gradient(135deg, #819CB6 0%, #6b89a6 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 20px rgba(129,156,182,0.3)' }}>
              <ArrowUpRight size={20} color="#FFF" />
            </div>
          </div>
        </div>
      </div>

      {/* 10. LOWER RIGHT EDITORIAL */}
      <div className="hero-tile hero-text-anim" style={{ position: 'absolute', left: '44vw', top: '65vh', width: '28vw' }}>
        <span style={{ fontSize: '0.75vw', fontWeight: 800, color: '#819CB6', textTransform: 'uppercase', letterSpacing: '0.15em' }}>NEW RELEASE</span>
        <h2 style={{ fontSize: '2.2vw', fontWeight: 600, color: '#1A1D20', marginTop: '1vh', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Get ready to embark<br/>on a new workroad
        </h2>
      </div>

      {/* 11. BOTTOM RIGHT CIRCLE */}
      <div className="hero-tile interactive-tile" style={{ position: 'absolute', right: '5vw', top: '61vh', width: '18vw', height: '18vw', backgroundColor: '#000', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
        <img src="https://images.unsplash.com/photo-1542744094-24638ea0b56c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Tech Object" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        {/* Blue patch on sleeve equivalent */}
        <div style={{ position: 'absolute', width: '4.5vw', height: '4.5vw', background: 'linear-gradient(135deg, #819CB6 0%, #6b89a6 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-12deg)', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ width: '2vw', height: '2vw', border: '2.5px solid #FFF', borderRadius: '6px' }} />
        </div>
      </div>

      {/* 12. BOTTOM METADATA STRIP */}
      <div className="hero-tile" style={{ position: 'absolute', left: '44vw', bottom: '5vh', width: '51vw', height: '5vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2.5vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <div style={{ width: '2.2vw', height: '2.2vw', background: 'linear-gradient(135deg, #819CB6 0%, #6b89a6 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '0.8vw', height: '0.8vw', backgroundColor: '#FFF', borderRadius: '50%' }} />
          </div>
          <span style={{ fontSize: '0.8vw', color: '#5F646B', maxWidth: '20vw', fontWeight: 500 }}>Exploring the Intersection of Technology and Learning</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
          <span style={{ fontSize: '0.9vw', fontWeight: 700, color: '#1A1D20', letterSpacing: '0.05em' }}>2026.08.24</span>
          <div style={{ display: 'flex', gap: '0.4vw' }}>
             <div style={{ width: '0.5vw', height: '0.5vw', backgroundColor: '#1A1D20', borderRadius: '50%' }}/>
             <div style={{ width: '0.5vw', height: '0.5vw', backgroundColor: '#C0C0C0', borderRadius: '50%' }}/>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </section>
  );
}
