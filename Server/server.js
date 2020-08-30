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
    var sql = `INSERT INTO USERS(username,password) VALUES("${req.body.angular_username}",MD5(${req.body.angular_password}))`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("PERSON inserted");
    })

    res.send(req.body.name);
});

app.get("/register", (req, res) => {
    res.send("moshe");
})

app.get("/", (req, res) => {
    res.send("Hello");
});


let port = process.env.PORT || 3500;
app.listen(port, function () {
    console.log(`server is listening on port ${port}`);
});
