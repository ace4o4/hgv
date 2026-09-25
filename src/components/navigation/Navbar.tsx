'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationData } from '@/data/navigation';
import { communityData } from '@/data/community';
import './navigation.css';

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <nav className="global-navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          HGV
        </Link>
        <div className="navbar-links">
          {navigationData.desktop.map((link) => (
            <Link key={link.name} href={link.href} className="nav-link">
              {link.name}
            </Link>
          ))}
        </div>
        <div className="navbar-actions">
          <Link href={`/events/${communityData.currentEventSlug}`} className="nav-event-badge">
            AHGV BUILDVERSE 2026
          </Link>
          <a href={communityData.whatsappLink} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Join Community
          </a>
        </div>
      </div>
    </nav>
  );
}
