const express = require('express')
const app = express();

require("dotenv/config")
const api = process.env.API_URL;

app.get('/',(req,res)=>{
    res.send('yes mehedi get route done')
})

app.listen(3000,()=>{
    console.log("api url", api);
 console.log('server is running http://localhost:3000');   
})