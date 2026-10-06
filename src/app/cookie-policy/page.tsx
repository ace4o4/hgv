import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | HackGyanVerse',
  description: 'Cookie Policy for HackGyanVerse Community.',
};

export default function CookiePolicy() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#050505', 
      color: '#E2E8F0',
      paddingTop: '150px',
      paddingBottom: '100px',
      fontFamily: "'Outfit', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(47,128,255,0.08) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', position: 'relative', zIndex: 2 }}>
        
        <div style={{ marginBottom: '3rem' }}>
          <Link href="/" style={{ color: '#00F0FF', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, background: 'rgba(0, 240, 255, 0.1)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(0, 240, 255, 0.2)', transition: 'all 0.3s ease' }}>
            <span>←</span> Back to Home
          </Link>
        </div>
        
        <div style={{
          background: 'linear-gradient(145deg, rgba(16, 20, 28, 0.7), rgba(10, 12, 16, 0.9))',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '40px 16px 40px 40px',
          padding: 'clamp(2rem, 6vw, 4rem)',
          boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.6), inset 1px 1px 2px rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1rem', color: '#FFFFFF', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Cookie Policy
          </h1>
          
          <p style={{ color: '#00F0FF', marginBottom: '3rem', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div style={{ display: 'grid', gap: '2rem' }}>
            <section style={{ background: 'rgba(255,255,255,0.02)', padding: 'clamp(1.5rem, 4vw, 2rem)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h2 style={{ fontSize: 'clamp(1.3rem, 5vw, 1.5rem)', fontWeight: 700, marginBottom: '1rem', color: '#FFFFFF', lineHeight: 1.3, wordBreak: 'break-word' }}>
                <span style={{ color: '#3B82F6' }}>01.</span> What Are Cookies
              </h2>
              <p style={{ lineHeight: 1.7, marginBottom: '1rem', color: '#94A3B8' }}>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.
              </p>
            </section>

            <section style={{ background: 'rgba(255,255,255,0.02)', padding: 'clamp(1.5rem, 4vw, 2rem)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h2 style={{ fontSize: 'clamp(1.3rem, 5vw, 1.5rem)', fontWeight: 700, marginBottom: '1rem', color: '#FFFFFF', lineHeight: 1.3, wordBreak: 'break-word' }}>
                <span style={{ color: '#9333EA' }}>02.</span> How We Use Cookies
              </h2>
              <p style={{ lineHeight: 1.7, color: '#94A3B8' }}>
                We use cookies and similar tracking technologies to track the activity on our website and hold certain information. We use them for essential website functionality, analyzing site traffic (e.g., through Vercel Analytics), and improving our services.
              </p>
            </section>

            <section style={{ background: 'rgba(255,255,255,0.02)', padding: 'clamp(1.5rem, 4vw, 2rem)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h2 style={{ fontSize: 'clamp(1.3rem, 5vw, 1.5rem)', fontWeight: 700, marginBottom: '1rem', color: '#FFFFFF', lineHeight: 1.3, wordBreak: 'break-word' }}>
                <span style={{ color: '#F43F5E' }}>03.</span> Your Choices
              </h2>
              <p style={{ lineHeight: 1.7, color: '#94A3B8' }}>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
