'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

const words = [
  { text: 'learner', color: '#FF7A00' },
  { text: 'designer', color: '#FFD700' },
  { text: 'developer', color: '#00FF66' },
  { text: 'builder', color: '#FFFFFF' },
  { text: 'creator', color: '#00BFFF' },
  { text: 'visionary', color: '#9D4EDD' },
  { text: 'hacker', color: '#FF007F' }
];

function getWordRange(index: number) {
  const dist = Math.abs(index - 3);
  if (dist === 0) return { start: 0.18, end: 0.32 };
  if (dist === 1) return { start: 0.35, end: 0.48 };
  if (dist === 2) return { start: 0.50, end: 0.63 };
  return { start: 0.65, end: 0.78 };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function getP(scroll: number, start: number, end: number) {
  if (scroll <= start) return 0;
  if (scroll >= end) return 1;
  return (scroll - start) / (end - start);
}

export default function CommunityIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const update = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) {
      rafRef.current = requestAnimationFrame(update);
      return;
    }

    const rect = container.getBoundingClientRect();
    const h = container.offsetHeight;
    const vh = window.innerHeight;

    // Calculate how far we've scrolled through the container
    const scrolled = -rect.top;
    const total = h - vh;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    // Keep the content centered in viewport by offsetting its top
    // When rect.top = 0, offset = 0 (content at top of container = top of viewport)
    // As we scroll, rect.top goes negative, so we add that offset back
    const clampedTop = Math.max(0, Math.min(total, scrolled));
    content.style.transform = `translateY(${clampedTop}px)`;

    // Update word animations via data attributes read in rAF
    const leftEl = content.querySelector('[data-left]') as HTMLElement;
    if (leftEl) {
      const lp = getP(progress, 0.02, 0.15);
      leftEl.style.opacity = String(lp);
      leftEl.style.transform = `translateX(${lerp(-150, 0, lp)}px)`;
      leftEl.style.textShadow = lp > 0.5 ? '0 0 30px rgba(255,255,255,0.4)' : 'none';
    }

    const wordEls = content.querySelectorAll('[data-word]') as NodeListOf<HTMLElement>;
    wordEls.forEach((el, i) => {
      const isCenter = i === 3;
      const { start, end } = getWordRange(i);
      const p = getP(progress, start, end);
      const yStart = i < 3 ? 80 : i > 3 ? -80 : 0;
      const y = lerp(yStart, 0, p);
      const scale = lerp(isCenter ? 0.6 : 0.8, 1, p);
      const glowP = Math.max(0, (p - 0.4) / 0.6);
      const color = words[i].color;
      const g1 = Math.min(Math.round(glowP * 144), 144).toString(16).padStart(2, '0');
      const g2 = Math.min(Math.round(glowP * 96), 96).toString(16).padStart(2, '0');

      el.style.opacity = String(p);
      el.style.transform = `translateY(${y}px) scale(${scale})`;
      el.style.textShadow = glowP > 0.05 ? `0 0 40px ${color}${g1}, 0 0 80px ${color}${g2}` : 'none';
    });

    rafRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [update]);

  return (
    <>
      {/* Cutout overlay */}
      <div style={{
        backgroundColor: '#050505',
        position: 'relative',
        zIndex: 5
      }}>
        <div className="community-cutout" style={{ 
          width: '100%', 
          height: '10vw', 
          position: 'relative',
          zIndex: 10
        }}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}>
            <path d="M0,0 L1440,0 L1440,120 L800,120 L600,0 Z" fill="#DEE3EA" />
            <path d="M600,0 L800,120 L1440,120" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          </svg>
          <div style={{
            position: 'absolute', right: '6vw', top: '3vw',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1vw'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(26,29,32,0.3)' }}></div>
              <span style={{ fontSize: '0.85vw', fontWeight: 700, letterSpacing: '0.2em', color: '#1A1D20', textTransform: 'uppercase', opacity: 0.7 }}>
                Dive into the Verse
              </span>
            </div>
            <span style={{ 
              fontSize: '4.5vw', fontWeight: 900, color: 'transparent', 
              WebkitTextStroke: '1px rgba(26,29,32,0.15)', 
              lineHeight: 0.8, letterSpacing: '-0.02em', transform: 'translateX(1vw)' 
            }}>
              COMMUNITY
            </span>
          </div>
        </div>
      </div>

      {/* Main scroll container */}
      <div
        ref={containerRef}
        style={{
          height: '400vh',
          position: 'relative',
          backgroundColor: '#050505',
          overflow: 'clip'
        }}
      >
        {/* Content block — manually positioned via translateY in rAF */}
        <div
          ref={contentRef}
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5vw',
            fontSize: 'clamp(2.5rem, 6vw, 7rem)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            fontFamily: "'Outfit', sans-serif",
            willChange: 'transform'
          }}
        >
          {/* "everyone's a" */}
          <div
            data-left=""
            style={{
              color: '#FFFFFF',
              opacity: 0,
              transform: 'translateX(-150px)',
            }}
          >
            everyone&apos;s a
          </div>

          {/* Words */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            whiteSpace: 'nowrap',
          }}>
            {words.map((word, i) => (
              <div
                key={i}
                data-word=""
                style={{
                  lineHeight: 1.15,
                  paddingBottom: '0.05em',
                  color: word.color,
                  opacity: 0,
                }}
              >
                {word.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
