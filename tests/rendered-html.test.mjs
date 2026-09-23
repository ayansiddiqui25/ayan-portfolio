import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CONTACT, DURATION, penaltyAt, scrollPenaltyTime, isPenaltyNavHidden } from "../app/components/penalty-motion.mjs";
import test from "node:test";

const routes = [
  ["/about", "#about"],
  ["/experience", "#experience"],
  ["/projects", "#projects"],
  ["/hobbies", "#about"],
];

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the portfolio with the generated stadium and named penalty player", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Ayan/);
  assert.match(html, /Siddiqui/);
  assert.match(html, /Mechatronics Engineering/i);
  assert.match(html, /Siddiqui takes a penalty/i);
  assert.doesNotMatch(html, /The Portfolio Cup/i);
  assert.match(html, /stadium-field-v2\.png/);
  assert.match(html, /Scroll down to projects/);
  assert.match(html, /Scroll-controlled penalty kick/);
  assert.doesNotMatch(html, /Replay kick|Play kick|penalty-control/);
  assert.match(html, /keeper-ready\.png/);
  assert.match(html, /keeper-launch\.png/);
  assert.match(html, /keeper-airborne\.png/);
  assert.match(html, /keeper-stretch\.png/);
  assert.match(html, /keeper-landed\.png/);
  assert.match(html, /id="experience"/);
  assert.match(html, /id="projects"/);
  assert.match(html, /id="skills"/);
  assert.match(html, /id="about"/);
  assert.match(html, /Ayan Siddiqui FC/);
  assert.match(html, /Qasam/);
  assert.doesNotMatch(html, /Scroll to start|Company · Dates|awaiting your photo/i);
  assert.match(html, /Featured project/);
  assert.match(html, /id="contact"/);
  assert.match(html, /ayan-retro-portrait\.png/);
  assert.match(html, /<h2>About me<\/h2>/);
  assert.match(html, /hero-copy__role/);
  assert.doesNotMatch(html, /Portrait \/ Photo to come|05 \/ About/);
  assert.match(html, /App screenshots to come/);
  for (const name of ["RecAbility", "Rusteze Auto Detailing", "SheHacksPurple", "KKC Consulting", "SentinelAI", "U-Net Semantic Segmentation", "Autonomous Mobile Robot", "Self-Parking Car", "Water Filtration Unit"]) assert.ok(html.includes(name), name);
  assert.match(html, /Toronto Metropolitan University/);
  assert.match(html, /April 2028/);
  assert.match(html, /2027 co-op/);
  assert.match(html, /mailto:ayan.siddiqui@torontomu.ca/);
  assert.match(html, /https:\/\/linkedin.com\/in\/ayansidd/);
  assert.match(html, /https:\/\/github.com\/ayansiddiqui25/);
  assert.match(html, /href="\/projects\/qasam"/);
  assert.match(html, /href="\/projects\/unet"/);
  assert.match(html, /approximately 40%/);
  assert.doesNotMatch(html, /computer engineering student|Experience details coming soon|Contact details and social links coming soon/i);
  assert.doesNotMatch(html, /Pranoy|Mukherjee|Glassbox|Tradexim|Finavator/i);
  assert.doesNotMatch(html, /Shoot Top left|Pick a corner/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("separates software and hardware projects and shows the team-led car gallery", async () => {
  const html = await (await render()).text();
  const softwareStart = html.indexOf('id="software-projects"');
  const hardwareStart = html.indexOf('id="hardware-projects"');
  assert.ok(softwareStart > 0 && hardwareStart > softwareStart);
  const software = html.slice(softwareStart, hardwareStart);
  const hardware = html.slice(hardwareStart, html.indexOf('id="skills"'));
  for (const id of ["qasam", "sentinel-ai", "unet"]) assert.ok(software.includes(`id="project-${id}"`));
  for (const id of ["self-parking-car", "autonomous-robot", "water-filtration"]) {
    assert.ok(hardware.includes(`id="project-${id}"`));
    assert.ok(!software.includes(`id="project-${id}"`));
  }
  assert.match(hardware, /selected-concept.jpeg/);
  const car = await (await render('/projects/self-parking-car')).text();
  assert.match(car, /Project Lead/);
  assert.match(car, /Team project/);
  for (const file of ["selected-concept.jpeg", "assembly-drawing.png", "drive-gear.png"]) assert.ok(car.includes(file));
  assert.match(car, /not a competition result/);
  assert.doesNotMatch(hardware, /Vehicle photo to come/);
});

test("uses the shared retro design system and distinct CTA variants", async () => {
  const html = await (await render()).text();
  assert.match(html, /class="action action--primary/);
  assert.match(html, /class="action action--secondary/);
  const tokens = readFileSync(new URL("../app/design-system.css", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /@import "\.\/design-system.css"/);
  assert.match(styles, /container-type: size/);
  assert.match(styles, /width: max\(100%, 200cqh, 1400px\)/);
  assert.doesNotMatch(styles, /width: max\(100%, 200svh/);
  assert.match(tokens, /--font-body: "DM Sans"/);
  assert.match(tokens, /--font-display: "Oxanium"/);
  assert.match(tokens, /--accent: #d5f568/);
  assert.match(tokens, /\.action:focus-visible/);
  assert.match(tokens, /prefers-reduced-motion/);
  assert.doesNotMatch(styles + tokens, /Arial|Helvetica|DM Serif|arcade-coral|#ff947d/i);
});

test("every project opens a complete case study and invalid projects return 404", async () => {
  const home = await (await render()).text();
  for (const slug of ['qasam', 'sentinel-ai', 'unet', 'autonomous-robot', 'self-parking-car', 'water-filtration']) {
    assert.ok(home.includes(`href="/projects/${slug}"`), slug);
    const response = await render(`/projects/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    for (const heading of ['Problem', 'Solution', 'My role', 'Outcome']) assert.ok(html.includes(`<h2>${heading}</h2>`), `${slug}: ${heading}`);
    assert.ok(html.includes(`href="/#project-${slug}"`));
  }
  assert.equal((await render('/projects/not-a-project')).status, 404);
});

test("WFU has source images, careful attribution, and record-specific social metadata", async () => {
  const wfu = await (await render('/projects/water-filtration')).text();
  assert.match(wfu, /system-diagram\.png/);
  assert.match(wfu, /ayan-concept\.jpeg/);
  assert.match(wfu, /Design 4/);
  assert.match(wfu, /require physical validation/);
  for (const [slug, title] of [['water-filtration', 'Water Filtration Unit'], ['qasam', 'Qasam']]) {
    const html = await (await render(`/projects/${slug}`)).text();
    assert.ok(html.includes(`<title>${title} | Ayan Siddiqui FC</title>`));
    assert.ok(html.includes(`property="og:title" content="${title}"`));
    assert.ok(html.includes(`name="twitter:title" content="${title}"`));
    assert.doesNotMatch(html, /\/og\.png/);
  }
  assert.match(wfu, /https:\/\/pixel-portfolio-fc\.sidayan25\.chatgpt\.site\/project-assets\/water-filtration\/system-diagram\.png/);
});

test("temporarily removed projects are absent from cards, related links and direct routes", async () => {
  for (const path of ['/', '/projects/qasam', '/projects/self-parking-car']) {
    const html = await (await render(path)).text();
    assert.doesNotMatch(html, /financial-dashboard|formula-racing|battery-enclosure/);
  }
  for (const slug of ['financial-dashboard', 'formula-racing', 'battery-enclosure']) {
    assert.equal((await render(`/projects/${slug}`)).status, 404);
  }
});

test("pictures use in-page dialog buttons instead of image links", async () => {
  for (const path of ['/', '/projects/self-parking-car', '/projects/water-filtration']) {
    const html = await (await render(path)).text();
    assert.match(html, /class="image-zoom-trigger"/);
    assert.match(html, /aria-haspopup="dialog"/);
    assert.match(html, /<dialog[^>]*class="image-lightbox"/);
    assert.doesNotMatch(html, /href="\/project-assets\/|target="_blank"/);
    assert.doesNotMatch(html, /<dialog[^>]*\sopen(?:[\s=>])/);
  }
});

test("About uses supplied personal copy, Toronto locations, and no em dashes", async () => {
  const html = await (await render()).text();
  const about = html.slice(html.indexOf('id="about"'), html.indexOf('id="contact"'));
  assert.match(about, /Outside of work and school, I run two successful businesses/);
  assert.match(about, /HUGE football \(or soccer\) fan/);
  assert.match(about, /huge Arsenal fan/);
  assert.doesNotMatch(about, /—|&mdash;|&#8212;/);
  assert.doesNotMatch(about, /Milton/i);
  assert.match(about, /Toronto, Ontario, Canada/);
  assert.match(html, /id="certifications"/);
});

test("experience updates and supplied certifications are rendered accurately", async () => {
  const html = await (await render()).text();
  const entries = [...html.matchAll(/<article class="timeline-entry">([\s\S]*?)<\/article>/g)].map(match => match[1]);
  assert.match(entries.find(entry => entry.includes('RecAbility')), /Feb 2026 – Sep 2026/);
  assert.match(entries.find(entry => entry.includes('Rusteze Auto Detailing')), /Milton, Ontario/);
  const section = html.slice(html.indexOf('id="certifications"'), html.indexOf('id="about"'));
  for (const text of ['Claude in Amazon Bedrock', 'Anthropic', 'AI Skills Fest', 'Microsoft', 'AI Agents: Intensive Vibe Coding Capstone Project', 'Google x Kaggle', 'CSWA', 'Exam preparation', 'In progress']) assert.ok(section.includes(text), text);
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
  assert.match(css, /\.timeline-entry::before[^}]*width: 3px; background: var\(--paper\)/);
  assert.match(css, /\.timeline-body::before[^}]*width: 15px; height: 15px; background: var\(--paper\)/);
});

test("skill pills have clean labels without decorative slashes", async () => {
  const html = await (await render()).text();
  const skills = html.slice(html.indexOf('id="skills"'), html.indexOf('id="about"'));
  const labels = [...skills.matchAll(/<(?:h3|li)>([^<]+)<\/(?:h3|li)>/g)].map(match => match[1]);
  assert.ok(labels.length > 40);
  for (const label of labels) assert.ok(!label.includes('/'), label);
  const styles = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
  assert.doesNotMatch(styles, /\.skill-card li::after/);
  assert.match(skills, /Mechanical Engineering/);
});

test("redirects legacy pages into the unified scrolling portfolio", async () => {
  for (const [path, anchor] of routes) {
    const response = await render(path);
    assert.ok([307, 308].includes(response.status), `${path}: ${response.status}`);
    assert.match(response.headers.get("location") ?? "", new RegExp(`${anchor}$`), path);
  }
});

test("serves the custom social preview metadata", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /property="og:image"/);
  assert.match(html, /http:\/\/localhost(?::3000)?\/og\.png/);
  assert.match(html, /summary_large_image/);
});

test("scroll controls reversible progress and waits for a tall mobile intro", () => {
  assert.equal(scrollPenaltyTime(100, 2240, 800, 800), 600);
  assert.equal(scrollPenaltyTime(0, 2240, 800, 800), 600);
  assert.equal(scrollPenaltyTime(-720, 2240, 800, 800), 2000);
  assert.equal(scrollPenaltyTime(-1440, 2240, 800, 800), DURATION);
  assert.equal(scrollPenaltyTime(-3000, 2240, 800, 800), DURATION);
  // Reverse to the same halfway position, with no elapsed-time dependency.
  assert.equal(scrollPenaltyTime(-720, 2240, 800, 800), 2000);
  assert.equal(scrollPenaltyTime(-200, 2460, 1200, 700), 600);
  assert.equal(scrollPenaltyTime(-500, 2460, 1200, 700), 600);
  assert.equal(scrollPenaltyTime(-1130, 2460, 1200, 700), 2000);
  assert.equal(scrollPenaltyTime(-1760, 2460, 1200, 700), DURATION);
});

test("navigation clears the full penalty sequence and restores reversibly", () => {
  assert.equal(isPenaltyNavHidden(0, 2240, 800, 800), false);
  assert.equal(isPenaltyNavHidden(-8, 2240, 800, 800), false);
  assert.equal(isPenaltyNavHidden(-9, 2240, 800, 800), true);
  assert.equal(isPenaltyNavHidden(-1200, 2240, 800, 800), true);
  assert.equal(isPenaltyNavHidden(-1439, 2240, 800, 800), true);
  assert.equal(isPenaltyNavHidden(-1440, 2240, 800, 800), false);
  assert.equal(isPenaltyNavHidden(-2000, 2240, 800, 800), false);
  assert.equal(isPenaltyNavHidden(-720, 2240, 800, 800), true);
  assert.equal(isPenaltyNavHidden(0, 2240, 800, 800), false);
  assert.equal(isPenaltyNavHidden(-200, 2460, 1200, 700), true);
  assert.equal(isPenaltyNavHidden(-1760, 2460, 1200, 700), false);
  assert.equal(isPenaltyNavHidden(-200, 1200, 1200, 700, true), false);
});

test("ball stays on the measured spot until the boot reaches it", () => {
  for (let time = 0; time <= CONTACT; time += 10) {
    assert.deepEqual(penaltyAt(time).ball, penaltyAt(0).ball);
  }
  const impact = penaltyAt(CONTACT);
  assert.equal(impact.player.frame, 2);
  // Measured toe within the contact sprite, and visible ball radius in field units.
  const toeX = impact.player.x + .955 * 12;
  const toeY = impact.player.y + .805 * 12 * (1278 / 1230) * 2;
  assert.ok(Math.abs(toeX - (impact.ball.x - .75)) < .01);
  assert.ok(Math.abs(toeY - impact.ball.y) < .01);
  assert.ok(penaltyAt(CONTACT + 1).ball.x > impact.ball.x);
});

test("keeper reacts after contact, dives opposite the ball, then lands", () => {
  assert.equal(penaltyAt(CONTACT).keeper.frame, 0);
  const during = penaltyAt(CONTACT + 450);
  assert.ok(during.keeper.x < 71.55 && during.ball.x > 71.6);
  const end = penaltyAt(DURATION);
  assert.equal(end.keeper.frame, 4);
  const groundContact = end.keeper.y + .755 * end.keeper.width * 2;
  assert.ok(groundContact > 42 && groundContact < 43);
  assert.ok(end.ball.x > 61.3 && end.ball.x < 81.7);
  assert.ok(end.ball.y > 29 && end.ball.y < 41);
  assert.deepEqual(penaltyAt(DURATION + 1000), end);
});

test("motion has no position jumps across contact, dive or landing", () => {
  for (let time = 0; time < DURATION; time += 16) {
    const a = penaltyAt(time), b = penaltyAt(time + 16);
    for (const actor of ["player", "ball", "keeper"]) {
      assert.ok(Math.abs(a[actor].x - b[actor].x) < 1, actor);
      assert.ok(Math.abs(a[actor].y - b[actor].y) < 1.2, actor);
    }
  }
});

test("net and goal finish follow ball impact and settle before projects", () => {
  for (const time of [0, CONTACT, CONTACT + 500, CONTACT + 720]) {
    assert.equal(penaltyAt(time).finish.net, 0);
    assert.equal(penaltyAt(time).finish.goalOpacity, 0);
  }
  const reaction = penaltyAt(CONTACT + 820).finish;
  assert.ok(reaction.net > 0);
  assert.ok(penaltyAt(2700).finish.goalOpacity > .99);
  assert.equal(penaltyAt(DURATION).finish.net, 0);
  assert.equal(penaltyAt(DURATION).finish.goalOpacity, 0);
  assert.deepEqual(penaltyAt(CONTACT + 820).finish, reaction);
});
