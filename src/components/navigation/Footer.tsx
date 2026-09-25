import Link from 'next/link';
import { navigationData } from '@/data/navigation';
import { communityData } from '@/data/community';
import './navigation.css';

export default function Footer() {
  return (
    <footer className="global-footer section-black">
      <div className="container py-section">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo">HGV</h2>
            <p className="footer-title">{communityData.name}</p>
            <p className="footer-tagline text-muted">{communityData.tagline}</p>
          </div>
          <div className="footer-links-group">
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-list">
              {navigationData.footer.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-links-group">
            <h3 className="footer-heading">Community</h3>
            <ul className="footer-list">
              <li>
                <a href={communityData.whatsappLink} className="footer-link" target="_blank" rel="noopener noreferrer">
                  Join WhatsApp Community
                </a>
              </li>
              <li>
                <a href={communityData.social.linkedin} className="footer-link" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={communityData.social.instagram} className="footer-link" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-list">
              <li>
                <a href={`mailto:${communityData.email}`} className="footer-link">
                  {communityData.email}
                </a>
              </li>
            </ul>
            <h3 className="footer-heading mt-24">Current Event</h3>
            <Link href={`/events/${communityData.currentEventSlug}`} className="footer-link text-blue">
              AHGV BUILDVERSE 2026
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="text-muted">© {new Date().getFullYear()} {communityData.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
