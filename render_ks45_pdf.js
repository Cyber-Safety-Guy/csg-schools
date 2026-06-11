const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF(htmlFile, outputFile) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Load the HTML file
  const htmlPath = path.resolve(__dirname, htmlFile);
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });
  
  // Generate PDF with proper settings
  await page.pdf({
    path: outputFile,
    format: 'A4',
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    preferCSSPageSize: true
  });
  
  await browser.close();
  console.log(`✓ Generated: ${outputFile}`);
}

async function main() {
  try {
    // Generate Digital version
    await generatePDF(
      'sessions/ks45-deepfakes-sextortion/CSG_PSHE_KS45.html',
      'downloads/CSG_PSHE_KS45_Digital.pdf'
    );
    
    // Generate Print version
    await generatePDF(
      'sessions/ks45-deepfakes-sextortion/CSG_PSHE_KS45_Print.html',
      'downloads/CSG_PSHE_KS45_Print.pdf'
    );
    
    console.log('\n✓ All PDFs generated successfully!');
  } catch (error) {
    console.error('Error generating PDFs:', error);
    process.exit(1);
  }
}

main();
