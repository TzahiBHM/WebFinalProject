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
// mkt nvarchar(255) NOT NULL,
/*
var sql = `CREATE TABLE ORDERS(
    rowNumber int AUTO_INCREMENT,
    order_id int NOT NULL,    
    item_name nvarchar(255) NOT NULL,
    price int NOT NULL,    
    quantity int NOT NULL,
    user_id int NOT NULL,
    date nvarchar(255),
    PRIMARY KEY(rowNumber),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
    )`;
*/

let sql = `INSERT INTO ORDERS
(order_id,item_name,price,quantity,user_id,date) 
VALUES
(1,"-",0,0,391,"-");
   `
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("inserted");
})