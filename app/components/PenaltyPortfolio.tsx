"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const keeperFrames = [
  ["ready", "keeper-ready.png"],
  ["launch", "keeper-launch.png"],
  ["airborne", "keeper-airborne.png"],
  ["stretch", "keeper-stretch.png"],
] as const;

const skillGroups = [
  { label: "Build", skills: ["TypeScript", "React", "Next.js", "Python"] },
  { label: "Ship", skills: ["Responsive UI", "APIs", "Testing", "Accessibility"] },
  { label: "Think", skills: ["Product thinking", "Systems", "Prototyping", "Iteration"] },
] as const;

export function PenaltyPortfolio() {
  const storyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const story = storyRef.current;
      if (!story) return;
      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(clamp(-rect.top / distance));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const playerFrame = progress < .18 ? 0 : progress < .36 ? 1 : progress < .54 ? 2 : 3;
  const keeperFrame = progress < .3 ? 0 : progress < .46 ? 1 : progress < .64 ? 2 : 3;
  const runProgress = clamp(progress / .58);
  const keeperProgress = clamp((progress - .26) / .5);
  const ballProgress = clamp((progress - .5) / .3);
  const easedBall = 1 - Math.pow(1 - ballProgress, 3);

  const sceneStyle = {
    "--run-x": `${runProgress * 8}cqw`,
    "--run-y": `${runProgress * -1.5}cqw`,
    "--keeper-x": `${keeperProgress * -24}cqw`,
    "--keeper-y": `${keeperProgress * -5}cqw`,
    "--ball-x": `${easedBall * 16}cqw`,
    "--ball-y": `${easedBall * -43}cqw`,
    "--ball-scale": 1 - easedBall * .35,
    "--ball-spin": `${easedBall * 800}deg`,
  } as CSSProperties;

  const scrollCue =
    progress < .18
      ? "Scroll to start the run-up"
      : progress < .48
        ? "Closing in on the spot"
        : progress < .76
          ? "Clean contact"
          : "Top corner";

  return (
    <main className="scroll-portfolio">
      <nav className="site-nav" aria-label="Portfolio navigation">
        <a className="site-nav__crest" href="#overview" aria-label="Ayan Siddiqui FC home">
          AS
        </a>
        <div className="site-nav__links">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
        </div>
        <a className="site-nav__cta" href="#projects">View work <span aria-hidden="true">↗</span></a>
      </nav>

      <section className="scroll-story" id="overview" ref={storyRef}>
        <div className="scroll-story__sticky">
          <div className="hero-copy">
            <p className="section-index"><span>01</span> / Kickoff</p>
            <h1>Ayan<br /><em>Siddiqui</em></h1>
            <p className="hero-copy__program">Computer Engineering</p>
            <p className="hero-copy__intro">
              I build clear, dependable digital experiences with a product mindset
              and an engineer&apos;s attention to detail.
            </p>
            <div className="hero-copy__tags" aria-label="Areas of focus">
              <span>Software</span><span>Product</span><span>Systems</span>
            </div>
            <div className="hero-copy__actions">
              <a className="primary-button" href="#projects">View my work <span aria-hidden="true">→</span></a>
              <a className="text-button" href="#about">About me</a>
            </div>
            <p className="hero-copy__availability"><span /> Open to opportunities</p>
          </div>

          <div className="kick-column">
            <div className="kick-scene" style={sceneStyle} aria-label="Scroll-controlled pixel penalty kick">
              <div className="kick-scene__sky" />
              <div className="kick-scene__light kick-scene__light--left">
                <img src="/game-assets/stadium-floodlight.png" alt="" />
              </div>
              <div className="kick-scene__light kick-scene__light--right">
                <img src="/game-assets/stadium-floodlight.png" alt="" />
              </div>
              <div className="kick-scene__crowd" />
              <div className="kick-scene__field" />
              <div className="kick-scene__box" aria-hidden="true">
                <span className="kick-scene__box-side kick-scene__box-side--left" />
                <span className="kick-scene__box-side kick-scene__box-side--right" />
                <span className="kick-scene__box-front" />
                <span className="kick-scene__spot" />
              </div>
              <img className="kick-scene__goal" src="/game-assets/goal-net.png" alt="Pixel soccer goal" />
              <div className="scroll-keeper" aria-hidden="true">
                {keeperFrames.map(([name, file], index) => (
                  <img
                    className={index === keeperFrame ? "is-active" : ""}
                    key={name}
                    src={`/game-assets/${file}`}
                    alt=""
                  />
                ))}
              </div>
              <img
                className={`scroll-ball ${ballProgress >= .98 ? "is-in-net" : ""}`}
                src="/game-assets/ball.png"
                alt="Pixel soccer ball"
              />
              <span
                role="img"
                aria-label="Pixel soccer player taking a penalty"
                className={`scroll-player scroll-player--frame-${playerFrame}`}
              />
              <div className="kick-scene__score"><span>ASFC</span><strong>01</strong></div>
            </div>

            <div className="scroll-status" aria-live="polite">
              <span>{scrollCue}</span>
              <div className="scroll-status__track"><i style={{ width: `${Math.max(3, progress * 100)}%` }} /></div>
              <b>{Math.round(progress * 100).toString().padStart(2, "0")}</b>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section experience-section" id="experience">
        <header className="section-heading">
          <p className="section-index"><span>02</span> / Experience</p>
          <h2>Built one <em>season</em> at a time.</h2>
          <p>A focused timeline for roles, teams, and the work that moved the score forward.</p>
        </header>

        <div className="timeline-layout">
          <aside className="timeline-note">
            <span>Team sheet</span>
            <strong>Experience details<br />coming next.</strong>
            <p>The structure is ready for the real roles and dates you&apos;ll provide.</p>
            <i aria-hidden="true">↗</i>
          </aside>
          <ol className="experience-timeline" aria-label="Experience timeline placeholders">
            {["Latest role", "Previous role", "First role"].map((role, index) => (
              <li key={role}>
                <span className="experience-timeline__number">0{index + 1}</span>
                <div>
                  <p>Company · Dates</p>
                  <h3>{role}</h3>
                  <span>Role, impact, and key wins will be added here.</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="portfolio-section projects-section" id="projects">
        <header className="section-heading section-heading--split">
          <div>
            <p className="section-index"><span>03</span> / Projects</p>
            <h2>Selected <em>match reports.</em></h2>
          </div>
          <p>Open a project to see the decisions, craft, and tools behind the result.</p>
        </header>

        <div className="project-list">
          <details className="project-row" open>
            <summary>
              <span className="project-row__number">01</span>
              <span className="project-row__title">Ayan Siddiqui FC</span>
              <span className="project-row__type">Interactive portfolio</span>
              <span className="project-row__toggle" aria-hidden="true">+</span>
            </summary>
            <div className="project-row__details">
              <p>
                A scroll-directed soccer portfolio that turns a penalty kick into a calm,
                cinematic introduction instead of a navigation gate.
              </p>
              <dl>
                <div><dt>Role</dt><dd>Design &amp; development</dd></div>
                <div><dt>Focus</dt><dd>Motion, interaction, responsive UI</dd></div>
                <div><dt>Stack</dt><dd>React, TypeScript, CSS</dd></div>
              </dl>
            </div>
          </details>

          {["Featured project", "Project three"].map((project, index) => (
            <details className="project-row project-row--placeholder" key={project}>
              <summary>
                <span className="project-row__number">0{index + 2}</span>
                <span className="project-row__title">{project}</span>
                <span className="project-row__type">Details coming soon</span>
                <span className="project-row__toggle" aria-hidden="true">+</span>
              </summary>
              <div className="project-row__details">
                <p>This slot is ready for the project story, outcome, and technical details you want to feature.</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="portfolio-section skills-section" id="skills">
        <header className="section-heading">
          <p className="section-index"><span>04</span> / Skills</p>
          <h2>Tools help. <em>Judgment wins.</em></h2>
        </header>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article className="skill-card" key={group.label}>
              <div><span>0{index + 1}</span><h3>{group.label}</h3></div>
              <ul>
                {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section about-section" id="about">
        <div className="about-portrait">
          <img src="/game-assets/penalty-taker.png" alt="Temporary pixel soccer player portrait" />
          <span>Player portrait · awaiting your photo</span>
          <b aria-hidden="true">10</b>
        </div>
        <div className="about-copy">
          <p className="section-index"><span>05</span> / About</p>
          <h2>Engineer first.<br /><em>Teammate always.</em></h2>
          <p>
            I&apos;m Ayan, a product-minded developer who enjoys turning ambitious ideas
            into clear, useful digital experiences. I care about strong fundamentals,
            thoughtful details, and building things people genuinely enjoy using.
          </p>
          <p className="about-copy__note">
            Your pixel-player portrait will replace this temporary number 10 once you send a photo.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <a href="#overview">Ayan Siddiqui FC</a>
        <span>Computer Engineering · Building with purpose</span>
        <a href="#overview">Back to kickoff ↑</a>
      </footer>
    </main>
  );
}
