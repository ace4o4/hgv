'use client';

import { communityData } from '@/data/community';
import { navigationData } from '@/data/navigation';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { Expand, Target, ArrowUpRight } from 'lucide-react';
import DitherVeil from '@/components/reactbits/DitherVeil';

// --- MAGNETIC WRAPPER FOR BUTTONS ---
function MagneticWrap({ children, className, style, pull = 0.4 }: any) {
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

  return <div ref={ref} className={className} style={{...style, display: 'inline-block'}}>{children}</div>;
}

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
          <torusGeometry args={[0.8, 0.35, 32, 64]} />
          <meshStandardMaterial color="#0A0A0A" metalness={1} roughness={0.1} />
        </mesh>
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[0.6, 0.05, 16, 48]} />
          <meshPhysicalMaterial color="#2F80FF" emissive="#2F80FF" emissiveIntensity={0.5} transmission={0.9} opacity={1} roughness={0.1} clearcoat={1} />
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
        <meshPhysicalMaterial color="#42fcff" transmission={0.95} opacity={1} ior={1.7} roughness={0.05} clearcoat={1} />
      </mesh>
    </Float>
  );
}

function FloatingAppIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.2} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[1.5, 1.5, 0.3]} />
        <meshPhysicalMaterial color="#819CB6" metalness={0.5} roughness={0.2} clearcoat={1} />
      </mesh>
    </Float>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital@1&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const tl = gsap.timeline();
    tl.fromTo('.hero-tile',
      { opacity: 0, scale: 0.9, y: 60, rotationX: -10 },
      { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 1.6, stagger: 0.08, ease: 'expo.out' }
    )
    .fromTo('.hero-text-anim',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' },
      "-=1.2"
    );

    // Subtle global parallax on mouse move
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if(!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to('.hero-parallax-layer', {
        x: -x,
        y: -y,
        duration: 2,
        ease: 'power2.out'
      });
    };
    
    window.addEventListener('mousemove', handleGlobalMouseMove);

    // Interactive Hover Animations setup
    const tiles = document.querySelectorAll('.interactive-tile');
    tiles.forEach(tile => {
      tile.addEventListener('mouseenter', () => {
        gsap.to(tile, { scale: 1.03, y: -5, boxShadow: '0 30px 60px rgba(0,0,0,0.12)', duration: 0.4, ease: 'power2.out' });
      });
      tile.addEventListener('mouseleave', () => {
        gsap.to(tile, { scale: 1, y: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.04)', duration: 0.4, ease: 'power2.out' });
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        background: 'radial-gradient(circle at 50% 0%, #FFFFFF 0%, #DEE3EA 100%)', 
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        color: '#1A1D20',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      {/* Premium SVG Noise Grain Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.35,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'overlay',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      />

      <div className="hero-parallax-layer" style={{ width: '100%', height: '100%', position: 'absolute' }}>
        
        {/* 1. TOP LEFT LOGO PILL */}
        <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '4vw', top: '4vh', width: '18vw', height: '10vh', background: 'linear-gradient(135deg, #819CB6 0%, #6b89a6 100%)', borderRadius: '40px', display: 'flex', alignItems: 'center', padding: '0 2vw', zIndex: 10, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
            <div style={{ width: '2.5vw', height: '2.5vw', backgroundColor: '#FFF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '1vw', height: '1vw', backgroundColor: '#1A1D20', borderRadius: '50%' }} />
            </div>
            <span style={{ fontSize: '1.3vw', fontWeight: 700, color: '#FFF', letterSpacing: '0.02em' }}>HGV Community</span>
          </div>
        </div>

        {/* 2. TALL PORTRAIT */}
        <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '4vw', top: '16vh', width: '13vw', height: '36vh', backgroundColor: '#C0C0C0', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.08)' }}>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Student Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(100,50,255,0.4) 0%, transparent 60%)', mixBlendMode: 'overlay' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,240,255,0.2) 0%, transparent 40%)', mixBlendMode: 'color' }} />
        </div>

        {/* 3. BLUE 3D MODULE */}
        <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '18.5vw', top: '16vh', width: '15vw', height: '17vh', background: 'linear-gradient(135deg, #819CB6 0%, #6b89a6 100%)', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 40px rgba(129,156,182,0.3)' }}>
          <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[2, 4, 2]} intensity={2.5} color="#FFF" />
              <FloatingTechObject />
            </Canvas>
          </div>
        </div>

        {/* 4. WHITE INFO TILE */}
        <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '18.5vw', top: '35vh', width: '15vw', height: '17vh', backgroundColor: '#FFFFFF', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}>
          <div style={{ width: '3.5vw', height: '3.5vw', backgroundColor: '#1A1D20', borderRadius: '12px', marginBottom: '1.5vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '1.2vw', height: '1.2vw', border: '2px solid #FFF', borderRadius: '4px' }} />
          </div>
          <span style={{ fontSize: '0.85vw', fontWeight: 800, color: '#1A1D20', letterSpacing: '0.08em', lineHeight: 1.3 }}>COMMUNITY<br/>DESIGN AWARDS</span>
        </div>

        {/* 5. WHITE CREATOR TILE */}
        <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '4vw', top: '54vh', width: '13vw', height: '18vh', backgroundColor: '#FFFFFF', borderRadius: '40px', padding: '2vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: '1.1vw', fontWeight: 800, color: '#1A1D20', lineHeight: 1.1 }}>Our<br/>creators</span>
          <div style={{ display: 'flex', marginLeft: '0.5vw' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ width: '3vw', height: '3vw', borderRadius: '50%', backgroundColor: '#DEE3EA', marginLeft: '-0.8vw', border: '3px solid #FFF', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}>
                <img src={`https://i.pravatar.cc/100?img=${i+20}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* 6. ROTATING BLACK STAMP */}
        <div className="hero-tile" style={{ position: 'absolute', left: '18vw', top: '53vh', width: '13vw', height: '13vw', backgroundColor: '#090A0B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
          <Target size={30} color="#FFF" />
          <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%', animation: 'spin 15s linear infinite' }}>
            <path id="stamp-text" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text fontSize="10.5" fill="#FFFFFF" fontWeight="700" letterSpacing="2.5">
              <textPath href="#stamp-text">LEARN • BUILD • COLLABORATE • LEAD • </textPath>
            </text>
          </svg>
        </div>

        {/* 7. BOTTOM DARK CUBE */}
        <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '4vw', top: '74vh', width: '14vw', height: '30vh', backgroundColor: '#090A0B', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.15)' }}>
          <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={1} />
              <directionalLight position={[0, 5, 2]} intensity={2} color="#FFF" />
              <GlassCubeObject />
            </Canvas>
          </div>
        </div>


        {/* --- RIGHT SIDE CONTENT --- */}

        {/* 8. TOP NAVIGATION (Glassmorphic) */}
        <nav className="hero-tile" style={{ position: 'absolute', left: '42vw', top: '4vh', width: '53vw', height: '8vh', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5vw 0 3vw', boxShadow: '0 15px 40px rgba(0,0,0,0.03)', zIndex: 50 }}>
          <div style={{ display: 'flex', gap: '3.5vw' }}>
            {navigationData.desktop.map(link => (
              <MagneticWrap key={link.name} pull={0.2}>
                <Link href={link.href} className="nav-link" style={{ position: 'relative', color: '#5F646B', fontSize: '0.95vw', fontWeight: 600, transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {link.name}
                  <div className="nav-dot" style={{ position: 'absolute', bottom: '-0.8vh', width: '0.4vw', height: '0.4vw', backgroundColor: '#2F80FF', borderRadius: '50%', opacity: 0, transform: 'scale(0)', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                </Link>
              </MagneticWrap>
            ))}
          </div>
          
          <MagneticWrap pull={0.3}>
            <a href={communityData.whatsappLink} className="premium-btn" target="_blank" rel="noopener noreferrer" style={{ padding: '0.8vw 2.5vw', border: '1px solid rgba(255, 255, 255, 0.9)', backgroundColor: '#FFFFFF', borderRadius: '40px', fontSize: '0.9vw', fontWeight: 700, color: '#1A1D20', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', boxShadow: '0 8px 20px rgba(0,0,0,0.05)', display: 'block' }}>
              Sign Up
            </a>
          </MagneticWrap>
        </nav>

        {/* 9. MAIN RIGHT PANEL */}
        <div className="hero-tile" style={{ position: 'absolute', left: '42vw', top: '16vh', width: '53vw', height: '42vh', backgroundColor: '#FFFFFF', borderRadius: '40px', padding: '4vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid rgba(255,255,255,1)', boxShadow: '0 25px 60px rgba(0,0,0,0.06)' }}>
          <h1 className="hero-text-anim main-heading" style={{ fontSize: 'clamp(2.5rem, 4.2vw, 5rem)', fontWeight: 800, lineHeight: 1.05, color: '#090A0B', marginBottom: '2.5vh', letterSpacing: '-0.04em' }}>
            CLASSROOM TO<br/>CAREER <span className="italic-blue" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500, color: '#2F80FF', position: 'relative', display: 'inline-block' }}>TOGETHER.</span>
          </h1>
          <p className="hero-text-anim" style={{ fontSize: 'clamp(0.9rem, 1.05vw, 1.3rem)', color: '#5F646B', maxWidth: '34vw', lineHeight: 1.6, marginBottom: '4.5vh', fontWeight: 500 }}>
            The student-driven community building a bridge from classroom to career through technology, innovation, and real-world opportunities.
          </p>
          
          <div className="hero-text-anim" style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
            <MagneticWrap pull={0.4}>
              <a href={communityData.whatsappLink} className="premium-btn-dark" style={{ padding: '1.2vw 3vw', backgroundColor: '#090A0B', color: '#FFF', borderRadius: '40px', fontSize: '0.95vw', fontWeight: 700, letterSpacing: '0.02em', transition: 'all 0.3s', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', display: 'block' }}>
                JOIN COMMUNITY
              </a>
            </MagneticWrap>
            
            {/* Micro Controls */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1vw' }}>
              <MagneticWrap pull={0.3}>
                <div className="premium-btn-dark interactive-tile" style={{ width: '4.5vw', height: '4.5vw', backgroundColor: '#090A0B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
                  <Expand size={20} color="#FFF" />
                </div>
              </MagneticWrap>
              <MagneticWrap pull={0.3}>
                <div className="interactive-tile" style={{ width: '4.5vw', height: '4.5vw', background: 'linear-gradient(135deg, #819CB6 0%, #6b89a6 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 25px rgba(129,156,182,0.4)' }}>
                  <ArrowUpRight size={20} color="#FFF" />
                </div>
              </MagneticWrap>
            </div>
          </div>
        </div>

        {/* 10. LOWER RIGHT DITHER VEIL INTERACTIVE PANEL */}
        <div className="hero-tile interactive-tile" style={{ position: 'absolute', left: '42vw', top: '61vh', width: '53vw', height: '31vh', backgroundColor: '#F3F4F6', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <DitherVeil
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop"
              pattern="atkinson"
              pixelSize={2}
              inkColor="#090A0B"
              paperColor="#E2E4E9"
              revealRadius={180}
              softness={0.55}
              linger={1}
              levels={4}
            />
          </div>
          {/* Text Overlay matching previous editorial */}
          <div style={{ position: 'absolute', inset: 0, padding: '2.5vw 3vw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(243,244,246,0.9) 0%, transparent 70%)', pointerEvents: 'none' }}>
            <span style={{ fontSize: '0.85vw', fontWeight: 800, color: '#2F80FF', textTransform: 'uppercase', letterSpacing: '0.15em' }}>NEW RELEASE</span>
            <h2 style={{ fontSize: '2.2vw', fontWeight: 600, color: '#1A1D20', marginTop: '0.5vh', lineHeight: 1.1, letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
              Get ready to embark on a new workroad
            </h2>
          </div>
        </div>

        {/* 12. BOTTOM METADATA STRIP */}
        <div className="hero-tile" style={{ position: 'absolute', left: '44vw', bottom: '5vh', width: '51vw', height: '5vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '2.5vh' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
            <div style={{ width: '2.2vw', height: '2.2vw', background: 'linear-gradient(135deg, #819CB6 0%, #6b89a6 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(129,156,182,0.3)' }}>
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

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        /* Premium Hover Effects */
        .nav-link:hover { color: #1A1D20 !important; }
        .nav-link:hover .nav-dot { opacity: 1 !important; transform: scale(1) !important; }
        
        .premium-btn:hover { background-color: #1A1D20 !important; color: #FFF !important; box-shadow: 0 15px 30px rgba(26,29,32,0.2) !important; }
        .premium-btn-dark:hover { background-color: #2F80FF !important; box-shadow: 0 15px 30px rgba(47,128,255,0.3) !important; }
        
        .main-heading:hover .italic-blue { text-shadow: 0 0 20px rgba(47,128,255,0.4); }
      `}} />
    </section>
  );
}
