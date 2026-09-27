'use client';

import { communityData } from '@/data/community';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';

export default function ContactPage() {

  useEffect(() => {
    // Add base fonts if not present
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 2.5rem 100px 2.5rem', minHeight: '100vh', background: '#F1F5F9', fontFamily: "'Outfit', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 95vw;
          height: calc(100vh - 10rem);
          min-height: 700px;
          background: #0A0C10;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.1);
        }
        .contact-left {
          padding: 8vh 5vw;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .contact-right {
          padding: 8vh 5vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contact-form-container {
          width: 100%;
          background: #FFFFFF;
          border-radius: 32px;
          padding: 4rem;
        }
        .input-field {
          width: 100%;
          padding: 1.2rem 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid #E5E7EB;
          font-size: 1.1rem;
          color: #1A1D20;
          outline: none;
          transition: border-color 0.3s;
        }
        .input-field:focus {
          border-bottom-color: #1A1D20;
        }
        .submit-btn {
          margin-top: 2rem;
          width: 100%;
          padding: 1.5rem;
          background: #000000;
          border-radius: 100px;
          border: none;
          color: #FFFFFF;
          font-size: 1.2rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .submit-btn:hover {
          background: #1A1D20;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .social-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #1A1D20;
          font-weight: 800;
          transition: all 0.3s ease;
        }
        .social-btn:hover {
          transform: scale(1.1);
          background: #00F0FF;
        }
        @media (max-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr;
            height: auto;
            min-height: 95vh;
            margin: 2.5vh 0;
            width: 95vw;
            border-radius: 32px;
          }
          .contact-left {
            padding: 4rem 2rem;
          }
          .contact-right {
            padding: 0 2rem 4rem 2rem;
          }
          .contact-form-container {
            padding: 2.5rem;
          }
          .title-text {
            font-size: 3.5rem !important;
          }
          .social-group {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 2rem !important;
          }
        }
      `}} />

      {/* Top Branding & Heading (Outside card) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', width: '95vw' }}
      >
        {/* Logo and Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #00F0FF, #9333EA)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,240,255,0.3)' }}>
            <span style={{ color: '#FFF', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>HGV</span>
          </div>
          <span style={{ color: '#1A1D20', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>HackGyanVerse</span>
        </div>
        
        {/* Contact Us Badge */}
        <div style={{ padding: '0.6rem 1.5rem', borderRadius: '100px', border: '1px solid rgba(0,0,0,0.1)', background: '#FFFFFF', color: '#1A1D20', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginRight: '5rem' }}>
          Contact Us
        </div>
      </motion.div>

      <motion.div 
        className="contact-layout"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Side: Info */}
        <div className="contact-left">

          <h1 className="title-text" style={{ fontSize: '5.5rem', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '5rem' }}>
            Ready?<br/>Let's talk
          </h1>

          <div className="social-group" style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginBottom: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Or contact us</span>
              <a href={`mailto:${communityData.email}`} style={{ fontSize: '1.3rem', color: '#00F0FF', textDecoration: 'none', fontWeight: 500 }}>
                {communityData.email}
              </a>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* WhatsApp Logo SVG */}
              <a href={communityData.whatsappLink} target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
              {/* Instagram Logo SVG */}
              <a href={communityData.social.instagram} target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* LinkedIn Logo SVG */}
              <a href={communityData.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div style={{ marginTop: '8rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#FFF' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00F0FF', boxShadow: '0 0 10px #00F0FF' }} />
              <span style={{ fontSize: '1rem', fontWeight: 500 }}>HackGyanVerse</span>
            </div>
            
            <div style={{ display: 'flex', gap: '4px', opacity: 0.3 }}>
              <div style={{ width: '4px', height: '4px', background: '#FFF', borderRadius: '50%' }} />
              <div style={{ width: '4px', height: '4px', background: '#FFF', borderRadius: '50%' }} />
              <div style={{ width: '4px', height: '4px', background: '#FFF', borderRadius: '50%' }} />
              <div style={{ width: '4px', height: '4px', background: '#FFF', borderRadius: '50%' }} />
              <div style={{ width: '4px', height: '4px', background: '#FFF', borderRadius: '50%' }} />
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="contact-right">
          <div className="contact-form-container">
            
            <h2 style={{ fontSize: '2.5rem', fontWeight: 500, color: '#1A1D20', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '3rem' }}>
              Leave your contacts<br/>and we will contact you
            </h2>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input type="text" placeholder="Full name" className="input-field" />
              <input type="email" placeholder="Email" className="input-field" />
              <input type="tel" placeholder="Phone number" className="input-field" />
              
              <button type="button" className="submit-btn">
                Submit Form <ArrowUpRight size={24} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
