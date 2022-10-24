const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 768
  });
  
  await page.goto('https://ownerclan.com/V2/product/specialProducts.php?no=top100');
})();