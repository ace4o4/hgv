import { communityData } from '@/data/community';
import FinalCTA from '@/components/home/FinalCTA';
import './about.css';

export default function AboutPage() {
  return (
    <>
      <section className="about-hero transparent-section">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--text-light)', opacity: 0.5 }}>ABOUT HACKGYANVERSE</span>
          <h1 className="about-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '2rem' }}>
            ABOUT<br/>HACKGYANVERSE<br/>
            <span style={{ color: 'var(--electric-blue)' }}>COMMUNITY</span>
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--electric-blue)' }}>
            Classroom to Career — Together
          </p>
        </div>
      </section>

      <section className="transparent-section py-section">
        <div className="container">
          <div className="about-grid">
            <div>
              <h2 className="section-title">WHO WE ARE</h2>
            </div>
            <div>
              <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--text-light)', marginBottom: '2rem' }}>
                HackGyanVerse Community is a student-driven ecosystem focused on connecting students with technology, innovation, events, opportunities and collaborative experiences.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {["Build", "Learn", "Collaborate", "Participate", "Lead", "Network", "Create real-world impact"].map(item => (
                  <span key={item} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="transparent-section py-section">
        <div className="container">
          <h2 className="section-title text-center">OUR VISION</h2>
          <p style={{ fontSize: '1.5rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            {communityData.vision}
          </p>
          <div className="vision-visual">
            <span className="vision-step">Learn</span>
            <span className="vision-arrow">→</span>
            <span className="vision-step">Build</span>
            <span className="vision-arrow">→</span>
            <span className="vision-step">Collaborate</span>
            <span className="vision-arrow">→</span>
            <span className="vision-step">Lead</span>
            <span className="vision-arrow">→</span>
            <span className="vision-step" style={{ color: 'var(--electric-blue)' }}>Grow</span>
          </div>
        </div>
      </section>

      <section className="transparent-section py-section">
        <div className="container">
          <h2 className="section-title">OUR MISSION</h2>
          <div className="mission-list">
            {communityData.mission.map((mission, index) => (
              <div key={index} className="mission-card">
                <div className="mission-number">0{index + 1}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.5 }}>{mission}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
