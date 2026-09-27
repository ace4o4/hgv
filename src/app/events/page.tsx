'use client';

import { eventsData } from '@/data/events';
import { ahgvData } from '@/data/ahgv';
import Link from 'next/link';
import FinalCTA from '@/components/home/FinalCTA';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import './events.css';

/* ─── animation helpers ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
});
const stagger = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } }
});
const inView = { once: true, margin: '-80px' };

/* ─── marquee data ─── */
const marqueeItems = [
  'AHGV BUILDVERSE 2026', 'HACK ENERGY 2.0', 'AI FOUNDERS SUMMIT',
  'HACK ENERGY 1.0', '24 OCT 2026', 'DELHI NCR', 'FREE ENTRY',
  '₹15,000 PRIZE', '₹50K+ AI CREDITS', 'REGISTER NOW',
];

/* ─── Animated SVG for featured visual panel ─── */
function BuildverseIllus() {
  const nodes = [
    { x: 200, y: 140, r: 30, label: 'IDEA' },
    { x: 100, y: 220, r: 20, label: 'PPT' },
    { x: 300, y: 220, r: 20, label: 'CODE' },
    { x: 150, y: 310, r: 18, label: 'TEST' },
    { x: 250, y: 310, r: 18, label: 'BUILD' },
    { x: 200, y: 390, r: 25, label: '🚀' },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]];

  return (
    <svg viewBox="0 0 400 460" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '80%', maxWidth: 340, height: 'auto', position: 'relative', zIndex: 1 }}>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(47,128,255,0.4)" strokeWidth="2" strokeDasharray="6 4"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.2, delay: i * 0.2, ease: 'easeOut' }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.g key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <motion.circle cx={n.x} cy={n.y} r={n.r}
            fill={i === nodes.length - 1 ? 'rgba(47,128,255,0.9)' : 'rgba(255,255,255,0.08)'}
            stroke={i === nodes.length - 1 ? '#2F80FF' : 'rgba(255,255,255,0.2)'}
            strokeWidth="1.5"
            animate={i === nodes.length - 1
              ? { scale: [1, 1.12, 1], boxShadow: ['0 0 0 0 rgba(47,128,255,0)', '0 0 0 12px rgba(47,128,255,0.2)', '0 0 0 0 rgba(47,128,255,0)'] }
              : { y: [0, -4, 0] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          />
          <text x={n.x} y={n.y + 4} textAnchor="middle"
            fontSize={n.r > 22 ? '9' : '7'} fontWeight="700"
            fill={i === nodes.length - 1 ? 'white' : 'rgba(255,255,255,0.6)'}>
            {n.label}
          </text>
        </motion.g>
      ))}
      {/* Ping from last node */}
      <motion.circle cx={nodes[5].x} cy={nodes[5].y} r={nodes[5].r}
        stroke="rgba(47,128,255,0.5)" strokeWidth="2" fill="none"
        animate={{ r: [25, 55, 25], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
      />
      {/* Title */}
      <text x="200" y="50" textAnchor="middle" fontSize="13" fontWeight="900"
        fill="rgba(255,255,255,0.15)" letterSpacing="-1">BUILDVERSE</text>
      <text x="200" y="70" textAnchor="middle" fontSize="9" fontWeight="700"
        fill="rgba(255,255,255,0.08)" letterSpacing="4">PROBLEM → IDEA → BUILD → LAUNCH</text>
    </svg>
  );
}

/* ─── Past event card visual illustrations ─── */
function HackEnergy2Illus() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '60%', height: 'auto', position: 'relative', zIndex: 1 }}>
      {/* Lightning bolts */}
      {[0, 1, 2].map(i => (
        <motion.path key={i}
          d={`M${90 + i * 50} 30 L${80 + i * 50} 75 L${95 + i * 50} 75 L${85 + i * 50} 130`}
          stroke={['#FBBF24','#FB923C','#FBBF24'][i]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          style={{ transformOrigin: `${90 + i * 50}px 80px` }}
        />
      ))}
      <text x="140" y="155" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.15)" letterSpacing="3">HACK ENERGY 2.0</text>
    </svg>
  );
}

function HackEnergy1Illus() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '60%', height: 'auto', position: 'relative', zIndex: 1 }}>
      {/* Flame */}
      <motion.path d="M140 140 Q100 120 110 85 Q115 65 140 50 Q140 80 155 90 Q165 60 155 30 Q185 50 175 90 Q180 120 140 140Z"
        fill="rgba(251,146,60,0.5)" stroke="#FB923C" strokeWidth="1.5"
        animate={{ scale: [1, 1.05, 0.97, 1], y: [0, -4, 2, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '140px 90px' }}
      />
      <motion.path d="M140 130 Q118 115 125 90 Q128 75 140 65 Q140 85 150 92 Q155 72 148 48 Q168 64 162 90 Q166 112 140 130Z"
        fill="rgba(252,211,77,0.6)" stroke="#FCD34D" strokeWidth="1"
        animate={{ scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        style={{ transformOrigin: '140px 89px' }}
      />
      <text x="140" y="155" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.15)" letterSpacing="3">HACK ENERGY 1.0</text>
    </svg>
  );
}

