import { PenaltyScene } from "./PenaltyScene";

const skillGroups = [
  { label: "Languages", skills: ["TypeScript", "Python"] },
  { label: "Development", skills: ["React", "Next.js", "APIs"] },
  { label: "Practice", skills: ["Testing", "Accessibility", "Responsive design"] },
];

export function PenaltyPortfolio() {
  return (
    <main className="scroll-portfolio">
      <nav className="site-nav" aria-label="Portfolio navigation">
        <a className="site-nav__brand" href="#overview">Ayan Siddiqui FC</a>
        <div className="site-nav__links">
          <a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#about">About</a>
        </div>
      </nav>
      <section className="field-hero" id="overview">
        <PenaltyScene />
        <div className="hero-copy">
          <p className="hero-copy__program">Computer Engineering</p>
          <h1>Ayan<br /><em>Siddiqui.</em></h1>
          <p className="hero-copy__intro">Code, football, and the details in between.</p>
          <a className="hero-work-link" href="#projects">See my work <span aria-hidden="true">↗</span></a>
        </div>
        <a className="down-arrow" href="#projects" aria-label="Scroll down to projects">↓</a>
      </section>

      <section className="portfolio-section projects-section" id="projects">
        <header className="section-heading"><p className="section-index">Selected work</p><h2>Projects.</h2></header>
        <div className="project-list">
          <details className="project-row" open>
            <summary>
              <span className="project-row__number">01</span>
              <span className="project-row__title">Ayan Siddiqui FC</span>
              <span className="project-row__type">Interactive portfolio</span>
              <span className="project-row__toggle" aria-hidden="true">+</span>
            </summary>
            <div className="project-row__details">
              <p>A football-inspired portfolio. Custom pixel artwork and a timed penalty animation, built with React and TypeScript.</p>
              <dl><div><dt>Role</dt><dd>Design &amp; development</dd></div><div><dt>Stack</dt><dd>React, TypeScript, CSS</dd></div></dl>
            </div>
          </details>
        </div>
      </section>

      <section className="portfolio-section skills-section" id="skills">
        <header className="section-heading"><p className="section-index">Toolkit</p><h2>What I work with.</h2></header>
        <div className="skills-grid">{skillGroups.map((group) => (
          <article className="skill-card" key={group.label}><h3>{group.label}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>
        ))}</div>
      </section>

      <section className="portfolio-section about-section" id="about">
        <header className="section-heading"><p className="section-index">Away from the pitch</p><h2>About me.</h2></header>
        <div className="about-copy">
          <p>I&apos;m Ayan, a computer engineering student interested in software and how things work. This site brings two of my interests together: building for the web and football.</p>
          <div className="experience-note" id="experience"><h3>Experience</h3><p>More on my experience soon.</p></div>
        </div>
      </section>
      <footer className="site-footer"><a href="#overview">Ayan Siddiqui FC</a><a href="#overview">Back to top ↑</a></footer>
    </main>
  );
}
