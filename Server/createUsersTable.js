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
/*
var sql = `CREATE TABLE USERS(
    user_id int AUTO_INCREMENT,
    fullName nvarchar(255) NOT NULL,
    address nvarchar(255) NOT NULL,
    email nvarchar(255) UNIQUE NOT NULL,
    phone nvarchar(255) NOT NULL,
    user_password nvarchar(255) NOT NULL,
    PRIMARY KEY(user_id)
    )`;
*/

// let sql = `SELECT user_id FROM USERS WHERE email = "z@z.com"` // []
 let sql = `SELECT user_id FROM USERS WHERE email = "b@b.com"` // 661

con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);        
    if(result.length == 0){        
        console.log(`not exist`);
    }else{
        console.log("exist");                
    }
})