function AISummitIllus() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '70%', height: 'auto', position: 'relative', zIndex: 1 }}>
      {/* Brain circuit */}
      <motion.circle cx="140" cy="80" r="40"
        stroke="rgba(167,139,250,0.5)" strokeWidth="2" fill="rgba(167,139,250,0.05)"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: '140px 80px' }}
      />
      {[45,90,135,180,225,270,315,360].map((deg, i) => (
        <motion.g key={i}>
          <motion.line
            x1={140 + 40 * Math.cos((deg * Math.PI) / 180)}
            y1={80  + 40 * Math.sin((deg * Math.PI) / 180)}
            x2={140 + 60 * Math.cos((deg * Math.PI) / 180)}
            y2={80  + 60 * Math.sin((deg * Math.PI) / 180)}
            stroke="rgba(167,139,250,0.4)" strokeWidth="1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
          <motion.circle
            cx={140 + 65 * Math.cos((deg * Math.PI) / 180)}
            cy={80  + 65 * Math.sin((deg * Math.PI) / 180)}
            r="5" fill="rgba(167,139,250,0.6)"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            style={{ transformOrigin: `${140 + 65 * Math.cos((deg * Math.PI) / 180)}px ${80 + 65 * Math.sin((deg * Math.PI) / 180)}px` }}
          />
        </motion.g>
      ))}
      <text x="140" y="84" textAnchor="middle" fontSize="11" fontWeight="900" fill="rgba(167,139,250,0.8)">AI</text>
      <text x="140" y="155" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.15)" letterSpacing="2">AI FOUNDERS SUMMIT</text>
    </svg>
  );
}

const pastIllus = [HackEnergy2Illus, HackEnergy1Illus, AISummitIllus];

