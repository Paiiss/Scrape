const cheerio = require("cheerio");
const axios = require("axios").default;

const fethHtml = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
  }
};

const extractDeal = selector => {
    const link = selector
        .attr('href')
    const no1link = selector
        .find("div[class='cv'] > a")
        .attr('href')
    const no1judul = selector
        .find("div[class='cv'] > a > div[class='ls12j'] > h3")
        .text()
    const no1pembaca = selector
        .find("div[class='cv'] > a > div[class='ls12j'] > span")
        .text()

    // const thumb = selector
    //    .find("div[class='perapih'] > div[class='ls123'] > div[class='ls23'] > div[class='ls23v'] > a > img")
    //    .attr('src')

    /*const no1 = ({
        Top: no1judul,
        link: no1link,
        pembaca: no1pembaca
    })*/ 
    const result = ({
        Top: no1judul,
        link: 'https://komiku.id' + no1link,
        pembaca: no1pembaca
    })


  console.log({result})  
  return {
    result
  };
};

const TerndingKomiku = async () => {
  const KomikuUrl =
    "https://komiku.id/";

  const html = await fethHtml(KomikuUrl);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    "#Trending"
  );

  const deals = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      return extractDeal(elementSelector);
    })
    .get();

  return deals;
};

module.exports = TerndingKomiku;
