import { ahgvData } from '@/data/ahgv';
import { communityData } from '@/data/community';
import './ahgv.css';

export default function AHGVPage() {
  return (
    <>
      <section className="ahgv-hero">
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="ahgv-badge">REGISTRATION IS FREE</div>
          <h1 className="ahgv-title">{ahgvData.name}</h1>
          <h2 className="ahgv-concept">{ahgvData.concept}</h2>
          
          <div className="ahgv-presented">
            Presented by HackGyanVerse Community<br/>
            Co-Presented by AVORITE<br/>
            Powered by Unstop<br/>
            Co-Powered by Work2Hire
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={ahgvData.registrationLink} className="btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              REGISTER NOW
            </a>
            <a href={communityData.whatsappLink} className="btn-secondary" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              JOIN WHATSAPP COMMUNITY
            </a>
          </div>
        </div>
      </section>

      <section className="transparent-section" style={{ paddingBottom: 'var(--desktop-padding)' }}>
        <div className="container">
          <div className="ahgv-details-grid">
            <div className="detail-item">
              <span className="detail-label">Grand Finale</span>
              <span className="detail-value">{ahgvData.details.grandFinale}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Venue</span>
              <span className="detail-value">{ahgvData.details.venue}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Team Size</span>
              <span className="detail-value">{ahgvData.details.teamSize}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Participation</span>
              <span className="detail-value">{ahgvData.details.participation}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="transparent-section py-section">
        <div className="container">
          <h2 className="section-title">Prizes & Rewards Worth ₹50K+</h2>
          <div className="rewards-grid">
            {ahgvData.rewards.map((reward, index) => (
              <div key={index} className="reward-card">
                <div className="reward-value">{reward.title}</div>
                <div className="reward-desc">{reward.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="transparent-section py-section">
        <div className="container">
          <h2 className="section-title">Problem Statements</h2>
          <div className="ps-grid">
            {ahgvData.problemStatements.map((ps, index) => (
              <div key={index} className="ps-card">
                <div className="ps-status">{ps.status}</div>
                <h3 className="ps-title">{ps.title}</h3>
                <p className="reward-desc">{ps.description}</p>
                <span className="ps-weight">Weightage: {ps.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="transparent-section py-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
            <div>
              <h2 className="section-title">Timeline</h2>
              <div className="timeline-list">
                {ahgvData.timeline.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-content">
                      <h3 className="timeline-title">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="section-title">Why Participate</h2>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem', color: 'var(--text-light)' }}>
                {ahgvData.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="transparent-section py-section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>Ready to Build?</h2>
          <a href={ahgvData.registrationLink} className="btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            REGISTER FOR {ahgvData.name}
          </a>
        </div>
      </section>
    </>
  );
}
