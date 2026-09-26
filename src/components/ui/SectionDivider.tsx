'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;   // flip=true → wave opening goes upward (dark section into white below)
  dots?: boolean;
  outline?: boolean;
}

export default function SectionDivider({
  fromColor = '#FFFFFF',
  toColor = '#080A0C',
  flip = false,
  dots = true,
  outline = false,
}: SectionDividerProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        lineHeight: 0,
        zIndex: 4,
        overflow: 'visible',
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
        }}
      >
        {/* NO background rect — container backgroundColor handles it */}
        {/* Wave shape fills toColor from crest down to bottom */}
        <path
          d="M0,90 C160,30 300,140 480,70 C660,5 820,140 1000,65 C1140,10 1280,110 1440,75 L1440,160 L0,160 Z"
          fill={toColor}
        />
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
              backgroundColor: toColor,
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
              backgroundColor: toColor,
              opacity: 0.7,
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
              backgroundColor: toColor,
              opacity: 0.85,
              pointerEvents: 'none',
              border: outline ? '2px solid #0F172A' : undefined,
            }}
          />
        </>
      )}
    </div>
  );
}
