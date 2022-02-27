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
        base: 'https://www.business-standard.com'
    },
    {
        name:'The-Economist',
        address:'https://www.economist.com/finance-and-economics',
        base:''
    }
]

const national = [
    {
        name: 'India Times',
        address: '',
        base: ''
    },
    {
        name: 'Dainik Bhaskar',
        address: '',
        base: ''
    },
    {
        name: 'Manorama',
        address: '',
        base: ''
    },
    {
        name: 'The Indian Express',
        address: '',
        base: ''
    },
    {
        name: 'The Hindu',
        address: '',
        base: ''
    },
    {
        name: 'ABP',
        address: '',
        base: ''
    },
    {
        name: 'Dainik Jagran',
        address: '',
        
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

app.listen(PORT, ()=>console.log(`Server running at port ${PORT}`));