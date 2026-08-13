// NIC-5170 — Project card cover images sourced from the live project websites.
//
// Per the ticket's follow-up ("take the pictures from the project websites"),
// three of the four covers are pulled from each product's own public site and
// cropped to the card's 2.67:1 slot. Dawn is intentionally excluded: it has no
// public marketing site and the real app (dawn.jnklab.com) must stay secret /
// un-screenshotted, so its cover remains the abstract graphic in public/covers/dawn.jpg.
//
// Run:  node scripts/generate-covers-from-web.mjs
// Deps: sharp (already a project dependency)

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "covers");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// Each source is the brand imagery the site itself publishes.
const SOURCES = [
  {
    // HedyKnows OpenGraph share card — dark indigo brand card, on-theme.
    name: "hedy",
    url: "https://hedyknows.com/opengraph-image",
    // Content (logo + headline) sits in the upper-middle band; bias the crop up.
    position: "north",
  },
  {
    // Civic Graph — Bundestag plenary hall photo used on civicgraph.eu.
    name: "civicgraph",
    url: "https://civicgraph.eu/images/bundestag-plenarsaal.jpg",
    position: "centre",
  },
  {
    // Miravel OpenGraph card — cream/forest-green brand card + projection chart.
    name: "miravel",
    url: "https://miravel.io/og-image.png",
    position: "centre",
  },
];

const W = 800;
const H = 300;

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

for (const src of SOURCES) {
  const input = await fetchBuffer(src.url);
  const out = await sharp(input)
    .resize(W, H, { fit: "cover", position: src.position })
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  const dest = join(OUT, `${src.name}.jpg`);
  await writeFile(dest, out);
  console.log(`✓ ${src.name}.jpg  (${out.length.toLocaleString()} bytes)  ← ${src.url}`);
}

console.log("\nDawn cover left untouched (abstract graphic; no public site).");
