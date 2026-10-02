'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { eventsData, getLiveEvent } from '@/data/events';

export default function LiveEventPopup() {
  const [isVisible, setIsVisible] = useState(false);

  const liveEvent = useMemo(() => getLiveEvent(eventsData), []);

  useEffect(() => {
    if (!liveEvent) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(false);

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => window.clearTimeout(timer);
  }, [liveEvent]);

  if (!liveEvent || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, x: 18, y: 18 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 18, y: 18 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          aria-live="polite"
          role="status"
          style={{
            position: 'fixed',
            right: '12px',
            bottom: '12px',
            left: 'calc(100vw - min(380px, calc(100vw - 24px)) - 12px)',
            top: 'auto',
            width: 'min(380px, calc(100vw - 24px))',
            zIndex: 2000,
            background: 'rgba(10, 14, 18, 0.96)',
            border: '1px solid rgba(148, 163, 184, 0.25)',
            boxShadow: '0 18px 40px rgba(15, 23, 42, 0.28)',
            borderRadius: '18px',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#F8FAFC',
            pointerEvents: 'auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '14px 14px 0 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F87171' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: '#EF4444', display: 'inline-block', boxShadow: '0 0 0 6px rgba(239, 68, 68, 0.15)' }} />
              LIVE
            </div>

            <button
              type="button"
              aria-label="Close live event notification"
              onClick={() => setIsVisible(false)}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#E2E8F0',
                fontSize: '1.6rem',
                lineHeight: 1,
                cursor: 'pointer',
                padding: 0,
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ padding: '10px 16px 16px' }}>
            <h3
              style={{
                margin: '0 0 8px',
                fontSize: 'clamp(1.05rem, 2vw, 1.4rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                color: '#F8FAFC',
                fontWeight: 800
              }}
            >
              {liveEvent.name}
            </h3>

            <p style={{ margin: 0, color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.55 }}>
              The event is live now. Join the experience.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '14px' }}>
              <Link
                href="/events#ahgv-buildverse"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 16px',
                  borderRadius: '999px',
                  background: '#F8FAFC',
                  color: '#0F172A',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}
              >
                View Event
              </Link>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body
  );
}
