const express = require('express')
const app = express();

console.log(__dirname);

app.use(express.static('./public'));


/*
app.get("/",(req, res)=>{
    res.send('123');
});
*/

app.listen(3000,()=>console.log('listen to 3000'));