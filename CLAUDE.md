# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Static website for the Cyber Safety Guy Schools Hub, deployed on GitHub Pages at `schools.cybersafetyguy.com`. It provides free online safety resources (PSHE session guides, DSL reference cards, safeguarding tools) for teachers and safeguarding professionals.

## Structure

- `index.html` — the main hub page (all sections: Classroom, DSL, Staff Training, CSG Hub resources)
- `style.css` — shared stylesheet for the hub; uses CSS custom properties (`--navy`, `--teal`, `--off-white`, etc.)
- `sessions/ks45-deepfakes-sextortion/` — PSHE KS4/5 session guide source files (HTML and documentation)
- `downloads/` — committed PDF files served for download
- `guides/` — additional PDF guides referenced from the hub
- `images/` — logos and assets

## PDF generation workflow

PDF documents are generated from HTML source files using headless Chrome. Each resource has a digital (dark) and print (light) version.

**Preferred method** — Chrome headless CLI (no npm deps needed):
```bash
google-chrome --headless --disable-gpu --print-to-pdf=downloads/OUTPUT.pdf --no-margins SOURCE.html
```

**Alternative** — Playwright/Puppeteer scripts (requires browser system libs):
```bash
node render_ks45.js          # Playwright
node render_ks45_puppeteer.js # Puppeteer
```

If system libraries are missing, install with:
```bash
sudo apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2
npx playwright install-deps chromium
```

After generating PDFs, commit them to `downloads/` and push — GitHub Pages serves them directly.

## HTML PDF source file conventions

- Each page is a `<div class="page">` with fixed A4 dimensions (`210mm × 297mm`)
- A sticky `.page-footer` sits at `position: absolute; bottom: 0` on each page — adjust its height and `.page-content` bottom padding together to prevent content overflow
- All CSS is inline `<style>` inside each HTML file (no external stylesheet dependency)
- Fonts loaded from Google Fonts: `Orbitron` (display/headings), `Exo 2` (labels/UI), `IBM Plex Sans` (body)

## Hub page conventions

- `index.html` uses `style.css` via `<link>`
- Resource cards use class `resource-card available` or `resource-card coming-soon`
- Download buttons use `.rc-btn.download` (screen PDF) and `.rc-btn.watch` (print PDF)
- Sections are anchored with `id="classroom"`, `id="dsl"`, `id="staff-training"`, `id="csg-resources"`

## Deployment

Push to `main` — GitHub Pages deploys automatically. No build step required.