/* ─── PAGE ─── */
export default function EventsPage() {
  const featuredEvent = eventsData.find(e => e.featured);
  const pastEvents    = eventsData.filter(e => !e.featured);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY    = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const parallaxFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <div className="events-page">

        {/* ══════════════════════════════════
            HERO — KINETIC TYPOGRAPHY
        ══════════════════════════════════ */}
        <section className="events-hero" ref={heroRef}>
          <div className="events-bg-grid" />
          <div className="events-hero-orb-1" />
          <div className="events-hero-orb-2" />

          <motion.div
            className="events-hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="events-hero-badge-dot" />
            HackGyanVerse Events
          </motion.div>

          <motion.div
            className="events-hero-title-wrap"
            style={{ y: parallaxY, opacity: parallaxFade }}
            variants={stagger(0.3)}
            initial="hidden"
            animate="visible"
          >
            {/* Line 1 */}
            <div className="events-hero-line">
              <motion.span className="events-hero-word" variants={fadeUp()}>WHERE</motion.span>
              <motion.div className="events-hero-chip" variants={fadeUp()}>
                <span className="events-hero-chip-dot" />
                Students Build
              </motion.div>
            </div>

            {/* Line 2 */}
            <div className="events-hero-line">
              <motion.span className="events-hero-word outline" variants={fadeUp()}>IDEAS</motion.span>
              <motion.span className="events-hero-word" variants={fadeUp()}>BECOME</motion.span>
            </div>

            {/* Line 3 */}
            <div className="events-hero-line">
              <motion.div className="events-hero-pill" variants={fadeUp()}>
                🏆 PRODUCTS
              </motion.div>
            </div>

            {/* Line 4 */}
            <div className="events-hero-line">
              <motion.span className="events-hero-word" variants={fadeUp()}>NEXT</motion.span>
              <motion.div className="events-hero-date-pill" variants={fadeUp()}>
                📅 24 Oct 2026
              </motion.div>
              <motion.span className="events-hero-word blue" variants={fadeUp()}>UP.</motion.span>
            </div>
          </motion.div>

          <motion.p
            className="events-hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Hackathons, summits, and meetups where students work on real problems,
            gain industry exposure, and launch meaningful solutions.
          </motion.p>

          <motion.div
            className="events-hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            {featuredEvent?.registrationLink && (
              <a href={featuredEvent.registrationLink} target="_blank" rel="noopener noreferrer" className="events-btn-orange">
                Register for AHGV 2026 →
              </a>
            )}
            <a href="#past-events" className="events-btn-primary">
              View Past Events
            </a>
          </motion.div>
        </section>

        {/* ══════════════════════════════════
            DARK MARQUEE BAND
        ══════════════════════════════════ */}
        <div className="events-band">
          <div className="events-band-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="events-band-item">
                <span className="events-band-dot" />
                <span className="events-band-text">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            FEATURED EVENT
        ══════════════════════════════════ */}
        {featuredEvent && (
          <section className="events-featured">
            <div className="events-bg-grid" />
            <div className="events-section-inner" style={{ position: 'relative', zIndex: 2 }}>
              <motion.div
                initial="hidden" whileInView="visible" viewport={inView}
                variants={stagger()}
              >
                <motion.p variants={fadeUp()} className="events-section-label">01 — Upcoming event</motion.p>
                <motion.h2 variants={fadeUp()} className="events-giant-title">
                  Now <em>building</em><br />& accepting teams.
                </motion.h2>
              </motion.div>

              <motion.div
                className="events-featured-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Left: dark visual */}
                <div className="events-featured-visual">
                  <div className="events-featured-visual-bg" />
                  <div className="events-featured-watermark">AHGV</div>
                  <div className="events-featured-badge">
                    <span className="events-featured-badge-dot" />
                    Now Building
                  </div>
                  <BuildverseIllus />
                  <div className="events-featured-date-tag">
                    📅 {ahgvData.details.grandFinale}
                  </div>
                </div>

                {/* Right: info */}
                <div className="events-featured-info">
                  <span className="events-featured-category">🏆 {featuredEvent.category}</span>
                  <h3 className="events-featured-name">{featuredEvent.name}</h3>
                  <p className="events-featured-desc">{featuredEvent.description}</p>

                  <div className="events-featured-meta">
                    <div className="events-featured-meta-item">
                      <div className="events-featured-meta-label">Date</div>
                      <div className="events-featured-meta-value">{ahgvData.details.grandFinale}</div>
                    </div>
                    <div className="events-featured-meta-item">
                      <div className="events-featured-meta-label">Venue</div>
                      <div className="events-featured-meta-value">{ahgvData.details.venue}</div>
                    </div>
                    <div className="events-featured-meta-item">
                      <div className="events-featured-meta-label">Team Size</div>
                      <div className="events-featured-meta-value">{ahgvData.details.teamSize}</div>
                    </div>
                    <div className="events-featured-meta-item">
                      <div className="events-featured-meta-label">Entry</div>
                      <div className="events-featured-meta-value" style={{ color: '#16A34A' }}>
                        {ahgvData.details.participation}
                      </div>
                    </div>
                    <div className="events-featured-meta-item">
                      <div className="events-featured-meta-label">Prize Pool</div>
                      <div className="events-featured-meta-value" style={{ color: '#D97706' }}>₹15,000+</div>
                    </div>
                    <div className="events-featured-meta-item">
                      <div className="events-featured-meta-label">Format</div>
                      <div className="events-featured-meta-value">{ahgvData.details.format} · {ahgvData.details.duration}</div>
                    </div>
                  </div>

                  <div className="events-featured-ctas">
                    {featuredEvent.registrationLink && (
                      <a href={featuredEvent.registrationLink} target="_blank" rel="noopener noreferrer" className="events-btn-orange">
                        Register Free →
                      </a>
                    )}
                    <Link href={`/events/${featuredEvent.slug}`} className="events-btn-primary">
                      Explore Event
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════
            PAST EVENTS
        ══════════════════════════════════ */}
        <section className="events-past" id="past-events">
          <div className="events-section-inner">
            <motion.div
              initial="hidden" whileInView="visible" viewport={inView}
              variants={stagger()}
            >
              <motion.p variants={fadeUp()} className="events-section-label">02 — Previous events</motion.p>
              <motion.h2 variants={fadeUp()} className="events-giant-title">
                Events we&apos;ve<br />already <em>shipped</em>.
              </motion.h2>
            </motion.div>

            <motion.div
              className="events-past-grid"
              variants={stagger(0.07)}
              initial="hidden" whileInView="visible" viewport={inView}
            >
              {pastEvents.map((event, i) => {
                const Illus = pastIllus[i] ?? pastIllus[0];
                return (
                  <motion.div key={event.slug} variants={fadeUp()} className="events-past-card">
                    {/* Visual header */}
                    <div className="events-past-card-visual">
                      <div className="events-past-card-visual-grid" />
                      <div className="events-past-card-wm">
                        {event.name.slice(0, 4)}
                      </div>
                      <div className="events-past-card-status">{event.status}</div>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Illus />
                      </div>
                    </div>
                    {/* Body */}
                    <div className="events-past-card-body">
                      <span className="events-past-card-cat">{event.category}</span>
                      <h3 className="events-past-card-name">{event.name}</h3>
                      <p className="events-past-card-desc">{event.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CTA BAND
        ══════════════════════════════════ */}
        <section className="events-cta-band">
          <div className="events-bg-grid" />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={inView}
              variants={stagger()}
            >
              <motion.h2 variants={fadeUp()} className="events-cta-band-title">
                Ready to <span>build</span><br />something real?
              </motion.h2>
              <motion.p variants={fadeUp()} className="events-cta-band-sub">
                Join AHGV Buildverse 2026 — the next-level industry hackathon by HackGyanVerse.
              </motion.p>
              <motion.div variants={fadeUp()} className="events-cta-band-btns">
                {featuredEvent?.registrationLink && (
                  <a href={featuredEvent.registrationLink} target="_blank" rel="noopener noreferrer" className="events-btn-orange">
                    Register Free — It&apos;s Free →
                  </a>
                )}
                <Link href={`/events/${featuredEvent?.slug}`} className="events-btn-primary">
                  Explore Event Details
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </div>

      <FinalCTA />
    </>
  );
}
