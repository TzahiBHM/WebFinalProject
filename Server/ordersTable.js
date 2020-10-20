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

/* NOT USED
var sql = `CREATE TABLE ORDERS(
    // mkt nvarchar(255) NOT NULL,
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

/*
var sql = `CREATE TABLE ORDERS(
    order_id INT AUTO_INCREMENT,
    list TEXT NOT NULL,
    user_id INT NOT NULL,
    order_date NVARCHAR(255),
    price DOUBLE(8,3),
    PRIMARY KEY(order_id),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
    )`;
*/
 // let sql = `INSERT INTO ORDERS (list,user_id,order_date,price) VALUES ("a,b,c",401,"02/02/2002",10000.820);`

 let sql = `SELECT * FROM ORDERS WHERE user_id = 421`


con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    
})