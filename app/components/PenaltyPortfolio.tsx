import { PenaltyScene } from "./PenaltyScene";
import { PortfolioNav } from "./PortfolioNav";
import { ActionLink } from "./ActionLink";
import { portfolio, visibleProjects } from "../portfolio-content";
import { ZoomImage } from "./ZoomImage";

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
  const { profile, experiences, skillGroups } = portfolio;
  const projects = visibleProjects;
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
            <div className="hero-actions"><ActionLink href="#projects">See my work</ActionLink><ActionLink href="#about" variant="secondary">About me</ActionLink></div>
            <p className="availability">{profile.status}</p>
          </div>
          <a className="down-arrow" href="#projects" aria-label="Scroll down to projects">↓</a>
        </div>
      </section>

      <section className="overview-grid page-width" aria-label="Portfolio at a glance">
        <a className="overview-card overview-card--featured" href="/projects/qasam">
          <p className="eyebrow">Featured project</p><h2>Qasam</h2>
          <p>An accountability and app-blocking product designed to help Muslims build consistency around the five daily prayers.</p>
          <span className="text-link">Explore the project <span aria-hidden="true">↗</span></span>
          <ImagePlaceholder label="Qasam / App screenshots to come" />
        </a>
        <a className="overview-card overview-card--building" href="/projects/self-parking-car">
          <p className="eyebrow">Mechanical design</p><h2>Self-Parking Car</h2>
          <p>Led a team to design and manufacture an elastic-powered car with a geared drivetrain and pivoting steering module.</p>
        </a>
        <a className="overview-card" href="#experience">
          <h2>Experience</h2>
          <p>Engineering design at RecAbility, software at KKC, project coordination, and running a business.</p>
          <span className="text-link">View the timeline <span aria-hidden="true">↗</span></span>
        </a>
        <a className="overview-card" href="#about">
          <h2>About me</h2>
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
        <header className="section-heading"><h2>Experience</h2></header>
        <div className="experience-layout">
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
        <header className="section-heading"><h2>Projects</h2></header>
        <nav className="project-jumps" aria-label="Project categories"><a href="#software-projects">Software &amp; AI ↓</a><a href="#hardware-projects">Hardware &amp; Mechanical ↓</a></nav>
        {(["software", "hardware"] as const).map(category => (
          <section className="project-category" id={category + "-projects"} key={category} aria-labelledby={category + "-title"}>
            <header className="project-category__heading"><h3 id={category + "-title"}>{category === "software" ? "Software & AI" : "Hardware & Mechanical"}</h3></header>
            <div className="upcoming-projects">{projects.filter(project => project.category === category).sort((a, b) => Number(b.id === "self-parking-car") - Number(a.id === "self-parking-car")).map(project => (
              <article className="project-summary" id={`project-${project.id}`} key={project.id}>
                {project.gallery ? <div className="project-summary__image"><ZoomImage {...project.gallery[0]} /></div> : <a href={`/projects/${project.id}`} aria-label={`View ${project.name}`}><ImagePlaceholder label={project.image} /></a>}
                <a href={`/projects/${project.id}`} className="project-summary__body"><h4>{project.name}</h4><p>{project.description}</p><span className="text-link">View project <span aria-hidden="true">↗</span></span></a>
              </article>
            ))}</div>
          </section>
        ))}
      </section>

      <section className="portfolio-section skills-section" id="skills">
        <header className="section-heading"><h2>Skills</h2></header>
        <div className="skills-grid">{skillGroups.map(group => (
          <article className="skill-card" key={group.label}><h3>{group.label}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>
        ))}</div>
      </section>

      <section className="portfolio-section about-section" id="about">
        <header className="section-heading"><h2>About me</h2></header>
        <div className="about-layout">
          <figure className="about-portrait"><ZoomImage src="/game-assets/ayan-retro-portrait.png" alt="Retro pixel-art portrait of Ayan Siddiqui wearing a blue number 10 football jersey" width={1254} height={1254} caption="Ayan Siddiqui" /><figcaption>Ayan Siddiqui</figcaption></figure>
          <div className="about-copy"><p className="eyebrow">{profile.location}</p>
            <p>I’m a Mechatronics Engineering student at Toronto Metropolitan University interested in the intersection of mechanical systems, robotics, AI, and software.</p>
            <p>I like working on problems where I can move between disciplines — designing a mechanical assembly in SolidWorks, debugging an autonomous robot, building an AI-backed application, or improving a real operating process.</p>
            <p>Outside of engineering, I co-run an auto detailing business, follow Formula 1, basketball and football, and enjoy building products and experimenting with new technology.</p>
            <dl className="education"><div><dt>Education</dt><dd>{profile.school}</dd></div><div><dt>Degree</dt><dd>{profile.degree}</dd></div><div><dt>Expected graduation</dt><dd>{profile.graduation}</dd></div></dl>
          </div>
        </div>
      </section>
      <section className="portfolio-section contact-section" id="contact">
        <header className="section-heading"><h2>Contact</h2></header>
        <p>{profile.status}</p><p>{profile.location}</p>
        <div className="contact-actions"><ActionLink href={`mailto:${profile.email}`}>Email me</ActionLink><ActionLink href={profile.linkedin} variant="secondary">LinkedIn</ActionLink><ActionLink href={profile.github} variant="secondary">GitHub</ActionLink></div>
        <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
      </section>
      <footer className="site-footer"><a href="#overview">Ayan Siddiqui FC</a><a href="#overview">Back to top ↑</a></footer>
    </main>
  );
}
