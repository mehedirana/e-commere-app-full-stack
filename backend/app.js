const express = require('express')
const app = express();

app.get('/',(req,res)=>{
    res.send('yes mehedi get route done')
})

app.listen(3000,()=>{
 console.log('server is running http://localhost:3000');   
})