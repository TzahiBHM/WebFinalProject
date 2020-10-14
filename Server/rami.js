const chherio = require('cheerio');
const axios = require('axios');
const request = require('request');
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const readline = require('readline-sync');

//     let url = encodeURI(`https://www.rami-levy.co.il/he/shop/search?q=${req.params.word}`);
//    let url = `https://www.rami-levy.co.il/he/shop/search?q=${req.params.word}`;

let item = readline.question("enter item: ");

let urlLink = encodeURI(`https://www.rami-levy.co.il/he/shop/search?q=${item}`);
console.log(item);
console.log(urlLink);


var options = { method: 'GET',
    url: urlLink,

    headers:
        {            
        // "authority":" www.rami-levy.co.il",
     //    "method": "GET",
        // "path": "/he/shop/search?q=",
        // "scheme": "https",
        // "accept": "*/*",
         //"accept-encoding": "gzip, deflate, br",
        // "accept-language": "en-US,en;q=0.9,he;q=0.8",
         "cookie": "adoric_popup=true; auth.strategy=local; i18n_redirected=he; visid_incap_2021397=GONoxYv3RRqr67814/KnCqL8hl8AAAAAQUIPAAAAAAA1lM2d0zVKbX8e0GYHgPTg; nlbi_2021397=j55KHZnMWQ1ATUPl9kJt1wAAAABo8l0GXWOqEY57W5BCoru8; incap_ses_7213_2021397=7wAyW5Sps3NFZThDcLkZZKL8hl8AAAAAC52cjRRzcLCZJw/zvam2hA==; _ga=GA1.3.202886723.1602682126; _gid=GA1.3.619020338.1602682126; visid_incap_2256378=IYJSGLNcQWyR2cdT80HMvqX8hl8AAAAAQUIPAAAAAADqivM4RZ0MjYM14Op2UcCl; incap_ses_7213_2256378=xfF5Dgc4LxNLZjhDcLkZZKX8hl8AAAAAXXbt5cOPhA/LBEmwC0tz1w==; _gat=1; nlbi_2021397_2147483646=kjOlaYRdPAH+p2NN9kJt1wAAAAC8f9XQakTMmgSscw+AnKpv; reese84=3:+/bJE5fVlKcVBPNB2y+MCA==:nYGIZ/oOWETqc77HuDxONetz4jiCTIWuM1qJQ8IQ4lYkt1Us5NcVZ7PDsp+WtKs8S4/ozzuJqDzTGZh8P2DY74FVi/tTldoEcy9y6iP7RTp9VEsJL2zPQkJpa7DZ7Mqf1AUx4whrc49BzJKqwXWYKYbEBs7PLC5NKdlQ852BiE9/4jEuha4bft67nXyb4HrVLdHQ0TIApw2YPxRAgmmOnFrFfMTfOtJggWcDMorvgHnI/kdW/opqpZJ/c4fWlN3pxr/vJ1Wc4GnrrcPGIkuZLaF13/qwS+tk3XElasxZkTklTqmGuLg0I6EfWyhb8AoXTHv2WzmqQSdwE354Q5XJNhKYcmFUW5byqaWnaM6YLnLB2RhoI57E+bQkiHyBCMJAUIiqm0aVmsNDSvs/JS1dwPTubd0gJR9b7DWnSluq5cfHsEvJ85/WQMvOn25rWqd5MC7Mwa/sj/lzru2VHudwnA==:DMpmK2up5w6cgrfgu1Oqrghcha2kJe3IforJBYusnPU=",
        // "if-none-match": "75b9a-PBRJ6eCK64KVaf+W33MbXdKd8V4",
        // "sec-fetch-mode": "no-cors",
         //"sec-fetch-site": "same-origin",
        "user-agent":" Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
        } 
    };

request(options,(err,res,body)=>{    
    getData(body);
});


// send only the information we need
let getData = (html) => {
    
    
    
    // initial array for information
    data = [];
    // initailize chherio to search elements in html code
    const $ = chherio.load(html);

    console.log(html);
    
    
//     console.log($("div.layout").length);

  /*
        data.push({
            "title": $(elem).find('div.name').text(),
            "imageLink": $(elem).find('span.image-wrapper > div.image').attr('style'),
            "subTitle": $(elem).find('div.data > span.brand').text(), //  > span.weight
            "price": $(elem).find('div.sp-product-price > span.price').text(),
            "company": "מגה"
        });
        console.log(data);
        res.send(data);
        */
    
}