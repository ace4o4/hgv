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
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="section-title">AHGV BUILDVERSE 2026 IS HERE!</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem', lineHeight: 1.6 }}>
            A next-level industry-focused hackathon by HackGyanVerse Community where participants don't just build a project. They get the opportunity to work with real industry problems, gain expert exposure and turn ideas into impactful solutions.
          </p>
          <div style={{ padding: '1rem', background: 'rgba(47,128,255,0.1)', borderRadius: '12px', border: '1px solid rgba(47,128,255,0.3)', color: '#60A5FA', fontWeight: 600, fontSize: '1.2rem' }}>
            Problem → Idea → PPT → Prototype → Product
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
          <h2 className="section-title">Selection Criteria</h2>
          <div className="ahgv-details-grid" style={{ marginBottom: '4rem' }}>
            <div className="detail-item"><span className="detail-label">Industry Problem Statement</span><span className="detail-value" style={{ color: '#60A5FA' }}>{ahgvData.selectionCriteria.ps1}</span></div>
            <div className="detail-item"><span className="detail-label">Second Problem Statement</span><span className="detail-value">{ahgvData.selectionCriteria.ps2}</span></div>
            <div className="detail-item"><span className="detail-label">Open Innovation</span><span className="detail-value">{ahgvData.selectionCriteria.openInnovation}</span></div>
            <div className="detail-item"><span className="detail-label" style={{ color: '#FFF' }}>Total</span><span className="detail-value" style={{ color: '#16A34A' }}>{ahgvData.selectionCriteria.total}</span></div>
          </div>

          <h2 className="section-title">What Your PPT Should Cover</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
            {ahgvData.pptRequirements.map((req, index) => (
              <div key={index} style={{ padding: '0.8rem 1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '1rem', color: '#E2E8F0' }}>
                {req}
              </div>
            ))}
          </div>
          
          <h2 className="section-title">From Prototype to Product</h2>
          <div className="ahgv-details-grid" style={{ marginBottom: '2rem' }}>
            <div className="detail-item"><span className="detail-label">Prototype Round</span><span className="detail-value">15–19 October 2026</span></div>
            <div className="detail-item"><span className="detail-label">Grand Finale</span><span className="detail-value">24 October 2026</span></div>
            <div className="detail-item"><span className="detail-label">Format / Location</span><span className="detail-value">Offline | Delhi NCR</span></div>
            <div className="detail-item"><span className="detail-label">Expectation</span><span className="detail-value" style={{ color: '#F59E0B' }}>A complete working build</span></div>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#E2E8F0', marginBottom: '1rem', fontSize: '1.1rem' }}>Build components:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {ahgvData.buildComponents.map((req, index) => (
                <div key={index} style={{ padding: '0.5rem 1rem', background: 'rgba(59,130,246,0.1)', color: '#93C5FD', borderRadius: '8px', fontSize: '0.95rem' }}>
                  {req}
                </div>
              ))}
            </div>
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
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Ready to Build?</h2>
          <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-light)' }}>
            <span style={{ fontWeight: 700 }}>PARTNERS:</span>
            <span>HackGyanVerse Community</span>
            <span>·</span>
            <span>AVORITE</span>
            <span>·</span>
            <span>Unstop</span>
            <span>·</span>
            <span>Work2Hire</span>
          </div>
          <a href={ahgvData.registrationLink} className="btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            REGISTER FOR {ahgvData.name}
          </a>
        </div>
      </section>
    </>
  );
}
