const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const app = express();
require("dotenv/config")


// middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
const productsRouter = require('./routers/products')


const api = process.env.API_URL;

app.use(`${api}/products`,productsRouter)


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