const mysql = require('mysql');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
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

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthorizated request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('unauthorizated request')
    }
    let payload = jwt.verify(token,'s');
    if(!payload){
        return res.status(401).send('unauthorizated request')
    }
    req.userId=payload.subject;
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


let port = process.env.PORT || 3400;
app.listen(port, function () {
    console.log(`server is listening on port ${port}`);
});
