'use client';

import { useState } from 'react';
import MagicRings from '@/components/reactbits/MagicRings';

const faqs = [
  {
    question: "What is HackGyanVerse (HGV)?",
    answer: "HackGyanVerse is a dynamic tech community where students, developers, and innovators come together to learn, collaborate on projects, and build the future of technology."
  },
  {
    question: "Do I need technical knowledge to join?",
    answer: "Not at all! Whether you're a complete beginner writing your first line of code or an experienced developer, HGV offers resources, mentorship, and a welcoming environment for all skill levels."
  },
  {
    question: "Are the events and workshops free?",
    answer: "Yes! We believe in accessible education. All our community events, workshops, hackathons, and learning resources are completely free for everyone to access."
  },
  {
    question: "How can I collaborate on projects?",
    answer: "You can pitch your ideas or join existing open-source projects on our Discord and WhatsApp channels. We regularly host collaborative building sessions where teams are formed to solve real-world problems."
  },
  {
    question: "How do I get started?",
    answer: "The easiest way is to join our WhatsApp or Discord community. From there, you can introduce yourself, join ongoing discussions, and register for our upcoming events!"
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Open the second one by default as in the design

  return (
    <section className="faq-section-wrapper" style={{ padding: '6rem 4vw', backgroundColor: '#050505', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
      {/* Magic Rings Background Element */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', opacity: 0.8 }}>
        <MagicRings
          color="#2F80FF" // Blue from brand
          colorTwo="#FF00F0" // Pink from brand
          ringCount={5}
          speed={0.5}
          attenuation={15}
          lineThickness={1.5}
          baseRadius={0.4}
          radiusStep={0.15}
          scaleRate={0.05}
          opacity={0.8}
          blur={1.5}
          noiseAmount={0.05}
          rotation={0}
          ringGap={1.2}
          fadeIn={0.5}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.1}
          hoverScale={1}
          parallax={0.02}
          clickBurst={false}
        />
      </div>
      
      <div 
        className="faq-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#F3F4F6',
          borderRadius: '40px',
          padding: '6rem 4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          fontFamily: "'Inter', 'Outfit', sans-serif",
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <div 
            className="faq-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              backgroundColor: 'rgba(0,0,0,0.04)',
              borderRadius: '99px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#1A1A1A',
              letterSpacing: '0.05em'
            }}
          >
            <span>010</span>
            <span style={{ fontSize: '1rem', lineHeight: 0 }}>•</span>
            <span>FAQS</span>
          </div>
          
          {/* Hand-drawn SVG Circle */}
          <svg width="140" height="60" viewBox="0 0 140 60" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
            <path 
              className="drawn-svg-circle" 
              d="M 20 30 C 20 10, 120 10, 120 30 C 120 50, 20 50, 20 30 Z" 
              fill="none" 
              stroke="#2F80FF" 
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ opacity: 0.6 }}
            />
          </svg>
        </div>

        <div style={{ position: 'relative', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: '#111111', margin: 0, letterSpacing: '-0.04em' }}>
            Common Questions
          </h2>
          
          {/* Hand-drawn SVG Underline */}
          <svg width="280" height="30" viewBox="0 0 280 30" style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
            <path 
              className="drawn-svg-path" 
              d="M 10 15 Q 80 5, 140 22 T 270 10" 
              fill="none" 
              stroke="#FF00F0" 
              strokeWidth="4" 
              strokeLinecap="round" 
              style={{ opacity: 0.5 }}
            />
          </svg>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="faq-item-card"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                style={{
                  width: '100%',
                  borderRadius: '24px',
                  backgroundColor: isOpen ? '#FFFFFF' : '#E2E4E9',
                  padding: isOpen ? '2rem' : '1.5rem 2rem',
                  cursor: 'pointer',
                  // Transition handled by CSS class for active bounce
                  boxShadow: isOpen ? '0 10px 40px rgba(0,0,0,0.05)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  zIndex: isOpen ? 2 : 1,
                  // Gradient Border trick for expanded state
                  border: '1.5px solid transparent',
                  backgroundClip: 'padding-box, border-box',
                  backgroundOrigin: 'border-box',
                  backgroundImage: isOpen 
                    ? 'linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(135deg, #B5C6FF 0%, #F5D1FF 100%)' 
                    : 'linear-gradient(#E2E4E9, #E2E4E9), linear-gradient(#E2E4E9, #E2E4E9)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span 
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? '#F1F5F9' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#475569',
                        flexShrink: 0
                      }}
                    >
                      {index + 1}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#111111', margin: 0, letterSpacing: '-0.01em' }}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div 
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'transparent' : '#111111',
                      border: isOpen ? '1px solid #CBD5E1' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? '#64748B' : '#FFFFFF',
                      fontSize: '1.2rem',
                      fontWeight: 300,
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                  >
                    {isOpen ? '✕' : '+'}
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ paddingTop: '1.5rem', paddingLeft: '3.25rem' }}>
                      <p style={{ color: '#64748B', lineHeight: 1.7, fontSize: '1rem', margin: 0, opacity: isOpen ? 1 : 0, transition: 'opacity 0.4s ease', transitionDelay: isOpen ? '0.1s' : '0s' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <p style={{ color: '#64748B', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: 500 }}>Have any other questions?</p>
          <a href="/contact" style={{ color: '#111111', fontWeight: 600, fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <span style={{ borderBottom: '2px solid #111111', paddingBottom: '2px' }}>Contact Us</span>
            <span style={{ color: '#94A3B8', fontSize: '1.2rem', transform: 'translateY(1px)' }}>→</span>
          </a>
        </div>
      </div>
      
      {/* CSS Styles for Interactive Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .faq-container {
            padding: 3rem 1.5rem !important;
            border-radius: 24px !important;
          }
        }
        
        .faq-item-card {
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, background-color 0.4s ease, padding 0.4s ease !important;
        }
        .faq-item-card:hover {
          box-shadow: 0 4px 15px rgba(0,0,0,0.03) !important;
        }
        .faq-item-card:active {
          transform: scale(0.97) !important;
        }
        
        /* SVG Drawn Animations */
        @keyframes drawSvgPath {
          to { stroke-dashoffset: 0; }
        }
        
        .drawn-svg-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawSvgPath 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 0.5s;
        }
        
        .drawn-svg-circle {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: drawSvgPath 2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 0.8s;
        }
      `}} />
    </section>
  );
}
