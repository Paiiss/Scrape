const axios = require('axios')
const cheerio = require('cheerio')

const lk21_search = (search) => new Promise(async (resolve, reject) => {
    axios.get(`http://167.99.71.200/?s=${search}`)
        .then(async (response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            let data = []
                $('div#gmr-main-load > article').each((index, element) => {
                    title = $(element).find("div > div.item-article > header > h2 > a").text()
                    link = $(element).find("div > div.item-article > header > h2 > a").attr('href')
                    thumb = $(element).find("div > div.content-thumbnail > a > img").attr('src')
                    rating = $(element).find("div > div.content-thumbnail > div.gmr-rating-item").text()
                    genre = $(element).find("div > div.item-article > header > div.gmr-movie-on").text()
                    genre_link = $(element).find("div > div.item-article > header > div.gmr-movie-on > a").attr('href')
                    thumb = $(element).find("div > div.content-thumbnail > a > img").attr('src')
                    time = $(element).find("div > div.content-thumbnail > div.gmr-duration-item").text()
                    trailer = $(element).find("div > div.item-article > header > div.gmr-popup-button > a").attr('href')
                    // console.log(title)
                    const resdata = {
                        title,
                        link,
                        thumb,
                        genre,
                        genre_link,
                        rating,
                        time,
                        trailer
                    }
                    data.push(resdata)
                    resolve(data)
                })
        })
})

module.exports = lk21_search
