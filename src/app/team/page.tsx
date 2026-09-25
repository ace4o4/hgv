import { teamData } from '@/data/team';
import FinalCTA from '@/components/home/FinalCTA';
import './team.css';

export default function TeamPage() {
  const categories = [
    "Core Leadership",
    "Graphics Team",
    "Marketing",
    "Community Host & Presenter"
  ];

  return (
    <>
      <section className="about-hero transparent-section" style={{ minHeight: '40vh' }}>
        <div className="container">
          <span className="section-label">TEAM</span>
          <h1 className="about-title">Meet the People Behind HackGyanVerse</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
            Students, builders and organizers driving the community forward.
          </p>
        </div>
      </section>

      {categories.map((category) => {
        const categoryMembers = teamData
          .filter(member => member.categories.includes(category))
          .sort((a, b) => a.order - b.order);

        if (categoryMembers.length === 0) return null;

        return (
          <section key={category} className="transparent-section py-section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
              <h2 className="section-title">{category}</h2>
              <div className="team-grid">
                {categoryMembers.map(member => (
                  <div key={member.name} className="team-card">
                    <div className="team-image-container">
                      <div className="team-image-placeholder">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {/* {member.image && <img src={member.image} alt={member.name} className="team-image" />} */}
                    </div>
                    <div className="team-content">
                      <h3 className="team-name">{member.name}</h3>
                      <p className="team-role">{member.role}</p>
                      {member.organization !== 'HackGyanVerse Community' && (
                        <p className="team-org">{member.organization}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <FinalCTA />
    </>
  );
}
