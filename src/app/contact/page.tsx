import { communityData } from '@/data/community';
import FinalCTA from '@/components/home/FinalCTA';
import { Mail, MessageCircle, Globe, Hash } from 'lucide-react';
import './contact.css';

export default function ContactPage() {
  return (
    <>
      <section className="about-hero transparent-section" style={{ minHeight: '40vh' }}>
        <div className="container">
          <span className="section-label">CONTACT</span>
          <h1 className="about-title">Connect With HackGyanVerse</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px' }}>
            Questions, collaborations, partnerships or just want to be part of the community — reach out.
          </p>
        </div>
      </section>

      <section className="transparent-section py-section">
        <div className="container">
          <div className="contact-grid">
            <a href={`mailto:${communityData.email}`} className="contact-card">
              <Mail className="contact-icon" />
              <h3 className="contact-title">Email Us</h3>
              <p className="contact-link">{communityData.email}</p>
            </a>
            
            <a href={communityData.whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-card">
              <MessageCircle className="contact-icon" />
              <h3 className="contact-title">WhatsApp</h3>
              <p className="contact-link">Join the HackGyanVerse Community</p>
            </a>
            
            <a href={communityData.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
              <Globe className="contact-icon globe-icon" />
              <h3 className="contact-title">LinkedIn</h3>
              <p className="contact-link">Follow for Professional Updates</p>
            </a>
            
            <a href={communityData.social.instagram} target="_blank" rel="noopener noreferrer" className="contact-card">
              <Hash className="contact-icon hash-icon" />
              <h3 className="contact-title">Instagram</h3>
              <p className="contact-link">@hack.gyan.verse</p>
            </a>
          </div>
        </div>
      </section>

      <section className="transparent-section py-section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">Collaborate With Us</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Interested in partnering for an event or offering an opportunity to our students?
          </p>
          <a href={communityData.collaborationLink} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            START A CONVERSATION
          </a>
        </div>
      </section>
    </>
  );
}
