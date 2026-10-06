'use client';

import { communityData } from '@/data/community';
import FinalCTA from '@/components/home/FinalCTA';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import './about.css';

/* ─── animation variants ─── */
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

/** Round trig values to 4dp so SSR and client produce identical strings (prevents hydration mismatch) */
const snap = (n: number) => Math.round(n * 10000) / 10000;

/* ─── data ─── */
const stats = [
  { num: '10K+', label: 'Students Impacted' },
  { num: '25+',  label: 'Events Organised' },
  { num: '5+',   label: 'Active Communities' },
  { num: '100+', label: 'Projects Built' },
  { num: '3+',   label: 'Years Running' },
  { num: '∞',    label: 'Opportunities' },
];

const whoWeArePills = ['Build', 'Learn', 'Collaborate', 'Participate', 'Lead', 'Network', 'Real-world impact'];
const whoWeAreTags  = ['Student-driven', 'Innovation-first', 'Community-led', 'Classroom to career'];

const journeySteps = [
  { label: 'Learn',       num: '01', IllusComponent: JLearnIllus },
  { label: 'Build',       num: '02', IllusComponent: JBuildIllus },
  { label: 'Collaborate', num: '03', IllusComponent: JCollabIllus },
  { label: 'Lead',        num: '04', IllusComponent: JLeadIllus },
  { label: 'Grow',        num: '05', IllusComponent: JGrowIllus },
];

/* ─── Journey step SVG illustrations ─── */

/** Learn — open book with animated page-turn line */
function JLearnIllus({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 72, height: 62 }}>
      {/* Left page */}
      <motion.path d="M40 10 L12 16 L12 58 L40 52 Z"
        fill={active ? 'rgba(255,255,255,0.15)' : '#EFF6FF'}
        stroke={active ? 'rgba(255,255,255,0.5)' : '#BFDBFE'} strokeWidth="1.5"
        animate={{ rotateY: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '40px 34px' }}
      />
      {/* Right page */}
      <motion.path d="M40 10 L68 16 L68 58 L40 52 Z"
        fill={active ? 'rgba(255,255,255,0.1)' : '#DBEAFE'}
        stroke={active ? 'rgba(255,255,255,0.4)' : '#93C5FD'} strokeWidth="1.5"
        animate={{ rotateY: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        style={{ transformOrigin: '40px 34px' }}
      />
      {/* Spine */}
      <line x1="40" y1="10" x2="40" y2="52" stroke={active ? 'rgba(255,255,255,0.4)' : '#94A3B8'} strokeWidth="2" strokeLinecap="round" />
      {/* Text lines left */}
      <line x1="17" y1="26" x2="35" y2="24" stroke={active ? 'rgba(255,255,255,0.3)' : '#BFDBFE'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="33" x2="34" y2="31" stroke={active ? 'rgba(255,255,255,0.2)' : '#BFDBFE'} strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="40" x2="33" y2="38" stroke={active ? 'rgba(255,255,255,0.2)' : '#BFDBFE'} strokeWidth="1" strokeLinecap="round" />
      {/* Progress bar right */}
      <rect x="44" y="24" width="20" height="4" rx="2" fill={active ? 'rgba(255,255,255,0.15)' : '#DBEAFE'} />
      <motion.rect x="44" y="24" height="4" rx="2" fill={active ? 'rgba(255,255,255,0.6)' : '#2F80FF'}
        animate={{ width: [4, 18, 4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <rect x="44" y="32" width="20" height="4" rx="2" fill={active ? 'rgba(255,255,255,0.15)' : '#DBEAFE'} />
      <motion.rect x="44" y="32" height="4" rx="2" fill={active ? 'rgba(255,255,255,0.6)' : '#60A5FA'}
        animate={{ width: [14, 8, 14] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
    </svg>
  );
}

/** Build — gear with orbiting bolt */
function JBuildIllus({ active }: { active: boolean }) {
  const stroke = active ? 'rgba(255,255,255,0.7)' : '#94A3B8';
  const fill   = active ? 'rgba(255,255,255,0.12)' : '#F1F5F9';
  const accent = active ? 'rgba(255,255,255,0.9)' : '#2F80FF';
  return (
    <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 72, height: 62 }}>
      {/* Gear outer */}
      <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '40px 36px' }}>
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <rect key={i}
            x={snap(40 + 22 * Math.cos((deg * Math.PI) / 180)) - 3}
            y={snap(36 + 22 * Math.sin((deg * Math.PI) / 180)) - 5}
            width="6" height="10" rx="2"
            fill={fill} stroke={stroke} strokeWidth="1.2"
            transform={`rotate(${deg} ${snap(40 + 22 * Math.cos((deg * Math.PI) / 180))} ${snap(36 + 22 * Math.sin((deg * Math.PI) / 180))})`}
          />
        ))}
        <circle cx="40" cy="36" r="18" fill={fill} stroke={stroke} strokeWidth="1.8" />
        <circle cx="40" cy="36" r="8" fill={active ? 'rgba(255,255,255,0.2)' : '#E2E8F0'} stroke={stroke} strokeWidth="1.5" />
      </motion.g>
      {/* Code brackets inside gear */}
      <text x="40" y="40" textAnchor="middle" fontSize="10" fontWeight="900" fill={accent}>{'{}'}</text>
      {/* Orbiting bolt */}
      <motion.g animate={{ rotate: [0, -360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '40px 36px' }}>
        <text x="65" y="14" fontSize="12" fill="#FBBF24">⚡</text>
      </motion.g>
    </svg>
  );
}

