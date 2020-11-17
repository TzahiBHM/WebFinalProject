
// mysql://b6a6991b1ab052:6f528f84@us-cdbr-east-02.cleardb.com

const mysql = require('mysql');


let con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

con.connect((err) => {
    if (err) throw err;
    console.log("connected to db")
});
