const mysql = require('mysql');
require('dotenv').config();

let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.connect((err) => {
    if (err) throw err;
});

var sql = `CREATE TABLE USERS(
    user_id int AUTO_INCREMENT,
    fullName nvarchar(255),
    address nvarchar(255),
    email nvarchar(255),
    phone nvarchar(255),
    user_password nvarchar(255),
    PRIMARY KEY(user_id)
    )`;
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("inserted");
})