/** Collaborate — 3 nodes connecting with animated edges */
function JCollabIllus({ active }: { active: boolean }) {
  const nodes = [
    { cx: 40, cy: 16, r: 10 },
    { cx: 14, cy: 54, r: 9 },
    { cx: 66, cy: 54, r: 9 },
  ];
  const edges = [[0,1],[0,2],[1,2]];
  return (
    <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 72, height: 62 }}>
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke={active ? 'rgba(255,255,255,0.5)' : '#BFDBFE'} strokeWidth="2" strokeDasharray="4 3"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={i}
          animate={{ y: [0, i === 0 ? -5 : 4, 0] }}
          transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        >
          <circle cx={n.cx} cy={n.cy} r={n.r}
            fill={i === 0 ? (active ? 'rgba(255,255,255,0.3)' : '#2F80FF') : (active ? 'rgba(255,255,255,0.15)' : '#EFF6FF')}
            stroke={active ? 'rgba(255,255,255,0.6)' : (i === 0 ? '#2F80FF' : '#BFDBFE')}
            strokeWidth="1.8"
          />
          <text x={n.cx} y={n.cy + 4} textAnchor="middle" fontSize="9" fill={active ? 'white' : (i === 0 ? 'white' : '#64748B')} fontWeight="700">
            {['♥','✓','✓'][i]}
          </text>
        </motion.g>
      ))}
      {/* Ping wave from top node */}
      <motion.circle cx="40" cy="16" r="10"
        stroke={active ? 'rgba(255,255,255,0.4)' : '#BFDBFE'} strokeWidth="1.5" fill="none"
        animate={{ r: [10, 28, 10], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
    </svg>
  );
}

/** Lead — podium with animated rising bars */
function JLeadIllus({ active }: { active: boolean }) {
  const bars = [
    { x: 8,  h: 28, color: '#60A5FA', activeColor: 'rgba(255,255,255,0.5)', place: '2' },
    { x: 28, h: 42, color: '#FBBF24', activeColor: 'rgba(255,255,255,0.9)', place: '1' },
    { x: 48, h: 20, color: '#34D399', activeColor: 'rgba(255,255,255,0.4)', place: '3' },
  ];
  return (
    <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 72, height: 62 }}>
      {/* Base line */}
      <line x1="4" y1="62" x2="76" y2="62" stroke={active ? 'rgba(255,255,255,0.3)' : '#E2E8F0'} strokeWidth="2" strokeLinecap="round" />
      {bars.map((b, i) => (
        <g key={i}>
          {/* Bar */}
          <motion.rect
            x={b.x} y={62 - b.h} width="22" height={b.h} rx="4"
            fill={active ? b.activeColor : b.color}
            animate={{ height: [b.h * 0.6, b.h, b.h * 0.8, b.h] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            style={{ transformOrigin: `${b.x + 11}px 62px` }}
          />
          {/* Place label */}
          <text x={b.x + 11} y={62 - b.h - 6} textAnchor="middle" fontSize="11" fontWeight="900"
            fill={active ? 'rgba(255,255,255,0.8)' : (b.place === '1' ? '#F59E0B' : '#64748B')}>
            {b.place === '1' ? '★' : b.place}
          </text>
        </g>
      ))}
      {/* Crown above 1st bar */}
      <motion.text x="39" y="12" textAnchor="middle" fontSize="14"
        animate={{ y: [12, 6, 12], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '39px 10px' } as React.CSSProperties}
      >👑</motion.text>
    </svg>
  );
}

