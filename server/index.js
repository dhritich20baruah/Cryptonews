const PORT = 2000;
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();

const articles =[];

const newsSources = [
    {
        name: 'MoneyControl',
        address:'https://www.moneycontrol.com/news/tags/cryptocurrency.html',
        base: ''
    },
    {
        name: 'Business-Standard',
        address:'https://www.business-standard.com/topic/cryptocurrency',
        base: ''
    },
    {
        name:'Coindesk',
        address:'https://www.coindesk.com/markets/',
        base:''
    }
]

newsSources.forEach(newsSource=>{
    axios.get('https://www.moneycontrol.com/news/tags/cryptocurrency.html')
    .then((response)=>{
        const html = response.data;
        const $ = cheerio.load(html)

        $('a:contains("crypto")', html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url,
                source: newsSource.name
            })
        })
    })
})

app.get('/', (req,res)=>{
    res.json(articles)
})

app.listen(PORT, ()=>console.log(`Server running at port ${PORT}`));