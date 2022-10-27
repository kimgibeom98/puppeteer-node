const puppeteer = require('puppeteer');
let id = 0;

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1000
  });

  await page.goto('https://ownerclan.com/V2/product/specialProducts.php?no=top100');

  const ehList = await page.$$("#productList-content > li")

  for (const eh of ehList) {
    const name = await eh.$eval('div.list_st2 > p.new_title02 > a', (el) => {
      return el.innerText
    })
    const selfcode = await eh.$eval('div.list_st2 > p.pro_code', (el) => {
      return el.innerText
    })
    const price = await eh.$eval('div.list_st2 > p.price2', (el) => {
      return el.innerText
    })
    id++;

    console.log({
      id, name, selfcode, price
    });
  }

  browser.close();
})();