'use client';

import { eventsData } from '@/data/events';
import { ahgvData } from '@/data/ahgv';
import Link from 'next/link';

export default function FeaturedEvent() {
  const event = eventsData.find((e) => e.slug === 'ahgv-buildverse-2026');

  if (!event) return null;

  return (
    <section className="section-dark py-section">
      <div className="container">
        <div className="featured-event-card">
          <div className="featured-image">
            {/* The image should go here, maybe with an overlay or 3D geometry inside */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(47, 128, 255, 0.2), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            </div>
          </div>
          <div className="featured-content">
            <span className="status-pill">{event.status}</span>
            <h2 className="featured-title">{event.name}</h2>
            <p className="featured-concept">{ahgvData.concept}</p>
            <p className="text-muted" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>
              {event.description}
            </p>
            <div>
              <Link href={`/events/${event.slug}`} className="btn-primary">
                EXPLORE {event.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