/** Grow — upward arrow with star burst */
function JGrowIllus({ active }: { active: boolean }) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 72, height: 62 }}>
      {/* Star burst rays */}
      {rays.map((deg, i) => (
        <motion.line key={i}
          x1={snap(40 + 14 * Math.cos((deg * Math.PI) / 180))}
          y1={snap(32 + 14 * Math.sin((deg * Math.PI) / 180))}
          x2={snap(40 + 26 * Math.cos((deg * Math.PI) / 180))}
          y2={snap(32 + 26 * Math.sin((deg * Math.PI) / 180))}
          stroke={active ? 'rgba(255,255,255,0.7)' : '#FBBF24'} strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
          style={{ transformOrigin: '40px 32px' } as React.CSSProperties}
        />
      ))}
      {/* Central glow circle */}
      <motion.circle cx="40" cy="32" r="14"
        fill={active ? 'rgba(255,255,255,0.2)' : '#FEF9C3'}
        stroke={active ? 'rgba(255,255,255,0.6)' : '#FBBF24'} strokeWidth="2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        style={{ transformOrigin: '40px 32px' }}
      />
      {/* Upward arrow */}
      <motion.path d="M40 42 L40 18 M33 26 L40 18 L47 26"
        stroke={active ? 'rgba(255,255,255,0.9)' : '#F59E0B'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Sparkles */}
      {[[12, 12], [64, 18], [16, 54], [62, 55]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="3"
          fill={['#2F80FF','#A78BFA','#34D399','#FB923C'][i]}
          animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.25 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}

const whatWeDo = [
  { title: 'Innovation',    desc: 'Students get a platform to explore ideas and turn them into real projects.', color: 'c1', IllusComponent: InnovationIllus },
  { title: 'Hackathons',   desc: 'Problem-solving, coding and innovation challenges that push boundaries.',   color: 'c2', IllusComponent: HackathonIllus },
  { title: 'Events',       desc: 'Tech events, workshops, talks, community sessions and networking.',          color: 'c3', IllusComponent: EventsIllus },
  { title: 'Learning',     desc: 'Peer learning, technical exposure and practical skill development.',         color: 'c4', IllusComponent: LearningIllus },
  { title: 'Opportunities',desc: 'Internships, competitions, collaborations and career exposure.',             color: 'c5', IllusComponent: OpportunitiesIllus },
  { title: 'Community',    desc: 'A network of students, builders, organizers and active learners.',           color: 'c6', IllusComponent: CommunityIllus },
];

/* ══════════════════════════════════════════════
   ANIMATED SVG ILLUSTRATIONS — one per card
══════════════════════════════════════════════ */

/** 1. Innovation — lightbulb with orbiting idea particles */
function InnovationIllus() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Glow */}
      <motion.circle cx="100" cy="72" r="38"
        fill="rgba(47,128,255,0.08)"
        animate={{ r: [38, 48, 38], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bulb body */}
      <motion.path
        d="M100 36 C82 36 70 50 70 66 C70 78 78 86 84 92 L116 92 C122 86 130 78 130 66 C130 50 118 36 100 36Z"
        fill="#EFF6FF" stroke="#2F80FF" strokeWidth="2"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '100px 64px' }}
      />
      {/* Filament lines */}
      <line x1="88" y1="92" x2="112" y2="92" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />
      <line x1="90" y1="98" x2="110" y2="98" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />
      <line x1="93" y1="104" x2="107" y2="104" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />
      {/* Inner glow dot */}
      <motion.circle cx="100" cy="66" r="10" fill="#2F80FF" opacity="0.8"
        animate={{ opacity: [0.8, 0.4, 0.8], scale: [1, 1.2, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        style={{ transformOrigin: '100px 66px' }}
      />
      {/* Orbiting idea particles */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <motion.circle
          key={i} r="4"
          fill={['#2F80FF','#60A5FA','#A78BFA','#34D399','#FBBF24'][i]}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'linear' }}
          style={{
            transformOrigin: '100px 66px',
            cx: snap(100 + 38 * Math.cos((deg * Math.PI) / 180)),
            cy: snap(66 + 38 * Math.sin((deg * Math.PI) / 180)),
          } as React.CSSProperties & { cx: number; cy: number }}
        />
      ))}
      {/* Rays */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.line
          key={i}
          x1={snap(100 + 42 * Math.cos((deg * Math.PI) / 180))}
          y1={snap(66 + 42 * Math.sin((deg * Math.PI) / 180))}
          x2={snap(100 + 55 * Math.cos((deg * Math.PI) / 180))}
          y2={snap(66 + 55 * Math.sin((deg * Math.PI) / 180))}
          stroke="#2F80FF" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
          style={{ transformOrigin: '100px 66px' } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

/** 2. Hackathons — trophy with confetti */
function HackathonIllus() {
  const confetti = [
    { x: 30,  y: 30,  color: '#2F80FF',  size: 8,  shape: 'rect' },
    { x: 160, y: 25,  color: '#FBBF24',  size: 7,  shape: 'circle' },
    { x: 50,  y: 120, color: '#34D399',  size: 6,  shape: 'rect' },
    { x: 155, y: 110, color: '#F472B6',  size: 8,  shape: 'circle' },
    { x: 20,  y: 70,  color: '#A78BFA',  size: 5,  shape: 'rect' },
    { x: 170, y: 70,  color: '#FB923C',  size: 6,  shape: 'circle' },
    { x: 90,  y: 15,  color: '#60A5FA',  size: 7,  shape: 'rect' },
    { x: 130, y: 135, color: '#34D399',  size: 5,  shape: 'circle' },
  ];
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Confetti */}
      {confetti.map((c, i) =>
        c.shape === 'rect' ? (
          <motion.rect key={i} x={c.x} y={c.y} width={c.size} height={c.size} rx="2" fill={c.color}
            animate={{ y: [c.y, c.y + 15, c.y], rotate: [0, 180, 360], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            style={{ transformOrigin: `${c.x + c.size / 2}px ${c.y + c.size / 2}px` } as React.CSSProperties}
          />
        ) : (
          <motion.circle key={i} cx={c.x} cy={c.y} r={c.size / 2} fill={c.color}
            animate={{ cy: [c.y, c.y - 12, c.y], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8 + i * 0.25, repeat: Infinity, delay: i * 0.15 }}
          />
        )
      )}
      {/* Trophy base */}
      <rect x="80" y="118" width="40" height="8" rx="4" fill="#FBBF24" />
      <rect x="70" y="126" width="60" height="8" rx="4" fill="#F59E0B" />
      {/* Trophy stem */}
      <rect x="93" y="106" width="14" height="14" fill="#FCD34D" />
      {/* Trophy cup */}
      <motion.path
        d="M65 50 L75 106 L125 106 L135 50 Z"
        fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: '100px 78px' }}
      />
      {/* Cup handles */}
      <path d="M65 58 Q42 70 55 90 Q60 98 75 90" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M135 58 Q158 70 145 90 Q140 98 125 90" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Star on trophy */}
      <motion.text x="100" y="84" textAnchor="middle" fontSize="20" fill="#F59E0B"
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ transformOrigin: '100px 80px' } as React.CSSProperties}
      >★</motion.text>
    </svg>
  );
}

