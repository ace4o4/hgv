'use client';

import Link from 'next/link';
import { navigationData } from '@/data/navigation';
import { communityData } from '@/data/community';

export default function Footer() {
  return (
    <footer className="premium-dark-footer" style={{ 
      position: 'relative',
      backgroundColor: '#050505', 
      color: '#FFFFFF',
      borderTopLeftRadius: '60px',
      borderTopRightRadius: '60px',
      marginTop: '-40px', // Pulls it up over the previous section's bottom padding
      paddingTop: '60px', // Reduced height
      paddingBottom: '20px',
      zIndex: 11,
      overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif"
    }}>
      
      {/* Decorative Technical Crosshairs (Premium Tech Aesthetic) */}
      <div className="crosshair top-left" style={{ position: 'absolute', top: '60px', left: '60px', opacity: 0.2 }}><svg width="32" height="32"><path d="M16 0v32M0 16h32" stroke="#FFF" strokeWidth="1"/></svg></div>
      <div className="crosshair top-right" style={{ position: 'absolute', top: '60px', right: '60px', opacity: 0.2 }}><svg width="32" height="32"><path d="M16 0v32M0 16h32" stroke="#FFF" strokeWidth="1"/></svg></div>

      {/* Premium Background Glow Effect & Grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(47,128,255,0.08) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: '0 4vw' }}>
        
        <div className="footer-bento-grid" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Card 1: Brand Column */}
          <div className="footer-cutout-card" style={{ gridColumn: 'span 2' }}>
            <div className="card-glow" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(47,128,255,0.15) 0%, transparent 50%)' }} />
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
              <span style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                HGV
              </span>
              <div className="glow-dot" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#00F0FF', boxShadow: '0 0 15px #00F0FF, 0 0 30px #2F80FF' }} />
            </h2>
            <p style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem', color: '#E2E8F0', position: 'relative', zIndex: 2 }}>{communityData.name}</p>
            <p style={{ color: '#64748B', lineHeight: 1.6, maxWidth: '300px', fontSize: '1.05rem', position: 'relative', zIndex: 2 }}>{communityData.tagline}</p>
            
            {/* Abstract 3D CSS Illustration inside Brand Card */}
            <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', zIndex: 0, opacity: 0.15, pointerEvents: 'none', perspective: '800px' }}>
              <div className="abstract-shape">
                <div className="shape-ring" />
                <div className="shape-ring" style={{ animationDelay: '-1s', transform: 'rotateX(60deg) rotateY(60deg)' }} />
                <div className="shape-ring" style={{ animationDelay: '-2s', transform: 'rotateX(120deg) rotateY(120deg)' }} />
              </div>
            </div>
          </div>

          {/* Card 2: Navigation Links */}
          <div className="footer-cutout-card">
            <h3 className="footer-col-title">Navigation</h3>
            <ul className="footer-link-list">
              {navigationData.footer.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="premium-footer-link">
                    <span className="link-text">{link.name}</span>
                    <span className="link-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Community Links */}
          <div className="footer-cutout-card">
            <h3 className="footer-col-title">Community</h3>
            <ul className="footer-link-list">
              <li>
                <a href={communityData.whatsappLink} className="premium-footer-link" target="_blank" rel="noopener noreferrer">
                  <span className="link-text">Join WhatsApp</span>
                  <span className="link-arrow">→</span>
                </a>
              </li>
              <li>
                <a href={communityData.social.linkedin} className="premium-footer-link" target="_blank" rel="noopener noreferrer">
                  <span className="link-text">LinkedIn</span>
                  <span className="link-arrow">→</span>
                </a>
              </li>
              <li>
                <a href={communityData.social.instagram} className="premium-footer-link" target="_blank" rel="noopener noreferrer">
                  <span className="link-text">Instagram</span>
                  <span className="link-arrow">→</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Card 4: Contact & Events */}
          <div className="footer-cutout-card" style={{ gridColumn: '1 / -1' }}>
            <div className="card-glow" style={{ background: 'radial-gradient(circle at 100% 100%, rgba(147,51,234,0.1) 0%, transparent 60%)' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', position: 'relative', zIndex: 2 }}>
              <div>
                <h3 className="footer-col-title">Contact Us</h3>
                <a href={`mailto:${communityData.email}`} className="premium-footer-link">
                  <span className="link-text" style={{ fontSize: '1.2rem' }}>{communityData.email}</span>
                </a>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h3 className="footer-col-title">Current Event</h3>
                <Link href={`/events/${communityData.currentEventSlug}`} className="premium-event-link">
                  <div className="event-badge">LIVE</div>
                  <span>AHGV BUILDVERSE 2026</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Background Text with Insane Hover */}
        <div style={{ 
          width: '100%', 
          textAlign: 'center', 
          marginTop: '4rem', 
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '2rem',
          position: 'relative'
        }}>
          <h1 className="huge-footer-text" style={{ 
            fontSize: 'clamp(3rem, 10vw, 11rem)', 
            fontWeight: 900, 
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 0.9,
            cursor: 'crosshair',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {"HACKGYANVERSE".split("").map((char, index) => (
              <span key={index} className="footer-char" style={{ animationDelay: `${index * 0.05}s` }}>
                {char}
              </span>
            ))}
          </h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: '#64748B', fontSize: '1rem', fontWeight: 500 }}>
          <p>© {new Date().getFullYear()} {communityData.name}. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/privacy" className="bottom-link">Privacy Policy</Link>
            <Link href="/terms" className="bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style>{`
        /* 3D Abstract Shape Animation */
        .abstract-shape {
          width: 250px;
          height: 250px;
          position: relative;
          transform-style: preserve-3d;
          animation: spin3D 20s linear infinite;
        }
        .shape-ring {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: 50%;
          animation: pulseRing 3s ease-in-out infinite alternate;
        }
        @keyframes spin3D {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        @keyframes pulseRing {
          0% { box-shadow: inset 0 0 10px rgba(0,240,255,0.1); }
          100% { box-shadow: inset 0 0 30px rgba(147,51,234,0.3); }
        }

        /* Bento Box Grid Layout */
        .footer-bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .footer-bento-grid {
            grid-template-columns: 2fr 1fr 1fr;
            gap: 1.5rem;
          }
        }

        /* Separate Filled Cutout Cards */
        .footer-cutout-card {
          background: #0A0C10; /* Deep filled premium color */
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 32px;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .footer-cutout-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-8px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 40px rgba(47, 128, 255, 0.05);
        }

        .card-glow {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .footer-cutout-card:hover .card-glow {
          opacity: 1;
        }

        .footer-col-title {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #64748B;
          margin-bottom: 2rem;
          font-weight: 800;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .premium-footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #94A3B8;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .premium-footer-link .link-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: #00F0FF;
        }

        .premium-footer-link:hover {
          color: #FFFFFF;
          transform: translateX(5px);
          text-shadow: 0 0 10px rgba(255,255,255,0.4);
        }

        .premium-footer-link:hover .link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .premium-event-link {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 1rem 1.25rem;
          border-radius: 16px;
          color: #FFFFFF;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .premium-event-link::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
          transform: skewX(-20deg);
          animation: shine 4s infinite;
        }

        @keyframes shine {
          0%, 80% { left: -100%; }
          100% { left: 200%; }
        }

        .premium-event-link:hover {
          background: rgba(59,130,246,0.1);
          border-color: rgba(0,240,255,0.5);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0,240,255,0.2);
        }

        .event-badge {
          background: #EF4444;
          color: white;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.05em;
          animation: pulse 2s infinite;
        }

        .bottom-link {
          color: #64748B;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .bottom-link:hover {
          color: #FFFFFF;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        /* Fixed Clean Neon Hover on Logo */
        .huge-footer-text {
          perspective: 1000px;
        }

        .footer-char {
          display: inline-block;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          transform-origin: bottom center;
          padding: 0 2px;
          animation: sweepWave 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        @keyframes sweepWave {
          0%, 15%, 100% {
            transform: translateY(0) scale(1) rotateX(0deg);
            -webkit-text-stroke: 1px rgba(255,255,255,0.1);
            background-image: none;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 0px transparent);
            z-index: 1;
          }
          7.5% {
            transform: translateY(-15px) scale(1.15) rotateX(10deg);
            background-image: linear-gradient(135deg, #00F0FF, #9333EA);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 0px;
            filter: drop-shadow(0 10px 20px rgba(0, 240, 255, 0.6));
            z-index: 10;
          }
        }
      `}</style>
    </footer>
  );
}
