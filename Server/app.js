const express = require('express')
const app = express();

// console.log(__dirname);

app.use(express.static('./public'));

/*
app.get("/",(req, res)=>{
    res.send('123');
});
*/
// abc
let port=process.env.PORT||3500;
app.listen(port, function () {
    console.log(`server is listening on port ${port}`);
});