/** 3. Events — animated calendar with event dots */
function EventsIllus() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Calendar body */}
      <rect x="30" y="45" width="140" height="105" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      {/* Header */}
      <rect x="30" y="45" width="140" height="32" rx="12" fill="#FB923C" />
      <rect x="30" y="65" width="140" height="12" fill="#FB923C" />
      {/* Calendar hooks */}
      <rect x="65" y="36" width="10" height="20" rx="5" fill="#FB923C" />
      <rect x="125" y="36" width="10" height="20" rx="5" fill="#FB923C" />
      {/* Month text */}
      <text x="100" y="67" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">HackGyanVerse</text>
      {/* Day grid dots */}
      {[0,1,2,3,4,5,6].map(col =>
        [0,1,2].map(row => {
          const cx = 47 + col * 18;
          const cy = 100 + row * 18;
          const isEvent = (col === 1 && row === 0) || (col === 3 && row === 1) || (col === 5 && row === 0) || (col === 2 && row === 2);
          return (
            <motion.circle key={`${col}-${row}`} cx={cx} cy={cy} r={isEvent ? 7 : 4}
              fill={isEvent ? '#FB923C' : '#F1F5F9'}
              stroke={isEvent ? '#FED7AA' : 'none'} strokeWidth={isEvent ? 2 : 0}
              animate={isEvent ? { scale: [1, 1.25, 1], opacity: [1, 0.7, 1] } : {}}
              transition={{ duration: 1.5 + col * 0.2, repeat: Infinity, delay: col * 0.15 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          );
        })
      )}
      {/* Floating notification badge */}
      <motion.g
        animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '155px 50px' }}
      >
        <circle cx="155" cy="50" r="14" fill="#2F80FF" />
        <text x="155" y="55" textAnchor="middle" fontSize="13" fill="white">!</text>
      </motion.g>
    </svg>
  );
}

