import { PenaltyScene } from "./PenaltyScene";
import { ActionLink } from "./ActionLink";

const skillGroups = [
  { label: "01 / Languages", skills: ["TypeScript", "Python"] },
  { label: "02 / Interface", skills: ["React", "Next.js", "Responsive design"] },
  { label: "03 / Development", skills: ["APIs", "Testing"] },
  { label: "04 / Craft", skills: ["Accessibility", "Interaction design"] },
];

function ImagePlaceholder({ label, portrait = false }: { label: string; portrait?: boolean }) {
  return <div className={`image-placeholder ${portrait ? "image-placeholder--portrait" : ""}`} role="img" aria-label={label}>
    <span className="placeholder-corners" aria-hidden="true" />
    <span className="placeholder-mark" aria-hidden="true">{portrait ? "AS" : "↗"}</span>
    <span className="placeholder-caption">{label}</span>
  </div>;
}

export function PenaltyPortfolio() {
  return (
    <main className="scroll-portfolio">
      <nav className="site-nav" aria-label="Portfolio navigation">
        <a className="site-nav__brand" href="#overview" aria-label="Ayan Siddiqui FC home">AS</a>
        <div className="site-nav__links">
          <a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a>
        </div>
        <ActionLink className="nav-work" href="#projects" compact>View work</ActionLink>
      </nav>
      <section className="penalty-story" id="overview" aria-label="Scroll-controlled penalty kick">
        <div className="field-hero">
          <PenaltyScene />
          <div className="hero-copy">
            <p className="hero-copy__program">01 / Computer Engineering</p>
            <h1>Ayan<br /><em>Siddiqui.</em></h1>
            <p className="hero-copy__intro">Code, football, and the details in between.</p>
            <div className="hero-actions"><ActionLink href="#projects">See my work</ActionLink><ActionLink href="#about" variant="secondary">About me</ActionLink></div>
          </div>
          <a className="down-arrow" href="#projects" aria-label="Scroll down to projects">↓</a>
        </div>
      </section>

      <section className="overview-grid page-width" aria-label="Portfolio at a glance">
        <a className="overview-card overview-card--featured" href="#project-fc">
          <p className="eyebrow">Featured project / 01</p>
          <h2>Ayan Siddiqui FC</h2>
          <p>A little engineering. A lot of football.</p>
          <span className="text-link">Explore the project <span aria-hidden="true">↗</span></span>
          <div className="featured-image"><img src="/game-assets/stadium-field-v2.png" alt="Pixel-art stadium and penalty area from this portfolio" loading="lazy" width="1774" height="887" /><span>Interactive portfolio</span></div>
        </a>
        <article className="overview-card overview-card--building">
          <p className="eyebrow">On the drawing board</p>
          <h2>What comes next.</h2>
          <p>A space for the next project, its story, and a closer look at the work.</p>
          <span className="status-label">Project details coming soon</span>
        </article>
        <a className="overview-card" href="#experience">
          <p className="eyebrow">Experience</p>
          <h2>The work behind <em>the work.</em></h2>
          <span className="text-link">View the timeline <span aria-hidden="true">↗</span></span>
        </a>
        <a className="overview-card" href="#about">
          <p className="eyebrow">Off the pitch</p>
          <h2>Curious by nature.<br /><em>Builder at heart.</em></h2>
          <p>A little more about the person behind the screen.</p>
          <span className="text-link">About me <span aria-hidden="true">↗</span></span>
        </a>
        <article className="overview-card overview-card--links">
          <p className="eyebrow">The short route</p>
          <a href="#projects">Selected work <span aria-hidden="true">↗</span></a>
          <a href="#skills">Tools &amp; skills <span aria-hidden="true">↗</span></a>
          <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
        </article>
      </section>

      <section className="portfolio-section experience-section" id="experience">
        <header className="section-heading"><p className="section-index">02 / Experience</p><h2>Learning through<br /><em>doing.</em></h2></header>
        <div className="experience-layout">
          <aside className="timeline-note">
            <p className="eyebrow">Notes / The journey</p>
            <div className="note-arrow" aria-hidden="true">↗</div>
            <p>The process matters<br />as much as the result.</p>
            <span>Room for the next chapter.</span>
          </aside>
          <div className="experience-timeline">
            <article className="timeline-entry">
              <div className="timeline-date">Coming soon</div>
              <div className="timeline-body"><span className="timeline-number" aria-hidden="true">01</span><p className="eyebrow">Experience / To be added</p><h3>The story so far.</h3><p>Roles, teams, and the things learned along the way. This timeline will be filled in with my experience.</p><span className="pending-label">Experience details coming soon</span></div>
            </article>
            <article className="timeline-entry">
              <div className="timeline-date">In focus</div>
              <div className="timeline-body"><span className="timeline-number" aria-hidden="true">02</span><p className="eyebrow">Education</p><h3>Computer Engineering</h3><p>Exploring software, systems, and how things work.</p><span className="pending-label">Education details to follow</span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="portfolio-section projects-section" id="projects">
        <header className="section-heading"><p className="section-index">03 / Selected work</p><h2>Ideas, made<br /><em>tangible.</em></h2></header>
        <article className="project-feature" id="project-fc">
          <a className="project-cover" href="#overview" aria-label="Return to the interactive football portfolio"><img src="/game-assets/stadium-field-v2.png" alt="The custom pixel-art football field" loading="lazy" width="1774" height="887" /><span aria-hidden="true">↗</span></a>
          <div className="project-description"><p className="eyebrow">01 / Interactive portfolio</p><h3>Ayan Siddiqui FC</h3><p>A football-inspired portfolio. Custom pixel artwork and a scroll-controlled penalty animation, built with React and TypeScript.</p><ul className="tags"><li>React</li><li>TypeScript</li><li>Scroll animation</li></ul><ActionLink href="#overview" variant="secondary">Back to the pitch</ActionLink></div>
        </article>
        <div className="upcoming-projects">
          <article className="project-placeholder"><ImagePlaceholder label="Project image / 02" /><div><p className="eyebrow">02 / Coming soon</p><h3>The next build.</h3><p>Project details and imagery to follow.</p></div></article>
          <article className="project-placeholder"><ImagePlaceholder label="Project image / 03" /><div><p className="eyebrow">03 / Coming soon</p><h3>Another perspective.</h3><p>A space for another project and its story.</p></div></article>
        </div>
      </section>

      <section className="portfolio-section skills-section" id="skills">
        <header className="section-heading"><p className="section-index">04 / Toolkit</p><h2>The tools behind<br /><em>the details.</em></h2></header>
        <div className="skills-grid">{skillGroups.map((group) => (
          <article className="skill-card" key={group.label}><h3>{group.label}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>
        ))}</div>
      </section>

      <section className="portfolio-section about-section" id="about">
        <header className="section-heading"><p className="section-index">05 / About</p><h2>Beyond<br /><em>the screen.</em></h2></header>
        <div className="about-layout">
          <ImagePlaceholder label="Portrait / Photo to come" portrait />
          <div className="about-copy"><p className="eyebrow">Ayan Siddiqui</p><h3>Code. Football.<br />A bit of both.</h3><p>I&apos;m Ayan, a computer engineering student interested in software and how things work. This site brings two of my interests together: building for the web and football.</p><p className="about-footnote">More of my story is on its way.</p></div>
        </div>
      </section>
      <section className="portfolio-section contact-section" id="contact">
        <p className="section-index">06 / Contact</p><h2>Good things start<br /><em>with a conversation.</em></h2><p>Contact details and social links coming soon.</p>
      </section>
      <footer className="site-footer"><a href="#overview">Ayan Siddiqui FC</a><span>Built with a love for the game.</span><a href="#overview">Back to top ↑</a></footer>
    </main>
  );
}
