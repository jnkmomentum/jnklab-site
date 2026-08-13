// Generates branded project-card cover images for jnklab.com (NIC-5170).
// Abstract/graphic covers (no screenshots), one per project, themed to the
// project's accent color on the site's dark card base (#0d0d14).
// Run: node scripts/generate-covers.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const W = 800;
const H = 300;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "covers");

// Shared dark base + fine noise (echoes the site's particle theme, kills banding)
const defs = (id, accent, accent2, glowX, glowY) => `
  <linearGradient id="base-${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0b0b12"/>
    <stop offset="1" stop-color="#0d0d14"/>
  </linearGradient>
  <radialGradient id="glow-${id}" cx="${glowX}" cy="${glowY}" r="0.75">
    <stop offset="0" stop-color="${accent}" stop-opacity="0.42"/>
    <stop offset="0.45" stop-color="${accent2}" stop-opacity="0.14"/>
    <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="vign-${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#0d0d14" stop-opacity="0.55"/>
    <stop offset="0.5" stop-color="#0d0d14" stop-opacity="0"/>
    <stop offset="1" stop-color="#0d0d14" stop-opacity="0.55"/>
  </linearGradient>
  <filter id="noise-${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.028 0"/>
  </filter>
  <filter id="soft-${id}" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="6"/>
  </filter>`;

const frame = (id, accent, accent2, glowX, glowY, motif) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${defs(id, accent, accent2, glowX, glowY)}</defs>
  <rect width="${W}" height="${H}" fill="url(#base-${id})"/>
  <rect width="${W}" height="${H}" fill="url(#glow-${id})"/>
  ${motif}
  <rect width="${W}" height="${H}" fill="url(#vign-${id})"/>
  <rect width="${W}" height="${H}" filter="url(#noise-${id})"/>
</svg>`;

// ---- Dawn — sunrise over horizon + concentric rhythm rings (violet) ----
const dawn = () => {
  // Content kept in the vertical safe zone y∈[55,225]: the slot crops ~3.9:1
  // and a bottom fade covers the lower band, so treat outer rows as bleed.
  const cx = 520, cy = 166, sun = 42, horizon = 190;
  let rings = "";
  for (let i = 1; i <= 5; i++) {
    const r = sun + i * 28;
    rings += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#a78bfa" stroke-opacity="${0.22 - i * 0.032}" stroke-width="1.5"/>`;
  }
  let rays = "";
  for (let a = -80; a <= 80; a += 20) {
    const rad = (a - 90) * Math.PI / 180;
    const x2 = cx + Math.cos(rad) * 190, y2 = cy + Math.sin(rad) * 190;
    rays += `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#c4b5fd" stroke-opacity="0.09" stroke-width="1"/>`;
  }
  const motif = `
    <g>${rays}${rings}
      <circle cx="${cx}" cy="${cy}" r="${sun + 26}" fill="#8b5cf6" fill-opacity="0.24" filter="url(#soft-dawn)"/>
      <circle cx="${cx}" cy="${cy}" r="${sun}" fill="#c4b5fd"/>
      <circle cx="${cx}" cy="${cy}" r="${sun}" fill="#8b5cf6" fill-opacity="0.35"/>
    </g>
    <line x1="0" y1="${horizon}" x2="${W}" y2="${horizon}" stroke="#a78bfa" stroke-opacity="0.26" stroke-width="1.25"/>`;
  return frame("dawn", "#8b5cf6", "#6d5dfc", 0.65, 0.5, motif);
};

