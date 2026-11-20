import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";

const exported = new URL("../out/", import.meta.url);
const basePath = process.env.GITHUB_ACTIONS === "true" ? "/Julia_site" : "";
const images = [
  "board.png",
  "developer.png",
  "launcher-1.png",
  "launcher-2.png",
  "launcher-3.png",
  "launcher-4.png",
];

test("exported pages link to their local assets and to each other", async () => {
  const [home, guide] = await Promise.all([
    readFile(new URL("index.html", exported), "utf8"),
    readFile(new URL("how-to-use/index.html", exported), "utf8"),
  ]);

  assert.ok(home.includes(`href="${basePath}/how-to-use/"`));
  assert.ok(guide.includes(`href="${basePath}/"`));
  for (const image of images) {
    assert.ok(home.includes(`src="${basePath}/images/${image}"`), image);
    await access(new URL(`images/${image}`, exported));
  }

  for (const page of [home, guide]) {
    assert.ok(page.includes(`href="${basePath}/Logo.png"`));
    const buildAssets = [
      ...page.matchAll(/(?:src|href)="([^"]*\/_next\/static\/[^"]+)"/g),
    ];
    assert.ok(buildAssets.length > 0);
    for (const [, asset] of buildAssets) {
      assert.ok(asset.startsWith(`${basePath}/_next/static/`), asset);
      await access(new URL(asset.slice(basePath.length + 1), exported));
    }
  }
  await access(new URL("Logo.png", exported));
});

test("the export contains the Google site verification file and a 404 page", async () => {
  const verificationFile = "google22a7acfd737ddaa3.html";
  const body = await readFile(new URL(verificationFile, exported), "utf8");
  assert.equal(body.trim(), `google-site-verification: ${verificationFile}`);
  await access(new URL("404.html", exported));
});
