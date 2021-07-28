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
    .find("div[class='thumb'] > a div[class='thumbz'] > h2")
    .text()
const epz = selector
    .find("div[class='epztipe']")
    .text()
const uptim = selector
    .find("div[class='newnime']")
    .text()
const thumb = selector
    .find("div[class='thumb'] > a div[class='thumbz'] > img")
    .attr('src')
const link = selector
    .find("div[class='thumb'] > a")
    .attr('href')
const uptime = epz + ', ' + uptim
//   console.log({uptime})
//    console.log({title, link, thumb, uptime})  
  return {
    title: title,
    link: link,
    thumb: thumb,
    up: uptime
  };
};

const ongootakudesu = async () => {
  const otakudesuUrl =
    "https://otakudesu.tv/ongoing-anime/";

  const html = await fethHtml(otakudesuUrl);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    ".venz > ul > li > div[class='detpost']"
  );

  const deals = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      return extractDeal(elementSelector);
    })
    .get();

  return deals;
};

module.exports = ongootakudesu;
