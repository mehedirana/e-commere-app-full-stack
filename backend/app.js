const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
require("dotenv/config")
const authJwt = require('./helpers/jwt');
app.use(cors())
app.options('*', cors( ))

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
//Routers
const productsRoutes = require('./routers/products');
const categoriesRoutes = require('./routers/categories');
const usersRoutes = require('./routers/users');
const orderRoutes = require('./routers/orders');



const api = process.env.API_URL;

app.use(`${api}/products`,productsRoutes);
app.use(`${api}/categories`,categoriesRoutes);
app.use(`${api}/users`,usersRoutes);
app.use(`${api}/orders`,orderRoutes);


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