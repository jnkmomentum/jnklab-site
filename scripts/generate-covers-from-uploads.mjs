// NIC-5170 — Project card cover images from user-provided screenshots.
//
// Board follow-up ("Find attached dawn, hedyknows and miravel screenshots.
// crop them to same format. civicgraph can keep the parlament picture."):
// three covers are regenerated from the screenshots the board attached
// (saved verbatim in scripts/cover-sources/). Each is cropped to the card's
// 2.67:1 slot (800×300). Civic Graph is intentionally left untouched — it
// keeps the Bundestag plenary photo from the previous pass.
//
// Run:  node scripts/generate-covers-from-uploads.mjs
// Deps: sharp (already a project dependency)

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "covers");
const SRC = join(__dirname, "cover-sources");

const W = 800;
const H = 300;

// Each entry maps an uploaded screenshot to the card cover it produces.
// `position` sets the cover-crop gravity; `extract` (optional) pre-crops a
// band before the cover resize so we frame the meaningful region exactly.
const JOBS = [
  {
    // Dawn — aurora/sunrise landscape (abstract, not the real app). Wide
    // 1.98:1 source; a centred crop keeps the sunburst + horizon reflection.
    name: "dawn",
    file: "dawn-src.png",
    position: "centre",
  },
  {
    // HedyKnows — KI-Coaching watercolour illustration (brand purple).
    // Subject (face + UI cards) sits in the upper-middle band; bias up so the
    // 2.67:1 crop keeps her face and the floating cards, not empty floor.
    name: "hedy",
    file: "hedy-src.webp",
    position: "north",
  },
  {
    // Miravel — wealth-projection chart screenshot. The 1.52:1 source is tall;
    // extract the plot band (title down through the curve) first, then cover.
    name: "miravel",
    file: "miravel-src.png",
    extract: { left: 0, top: 150, width: 796, height: 298 },
    position: "centre",
  },
];

for (const job of JOBS) {
  let img = sharp(join(SRC, job.file));
  if (job.extract) img = img.extract(job.extract);
  const out = await img
    .resize(W, H, { fit: "cover", position: job.position })
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  await writeFile(join(OUT, `${job.name}.jpg`), out);
  console.log(`✓ ${job.name}.jpg  (${out.length.toLocaleString()} bytes)  ← ${job.file}`);
}

console.log("\nCivic Graph cover left untouched (keeps the Bundestag plenary photo).");
