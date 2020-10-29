const mysql = require('mysql');
const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const chherio = require('cheerio');
const axios = require('axios');

const app = express();

app.use(cors());
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let dbConfig = {
    host: "us-cdbr-east-02.cleardb.com",
    user: "b6a6991b1ab052",
    password: "6f528f84",
    database: "heroku_40a59a12660f2b2"
}
let con;
handleDisconnect = () => {
    con = mysql.createConnection(dbConfig);
    con.connect((err) => {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 10000);
        }
        console.log("connected to db");
    });

    con.on('error', function onError(err) {
        console.log('db error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {   // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                        // connnection idle timeout (the wait_timeout
            throw err;
        }
    });
}
handleDisconnect()
/*
befor handleDisconnect function
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.connect((err) => {
    if (err) throw err;
    console.log("connected to db");
});
*/

app.get('/getitems/:orderid', (req,res)=>{
    let sql = `SELECT list,price,order_date FROM ORDERS WHERE order_id = ${req.params.orderid}`;
    con.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);        
        res.send(result);
    });
});

app.get("/getorders", verifyToken,(req,res)=>{
    let userId = req.userId;
    let sql = `SELECT * FROM ORDERS WHERE user_id = ${userId} `
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});


app.post("/sendOrder", verifyToken ,(req, res) => {
    let userId = req.userId;
    let userList = req.body.ng_list;
    let userDate = req.body.ng_date;
    let userPrice = req.body.ng_price;
    console.log(req.body);
    
    let sql = `INSERT INTO ORDERS (list,user_id,order_date,price) VALUES (?,?,?,?);`    
    con.query(sql,[userList,userId,userDate,userPrice], function (err, result) {
        if (err) throw err;
        console.log("order inserted");
        console.log(result);
        res.send(result);
    })
});

app.get("/tipa/:word", (req, res) => {
    let url = encodeURI(`https://tipat-market.co.il/?s=${req.params.word}&post_type=product&dgwt_wcas=1`);

    console.log(url);

    axios.get(url).then(
        (resp) => {
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
        res.send(data);
    }

});

app.get("/victory/:word", (req, res) => {

    let url = encodeURI(`http://www.victoryonline.co.il/Shopping/FindProducts.aspx?Query=${req.params.word}`);
    console.log(url);

    axios.get(url).then(
        (resp) => {
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

        $("ul.ULProductList>li.NgMspProductCell").each((i, elem) => {
            data.push({
                "title": $(elem).find(".Prefix").text(),
                "subTitle": $(elem).find(".Suffix").text(),
                "price": $(elem).find(".Price").text(),
                "imageLink": $(elem).find(".ProductImage").attr('src'),
                "company": "ויקטורי"
            });
        });
        res.send(data);
    }
});


app.get('/shufersal/:word', (req, res) => {
    // initial url - use parameter to change search

    console.log("search word: ", req.params.word);

    // if we use hebrew we must encode url befor use it
    let url = encodeURI(`https://www.shufersal.co.il/online/he/search?text=${req.params.word}`);

    // get request to url
    axios.get(url).then(
        (resp) => {
            // resp.data = all html page code
            getData(resp.data)
        }
    ).catch(
        (err) => { console.log(err); }
    )

    // send only the information we need
    let getData = (html) => {
        // initial array for information
        data = [];
        // initail chherio to search elements in html code
        const $ = chherio.load(html);


        $('section.tileSection3 > ul > li ').each((i, elem) => {
            data.push({
                "title": $(elem).find('div.text > strong').text(),
                "subTitle": $(elem).find('div.smallText > span').text(),
                "price": $(elem).find('div.line>span.price>span.number').text().trim(' '),
                "imageLink": $(elem).find('img.pic').attr('src'),
                "company": "שופרסל"

            })
        });

        res.send(data);
    }

});


app.get("/userid/:x", (req, res) => {
    let sql = `SELECT user_id FROM USERS WHERE email="${req.params.x}"`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.json(result[0].user_id);
            console.log(result);
        }
        else {
            res.json("NOT EXIST");
            console.log("NOT EXIST");
        }

    });
})

app.post('/sendmail', (req, res) => {
    console.log(`email sent`);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER, // "zolbo.service@gmail.com", //process.env.USER,
            pass: process.env.MAIL_PASS // ,"zol123BO" //process.env.PASS
        }
    });

    let mailOptions = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: `new message from zolbo`,
        html: `
        <div style="direction:rtl;">
        <b>נשלח מ: </b> ${req.body.ng_email} <br /> 
        <b>שם מלא: </b> ${req.body.ng_name} <br />
        <b>טלפון: </b> ${req.body.ng_phone} <br />
        <b>תוכן הודעה: </b> ${req.body.ng_content}

        </div>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("email sent " + info.response);
            res.send(info.info.response);
        }
    });

})

app.get('/getInfo', verifyToken, (req, res) => {
    let userId = req.userId;
    let sql = `SELECT fullName,address,email,phone FROM users WHERE user_id=${userId}`
    con.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result[0]);        
        res.send(result[0]);
    });

})

app.put('/updateInfo', verifyToken, (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;
    let userId = req.userId;
    // { name: 'ads', address: 'asad', email: 'a@a.com', phone: '0502645309' }

    let sql = `UPDATE users SET fullName="${name}", address="${address}", phone="${phone}" WHERE user_id=${userId}`
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);      
        res.send(result);  
    });    
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthorizated request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('unauthorizated request')
    }
    let payload = jwt.verify(token, 's');
    if (!payload) {
        return res.status(401).send('unauthorizated request')
    }
    req.userId = payload.subject;
    next();
}

app.post("/login", (req, res) => {
    let username = req.body.ng_username;
    let password = req.body.ng_password;
    let sql = `SELECT * FROM USERS WHERE email="${username}"`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        // user exist
        if (result.length) {
            if (password == result[0].user_password) {
                let payload = { subject: result[0].user_id };
                let token = jwt.sign(payload, 's');
                res.status(200).send({ token });
            }
            else {
                res.json("wrong password")
            }
        }
        else {
            res.json("user not exist");
        }
    });
});

app.get("/users", (req, res) => {
    let sql = "SELECT * FROM USERS";
    con.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result)
    });
});

app.post("/register", (req, res) => {
    var sql = `INSERT INTO USERS(fullName,address,email,phone,user_password)
     VALUES("${req.body.ng_fullname}","${req.body.ng_address}","${req.body.ng_email}","${req.body.ng_phone}","${req.body.ng_password}")`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("PERSON inserted");
        let payload = { subject: result.insertId };
        let token = jwt.sign(payload, 's');
        res.status(200).send({ token });
    })
});



app.get("/", (req, res) => {
    res.send("Hello");
});


// let port = process.env.PORT || 3400;
app.listen(3400, function () {
    console.log(`server is listening on port 3400`);
});
