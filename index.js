const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const crawlingData = [];
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
  const content = await page.content();
  const $ = cheerio.load(content);
  const lists = $("#productList-content > li");

  lists.each((count, list) => {
    const id = count + 1;
    const name = $(list).find("div.list_st2 > p.new_title02 > a").text();
    const selfcode = $(list).find("div.list_st2 > p.pro_code").text();
    const price = $(list).find("div.list_st2 > p.price2").text();
    crawlingData.push({ id, name, selfcode, price });
  });
  browser.close();
  const dataJSON = JSON.stringify(crawlingData, null, 2);
  fs.writeFileSync('crawling-json.json', dataJSON);
})();