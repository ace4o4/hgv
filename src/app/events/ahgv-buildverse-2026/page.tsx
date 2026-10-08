'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ahgvData } from '@/data/ahgv';
import { communityData } from '@/data/community';
import '../events.css';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
});

const stagger = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } }
});

const selectionBreakdown = [
  { label: 'Industry PS 1', value: '70%' },
  { label: 'PS 2', value: '20%' },
  { label: 'Open Innovation', value: '10%' }
];

export default function AHGVBuildVersePage() {
  return (
    <div className="events-page ahgv-detail-page">
      <section className="events-hero ahgv-detail-hero">
        <div className="events-bg-grid" />
        <div className="events-hero-orb-1" />
        <div className="events-hero-orb-2" />

        <motion.div
          className="events-hero-badge"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="events-hero-badge-dot" />
          AHGV BuildVerse 2026
        </motion.div>

        <motion.div
          className="events-hero-title-wrap"
          variants={stagger(0.2)}
          initial="hidden"
          animate="visible"
        >
          <div className="events-hero-line">
            <motion.span className="events-hero-word" variants={fadeUp()}>AHGV</motion.span>
          </div>
          <div className="events-hero-line">
            <motion.span className="events-hero-word outline" variants={fadeUp()}>BUILDVERSE</motion.span>
          </div>
          <div className="events-hero-line">
            <motion.span className="events-hero-word blue" variants={fadeUp()}>2026</motion.span>
          </div>
        </motion.div>

        <motion.p
          className="events-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {ahgvData.tagline}
        </motion.p>

        <motion.div
          className="events-hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <a href={ahgvData.registrationLink} target="_blank" rel="noopener noreferrer" className="events-btn-orange">
            Register on Unstop →
          </a>
          <a href={ahgvData.links.ps1} target="_blank" rel="noopener noreferrer" className="events-btn-primary">
            View Problem Statements
          </a>
        </motion.div>

        <motion.div
          className="ahgv-header-strip"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <span>Presented by {ahgvData.presentedBy}</span>
          <span>Co-Presented by {ahgvData.coPresentedBy}</span>
          <span>Powered by {ahgvData.poweredBy}</span>
          <span>Co-Powered by {ahgvData.coPoweredBy}</span>
        </motion.div>
      </section>

      <section className="ahgv-section">
        <div className="events-section-inner">
          <motion.p
            className="events-section-label"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp()}
          >
            Build beyond the idea
          </motion.p>
          <motion.h2
            className="events-giant-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger()}
          >
            <motion.span variants={fadeUp()}>Everything you need</motion.span><br />
            <motion.span variants={fadeUp()}>before the <em>finale</em>.</motion.span>
          </motion.h2>

          <div className="ahgv-highlight-grid">
            {ahgvData.highlights.map((item) => (
              <motion.div
                key={item}
                className="ahgv-highlight-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="ahgv-section ahgv-section-alt">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Timeline
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>The <em>hackathon journey</em>.</motion.span>
          </motion.h2>

          <div className="ahgv-timeline">
            {ahgvData.timeline.map((item) => (
              <motion.div
                key={`${item.date}-${item.title}`}
                className="ahgv-timeline-item"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
              >
                <div className="ahgv-timeline-date">{item.date}</div>
                <div className="ahgv-timeline-copy">
                  <h3>{item.title}</h3>
                  <span className="ahgv-status">{item.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="problem-statements" className="ahgv-section">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Problem statements
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>Choose the right <em>track</em>.</motion.span>
          </motion.h2>

          <div className="ahgv-problem-grid">
            {ahgvData.problemStatements.map((problem) => (
              <motion.div
                key={problem.title}
                className="ahgv-problem-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
              >
                <div className="ahgv-problem-topline">
                  <span className="ahgv-problem-badge">{problem.title}</span>
                  <span className="ahgv-status">{problem.status}</span>
                </div>
                <h3>{problem.label}</h3>
                <p>{problem.description}</p>
                <div className="ahgv-problem-meta">
                  <span>Selection allocation:</span>
                  <strong>{problem.weight}</strong>
                </div>
                <a href={problem.link} target={problem.link.startsWith('http') ? '_blank' : undefined} rel={problem.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="events-btn-primary ahgv-card-btn">
                  {problem.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="ahgv-section ahgv-section-alt">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Selection allocation
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>Track allocation</motion.span>
          </motion.h2>

          <div className="ahgv-distribution">
            {selectionBreakdown.map((item) => (
              <div key={item.label} className="ahgv-distribution-row">
                <span>{item.label}</span>
                <div className="ahgv-distribution-bar">
                  <span className="ahgv-distribution-fill" style={{ width: item.value }} />
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
            <div className="ahgv-distribution-row ahgv-distribution-row-total">
              <span>Total</span>
              <div className="ahgv-distribution-bar">
                <span className="ahgv-distribution-fill ahgv-distribution-fill-total" style={{ width: '100%' }} />
              </div>
              <strong>100%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="ahgv-section">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Build categories
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>What participants can <em>build</em>.</motion.span>
          </motion.h2>

          <div className="ahgv-chip-grid">
            {ahgvData.buildAreas.map((area) => (
              <span key={area} className="ahgv-chip">{area}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="ahgv-section ahgv-section-alt">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Who can participate
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>Anyone building <em>with intent</em>.</motion.span>
          </motion.h2>

          <div className="ahgv-chip-grid">
            {ahgvData.participants.map((person) => (
              <span key={person} className="ahgv-chip ahgv-chip-soft">{person}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="ahgv-section">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Complete journey
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>From <em>register</em> to demo.</motion.span>
          </motion.h2>

          <div className="ahgv-journey-grid">
            {ahgvData.journey.map((step) => (
              <motion.div
                key={step.step}
                className="ahgv-journey-card"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
              >
                <span className="ahgv-journey-step">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="ahgv-section ahgv-section-alt">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            PPT submission
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>Prepare a <em>professional submission</em>.</motion.span>
          </motion.h2>

          <div className="ahgv-two-col">
            <div className="ahgv-info-card">
              <h3>Submission deadline</h3>
              <p className="ahgv-date-strong">{ahgvData.pptDeadline}</p>
              <p>
                The PPT template is a reference for structure and content. Teams may customize the design while keeping the submission professional and easy to evaluate.
              </p>
            </div>
            <div className="ahgv-info-card">
              <h3>What the PPT should cover</h3>
              <ul>
                {ahgvData.pptRequirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ahgv-section">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Build your prototype
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>Don&apos;t wait for the <em>PPT deadline</em> to start building.</motion.span>
          </motion.h2>

          <div className="ahgv-two-col">
            <div className="ahgv-info-card">
              <h3>Prototype window</h3>
              <p className="ahgv-date-strong">{ahgvData.prototypeWindow}</p>
              <p>Focus: Problem → Solution → Core Features → Functional Prototype → Testing → Refinement</p>
            </div>
            <div className="ahgv-info-card">
              <h3>What to focus on</h3>
              <ul>
                {ahgvData.buildComponents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ahgv-section ahgv-section-alt">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Grand finale
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>24 OCTOBER 2026</motion.span><br />
            <motion.span variants={fadeUp()}><em>AHGV BuildVerse 2026</em> Grand Finale</motion.span>
          </motion.h2>

          <div className="ahgv-finale-card">
            <div className="ahgv-finale-copy">
              <p className="ahgv-date-strong">8-Hour Offline Hackathon</p>
              <p className="ahgv-date-strong">Delhi NCR</p>
              <p><strong>Venue:</strong> To be announced separately</p>
              <p>Shortlisted teams will present and demonstrate their solutions. Teams should be prepared to explain the problem, solution, architecture, AI/ML/Agentic AI implementation, and real-world impact.</p>
            </div>
            <ul>
              <li>Explain the problem</li>
              <li>Explain the solution</li>
              <li>Demonstrate the working product</li>
              <li>Explain architecture</li>
              <li>Explain AI/ML/Agentic AI implementation</li>
              <li>Answer evaluator questions</li>
              <li>Explain scalability</li>
              <li>Explain real-world impact</li>
              <li>Present the innovation clearly</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ahgv-section">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Evaluation criteria
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>What teams are evaluated on.</motion.span>
          </motion.h2>

          <div className="ahgv-criteria-grid">
            {ahgvData.evaluationCriteria.map((item) => (
              <div key={item} className="ahgv-criteria-item">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="ahgv-section ahgv-section-alt">
        <div className="events-section-inner">
          <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
            Winners & rewards
          </motion.p>
          <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
            <motion.span variants={fadeUp()}>Premium recognition for the <em>winning teams</em>.</motion.span>
          </motion.h2>

          <div className="ahgv-rewards-grid">
            {ahgvData.rewards.map((reward) => (
              <motion.div
                key={reward.title}
                className="ahgv-reward-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
              >
                <strong>{reward.title}</strong>
                <span>{reward.description}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="ahgv-section">
        <div className="events-section-inner">
          <div className="ahgv-cta-panel">
            <motion.p className="events-section-label" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp()}>
              Get started
            </motion.p>
            <motion.h2 className="events-giant-title" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger()}>
              <motion.span variants={fadeUp()}>Register, explore the problem, and <em>build the future</em>.</motion.span>
            </motion.h2>

            <div className="ahgv-cta-row">
              <a href={ahgvData.registrationLink} target="_blank" rel="noopener noreferrer" className="events-btn-orange">
                Register on Unstop
              </a>
              <a href={ahgvData.links.ps1} target="_blank" rel="noopener noreferrer" className="events-btn-primary">
                View PS1
              </a>
              <a href={ahgvData.links.ps2} target="_blank" rel="noopener noreferrer" className="events-btn-primary">
                View PS2
              </a>
              <a href="#problem-statements" className="events-btn-primary">
                Open Innovation
              </a>
              <a href={communityData.whatsappLink} target="_blank" rel="noopener noreferrer" className="events-btn-primary">
                Join Official WhatsApp Community
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="events-section-inner ahgv-back-link-wrap">
        <Link href="/events" className="events-btn-primary ahgv-back-link">
          ← Back to Events
        </Link>
      </div>
    </div>
  );
}
