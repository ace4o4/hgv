'use client';

import { teamData } from '@/data/team';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './team.css';
import FinalCTA from '@/components/home/FinalCTA';

/* ─────────────────────────────────
   Section configuration
───────────────────────────────── */
const sections: {
  key: string;
  label: string;
  theme: 'light' | 'soft' | 'blue-tint' | 'warm';
  layout: 'leadership' | 'grid';
  number: string;
}[] = [
  { key: 'Core Leadership',              label: 'Core Leadership',        theme: 'soft',      layout: 'leadership', number: '01' },
  { key: 'Graphics Team',               label: 'Graphics Team',           theme: 'light',     layout: 'grid',       number: '02' },
  { key: 'UI/UX Team',                  label: 'UI/UX Team',              theme: 'blue-tint', layout: 'grid',       number: '03' },
  { key: 'Marketing',                   label: 'Marketing',               theme: 'warm',      layout: 'grid',       number: '04' },
  { key: 'Community Host & Presenter',  label: 'Community Host',          theme: 'soft',      layout: 'grid',       number: '05' },
];

/* ─────────────────────────────────
   Sub-components
───────────────────────────────── */

function AvatarFallback({ name }: { name: string }) {
  return (
    <div className="team-card-avatar">
      {name[0]}
    </div>
  );
}

/** Standard card (Graphics, UI/UX, Marketing, Host) */
function MemberCard({ member }: { member: typeof teamData[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="team-card"
    >
      <div className="team-card-image-wrap">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="team-card-image"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <AvatarFallback name={member.name} />
        )}
        <div className="team-card-image-overlay" />
        <div className="team-card-arrow">
          <ArrowUpRight size={16} />
        </div>
      </div>
      <p className="team-card-name">{member.name}</p>
      <p className="team-card-role">{member.role}</p>
    </motion.div>
  );
}

/** Leadership card — square image with glassmorphism badge at bottom */
function LeadershipCard({ member }: { member: typeof teamData[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="team-leadership-card"
    >
      <div className="team-leadership-image-wrap">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="team-leadership-image"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <AvatarFallback name={member.name} />
        )}
        <div className="team-leadership-overlay" />
        <div className="team-leadership-badge">
          <div>
            <div className="team-leadership-badge-name">{member.name}</div>
            <div className="team-leadership-badge-role">{member.role}</div>
          </div>
          <div className="team-leadership-arrow">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────
   Page
───────────────────────────────── */
export default function TeamPage() {
  const totalMembers = teamData.length;

  return (
    <>
      <div className="team-page-wrapper">

        {/* ══ HERO ══ */}
        <section className="team-hero">
          <div className="team-hero-bg-grid" />
          <div className="team-hero-orb team-hero-orb-1" />
          <div className="team-hero-orb team-hero-orb-2" />

          <motion.div
            className="team-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="team-hero-badge">
              <span />
              Meet the team
            </div>

            <h1 className="team-hero-title">
              Mentors &amp;{' '}
              <span className="gradient-text">Team</span>
            </h1>

            <p className="team-hero-subtitle">
              Industry professionals &amp; passionate students driving
              HackGyanVerse forward — together.
            </p>

            <div className="team-hero-stats">
              <div className="team-hero-stat">
                <span className="team-hero-stat-num">{totalMembers}+</span>
                <span className="team-hero-stat-label">Members</span>
              </div>
              <div className="team-hero-stat">
                <span className="team-hero-stat-num">5</span>
                <span className="team-hero-stat-label">Teams</span>
              </div>
              <div className="team-hero-stat">
                <span className="team-hero-stat-num">∞</span>
                <span className="team-hero-stat-label">Impact</span>
              </div>
            </div>
          </motion.div>

          <div className="team-hero-scroll">
            <div className="team-hero-scroll-line" />
            Scroll
          </div>
        </section>

        {/* ══ SECTIONS ══ */}
        {sections.map((section) => {
          const members = teamData
            .filter((m) => m.categories.includes(section.key))
            .sort((a, b) => a.order - b.order);

          if (members.length === 0) return null;

          return (
            <section key={section.key} className={`team-section ${section.theme}`}>
              {/* Decorative large number */}
              <div className="section-deco-number" aria-hidden="true">
                {section.number}
              </div>

              {/* Section header */}
              <motion.div
                className="team-section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <p className="team-section-label">{section.number} — HackGyanVerse</p>
                  <h2 className="team-section-title">{section.label}</h2>
                </div>
                <span className="team-section-count">
                  {members.length} member{members.length !== 1 ? 's' : ''}
                </span>
              </motion.div>

              <div className="team-section-divider" />

              {/* Cards */}
              {section.layout === 'leadership' ? (
                <div className="team-leadership-grid">
                  {members.map((m) => (
                    <LeadershipCard key={m.name} member={m} />
                  ))}
                </div>
              ) : (
                <div className="team-grid">
                  {members.map((m) => (
                    <MemberCard key={m.name} member={m} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <FinalCTA />
    </>
  );
}
