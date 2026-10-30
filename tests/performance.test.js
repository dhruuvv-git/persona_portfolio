import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectsSource = await readFile(new URL("../src/Projects.jsx", import.meta.url), "utf8");
const aboutMeSource = await readFile(new URL("../src/AboutMe.jsx", import.meta.url), "utf8");
const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");

test("Projects keeps its animated background", async () => {
  assert.match(projectsSource, /import aboutBg from ["']\.\/assets\/about_bg\.gif["']/);
  assert.doesNotMatch(projectsSource, /import aboutBg from ["']\.\/assets\/about_bg\.jpg["']/);

  const background = await readFile(new URL("../src/assets/about_bg.gif", import.meta.url));
  assert.equal(background.subarray(0, 6).toString(), "GIF89a");

  const frameMarkers = Buffer.from([0x21, 0xf9, 0x04]);
  let frames = 0;
  let offset = 0;
  while ((offset = background.indexOf(frameMarkers, offset)) !== -1) {
    frames += 1;
    offset += frameMarkers.length;
  }
  assert.ok(frames > 1, `Expected multiple animated frames, got ${frames}`);
});

test("main menu preloads submenu route chunks on mount", () => {
  assert.match(appSource, /useEffect\(\(\) => \{\s*Object\.keys\(pageLoaders\)\.forEach\(prefetchPage\)\s*\}, \[\]\)/);
});

test("About Me keeps its original eager video loading", () => {
  assert.equal((aboutMeSource.match(/preload="auto"/g) ?? []).length, 2);
  assert.doesNotMatch(aboutMeSource, /backgroundPoster|preload="metadata"/);
});
