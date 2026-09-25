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
      paddingTop: '80px',
      paddingBottom: '20px',
      zIndex: 11,
      overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif"
    }}>
      
      {/* Decorative Technical Crosshairs (Premium Tech Aesthetic) */}
      <div className="crosshair top-left" style={{ position: 'absolute', top: '40px', left: '40px', opacity: 0.2 }}><svg width="24" height="24"><path d="M12 0v24M0 12h24" stroke="#FFF" strokeWidth="1"/></svg></div>
      <div className="crosshair top-right" style={{ position: 'absolute', top: '40px', right: '40px', opacity: 0.2 }}><svg width="24" height="24"><path d="M12 0v24M0 12h24" stroke="#FFF" strokeWidth="1"/></svg></div>

      {/* Premium Background Glow Effect & Grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '-20%', left: '30%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(47,128,255,0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Abstract 3D CSS Illustration */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', zIndex: 0, opacity: 0.4, pointerEvents: 'none', perspective: '800px' }}>
        <div className="abstract-shape">
          <div className="shape-ring" />
          <div className="shape-ring" style={{ animationDelay: '-1s', transform: 'rotateX(60deg) rotateY(60deg)' }} />
          <div className="shape-ring" style={{ animationDelay: '-2s', transform: 'rotateX(120deg) rotateY(120deg)' }} />
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 5vw' }}>
        <div className="footer-premium-grid">
          
          {/* Brand Column */}
          <div className="footer-brand-col">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              <span style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                HGV
              </span>
              <div className="glow-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00F0FF', boxShadow: '0 0 10px #00F0FF, 0 0 20px #2F80FF' }} />
            </h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: '#E2E8F0' }}>{communityData.name}</p>
            <p style={{ color: '#64748B', lineHeight: 1.6, maxWidth: '300px' }}>{communityData.tagline}</p>
          </div>

          {/* Navigation Links */}
          <div className="footer-links-col">
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

          {/* Community Links */}
          <div className="footer-links-col">
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

          {/* Contact & Events */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">Contact</h3>
            <ul className="footer-link-list">
              <li>
                <a href={`mailto:${communityData.email}`} className="premium-footer-link">
                  <span className="link-text">{communityData.email}</span>
                </a>
              </li>
            </ul>
            <h3 className="footer-col-title" style={{ marginTop: '2rem' }}>Current Event</h3>
            <Link href={`/events/${communityData.currentEventSlug}`} className="premium-event-link">
              <div className="event-badge">LIVE</div>
              <span>AHGV BUILDVERSE 2026</span>
            </Link>
          </div>
        </div>

        {/* Massive Background Text with Insane Hover */}
        <div style={{ 
          width: '100%', 
          textAlign: 'center', 
          marginTop: '6rem', 
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '2rem',
          position: 'relative'
        }}>
          <h1 className="huge-footer-text" style={{ 
            fontSize: 'clamp(3rem, 12vw, 15rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.05em',
            margin: 0,
            lineHeight: 0.8,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.05)',
            textTransform: 'uppercase',
            cursor: 'crosshair'
          }}>
            HACKGYANVERSE
          </h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: '#64748B', fontSize: '0.9rem', fontWeight: 500 }}>
          <p>© {new Date().getFullYear()} {communityData.name}. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy" className="bottom-link">Privacy Policy</Link>
            <Link href="/terms" className="bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style>{`
        /* 3D Abstract Shape Animation */
        .abstract-shape {
          width: 200px;
          height: 200px;
          position: relative;
          transform-style: preserve-3d;
          animation: spin3D 20s linear infinite;
        }
        .shape-ring {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(0, 240, 255, 0.3);
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

        /* Footer Grid */
        .footer-premium-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        @media (min-width: 768px) {
          .footer-premium-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 2rem;
          }
        }

        .footer-col-title {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #94A3B8;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .premium-footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #CBD5E1;
          text-decoration: none;
          font-size: 1.05rem;
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
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
        }

        .premium-footer-link:hover .link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .premium-event-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          color: #FFFFFF;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
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
          box-shadow: 0 5px 15px rgba(0,240,255,0.15);
        }

        .event-badge {
          background: #EF4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
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
          70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        /* Insane Neon Hover on Logo */
        .huge-footer-text {
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          background-image: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0));
          WebkitBackgroundClip: text;
        }
        
        .huge-footer-text:hover {
          background-image: linear-gradient(90deg, #2F80FF, #00F0FF, #9333EA, #2F80FF);
          background-size: 300% 100%;
          -webkit-text-fill-color: transparent;
          animation: bgPan 3s linear infinite;
          text-shadow: 0 0 60px rgba(0, 240, 255, 0.5), 0 0 100px rgba(147, 51, 234, 0.3);
          letter-spacing: 0.02em; /* Expands slightly */
          transform: scale(1.02);
          WebkitTextStroke: 0px; /* Remove stroke when filled */
        }

        @keyframes bgPan {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </footer>
  );
}
