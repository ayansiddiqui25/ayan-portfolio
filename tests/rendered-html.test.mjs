import assert from "node:assert/strict";
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

test("renders all four accessible penalty targets", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /AYAN SIDDIQUI FC/i);
  assert.match(html, /Pick a corner\./i);
  assert.doesNotMatch(html, /The Portfolio Cup/i);
  assert.match(html, /stadium-floodlight\.png/);
  assert.match(html, /penalty-box__spot/);
  assert.match(html, /Animated Pixel soccer player wearing number 10/);
  assert.match(html, /Shoot Top left to open Experience/);
  assert.match(html, /Shoot Top right to open Projects/);
  assert.match(html, /Shoot Bottom left to open About me/);
  assert.match(html, /Shoot Bottom right to open Off the pitch/);
  assert.match(html, /Pixel goalkeeper/);
  assert.match(html, /Pixel soccer player/);
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
