'use client';

import { useState } from 'react';

import { teamData } from '@/data/team';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Star, Sparkles } from 'lucide-react';
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
  const [hoverTerminal, setHoverTerminal] = useState(false);

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(15px)', rotateX: -15, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0, scale: 1,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const shapeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6, filter: 'blur(15px)', y: 20 },
    visible: {
      opacity: 1, scale: 1, filter: 'blur(0px)', y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <>
      <div className="team-page-wrapper">

        {/* ══════════════════════════════════════════════
            HERO: KINETIC TYPOGRAPHY 
            ══════════════════════════════════════════════ */}
        <section className="team-about-hero-section">
          {/* Floating Stickers */}
          <motion.div style={{ position: 'absolute', top: '25%', left: '10vw', zIndex: 3 }}
             animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="team-float-sticker sticker-white">
              <Star size={14} fill="#F59E0B" color="#F59E0B" />
              <span>Next-Gen Mentors</span>
            </div>
          </motion.div>

          <motion.div className="team-hide-mobile" style={{ position: 'absolute', top: '20%', right: '15vw', zIndex: 3, rotate: 6 }}
             animate={{ y: [15, -15, 15] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="team-float-sticker sticker-dark">
              <span>#HackGyanVerse</span>
            </div>
          </motion.div>

          {/* ══ COMPACT 3-LINE DISPLAY TYPOGRAPHY ══ */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="team-about-typography-wrap"
          >
            {/* LINE 1 */}
            <motion.span variants={wordVariants} className="about-hero-word">
              OUR BRILLIANT
            </motion.span>

            <motion.div
              variants={shapeVariants}
              whileHover={{ width: 'clamp(12rem, 16vw, 18rem)' }}
              className="about-interactive-avatars"
            >
              <div style={{ display: 'flex', zIndex: 2 }}>
                {[1, 2, 3, 4].map((_, i) => (
                  <motion.div key={i} whileHover={{ y: -3 }} className="about-avatar-bubble" style={{ marginLeft: i > 0 ? '-9px' : '0' }}>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i + 45}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="about-line-break" />

            {/* LINE 2 */}
            <motion.span variants={wordVariants} className="about-hero-word">
              &
            </motion.span>

            <motion.div variants={shapeVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="about-interactive-pill-gradient">
              MENTORS <Sparkles size={18} color="#FFF" style={{ marginLeft: '6px' }} />
            </motion.div>

            <div className="about-line-break" />

            {/* LINE 3 */}
            <motion.span variants={wordVariants} className="about-hero-word">
              SHAPING THE
            </motion.span>

            <motion.div variants={shapeVariants} whileHover={{ y: -4 }} className="about-interactive-terminal">
              <div style={{ display: 'flex', gap: '4px', marginBottom: '3px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              </div>
              <div className="about-terminal-code">
                ~$ <span>hgv team</span>
                <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="about-terminal-cursor" />
              </div>
            </motion.div>

            <div className="about-line-break" />

            {/* LINE 3 */}
            <motion.span variants={wordVariants} className="about-hero-word">
              HACKGYANVERSE
            </motion.span>

            <motion.div variants={shapeVariants} whileHover={{ scale: 1.05 }} className="about-interactive-neon-pill">
              ECOSYSTEM.
            </motion.div>
          </motion.div>
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
