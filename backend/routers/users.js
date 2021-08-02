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

//for single user

router.get('/:id', async (req, res) => {
  

    User.findById(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, user })
        }
        else {
            return res.status(404).json({ success: false, message: 'The user was not found!' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
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

// user log in

router.post('/login', async (req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
    
        if(!user) return res.status(400).json({success: false, message:'The user not found'});

        if(user && bcrypy.compareSync(req.body.password, user.passwordHash)){
            return res.status(200).json({success: true, user})
        }else{
            if(user)  return res.status(400).json({success: false, message:'Wrong password'});
        }
        
        
    } catch (error) {
        return res.status(404).json({success: true, error})
    }
   
})


module.exports = router;