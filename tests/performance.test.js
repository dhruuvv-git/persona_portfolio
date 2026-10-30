import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectsSource = await readFile(new URL("../src/Projects.jsx", import.meta.url), "utf8");
const aboutMeSource = await readFile(new URL("../src/AboutMe.jsx", import.meta.url), "utf8");

test("Projects uses the lightweight still background", async () => {
  assert.match(projectsSource, /import aboutBg from ["']\.\/assets\/about_bg\.jpg["']/);
  assert.doesNotMatch(projectsSource, /import aboutBg from ["']\.\/assets\/about_bg\.gif["']/);

  const { size } = await stat(new URL("../src/assets/about_bg.jpg", import.meta.url));
  assert.ok(size < 350_000, `Expected background under 350 KB, got ${size} bytes`);
});

test("About Me keeps its original eager video loading", () => {
  assert.equal((aboutMeSource.match(/preload="auto"/g) ?? []).length, 2);
  assert.doesNotMatch(aboutMeSource, /backgroundPoster|preload="metadata"/);
});
