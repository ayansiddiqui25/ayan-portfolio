import { PenaltyScene } from "./PenaltyScene";
import { PortfolioNav } from "./PortfolioNav";
import { ActionLink } from "./ActionLink";
import { portfolio } from "../portfolio-content";

function ImagePlaceholder({ label, portrait = false }: { label: string; portrait?: boolean }) {
  return <div className={`image-placeholder ${portrait ? "image-placeholder--portrait" : ""}`} role="img" aria-label={label}>
    <span className="placeholder-corners" aria-hidden="true" />
    <span className="placeholder-mark" aria-hidden="true">{portrait ? "AS" : "↗"}</span>
    <span className="placeholder-caption">{label}</span>
  </div>;
}
function Tags({ items }: { items: string[] }) {
  return <ul className="tags">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
export function PenaltyPortfolio() {
  const { profile, experiences, projects, skillGroups } = portfolio;
  const featured = projects[0];
  return (
    <main className="scroll-portfolio">
      <PortfolioNav />
      <section className="penalty-story" id="overview" aria-label="Scroll-controlled penalty kick">
        <div className="field-hero">
          <PenaltyScene />
          <div className="hero-copy">
            <h1>Ayan<br /><em>Siddiqui.</em></h1>
            <p className="hero-copy__role">{profile.title}</p>
            <p className="hero-copy__school">{profile.school}</p>
            <p className="hero-copy__intro">{profile.headline}</p>
            <p className="hero-description">From Formula SAE hardware and autonomous robots to AI applications and computer vision.</p>
            <div className="hero-actions"><ActionLink href="#projects">See my work</ActionLink><ActionLink href="#about" variant="secondary">About me</ActionLink></div>
            <p className="availability">{profile.status}</p>
          </div>
          <a className="down-arrow" href="#projects" aria-label="Scroll down to projects">↓</a>
        </div>
      </section>

      <section className="overview-grid page-width" aria-label="Portfolio at a glance">
        <a className="overview-card overview-card--featured" href="#project-qasam">
          <p className="eyebrow">Featured project / 01</p><h2>Qasam</h2>
          <p>An accountability and app-blocking product designed to help Muslims build consistency around the five daily prayers.</p>
          <span className="text-link">Explore the project <span aria-hidden="true">↗</span></span>
          <ImagePlaceholder label="Qasam / App screenshots to come" />
        </a>
        <a className="overview-card overview-card--building" href="#project-formula-racing">
          <p className="eyebrow">Currently building</p><h2>TMU Formula Racing</h2>
          <p>Designing race-ready hardware around real vehicle constraints: a removable electronics enclosure for the headrest area.</p>
          <span className="status-label">Mechanical / Formula SAE</span>
        </a>
        <a className="overview-card" href="#experience">
          <p className="eyebrow">Experience</p><h2>From CAD<br /><em>to production.</em></h2>
          <p>Engineering design at RecAbility, software at KKC, project coordination, and running a business.</p>
          <span className="text-link">View the timeline <span aria-hidden="true">↗</span></span>
        </a>
        <a className="overview-card" href="#about">
          <p className="eyebrow">About</p><h2>Engineer first.<br /><em>Builder always.</em></h2>
          <p>Mechatronics at TMU. Mechanical systems, robotics, AI, and software.</p>
          <span className="text-link">About me <span aria-hidden="true">↗</span></span>
        </a>
        <article className="overview-card overview-card--links">
          <p className="eyebrow">Quick links</p>
          <a href={profile.github}>GitHub <span aria-hidden="true">↗</span></a>
          <a href={profile.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a>
          <a href={`mailto:${profile.email}`}>Email <span aria-hidden="true">↗</span></a>
          <a href="#skills">Skills <span aria-hidden="true">↓</span></a>
        </article>
      </section>

      <section className="portfolio-section experience-section" id="experience">
        <header className="section-heading"><h2>Experience</h2><p className="section-subtitle">Learning through doing.</p></header>
        <div className="experience-layout">
          <aside className="timeline-note"><p className="eyebrow">Hardware / Software / People</p><div className="note-arrow" aria-hidden="true">↗</div><p>The process matters<br />as much as the result.</p><span>Design. Build. Test. Iterate.</span></aside>
          <div className="experience-timeline">{experiences.map((entry, index) => (
            <article className="timeline-entry" key={entry.company}>
              <div className="timeline-date">{entry.dates}</div>
              <div className="timeline-body">
                <span className="timeline-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p className="eyebrow">{entry.company}</p><h3>{entry.role}</h3><p className="entry-location">{entry.location}</p><p>{entry.description}</p>
                <ul className="detail-list">{entry.points.map(point => <li key={point}>{point}</li>)}</ul><Tags items={entry.skills} />
              </div>
            </article>
          ))}</div>
        </div>
      </section>

      <section className="portfolio-section projects-section" id="projects">
        <header className="section-heading"><h2>Projects</h2><p className="section-subtitle">Systems that solve problems.</p></header>
        <article className="project-feature" id="project-qasam">
          <ImagePlaceholder label="Qasam / App screenshots to come" />
          <div className="project-description"><p className="eyebrow">01 / {featured.type}</p><h3>{featured.name}</h3><p>{featured.description}</p><ul className="detail-list">{featured.points.map(point => <li key={point}>{point}</li>)}</ul><Tags items={featured.tech} /><ActionLink href={featured.link}>{featured.linkLabel}</ActionLink></div>
        </article>
        <div className="upcoming-projects">{projects.slice(1).map((project, index) => (
          <article className="project-placeholder project-card" id={`project-${project.id}`} key={project.id}>
            <ImagePlaceholder label={project.image} />
            <div><p className="eyebrow">{String(index + 2).padStart(2, "0")} / {project.type}</p><h3>{project.name}</h3><p>{project.description}</p><p className="project-result">{project.result}</p>
              <details className="project-details"><summary>Engineering notes <span aria-hidden="true">+</span></summary><ul className="detail-list">{project.points.map(point => <li key={point}>{point}</li>)}</ul></details>
              <Tags items={project.tech} />
              {project.link && <ActionLink href={project.link} variant="secondary" compact>{project.linkLabel}</ActionLink>}
            </div>
          </article>
        ))}</div>
      </section>

      <section className="portfolio-section skills-section" id="skills">
        <header className="section-heading"><h2>Skills</h2><p className="section-subtitle">Across disciplines.</p></header>
        <div className="skills-grid">{skillGroups.map((group, index) => (
          <article className="skill-card" key={group.label}><h3>{String(index + 1).padStart(2, "0")} / {group.label}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>
        ))}</div>
      </section>

      <section className="portfolio-section about-section" id="about">
        <header className="section-heading"><h2>About me</h2><p className="section-subtitle">Engineer first. Builder always.</p></header>
        <div className="about-layout">
          <figure className="about-portrait"><img src="/game-assets/ayan-retro-portrait.png" alt="Retro pixel-art portrait of Ayan Siddiqui wearing a blue number 10 football jersey" width="1254" height="1254" loading="lazy" /><figcaption>Ayan Siddiqui <span>10 / Off the pitch</span></figcaption></figure>
          <div className="about-copy"><p className="eyebrow">{profile.location}</p>
            <p>I’m a Mechatronics Engineering student at Toronto Metropolitan University interested in the intersection of mechanical systems, robotics, AI, and software.</p>
            <p>I like working on problems where I can move between disciplines — designing a mechanical assembly in SolidWorks, debugging an autonomous robot, building an AI-backed application, or improving a real operating process.</p>
            <p>Outside of engineering, I co-run an auto detailing business, follow Formula 1, basketball and football, and enjoy building products and experimenting with new technology.</p>
            <p>I’m looking for opportunities to work on technically challenging products and learn from strong engineering teams.</p>
            <dl className="education"><div><dt>Education</dt><dd>{profile.school}</dd></div><div><dt>Degree</dt><dd>{profile.degree}</dd></div><div><dt>Expected graduation</dt><dd>{profile.graduation}</dd></div></dl>
          </div>
        </div>
      </section>
      <section className="portfolio-section contact-section" id="contact">
        <header className="section-heading"><h2>Contact</h2><p className="section-subtitle">Let’s build something real.</p></header>
        <p>{profile.status}</p><p>{profile.location}</p>
        <div className="contact-actions"><ActionLink href={`mailto:${profile.email}`}>Email me</ActionLink><ActionLink href={profile.linkedin} variant="secondary">LinkedIn</ActionLink><ActionLink href={profile.github} variant="secondary">GitHub</ActionLink></div>
        <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
      </section>
      <footer className="site-footer"><a href="#overview">Ayan Siddiqui FC</a><span>Engineering across hardware, software, and AI.</span><a href="#overview">Back to top ↑</a></footer>
    </main>
  );
}
