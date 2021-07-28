const axios = require('axios')
const cheerio = require('cheerio')

const drakor_ongo = () => new Promise(async (resolve, reject) => {
    axios.get(`https://drakorasia.org/`)
    .then( async (response) => {
        const html = response.data.html;
        // console.log(html)
        const $ = cheerio.load(html);
        let data = [];
        $('div.tab-1 > div:nth-child(1)').each((index, element) =>{
            // console.log(element)
            link = $(element).find('div.post > div > div:nth-child(3) > a').attr("href")
            console.log(link)
            const resdata = {
                link
            }
            data.push(resdata)
            // console.log(data)
            resolve(link)
        })
    })
})

module.exports = drakor_ongo
