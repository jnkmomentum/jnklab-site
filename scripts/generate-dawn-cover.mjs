// Generates the Dawn project-card cover for jnklab.com (NIC-5170 follow-up).
// Dawn has no public marketing site and the real app must stay secret, so we
// can't "take a picture from the project website" like the other three cards.
// Instead of an abstract/generated graphic (founder rejected the constellation
// style), we render a branded OG-style card — logo mark + wordmark + tagline on
// the Dawn violet — so it reads as a designed brand asset, matching the visual
// language of the hedy/miravel OG cards. Run: node scripts/generate-dawn-cover.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const W = 800;
const H = 300;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "covers");

// Dawn violet brand ramp on the site's dark card base (#0d0d14).
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#181231"/>
      <stop offset="0.55" stop-color="#120e22"/>
      <stop offset="1" stop-color="#0d0d14"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.7">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.38"/>
      <stop offset="0.5" stop-color="#6d5dfc" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a78bfa"/>
      <stop offset="1" stop-color="#6d5dfc"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#a78bfa" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#a78bfa" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="7"/>
    </filter>
    <filter id="noise" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.028 0"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- soft rising sun echo, upper-right, low-key (brand nod, not the ring motif) -->
  <circle cx="672" cy="150" r="120" fill="#8b5cf6" fill-opacity="0.10" filter="url(#soft)"/>

  <!-- logo mark: 44x44 rounded square + sunrise glyph -->
  <g>
    <rect x="56" y="70" width="44" height="44" rx="12" fill="url(#mark)"/>
    <circle cx="78" cy="99" r="10" fill="#0d0d14" fill-opacity="0.28"/>
    <circle cx="78" cy="99" r="6.5" fill="#fdf9ff"/>
    <rect x="66" y="99.5" width="24" height="2" rx="1" fill="#fdf9ff" fill-opacity="0.9"/>
  </g>

  <!-- wordmark -->
  <text x="116" y="103" font-family="DejaVu Serif" font-size="30" font-weight="bold"
        fill="#f2ecff" letter-spacing="0.3">Dawn</text>

  <!-- headline -->
  <text x="58" y="176" font-family="DejaVu Serif" font-size="42" font-weight="bold"
        fill="#f6f2ff">Personal life management</text>

  <!-- accent rule -->
  <rect x="60" y="196" width="150" height="2" rx="1" fill="url(#rule)"/>

  <!-- tagline -->
  <text x="58" y="226" font-family="DejaVu Sans" font-size="19"
        fill="#b6a6f5">Goals, habits &amp; daily rhythm — designed for depth, not bustle.</text>

  <rect width="${W}" height="${H}" filter="url(#noise)"/>
</svg>`;

await mkdir(OUT, { recursive: true });
const png2x = await sharp(Buffer.from(svg), { density: 288 })
  .resize(W * 2, H * 2, { fit: "fill" })
  .png()
  .toBuffer();
await sharp(png2x)
  .resize(W, H, { fit: "fill" })
  .jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true })
  .toFile(join(OUT, "dawn.jpg"));
console.log("✓ public/covers/dawn.jpg");