/** 4. Learning — open book with animated progress */
function LearningIllus() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Book shadow */}
      <ellipse cx="100" cy="140" rx="55" ry="8" fill="rgba(0,0,0,0.05)" />
      {/* Left page */}
      <motion.path
        d="M100 40 L45 50 L45 130 L100 120 Z"
        fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2"
        animate={{ rotateY: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '100px 80px' }}
      />
      {/* Right page */}
      <motion.path
        d="M100 40 L155 50 L155 130 L100 120 Z"
        fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="2"
        animate={{ rotateY: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
        style={{ transformOrigin: '100px 80px' }}
      />
      {/* Spine */}
      <line x1="100" y1="40" x2="100" y2="120" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      {/* Left page lines */}
      <motion.line x1="55" y1="68" x2="90" y2="66" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round"
        animate={{ x2: [90, 70, 90] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <line x1="55" y1="78" x2="90" y2="76" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="55" y1="88" x2="85" y2="86" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="55" y1="98" x2="88" y2="96" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
      {/* Right page — progress bar */}
      <rect x="108" y="65" width="40" height="6" rx="3" fill="#DCFCE7" />
      <motion.rect x="108" y="65" height="6" rx="3" fill="#22C55E"
        animate={{ width: [8, 38, 8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <rect x="108" y="78" width="40" height="6" rx="3" fill="#DCFCE7" />
      <motion.rect x="108" y="78" height="6" rx="3" fill="#22C55E"
        animate={{ width: [20, 35, 20] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <rect x="108" y="91" width="40" height="6" rx="3" fill="#DCFCE7" />
      <motion.rect x="108" y="91" height="6" rx="3" fill="#22C55E"
        animate={{ width: [35, 15, 35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      {/* Floating knowledge star */}
      <motion.g animate={{ y: [0, -10, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 2.8, repeat: Infinity }}
        style={{ transformOrigin: '148px 45px' }}
      >
        <circle cx="148" cy="45" r="13" fill="#FEF9C3" stroke="#FDE047" strokeWidth="2" />
        <text x="148" y="50" textAnchor="middle" fontSize="13">✦</text>
      </motion.g>
    </svg>
  );
}

/** 5. Opportunities — rocket launch */
function OpportunitiesIllus() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Stars */}
      {[[20,25],[170,30],[40,80],[175,90],[155,55],[30,50]].map(([x,y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2" fill="#A78BFA"
          animate={{ opacity: [1, 0.1, 1], scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      {/* Exhaust flame */}
      <motion.path
        d="M88 118 Q100 145 112 118"
        fill="#FB923C" opacity="0.7"
        animate={{ scaleY: [1, 1.4, 0.8, 1.2, 1], opacity: [0.7, 1, 0.5, 0.9, 0.7] }}
        transition={{ duration: 0.4, repeat: Infinity }}
        style={{ transformOrigin: '100px 118px' }}
      />
      <motion.path
        d="M92 112 Q100 132 108 112"
        fill="#FBBF24"
        animate={{ scaleY: [1, 1.5, 0.8, 1.3, 1] }}
        transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
        style={{ transformOrigin: '100px 112px' }}
      />
      {/* Rocket body */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '100px 80px' }}
      >
        {/* Main body */}
        <path d="M85 115 Q85 70 100 40 Q115 70 115 115 Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
        {/* Nose cone */}
        <path d="M92 68 Q100 40 108 68 Z" fill="#A78BFA" />
        {/* Window */}
        <circle cx="100" cy="82" r="9" fill="#FFFFFF" stroke="#A78BFA" strokeWidth="2" />
        <motion.circle cx="100" cy="82" r="5" fill="#A78BFA"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: '100px 82px' }}
        />
        {/* Fins */}
        <path d="M85 115 L70 130 L85 105 Z" fill="#C4B5FD" stroke="#A78BFA" strokeWidth="1.5" />
        <path d="M115 115 L130 130 L115 105 Z" fill="#C4B5FD" stroke="#A78BFA" strokeWidth="1.5" />
      </motion.g>
      {/* Orbit arc */}
      <motion.path
        d="M40 100 Q100 30 160 100"
        stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="5 4" fill="none"
        animate={{ strokeDashoffset: [0, -100] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}

/** 6. Community — animated peer network */
function CommunityIllus() {
  const nodes = [
    { cx: 100, cy: 75,  r: 22, main: true,  color: '#2F80FF', labelColor: 'white' },
    { cx: 45,  cy: 45,  r: 14, main: false, color: '#EFF6FF', stroke: '#BFDBFE' },
    { cx: 155, cy: 45,  r: 12, main: false, color: '#F0FDF4', stroke: '#BBF7D0' },
    { cx: 35,  cy: 115, r: 13, main: false, color: '#F5F3FF', stroke: '#DDD6FE' },
    { cx: 165, cy: 115, r: 15, main: false, color: '#FFF7ED', stroke: '#FED7AA' },
    { cx: 100, cy: 140, r: 11, main: false, color: '#FFF1F2', stroke: '#FECDD3' },
  ];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,2],[3,5],[4,5]];
  return (
    <svg viewBox="0 0 200 165" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="#BFDBFE" strokeWidth="2" strokeDasharray="5 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.4, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.g key={i}
          animate={n.main ? { scale: [1, 1.08, 1] } : { y: [0, -4, 0] }}
          transition={{ duration: n.main ? 2 : 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        >
          <circle cx={n.cx} cy={n.cy} r={n.r}
            fill={n.color}
            stroke={n.main ? '#2F80FF' : (n as any).stroke}
            strokeWidth="2"
          />
          {n.main && (
            <text x={n.cx} y={n.cy + 4} textAnchor="middle"
              fontSize="8" fontWeight="800" fill="white">HGV</text>
          )}
          {!n.main && (
            <circle cx={n.cx} cy={n.cy} r={n.r * 0.4} fill={(n as any).stroke} opacity="0.7" />
          )}
        </motion.g>
      ))}
      {/* Ping wave from center */}
      <motion.circle cx="100" cy="75" r="22"
        stroke="#2F80FF" strokeWidth="2" fill="none"
        animate={{ r: [22, 55, 22], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
      />
    </svg>
  );
}

/* ─── Floating background illustration ─── */
function FloatIllus() {
  return (
    <motion.svg
      width="100%" viewBox="0 0 420 340" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.4, pointerEvents: 'none' }}
    >
      {[0,1,2,3,4,5].map(row =>
        [0,1,2,3,4,5,6,7].map(col => (
          <motion.circle key={`${row}-${col}`}
            cx={col * 60 + 10} cy={row * 60 + 10} r="2" fill="#2F80FF"
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: (row + col) * 0.18 }}
          />
        ))
      )}
      <motion.circle cx="320" cy="80" r="60" stroke="#2F80FF" strokeWidth="1.5" strokeDasharray="8 6"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '320px 80px' }}
      />
      <motion.rect x="30" y="200" width="50" height="50" rx="12" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '55px 225px' }}
      />
      <motion.polygon points="360,220 390,280 330,280" fill="#F5F3FF" stroke="#A78BFA" strokeWidth="2"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </motion.svg>
  );
}

/* ─── Animated community network illustration ─── */
function NetworkIllus() {
  const nodes = [
    { x: 210, y: 160, r: 28, main: true },
    { x: 80,  y: 80,  r: 18 },
    { x: 340, y: 80,  r: 16 },
    { x: 70,  y: 250, r: 20 },
    { x: 360, y: 250, r: 22 },
    { x: 210, y: 300, r: 15 },
  ];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,2],[3,5],[4,5]];

  return (
    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#BFDBFE" strokeWidth="2" strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <motion.circle
            cx={n.x} cy={n.y} r={n.r}
            fill={n.main ? '#2F80FF' : '#EFF6FF'}
            stroke={n.main ? '#2F80FF' : '#BFDBFE'}
            strokeWidth="2"
            animate={n.main ? { scale: [1, 1.08, 1] } : { y: [0, -5, 0] }}
            transition={{ duration: n.main ? 2 : 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
          {n.main && (
            <text x={n.x} y={n.y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="700">HGV</text>
          )}
        </motion.g>
      ))}
    </svg>
  );
}

/* ─── PAGE ─── */
export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY    = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const parallaxFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [hoveredJourney, setHoveredJourney] = useState<number | null>(null);

  return (
    <>
      <div className="about-page">

        {/* ══════════════════════════════════
            HERO — KINETIC TYPOGRAPHY
        ══════════════════════════════════ */}
        <section className="about-hero" ref={heroRef}>
          <div className="about-hero-noise" />
          <div className="about-hero-orb about-hero-orb-1" />
          <div className="about-hero-orb about-hero-orb-2" />
          <div className="about-hero-orb about-hero-orb-3" />

          {/* Badge */}
          <motion.div
            className="about-hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="about-hero-badge-dot" />
            About HackGyanVerse Community
          </motion.div>

          {/* Giant word-by-word title */}
          <motion.div
            className="about-hero-title-wrap"
            style={{ y: parallaxY, opacity: parallaxFade }}
            variants={stagger(0.3)}
            initial="hidden"
            animate="visible"
          >
            {/* Line 1 */}
            <div className="about-hero-line">
              <motion.span className="about-hero-word outline" variants={fadeUp(0)}>CLASSROOM</motion.span>
              <motion.span className="about-hero-word" variants={fadeUp(0)}>TO</motion.span>
            </div>

            {/* Line 2 */}
            <div className="about-hero-line">
              <motion.span className="about-hero-word blue" variants={fadeUp(0)}>CAREER</motion.span>
              <motion.span className="about-hero-word" variants={fadeUp(0)}>—</motion.span>
              <motion.span className="about-hero-word outline" variants={fadeUp(0)}>TOGETHER</motion.span>
            </div>
          </motion.div>

          {/* Subtitle + CTAs */}
          <motion.p
            className="about-hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            HackGyanVerse Community is a student-driven community focused on connecting students with technology, innovation, events, opportunities and collaborative experiences.
          </motion.p>

          <motion.div
            className="about-hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            <a href="https://chat.whatsapp.com/BbMMWNI2uLGCUEKXzrub30" target="_blank" rel="noopener noreferrer" className="about-btn-primary">
              Join WhatsApp Community →
            </a>
          </motion.div>
        </section>

        {/* ══════════════════════════════════
            STATS MARQUEE BAND
        ══════════════════════════════════ */}
        <div className="about-stats-band">
          <div className="about-stats-track">
            {[...stats, ...stats].map((s, i) => (
              <div key={i} className="about-stats-item">
                <span className="about-stats-item-num">{s.num}</span>
                <span className="about-stats-item-label">{s.label}</span>
                <span className="about-stats-sep">·</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            WHO WE ARE
        ══════════════════════════════════ */}
        <section className="about-who">
          <div className="about-section-inner">
            <motion.div
              initial="hidden" whileInView="visible" viewport={inView}
              variants={stagger()}
            >
              <motion.p variants={fadeUp()} className="about-section-label">01 — Who we are</motion.p>
              <motion.h2 variants={fadeUp()} className="about-giant-title">
                Who We Are
              </motion.h2>
            </motion.div>

            <div className="about-who-layout">
              {/* Left */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={inView}
                variants={stagger(0.1)}
              >
                <motion.p variants={fadeUp()} className="about-who-text">
                  HackGyanVerse Community is a student-driven community focused on connecting students
                  with technology, innovation, events, opportunities and collaborative experiences.
                </motion.p>
                <motion.div variants={fadeUp()} className="about-pills">
                  {whoWeArePills.map(p => (
                    <span key={p} className="about-pill">{p}</span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right — sticky card with network illustration */}
              <div className="about-who-illus">
                <motion.div
                  className="about-who-card"
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="about-who-card-bg" />

                  {/* Network illustration */}
                  <div style={{ width: '100%', height: '220px', position: 'relative', marginBottom: '1.5rem' }}>
                    <NetworkIllus />
                  </div>

                  <div className="about-who-card-quote">
                    &ldquo;The best way to learn is to&nbsp;
                    <span>build something real</span>
                    &nbsp;— together.&rdquo;
                  </div>
                  <div className="about-who-card-divider" />
                  <div className="about-who-card-tags">
                    {whoWeAreTags.map(t => (
                      <div key={t} className="about-who-card-tag">
                        <span className="about-who-card-tag-dot" />
                        {t}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            VISION — BIG STATEMENT
        ══════════════════════════════════ */}
        <section className="about-vision">
          <div className="about-vision-orb" />
          <div className="about-vision-inner">
            <motion.div
              initial="hidden" whileInView="visible" viewport={inView}
              variants={stagger()}
            >
              <motion.p variants={fadeUp()} className="about-section-label">02 — Our vision</motion.p>

              {/* Word-by-word animated vision statement */}
              <motion.div
                className="about-vision-statement"
                variants={stagger(0.05)}
                initial="hidden" whileInView="visible" viewport={inView}
              >
                {'To build a student community where every learner gets opportunities to learn build collaborate and move from classroom to career.'
                  .split(' ')
                  .map((word, i) => {
                    const highlights = ['learn', 'build', 'collaborate', 'classroom', 'career.'];
                    const underlines = ['every', 'opportunities'];
                    const isHighlight = highlights.includes(word.toLowerCase());
                    const isUnderline = underlines.includes(word.toLowerCase());
                    return (
                      <motion.span
                        key={i}
                        variants={fadeUp()}
                        style={{ display: 'inline-block', marginRight: '0.25em' }}
                        className={isHighlight ? 'highlight' : isUnderline ? 'underline-blue' : undefined}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
              </motion.div>
            </motion.div>

            {/* Journey stepper */}
            <motion.div
              className="about-journey-wrap"
              variants={stagger(0.1)}
              initial="hidden" whileInView="visible" viewport={inView}
            >
              {journeySteps.map((step, i) => {
                const isActive = hoveredJourney === i || (i === journeySteps.length - 1 && hoveredJourney === null);
                const Illus = step.IllusComponent;
                return (
                  <motion.div
                    key={step.label}
                    className={`about-journey-step${isActive ? ' active' : ''}`}
                    variants={fadeUp()}
                    onHoverStart={() => setHoveredJourney(i)}
                    onHoverEnd={() => setHoveredJourney(null)}
                  >
                    <motion.div
                      className="about-journey-step-illus"
                      animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Illus active={isActive} />
                    </motion.div>
                    <span className="about-journey-step-num">{step.num}</span>
                    <span className="about-journey-step-label">{step.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════
            MISSION — TICKER + CARDS
        ══════════════════════════════════ */}
        <section className="about-mission">
          <div className="about-section-inner">
            <motion.div
              initial="hidden" whileInView="visible" viewport={inView}
              variants={stagger()}
            >
              <motion.p variants={fadeUp()} className="about-section-label">03 — Our mission</motion.p>
              <motion.h2 variants={fadeUp()} className="about-giant-title">
                What drives us<br />every day.
              </motion.h2>
            </motion.div>

            {/* Scrolling ticker */}
            <div className="about-mission-ticker">
              <div className="about-mission-ticker-track">
                {[...communityData.mission, ...communityData.mission].map((m, i) => (
                  <div key={i} className="about-mission-ticker-item">
                    <span className="about-mission-ticker-star">✦</span>
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Cards */}
            <motion.div
              className="about-mission-grid"
              variants={stagger(0.05)}
              initial="hidden" whileInView="visible" viewport={inView}
            >
              {communityData.mission.map((item, i) => (
                <motion.div key={i} variants={fadeUp()} className="about-mission-card">
                  <span className="about-mission-num">0{i + 1}</span>
                  <p className="about-mission-text">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════
            WHAT WE DO — ILLUSTRATED CARDS
        ══════════════════════════════════ */}
        <section className="about-what">
          {/* Floating illustrated background */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <FloatIllus />
          </div>

          <div className="about-section-inner" style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={inView}
              variants={stagger()}
            >
              <motion.p variants={fadeUp()} className="about-section-label">04 — What we do</motion.p>
              <motion.h2 variants={fadeUp()} className="about-giant-title">
                Six pillars of<br />our <em>impact</em>.
              </motion.h2>
            </motion.div>

            <motion.div
              className="about-what-grid"
              variants={stagger(0.07)}
              initial="hidden" whileInView="visible" viewport={inView}
            >
              {whatWeDo.map((item) => {
                const Illus = item.IllusComponent;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp()}
                    className="about-what-card"
                    whileHover={{ y: -10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className={`about-what-card-illus ${item.color}`}>
                      <Illus />
                    </div>
                    <h3 className="about-what-card-title">{item.title}</h3>
                    <p className="about-what-card-desc">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════
            ECOSYSTEM & WHERE WE'RE GOING
        ══════════════════════════════════ */}
        <section className="about-who" style={{ marginTop: '8vw' }}>
          <div className="about-section-inner">
            <motion.div
              initial="hidden" whileInView="visible" viewport={inView}
              variants={stagger()}
            >
              <motion.h2 variants={fadeUp()} className="about-giant-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 5rem)' }}>
                Community Today.<br/>Ecosystem for Tomorrow.
              </motion.h2>
            </motion.div>
            
            <div className="about-who-layout" style={{ marginTop: '4vw' }}>
              <motion.div
                initial="hidden" whileInView="visible" viewport={inView}
                variants={stagger(0.1)}
              >
                <motion.p variants={fadeUp()} className="about-who-text">
                  HackGyanVerse Community focuses on bringing students together through technology, innovation, events, learning, collaboration and opportunities.
                  Alongside the community, HackGyanVerse is building a broader ecosystem around the journey from college to industry.
                </motion.p>
                <motion.div variants={fadeUp()} className="ecosystem-list-container">
                  <div className="ecosystem-list-item">
                    <span className="ecosystem-item-title">Industry Connection</span>
                    <span className="ecosystem-item-desc">The broader HackGyanVerse vision is to help bridge the gap between college students and industry.</span>
                  </div>
                  <div className="ecosystem-list-item">
                    <span className="ecosystem-item-title">Mentorship</span>
                    <span className="ecosystem-item-desc">When students need relevant guidance, HackGyanVerse aims to connect them with mentors based on their needs and areas of interest.</span>
                  </div>
                  <div className="ecosystem-list-item">
                    <span className="ecosystem-item-title">Startup / Builder Direction</span>
                    <span className="ecosystem-item-desc">The broader HackGyanVerse ecosystem also explores how students can move from learning and ideas toward building real-world solutions and startup journeys.</span>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeUp()} className="important-distinction">
                  <p>
                    <strong>Important distinction:</strong> HackGyanVerse Community is the student community. HackGyanVerse Startup / Platform is a separate ecosystem initiative.
                  </p>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div
              initial="hidden" whileInView="visible" viewport={inView}
              variants={stagger()}
              style={{ marginTop: '8vw' }}
            >
              <motion.p variants={fadeUp()} className="about-section-label">05 — Where We're Going</motion.p>
              <motion.div variants={fadeUp()} className="about-pills" style={{ marginTop: '2vw' }}>
                <span className="about-pill">01 — More Student Connections</span>
                <span className="about-pill">02 — More Innovation Experiences</span>
                <span className="about-pill">03 — Industry Exposure</span>
                <span className="about-pill">04 — More Events</span>
                <span className="about-pill">05 — Mentorship Connections</span>
                <span className="about-pill">06 — Student Leadership</span>
                <span className="about-pill">07 — Classroom to Career</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </div>

      <FinalCTA />
    </>
  );
}
