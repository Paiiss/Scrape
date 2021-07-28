const axios = require('axios')
const cheerio = require('cheerio')
const anime_search = (search) => new Promise(async (resolve, reject) => {
    axios.get(`https://myanimelist.net/anime.php?cat=anime&q=${search}`)
    .then( async (response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        let data = [];
        $('div.js-categories-seasonal > table > tbody > tr').each((index, element) =>{
            // console.log(element)
            title = $(element).find('td:nth-child(2) > a > strong').text()
            thumb = $(element).find('td:nth-child(1) > div > a > img').attr('data-src')
            // console.log(thumb)
            link = $(element).find('td:nth-child(1) > div > a').attr('href')
            type = $(element).find('td:nth-child(3)').text().replace('\n    ', '').replace('\n  ', '')
            eps = $(element).find('td:nth-child(4)').text().replace('\n    ', '').replace('\n  ', '')
            score = $(element).find('td:nth-child(5)').text().replace('\n    ', '').replace('\n  ', '')
            const resdata = {
                title,
                thumb,
                link,
                info: {
                    type,
                    eps,
                    score
                }
            }
            data.push(resdata)
            // console.log(data)
            resolve(data)
        })
    })
})

module.exports = anime_search
