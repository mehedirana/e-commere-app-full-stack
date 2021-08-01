const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    passwordHash: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
  
})

// const Product = 
module.exports = mongoose.model('User', userSchema)

// module.exports ={ Product}