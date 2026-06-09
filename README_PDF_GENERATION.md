# PDF Generation Instructions for PSHE KS4/5 Guide

## Overview
The HTML files for the PSHE KS4/5 session guide have been created:
- `CSG_PSHE_KS45.html` (digital/dark version)
- `CSG_PSHE_KS45_Print.html` (print/light version)

## Generating PDFs

### Option 1: Using the Provided Script (Recommended)
If you have a system with proper browser dependencies installed:

```bash
cd csg-schools
node render_ks45.js
```

This will generate:
- `downloads/CSG_PSHE_KS45_Digital.pdf`
- `downloads/CSG_PSHE_KS45_Print.pdf`

### Option 2: Using Puppeteer (Alternative)
```bash
cd csg-schools
node render_ks45_puppeteer.js
```

### Option 3: Manual Browser Print
If the scripts fail due to missing system libraries:

1. Open `CSG_PSHE_KS45.html` in Chrome/Chromium
2. Press Ctrl+P (Cmd+P on Mac) to open Print dialog
3. Settings:
   - Destination: Save as PDF
   - Paper size: A4
   - Margins: None
   - Background graphics: Enabled
4. Save as `downloads/CSG_PSHE_KS45_Digital.pdf`
5. Repeat for `CSG_PSHE_KS45_Print.html` → `downloads/CSG_PSHE_KS45_Print.pdf`

### Option 4: Using Chrome Headless (Command Line)
```bash
google-chrome --headless --disable-gpu --print-to-pdf=downloads/CSG_PSHE_KS45_Digital.pdf --no-margins CSG_PSHE_KS45.html
google-chrome --headless --disable-gpu --print-to-pdf=downloads/CSG_PSHE_KS45_Print.pdf --no-margins CSG_PSHE_KS45_Print.html
```

## System Requirements Issue
The current environment is missing required system libraries:
- `libatk-1.0.so.0` and related dependencies

To install on Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install -y \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libasound2
```

Then run:
```bash
npx playwright install-deps chromium
```

## After PDF Generation
Once PDFs are created, commit them:
```bash
git add downloads/CSG_PSHE_KS45_Digital.pdf downloads/CSG_PSHE_KS45_Print.pdf
git commit -m "Add PSHE KS4/5 session guide PDFs"
git push
```

## Cleanup
After successful PDF generation, you can delete the temporary render scripts:
```bash
rm render_ks45.py render_ks45.js render_ks45_puppeteer.js
```
