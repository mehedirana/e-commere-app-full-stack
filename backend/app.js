const express = require('express')
const app = express();

require("dotenv/config")
const api = process.env.API_URL;

// middleware
app.use(express.json());

app.get(`${api}/products`,(req,res)=>{
    const products = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url'
    }
    res.send(products)
})
app.post(`${api}/products`,(req,res)=>{

    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct)
})

app.listen(3000,()=>{
    console.log("api url", api);
 console.log('server is running http://localhost:3000');   
})