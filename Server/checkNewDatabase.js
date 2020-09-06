
// mysql://b6a6991b1ab052:6f528f84@us-cdbr-east-02.cleardb.com

const mysql = require('mysql');


let con = mysql.createConnection({
    host: "us-cdbr-east-02.cleardb.com",
    user: "b6a6991b1ab052",
    password: "6f528f84",
    database: "heroku_40a59a12660f2b2"
});

con.connect((err) => {
    if (err) throw err;
    console.log("connected to db")
});