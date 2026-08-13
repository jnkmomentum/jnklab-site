# jnklab.com — JNK Momentum Portfolio Website

Portfolio and company website for **JNK Momentum** at [jnklab.com](https://jnklab.com).

## Stack

- **Next.js 16** (App Router, `output: export` — fully static)
- **Tailwind CSS v4** (CSS-first configuration)
- **TypeScript**
- Fonts: Inter (body) + Instrument Serif (display)
- No external animation libraries — CSS transitions + canvas particles

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Production build

```bash
npm run build
# Outputs static files to ./out/
```

The `out/` directory contains pure HTML/CSS/JS — no Node.js process required at runtime.

## Deployment (VPS, nginx)

### Option A — Static files served by nginx (recommended)

1. Copy `out/` to the VPS:
   ```bash
   rsync -av --delete out/ user@vps:/var/www/jnklab.com/
   ```

2. Configure nginx vhost (example):
   ```nginx
   server {
       listen 80;
       server_name jnklab.com www.jnklab.com;

       root /var/www/jnklab.com;
       index index.html;

       location / {
           try_files $uri $uri/ $uri.html =404;
       }

       gzip_static on;

       location /_next/static/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. Add TLS via Certbot:
   ```bash
   certbot --nginx -d jnklab.com -d www.jnklab.com
   ```

### Option B — pm2 + Next.js node server (future)

If you need server features later, remove `output: 'export'` from `next.config.ts` and run:

```bash
npm run build && npm run start
# pm2: pm2 start "npm run start" --name jnklab-site
```

Then proxy via nginx to `http://localhost:<PORT>`.

## Redeploy (static)

```bash
npm run build
rsync -av --delete out/ user@vps:/var/www/jnklab.com/
```

## Impressum / Legal TODO

The Impressum section (`app/components/Impressum.tsx`) contains clearly-marked
`[TODO]` placeholders for the following legal fields:

- Registered legal name & form (Firmenname, Rechtsform)
- Business address (Straße, PLZ, Ort)
- Managing director name (Geschäftsführer / Inhaber)
- Company register entry (Registergericht, HRB-Nummer)
- VAT ID (USt-IdNr.)

**Do not invent these values.** They will be confirmed by the board once
registration is complete (tracked in NIC-5124).

## Contact email

Currently set to `hello@jnklab.com` throughout the site.
Switch to a verified address once MX records are live on jnklab.com.
