const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const app = express();

require("dotenv/config")
const api = process.env.API_URL;

// middleware
app.use(express.json());
app.use(morgan('tiny'));

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

mongoose.connect(process.env.CONNECTION_STRING,{ 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    
.then(()=> console.log('db connection ready'))
.catch((err)=> console.log(' error msg ', err))
app.listen(3000,()=>{
    console.log("api url", api);
 console.log('server is running http://localhost:3000');   
})