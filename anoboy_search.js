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
const title = selector
    .attr('title')
const link = selector
    .attr('href')
const Uptime = selector
    .find("div[class='amv'] >  div[class='jamup']")
    .text()
const thumb = selector
    .find("div[class='amv'] > amp-img")
    .attr('src')

    // console.log({title, link, Uptime, thumb})  
    
  return {
    title, 
    link, 
    Uptime, 
    thumb
};
};

const searchanoboy = (search) => new Promise(async (resolve, reject) => {
  const anoboyUrl =
    "https://anoboy.media/?s=" + search; //+ search;

  const html = await fethHtml(anoboyUrl);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    "div[class='column-content'] > a"
  );

  const deals = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      return extractDeal(elementSelector);
    })
    .get();

//   return deals;
resolve(deals)
});

module.exports = searchanoboy;
