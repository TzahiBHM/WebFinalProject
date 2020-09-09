const mysql = require('mysql');
require('dotenv').config();
const readlineSync = require('readline-sync');

let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.connect((err) => {
    if (err) throw err;
    console.log("connecte to db")
});

let username = readlineSync.question("Enter username: ");
let  sql = `SELECT * FROM users WHERE email="${username}"`
con.query(sql,(err,result)=>{
    if(err) throw err;
    // user exist
    if(result.length){
        // console.log(result[0].user_password);            
        let password = readlineSync.question("Enter Password");
        if(result[0].user_password == password){
            console.log("connected");
        }
        else{
            console.log("password wrong");
        }
    }
    else{
        console.log("not exist");
    }    
});
