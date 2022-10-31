const puppeteer = require('puppeteer');
const fs = require('fs');
const data = [];
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

  const ehList = await page.$$("#productList-content > li");

  for (const eh of ehList) {
    const id = await eh.$eval('div.list_st2 > div.new_img > span.img > div > img', (el) => {
      const srcCut = el.src.split('/');
      return Number(srcCut[8].substring(11, srcCut[8].length - 4));
    });
    const name = await eh.$eval('div.list_st2 > p.new_title02 > a', (el) => el.innerText);
    const selfcode = await eh.$eval('div.list_st2 > p.pro_code', (el) => el.innerText);
    const price = await eh.$eval('div.list_st2 > p.price2', (el) => el.innerText);

    data.push({ id, name, selfcode, price });
  }
  const dataJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync('crawling-json.json', dataJSON);
  browser.close();
})();