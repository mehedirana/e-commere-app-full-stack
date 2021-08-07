const expressJwt = require('express-jwt');

const secret = process.env.secret;
const auth =()=>{
    return expressJwt({
     secret,
     algorithms: ['HS256']
    })
}

module.exports = auth;