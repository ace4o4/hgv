import { eventsData } from '@/data/events';
import Link from 'next/link';
import FinalCTA from '@/components/home/FinalCTA';
import './events.css';

export default function EventsPage() {
  const featuredEvent = eventsData.find(e => e.featured);
  const pastEvents = eventsData.filter(e => !e.featured);

  return (
    <>
      <section className="about-hero transparent-section" style={{ minHeight: '40vh' }}>
        <div className="container">
          <span className="section-label">EVENTS</span>
          <h1 className="about-title">Experience the Community</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px' }}>
            Hackathons, summits, and meetups where students build, learn, and showcase their skills.
          </p>
        </div>
      </section>

      {featuredEvent && (
        <section className="transparent-section py-section">
          <div className="container">
            <h2 className="section-title">NOW BUILDING</h2>
            <div className="featured-event-large">
              <div className="featured-event-img">
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(47, 128, 255, 0.2), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ opacity: 0.1, fontSize: '15vw', fontWeight: 900, transform: 'rotate(-10deg)', color: '#2F80FF' }}>AHGV</span>
                </div>
              </div>
              <div className="featured-event-info">
                <span className="status-pill">{featuredEvent.status}</span>
                <h3 className="event-name">{featuredEvent.name}</h3>
                <p className="event-desc">{featuredEvent.description}</p>
                <div style={{ marginTop: '2rem' }}>
                  <Link href={`/events/${featuredEvent.slug}`} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    EXPLORE EVENT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="transparent-section py-section">
        <div className="container">
          <h2 className="section-title">PREVIOUS EVENTS</h2>
          <div className="events-grid-full">
            {pastEvents.map((event) => (
              <div key={event.slug} className="event-card-full">
                <div className="event-card-full-img" style={{ backgroundColor: '#0B0C0E' }}></div>
                <div className="event-card-full-content">
                  <div className="event-category">{event.category}</div>
                  <h3 className="event-name-small">{event.name}</h3>
                  <p className="event-desc-small">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
