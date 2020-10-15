const chherio = require('cheerio');
const axios = require('axios');
const request = require("request");

let url = encodeURI(`https://tipat-market.co.il/?s=פסטה&post_type=product&dgwt_wcas=1`);

console.log(url);

axios.get(url).then(
    (resp) => {
        console.log("check 1");
        getData(resp.data);
    }
).catch(
    (err) => { console.log(err); }
)


let getData = (html) => {
    // initial array for information
    data = [];
    // initailize chherio to search elements in html code
    const $ = chherio.load(html);

    $(".products>li").each((i, elem) => {        

        // define subtitle 
        let _subTitle = "";
        if ($(elem).find(".ast-woo-shop-product-description>p>span").length == 0) {

            _subTitle += $(elem).find(".ast-woo-shop-product-description>p").text();
        } else {
            _subTitle += $(elem).find(".ast-woo-shop-product-description>p>span").text();
        }


        data.push({
            "title": $(elem).find(".woocommerce-loop-product__title").text(),
            "subTitle": _subTitle,
            "price": $(elem).find(".woocommerce-Price-amount").text(),
            "imageLink": $(elem).find(".attachment-woocommerce_thumbnail").attr('src'),
            "company": "טיפה מרקט"
        });

    });

    console.log(data);
}

