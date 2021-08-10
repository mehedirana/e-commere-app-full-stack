const expressJwt = require('express-jwt');

const secret = process.env.secret;
const auth =()=>{
    return expressJwt({
     secret,
     algorithms: ['HS256']
    }).unless({
        path:[
            '/api/v1/users/login'
        ]
    })
}

module.exports = auth;