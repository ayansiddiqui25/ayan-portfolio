import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["/about", "About me", "The player behind the pixels."],
  ["/experience", "Experience", "Seasons of shipping."],
  ["/projects", "Projects", "Selected match highlights."],
  ["/hobbies", "Off the pitch", "Life beyond the laptop."],
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

test("renders the scroll-driven portfolio sections and penalty scene", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Ayan/);
  assert.match(html, /Siddiqui/);
  assert.match(html, /Computer Engineering/i);
  assert.match(html, /Scroll-controlled pixel penalty kick/i);
  assert.doesNotMatch(html, /The Portfolio Cup/i);
  assert.match(html, /stadium-floodlight\.png/);
  assert.match(html, /kick-scene__spot/);
  assert.match(html, /keeper-ready\.png/);
  assert.match(html, /keeper-launch\.png/);
  assert.match(html, /keeper-airborne\.png/);
  assert.match(html, /keeper-stretch\.png/);
  assert.match(html, /id="experience"/);
  assert.match(html, /id="projects"/);
  assert.match(html, /id="skills"/);
  assert.match(html, /id="about"/);
  assert.match(html, /Ayan Siddiqui FC/);
  assert.match(html, /Interactive portfolio/i);
  assert.match(html, /Temporary pixel soccer player portrait/i);
  assert.doesNotMatch(html, /Shoot Top left|Pick a corner/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders every portfolio destination and return link", async () => {
  for (const [path, navLabel, heading] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp(navLabel, "i"), path);
    assert.match(html, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), path);
    assert.match(html, /href="\/"/, path);
    assert.match(html, /Back to the spot/, path);
  }
});

test("serves the custom social preview metadata", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /property="og:image"/);
  assert.match(html, /http:\/\/localhost(?::3000)?\/og\.png/);
  assert.match(html, /summary_large_image/);
});

test("uses a full-field hero, keeps the crowd static, and holds the ball until contact", async () => {
  const [styles, component] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/PenaltyPortfolio.tsx", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(styles, /crowd-bounce/);
  assert.match(styles, /\.scroll-story__sticky::before/);
  assert.match(styles, /\.kick-scene[\s\S]*?background: transparent/);
  assert.match(component, /clamp\(\(progress - \.5\) \/ \.3\)/);
  assert.match(component, /ballProgress >= \.98 \? "is-in-net"/);
  assert.match(styles, /transform: translate3d\(calc\(-50% \+ var\(--ball-x\)\), var\(--ball-y\)/);
  assert.match(styles, /\.scroll-ball\.is-in-net\s*\{\s*z-index: 4/);
});
