const puppeter = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeter.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [currentImage] = await page.$x('//*[@id="product-item-info_97"]/a/span/span/img');
    const src = await currentImage.getProperty('src');
    const image = await src.jsonValue();

    const [currentName] = await page.$x('//*[@id="product-item-info_97"]/div/strong/a');
    const productName = await currentName.getProperty('textContent');
    const name = await productName.jsonValue();

    const [currentPrice] = await page.$x('//*[@id="product-price-97"]/span');
    const productPrice = await currentPrice.getProperty('textContent');
    const price = await productPrice.jsonValue();

    console.log({image, name, price})

    browser.close();
}

scrapeProduct('https://ng.oraimo.com/oraimo-daily-deals.html?campaignid=14801349500&gclid=CjwKCAiAzKqdBhAnEiwAePEjkqNsxAPaZmJpn3iXXn94gikKWbwZz98K3LQRHI0GLhuq28wqEetmRRoCiPkQAvD_BwE&kwd=oraimo+com&p=2&utm_medium=google%2Fcpc&utm_source=google');