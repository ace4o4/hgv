'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;   // flip=true → wave opening goes upward (dark section into white below)
  dots?: boolean;
  outline?: boolean;
  ambientGlow?: boolean | 'top' | 'bottom';
}

export default function SectionDivider({
  fromColor = '#FFFFFF',
  toColor = '#080A0C',
  flip = false,
  dots = true,
  outline = false,
  ambientGlow = false,
}: SectionDividerProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        lineHeight: 0,
        zIndex: 20,
        pointerEvents: 'none',
        overflow: 'visible',
        marginBottom: '-2px', // Prevent 1px gaps that cause horizontal lines
        backgroundColor: fromColor,  // blends with the section above
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: 'clamp(100px, 11vw, 170px)',
          overflow: 'visible'
        }}
      >
        <defs>
          <filter id="ambient-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
          </filter>
          <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B21B6">
              <animate attributeName="stop-color" values="#5B21B6; #1D4ED8; #BE123C; #5B21B6" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#1D4ED8">
              <animate attributeName="stop-color" values="#1D4ED8; #BE123C; #5B21B6; #1D4ED8" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#BE123C">
              <animate attributeName="stop-color" values="#BE123C; #5B21B6; #1D4ED8; #BE123C" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {/* Wave shape fills toColor from crest down to bottom */}
        {/* Layer 1: The solid background of the section below */}
        <path
          d="M0,90 C160,30 300,140 480,70 C660,5 820,140 1000,65 C1140,10 1280,110 1440,75 L1440,160 L0,160 Z"
          fill={toColor}
        />
        
        {/* Layer 2: The glowing spread (15px spread) */}
        {ambientGlow && (
          <path
            d="M0,90 C160,30 300,140 480,70 C660,5 820,140 1000,65 C1140,10 1280,110 1440,75"
            fill="none"
            stroke="url(#glow-gradient)"
            strokeWidth="15"
            filter="url(#ambient-glow)"
            opacity="1"
            transform={ambientGlow === 'top' ? "translate(0, -3)" : "translate(0, 3)"}
            style={{ mixBlendMode: 'multiply' }}
          />
        )}
        
        {/* Layer 3: The solid gradient line (5px) */}
        {ambientGlow && (
          <path
            d="M0,90 C160,30 300,140 480,70 C660,5 820,140 1000,65 C1140,10 1280,110 1440,75"
            fill="none"
            stroke="url(#glow-gradient)"
            strokeWidth="5"
            opacity="1"
            transform={ambientGlow === 'top' ? "translate(0, -2)" : "translate(0, 2)"}
            style={{ mixBlendMode: 'multiply' }}
          />
        )}
        {outline && (
          <path
            d="M0,90 C160,30 300,140 480,70 C660,5 820,140 1000,65 C1140,10 1280,110 1440,75"
            fill="none"
            stroke="#0F172A"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        )}
        {/* Depth shadow layer */}
        <path
          d="M0,115 C200,60 380,150 560,95 C740,38 900,150 1080,90 C1230,42 1370,118 1440,105 L1440,160 L0,160 Z"
          fill={toColor}
          opacity="0.35"
        />
      </svg>

      {/* Floating dots above the wave in fromColor zone */}
      {dots && (
        <>
          {/* Large dot — above left crest */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '50%',
              left: '22%',
              width: 'clamp(14px, 2vw, 26px)',
              height: 'clamp(14px, 2vw, 26px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #5B21B6 0%, #1D4ED8 50%, #BE123C 100%)',
              opacity: 0.8,
              pointerEvents: 'none',
              border: outline ? '2px solid #0F172A' : undefined,
            }}
          />
          {/* Small dot — upper left */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '68%',
              left: '16%',
              width: 'clamp(7px, 1vw, 13px)',
              height: 'clamp(7px, 1vw, 13px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1D4ED8 0%, #BE123C 50%, #5B21B6 100%)',
              opacity: 0.8,
              pointerEvents: 'none',
              border: outline ? '2px solid #0F172A' : undefined,
            }}
          />
          {/* Medium dot — right side crest */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
            style={{
              position: 'absolute',
              bottom: '44%',
              right: '19%',
              width: 'clamp(10px, 1.4vw, 18px)',
              height: 'clamp(10px, 1.4vw, 18px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #BE123C 0%, #5B21B6 50%, #1D4ED8 100%)',
              opacity: 0.8,
              pointerEvents: 'none',
              border: outline ? '2px solid #0F172A' : undefined,
            }}
          />
        </>
      )}
    </div>
  );
}
