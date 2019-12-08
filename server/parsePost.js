const unirest = require('unirest');
const cheerio = require('cheerio');


const log = (i,count,ms) => {
    return new Promise(r => 
        setTimeout(()=>{
            console.log(`Индекс: ${i}
            Всего записей: ${count}`);
            r()
        },ms)
        );
        
}

function parsePost(url, elem){
    return new Promise((resolve, reject,error)=>{
        unirest.get(url).end(({body})=> {
            if(error) reject(body)

            const $ = cheerio.load(body)
            const title = $(elem.title).text().trim()
            const domain = url.match(/\/\/(.*?)\//)[1]
            let image = $(elem.image).attr('src')
            image = image.indexOf('https') >= 0 ? image : `https://${domain}${image}`;
            const text =  $(elem.text).text().trim()
            const next = url
            const time = $(elem.time).text()

            const post = {
                title,
                image,
                text,
                next,
                time
            }
            resolve(post)
        });
    })
 }
 function parseLinks(url,className,maxLinks = 3){
     return new Promise((resolve,reject,error)=> {
        let links = [];
        unirest.get(url).end(({body})=> {
            if(error) reject(body)
        const $ = cheerio.load(body)
        const domain = url.match(/\/\/(.*?)\//)[1]
        $(className).each((i,e)=> {
            if(i + 1 <= maxLinks) links.push('https://' + domain + $(e).attr('href'))
        });
        resolve(links)
     });
 });
}
async function getPosts(links,elem){
    let posts = [];
    let count = links.length;
    for(let i = 0; i < count; i++){
        const post = await parsePost(links[i],elem).then(post => post);
        posts.push(post);
    }
    return new Promise((resolve,reject)=> {
        if(!posts.length) reject({empty:'empty'})
        resolve(posts)
    });
}
   
module.exports = {
    parseLinks,
    parsePost,
    getPosts
}