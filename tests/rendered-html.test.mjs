import assert from "node:assert/strict";
import { CONTACT, DURATION, penaltyAt, scrollPenaltyTime } from "../app/components/penalty-motion.mjs";
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
  assert.match(html, /Computer Engineering/i);
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
  assert.match(html, /Interactive portfolio/i);
  assert.doesNotMatch(html, /Scroll to start|Company · Dates|awaiting your photo|Featured project/i);
  assert.doesNotMatch(html, /Shoot Top left|Pick a corner/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
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
