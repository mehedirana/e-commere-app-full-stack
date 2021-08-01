const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypy = require('bcryptjs');

router.get('/', async (req,res)=>{
    const userList = await User.find();

    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList)
})

router.post('/', async (req, res)=>{

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypy.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.apartment,
        city: req.body.apartment,
        country: req.body.country,
        
    })
    
    user = await user.save();

    try {
        if(!user) return res.status(400).json({success: false, message: 'User can not create'})
        else return res.status(200).json({success: true, user})
    } catch (error) {
        return res.status(400).json({success: false, error})
    }
})

module.exports = router;