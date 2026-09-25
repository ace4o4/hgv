'use client';

import { communityData } from '@/data/community';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive States
  const [isGradientToggleOn, setIsGradientToggleOn] = useState(false);
  const [isHollowToggleOn, setIsHollowToggleOn] = useState(false);
  const [isHoveringArrow, setIsHoveringArrow] = useState(false);
  const [isHoveringOrbs, setIsHoveringOrbs] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    if (containerRef.current) {
      // Entry animation
      gsap.fromTo(containerRef.current.querySelectorAll('.animate-up'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Float animation for stars
      gsap.to('.spark-star', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-45, 45)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{ 
        position: 'relative',
        backgroundColor: '#FFFFFF', 
        color: '#1A1C20', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: '60px',
        borderTopRightRadius: '60px',
        marginTop: '-40px', 
        paddingTop: '60px',
        paddingBottom: '60px',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        zIndex: 10,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Floating Spark Stars */}
      <svg className="spark-star" style={{ position: 'absolute', top: '25%', left: '15%', width: '40px', fill: '#4ADE80' }} viewBox="0 0 100 100"><path d="M50 0 C50 50 100 50 100 50 C50 50 50 100 50 100 C50 50 0 50 0 50 C50 50 50 0 50 0 Z"/></svg>
      <svg className="spark-star" style={{ position: 'absolute', top: '15%', right: '20%', width: '25px', fill: '#60A5FA' }} viewBox="0 0 100 100"><path d="M50 0 C50 50 100 50 100 50 C50 50 50 100 50 100 C50 50 0 50 0 50 C50 50 50 0 50 0 Z"/></svg>
      <svg className="spark-star" style={{ position: 'absolute', bottom: '30%', left: '25%', width: '30px', fill: '#3B82F6' }} viewBox="0 0 100 100"><path d="M50 0 C50 50 100 50 100 50 C50 50 50 100 50 100 C50 50 0 50 0 50 C50 50 50 0 50 0 Z"/></svg>
      <svg className="spark-star" style={{ position: 'absolute', bottom: '35%', right: '25%', width: '45px', fill: '#FBBF24' }} viewBox="0 0 100 100"><path d="M50 0 C50 50 100 50 100 50 C50 50 50 100 50 100 C50 50 0 50 0 50 C50 50 50 0 50 0 Z"/></svg>

      {/* Decorative Dashed Path Lines (Animated) */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        <path className="flowing-dash" d="M 200 450 Q 200 550 350 550" fill="none" stroke="#1A1C20" strokeWidth="4" strokeDasharray="8 8" />
        <path className="flowing-dash" d="M 800 450 Q 950 450 950 350" fill="none" stroke="#1A1C20" strokeWidth="4" strokeDasharray="8 8" />
        <circle cx="350" cy="550" r="6" fill="#3B82F6" />
        <circle cx="950" cy="350" r="6" fill="#3B82F6" />
      </svg>

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: '1000px' }}>
        
        {/* Main Typography & Inline Elements */}
        <div className="animate-up" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '1rem',
          fontSize: 'clamp(4rem, 8vw, 7.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: '3rem'
        }}>
          
          {/* Line 1: build -> [ToggleEmoji] */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1.5rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>build</span>
            
            {/* Interactive Green Arrow Circle */}
            <div 
              onMouseEnter={() => setIsHoveringArrow(true)}
              onMouseLeave={() => setIsHoveringArrow(false)}
              style={{ 
                width: 'clamp(4rem, 8vw, 6.5rem)', 
                height: 'clamp(4rem, 8vw, 6.5rem)', 
                backgroundColor: isHoveringArrow ? '#22C55E' : '#4ADE80', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: 'inset 0 -5px 10px rgba(0,0,0,0.1), 0 10px 20px rgba(74,222,128,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isHoveringArrow ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <svg 
                width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="#1A1C20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  transition: 'transform 0.3s ease',
                  transform: isHoveringArrow ? 'translateX(5px)' : 'translateX(0)'
                }}
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>

            {/* Interactive Gradient Pill Toggle */}
            <div 
              onClick={() => setIsGradientToggleOn(!isGradientToggleOn)}
              style={{ 
                height: 'clamp(4rem, 8vw, 6.5rem)', 
                width: 'clamp(10rem, 20vw, 16rem)', 
                background: isGradientToggleOn 
                  ? 'linear-gradient(90deg, #F43F5E 0%, #F59E0B 100%)' 
                  : 'linear-gradient(90deg, #8B5CF6 0%, #3B82F6 100%)', 
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 0.8rem',
                boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.2), 0 15px 30px rgba(59,130,246,0.3)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.4s ease'
              }}
            >
              {/* 3D Knob that slides */}
              <div style={{ 
                height: 'clamp(3rem, 6.5vw, 5rem)', 
                width: 'clamp(3rem, 6.5vw, 5rem)', 
                backgroundColor: '#FFFFFF', 
                borderRadius: '50%',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2), inset 0 2px 5px rgba(255,255,255,1), inset 0 -4px 5px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: isGradientToggleOn ? 'calc(100% - clamp(3rem, 6.5vw, 5rem) - 0.8rem)' : '0.8rem',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                <div style={{ 
                  width: '40%', height: '40%', border: '3px solid #E2E8F0', borderRadius: '50%', 
                  borderTopColor: isGradientToggleOn ? '#F59E0B' : '#3B82F6', 
                  transform: isGradientToggleOn ? 'rotate(135deg)' : 'rotate(-45deg)',
                  transition: 'all 0.5s ease'
                }} />
              </div>
              
              {/* Emoji that stays on the opposite side of the knob */}
              <div style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.2))',
                position: 'absolute',
                right: isGradientToggleOn ? 'auto' : '0.8rem',
                left: isGradientToggleOn ? '1rem' : 'auto',
                transition: 'opacity 0.2s ease',
                opacity: 1
              }}>
                {isGradientToggleOn ? '🔥' : '🤩'}
              </div>
            </div>
          </div>

          {/* Line 2: [YellowDot] - a team [HollowToggle] */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1.5rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Pulsing Yellow Dot */}
            <div className="pulse-dot" style={{ 
              width: 'clamp(3.5rem, 7vw, 5.5rem)', 
              height: 'clamp(3.5rem, 7vw, 5.5rem)', 
              backgroundColor: '#FCD34D', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: 'inset 0 -5px 10px rgba(0,0,0,0.1), 0 10px 20px rgba(252,211,77,0.4)',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{ width: '25%', height: '25%', backgroundColor: '#FFFFFF', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#60A5FA', borderRadius: '50%', transform: 'scale(0.5)' }} />
              </div>
            </div>

            <div style={{ width: 'clamp(2rem, 4vw, 4rem)', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px' }} />
            
            <span>a team</span>

            {/* Interactive Hollow Pill Toggle */}
            <div 
              onClick={() => setIsHollowToggleOn(!isHollowToggleOn)}
              style={{ 
                height: 'clamp(3.5rem, 7vw, 5.5rem)', 
                width: 'clamp(7rem, 14vw, 11rem)', 
                border: '4px solid #1A1C20', 
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4px',
                position: 'relative',
                backgroundColor: isHollowToggleOn ? '#F1F5F9' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                zIndex: 2
              }}
            >
              {/* Inner Track Line */}
              <div style={{ 
                width: '60%', height: '4px', backgroundColor: '#1A1C20', borderRadius: '2px', 
                position: 'absolute', left: '50%', transform: 'translateX(-50%)', opacity: 0.2 
              }} />
              
              {/* Sliding Dot */}
              <div style={{ 
                height: 'clamp(2.5rem, 5vw, 4rem)', 
                width: 'clamp(2.5rem, 5vw, 4rem)', 
                backgroundColor: isHollowToggleOn ? '#F43F5E' : '#4ADE80', 
                borderRadius: '50%',
                position: 'absolute',
                border: '4px solid #1A1C20',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                left: isHollowToggleOn ? 'calc(100% - clamp(2.5rem, 5vw, 4rem) - 8px)' : '4px',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }} />
            </div>
          </div>

          {/* Line 3: [Overlapping Orbs] together */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1.5rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
            
            {/* Interactive Overlapping Glass Orbs */}
            <div 
              onMouseEnter={() => setIsHoveringOrbs(true)}
              onMouseLeave={() => setIsHoveringOrbs(false)}
              style={{ 
                position: 'relative', 
                width: 'clamp(7rem, 14vw, 11rem)', 
                height: 'clamp(4rem, 8vw, 6.5rem)', 
                display: 'flex', 
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{ 
                position: 'absolute', left: 0,
                width: 'clamp(4rem, 8vw, 6.5rem)', height: 'clamp(4rem, 8vw, 6.5rem)', 
                background: 'linear-gradient(135deg, #C084FC 0%, #3B82F6 100%)', 
                borderRadius: '50%',
                boxShadow: '0 10px 20px rgba(59,130,246,0.3)',
                transform: isHoveringOrbs ? 'translateX(-10px) scale(1.05)' : 'translateX(0)',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }} />
              <div style={{ 
                position: 'absolute', right: 0,
                width: 'clamp(4rem, 8vw, 6.5rem)', height: 'clamp(4rem, 8vw, 6.5rem)', 
                background: 'rgba(255, 255, 255, 0.4)', 
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: '50%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1), inset 0 2px 5px rgba(255,255,255,1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: isHoveringOrbs ? 'translateX(10px) scale(1.05)' : 'translateX(0)',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                <svg width="30%" height="30%" viewBox="0 0 24 24" fill="none" stroke="#1A1C20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                     style={{ transform: isHoveringOrbs ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.4s ease' }}
                >
                  <path d="M8 8h8v8H8z"/><path d="M12 8v8"/><path d="M8 12h8"/>
                </svg>
              </div>
            </div>

            <span>together</span>
          </div>

        </div>
        
        {/* Subtext */}
        <p className="animate-up" style={{ 
          color: '#4B5563', 
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', 
          fontWeight: 500,
          lineHeight: 1.6,
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          HackGyanVerse connects everyone in the learning process so you can deliver better projects, faster. 🙌
        </p>

        {/* Action Buttons */}
        <div className="animate-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
          <a href={communityData.whatsappLink} target="_blank" rel="noopener noreferrer" 
             className="premium-primary-btn"
          >
            Join Community
          </a>
          <a href={communityData.collaborationLink} 
             className="premium-secondary-btn"
          >
            See how it works
          </a>
        </div>

      </div>

      <style>{`
        /* Animated SVG Dashed Lines */
        @keyframes dashFlow {
          to { stroke-dashoffset: -16; }
        }
        .flowing-dash {
          animation: dashFlow 1s linear infinite;
        }

        /* Pulsing Yellow Dot */
        @keyframes pulseDot {
          0% { box-shadow: inset 0 -5px 10px rgba(0,0,0,0.1), 0 0 0 0 rgba(252,211,77,0.7); }
          70% { box-shadow: inset 0 -5px 10px rgba(0,0,0,0.1), 0 0 0 15px rgba(252,211,77,0); }
          100% { box-shadow: inset 0 -5px 10px rgba(0,0,0,0.1), 0 0 0 0 rgba(252,211,77,0); }
        }
        .pulse-dot {
          animation: pulseDot 2s infinite;
        }

        /* Apple-like clean button styles */
        .premium-primary-btn {
          background-color: #1A1C20;
          color: #FFFFFF;
          padding: 1.2rem 3rem;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 10px 20px rgba(26, 28, 32, 0.2), inset 0 1px 1px rgba(255,255,255,0.2);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: inline-block;
        }
        .premium-primary-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 30px rgba(26, 28, 32, 0.3), inset 0 1px 1px rgba(255,255,255,0.2);
        }
        .premium-primary-btn:active {
          transform: translateY(2px);
          box-shadow: 0 5px 10px rgba(26, 28, 32, 0.2);
        }

        .premium-secondary-btn {
          color: #1A1C20;
          font-size: 1.1rem;
          font-weight: 700;
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
          transition: all 0.3s ease;
        }
        .premium-secondary-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #1A1C20;
          background-image: linear-gradient(to right, #1A1C20 50%, transparent 50%);
          background-size: 8px 2px;
          background-repeat: repeat-x;
        }
        .premium-secondary-btn:hover {
          color: #3B82F6;
        }
        .premium-secondary-btn:hover::after {
          background-image: linear-gradient(to right, #3B82F6 50%, transparent 50%);
        }
      `}</style>
    </section>
  );
}
