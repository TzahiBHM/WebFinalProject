const mysql = require('mysql');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.connect((err) => {
    if (err) throw err;
});

app.get("/users", (req, res) => {
    let sql = "SELECT * FROM USERS_TEST";
    con.query(sql, (err, result) => {
        if (err) throw err;

        res.json(result)
    });
});

app.post("/register", (req, res) => {	
    var sql = `INSERT INTO USERS_REAL(fullName,address,email,phone,user_password)
     VALUES("${req.body.ng_fullname}","${req.body.ng_address}","${req.body.ng_email}","${req.body.ng_phone}")`;
    con.query(sql, function (err, result) {        
        if (err) throw err;
        console.log("PERSON inserted");
    })
});

/*
app.post("/register", (req, res) => {	
    var sql = `INSERT INTO USERS_REAL(fullName,address,email,phone,user_password)
     VALUES("${req.body.ng_fullname}","${req.body.ng_address}, "${req.body.ng_mail}", "${req.body.ng_phone}", "${ng_password}"`;
    con.query(sql, function (err, result) {        
        if (err) throw err;
        console.log("PERSON inserted");
    })
});
*/


app.get("/", (req, res) => {
    res.send("Hello");
});


let port = process.env.PORT || 3500;
app.listen(port, function () {
    console.log(`server is listening on port ${port}`);
});
