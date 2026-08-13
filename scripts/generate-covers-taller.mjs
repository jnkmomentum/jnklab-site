// NIC-5170 — Taller project-card covers.
//
// Board follow-up ("the cover card proportions are not good. the pictures
// cannot have that extreme landscape format, add more height to card
// picture."): the old covers were 2.67:1 (800×300) and the card slot rendered
// even wider (~3.9:1 at desktop), so a lot of each image's top/bottom was
// cropped away. We regenerate every cover at a squarer 2:1 (800×400) and the
// card slot is raised to h-52/h-64 so the rendered ratio lands near 2:1.
//
// Sources: dawn / hedy / miravel from the board-provided screenshots saved in
// scripts/cover-sources/. Civic Graph keeps the Bundestag plenary photo from
// civicgraph.eu (fetched, then cached alongside the others).
//
// Run:  node scripts/generate-covers-taller.mjs
// Deps: sharp (already a project dependency)

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "covers");
const SRC = join(__dirname, "cover-sources");

const W = 800;
const H = 400; // 2:1 — squarer than the old 2.67:1, matches the taller slot
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// `extract` (optional) pre-crops a band before the 2:1 cover resize.
const JOBS = [
  {
    // Dawn — aurora/sunrise landscape (abstract, not the real app). 915×463
    // source is ~1.98:1 → almost exactly 2:1, so a centred crop is near-lossless.
    name: "dawn",
    file: "dawn-src.png",
    position: "centre",
  },
  {
    // HedyKnows — KI-Coaching watercolour illustration. 1672×941 (1.78:1);
    // subject (face + floating UI cards) sits high, so bias the crop up.
    name: "hedy",
    file: "hedy-src.webp",
    position: "north",
  },
  {
    // Civic Graph — Bundestag plenary hall photo. Fetched from civicgraph.eu,
    // cached locally so this script is reproducible offline afterwards.
    name: "civicgraph",
    url: "https://civicgraph.eu/images/bundestag-plenarsaal.jpg",
    cache: "civicgraph-src.jpg",
    position: "centre",
  },
  {
    // Miravel — wealth-projection chart screenshot. 796×525 (1.52:1) is tall;
    // extract a 2:1 band (skip the header chrome up top) then cover-resize so
    // the full accumulation→plateau curve stays in frame.
    name: "miravel",
    file: "miravel-src.png",
    extract: { left: 0, top: 110, width: 796, height: 398 },
    position: "centre",
  },
];

for (const job of JOBS) {
  let input;
  if (job.url) {
    input = await fetchBuffer(job.url);
    if (job.cache) await writeFile(join(SRC, job.cache), input);
  } else {
    input = join(SRC, job.file);
  }
  let img = sharp(input);
  if (job.extract) img = img.extract(job.extract);
  const out = await img
    .resize(W, H, { fit: "cover", position: job.position })
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  await writeFile(join(OUT, `${job.name}.jpg`), out);
  console.log(
    `✓ ${job.name}.jpg  (${out.length.toLocaleString()} bytes)  ${W}×${H}`,
  );
}
