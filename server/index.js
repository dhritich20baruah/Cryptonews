const PORT = 2000;
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors())

const articles =[];

// const newsSources = require('./categories/national')

const newsSources = [
    {
        name: 'MoneyControl',
        address:'https://www.moneycontrol.com/',
        base: ''
    },
    {
        name: 'Business-Standard',
        address:'https://www.business-standard.com/topic/cryptocurrency',
        base: 'https://www.business-standard.com'
    },
    {
        name:'The-Economist',
        address:'https://www.economist.com/finance-and-economics',
        base:''
    }
]

newsSources.forEach(newsSource=>{
    axios.get(newsSource.address)
    .then((response)=>{
        const html = response.data;
        const $ = cheerio.load(html)

        $('a:contains("crypto")', html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url:newsSource.base + url,
                source: newsSource.name
            })
        })
    })
})

app.get('/articles', (req,res)=>{
    res.json(articles)
})
console.log(articles)
app.listen(PORT, ()=>console.log(`Server running at port ${PORT}`));