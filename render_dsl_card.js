44const puppeteer = require('puppeteer');
const path = require('path');

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
  
  // Generate PDF with A5 landscape settings
  await page.pdf({
    path: outputFile,
    format: 'A5',
    landscape: true,
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
      'sessions/dsl-card/CSG_DSL_Card.html',
      'downloads/CSG_DSL_Card_Digital.pdf'
    );
    
    // Generate Print version
    await generatePDF(
      'sessions/dsl-card/CSG_DSL_Card_Print.html',
      'downloads/CSG_DSL_Card_Print.pdf'
    );
    
    console.log('\n✓ All DSL Card PDFs generated successfully!');
  } catch (error) {
    console.error('Error generating PDFs:', error);
    process.exit(1);
  }
}

main();
