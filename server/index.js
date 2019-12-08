const {parsePost, parseLinks,getPosts} = require('./parsePost')
const {elems} = require('./config')
const fs = require('fs');


const saveResult = (json,to) => {
    fs.writeFile(to,json,err=> {
        if(err) console.log('Not saved')
    });
};
    
const createJson = () => {
        parseLinks('https://gordonua.com/regions/odessa.html',".lenta_head a", 20)
        .then(links => {
            getPosts(links,elems.scop)
            .then(posts => saveResult(JSON.stringify(posts,0,4),'../public/result.json'))
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
        parseLinks('https://gordonua.com/news/kiev.html',".lenta_head a", 20)
        .then(links => {
            getPosts(links,elems.scop)
            .then(posts => saveResult(JSON.stringify(posts,0,4),'../public/result2.json'))
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    
        parseLinks('https://gordonua.com/news/worldnews.html',".lenta_head a", 20)
        .then(links => {
            getPosts(links,elems.scop)
            .then(posts => saveResult(JSON.stringify(posts,0,4),'../public/result3.json'))
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
        console.log('newJson')
}

module.exports = {
    createJson
}
