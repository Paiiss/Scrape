const axios = require('axios');
const cheerio = require('cheerio');

const doujindesu_search = (search) => new Promise(async (resolve, reject) => {

await axios.get (`https://doujindesu.info/?s=${search}`)
    .then( async (response) => {
      html = response.data;
      $ = cheerio.load(html);
      data = [];
      $('main > article').each((index, element) => {
          title = $(element).find('div > div > a > div.data > div.title > h2').text().replace(/ /g, '')
          link = $(element).find('div > div > a').attr('href')
          type = $(element).find('div > div > a > div > div.type').text()
          score = $(element).find('div > div > a >  div.score').text().replace(/ /g, '')
          thumb = $(element).find('div > div > a > div > img').attr('src')
          link_chap = $(element).find('div > div > div.data > div > div:nth-child(1) > a').attr('href')
        // console.log(title)
          resdata = {
            title,
            link,
            type,
            thumb,
            score,
            link_chap,

          }
          data.push(resdata)
        //   console.log(data)
          // res.send(title)
          if (!data) return reject({ message: 'Error', status: 404})
          resolve(data)
          // res.send(JSON.stringify({ creator: 'Chipa', status: 200, result: data  }, null, 4));
      })
      
      
    })

})

module.exports = doujindesu_search