// ---- HedyKnows — knowledge constellation w/ glowing hub (emerald) ----
const hedy = () => {
  const hub = { x: 250, y: 148 };
  const nodes = [
    [250,148,9],[140,96,4.5],[372,108,5],[430,172,4],[168,200,4.5],
    [318,198,4],[100,150,3.5],[300,74,3.5],[210,92,3],[386,214,3.5],
  ];
  let edges = "";
  for (let i = 1; i < nodes.length; i++) {
    edges += `<line x1="${hub.x}" y1="${hub.y}" x2="${nodes[i][0]}" y2="${nodes[i][1]}" stroke="#34d399" stroke-opacity="0.20" stroke-width="1"/>`;
  }
  // a few peripheral links for lattice feel
  edges += `<line x1="140" y1="92" x2="300" y2="64" stroke="#34d399" stroke-opacity="0.12" stroke-width="1"/>`;
  edges += `<line x1="372" y1="104" x2="430" y2="178" stroke="#34d399" stroke-opacity="0.12" stroke-width="1"/>`;
  edges += `<line x1="168" y1="200" x2="318" y2="198" stroke="#34d399" stroke-opacity="0.12" stroke-width="1"/>`;
  let dots = "";
  nodes.forEach(([x, y, r], i) => {
    if (i === 0) return;
    dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="#6ee7b7" fill-opacity="0.85"/>`;
  });
  const motif = `
    <g>${edges}${dots}
      <circle cx="${hub.x}" cy="${hub.y}" r="34" fill="#10b981" fill-opacity="0.28" filter="url(#soft-hedy)"/>
      <circle cx="${hub.x}" cy="${hub.y}" r="11" fill="#a7f3d0"/>
      <circle cx="${hub.x}" cy="${hub.y}" r="11" fill="#10b981" fill-opacity="0.3"/>
    </g>`;
  return frame("hedy", "#10b981", "#34d399", 0.3, 0.35, motif);
};

// ---- Civic Graph — node-link network graph (blue) ----
const civic = () => {
  const nodes = [
    [150,86,7],[300,66,5],[470,92,6],[620,74,5],
    [110,188,5],[260,158,8],[420,196,6],[560,166,7],[690,200,5],
    [200,228,4],[360,232,5],[520,226,4.5],
  ];
  const links = [
    [0,1],[1,2],[2,3],[0,5],[1,5],[2,6],[3,7],[5,6],[6,7],[7,8],
    [4,5],[5,9],[6,10],[7,11],[4,9],[9,10],[10,11],[8,11],[2,7],[1,6],
  ];
  let edges = "";
  links.forEach(([a, b]) => {
    edges += `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="#60a5fa" stroke-opacity="0.22" stroke-width="1"/>`;
  });
  let dots = "";
  nodes.forEach(([x, y, r]) => {
    dots += `<circle cx="${x}" cy="${y}" r="${r + 6}" fill="#3b82f6" fill-opacity="0.14"/>`;
    dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="#93c5fd"/>`;
    dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="#3b82f6" fill-opacity="0.35"/>`;
  });
  return frame("civic", "#3b82f6", "#60a5fa", 0.5, 0.3, `<g>${edges}${dots}</g>`);
};

// ---- Miravel — fan of projection curves over baseline grid (amber) ----
const miravel = () => {
  const baseY = 224, startX = 40, startY = 196, endX = 760;
  let grid = "";
  for (let gy = 80; gy < 224; gy += 36) {
    grid += `<line x1="40" y1="${gy}" x2="760" y2="${gy}" stroke="#fbbf24" stroke-opacity="0.06" stroke-width="1"/>`;
  }
  const curve = (endY, op, w) => {
    const c1x = startX + 240, c1y = startY - 10;
    const c2x = endX - 200, c2y = endY + (startY - endY) * 0.35;
    return `<path d="M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}" fill="none" stroke="#f59e0b" stroke-opacity="${op}" stroke-width="${w}" stroke-linecap="round"/>`;
  };
  // area under the primary (median) curve
  const medEnd = 80;
  const area = `<path d="M ${startX} ${startY} C ${startX + 240} ${startY - 10}, ${endX - 200} ${medEnd + (startY - medEnd) * 0.35}, ${endX} ${medEnd} L ${endX} ${baseY} L ${startX} ${baseY} Z" fill="#f59e0b" fill-opacity="0.07"/>`;
  const fan = [
    curve(50, 0.16, 1.5),
    curve(66, 0.24, 1.5),
    curve(120, 0.20, 1.5),
    curve(156, 0.14, 1.5),
  ].join("");
  const primary = `${curve(medEnd, 0.9, 2.5)}
    <circle cx="${endX}" cy="${medEnd}" r="9" fill="#f59e0b" fill-opacity="0.25"/>
    <circle cx="${endX}" cy="${medEnd}" r="4.5" fill="#fcd34d"/>
    <circle cx="${startX}" cy="${startY}" r="4" fill="#fcd34d"/>`;
  const motif = `<g>${grid}
      <line x1="40" y1="${baseY}" x2="760" y2="${baseY}" stroke="#fbbf24" stroke-opacity="0.22" stroke-width="1.25"/>
      ${area}${fan}${primary}</g>`;
  return frame("miravel", "#f59e0b", "#fbbf24", 0.72, 0.28, motif);
};

const jobs = [
  ["dawn", dawn()],
  ["hedy", hedy()],
  ["civicgraph", civic()],
  ["miravel", miravel()],
];

await mkdir(OUT, { recursive: true });
for (const [name, svg] of jobs) {
  // Rasterize at 2x for crisp downscale, then encode high-quality JPG (4:4:4, no chroma loss on dark gradients)
  const png2x = await sharp(Buffer.from(svg), { density: 288 })
    .resize(W * 2, H * 2, { fit: "fill" })
    .png()
    .toBuffer();
  await sharp(png2x)
    .resize(W, H, { fit: "fill" })
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(join(OUT, `${name}.jpg`));
  console.log(`✓ public/covers/${name}.jpg`);
}
console.log("done");
