const expressJwt = require('express-jwt');


const authJWT =()=>{
    const secret = process.env.secret;
    const url = process.env.API_URL;
    return expressJwt({
     secret,
     algorithms: ['HS256'],
     isRevoked: isRevoked,
    }).unless({
        path:[
            {url: /\/api\/v1\/products(.*)/, method:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, method:['GET', 'OPTIONS']},
        
            '/api/v1/users/login',
            '/api/v1/users/register',
        ]
    })
}
async function isRevoked(req, payload, done){
 if(!payload.isAdmin){
     done(null, true)
 }
 done()

}

module.exports = authJWT;