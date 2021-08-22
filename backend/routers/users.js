const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypy = require('bcryptjs');
const jwt = require('jsonwebtoken')
//all user
router.get('/', async (req, res) => {
    const userList = await User.find();

    if (!userList) {
        res.status(500).json({ success: false })
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

//sign up
router.post('/register', async (req, res) => {

    const check = await User.findOne({ email: req.body.email })


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

    if (check) {
        return res.status(400).json({ success: false, message: 'This email already registered ' })
    }
    else {
        user = await user.save();
    }


    try {

        if (!user) return res.status(400).json({ success: false, message: 'User can not create' })
        else {
                // if(check) return res.status(400).json({ success: false, message: 'This email already registered ' })
                // else
                 return res.status(200).json({ success: true, user })
        }

    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
})

// user log in
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const secret = process.env.secret;
        if (!user) return res.status(400).json({ success: false, message: 'The user not found' });


        if (user && bcrypy.compareSync(req.body.password, user.passwordHash)) {

            const token = jwt.sign({
                userId: user.id,
                isAdmin: user.isAdmin
            }, secret,{expiresIn:'1d'})

            const user_info = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }

            return res.status(200).json({ success: true, token, user_info })

        }
        else {
            if (user) return res.status(400).json({ success: false, message: 'Wrong password' });
        }


    } catch (error) {
        return res.status(404).json({ success: true, error })
    }

})

// delete a user 
router.delete('/:id', async (req, res)=>{
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        console.log('user..........', user);
        if(user) return res.status(200).json({success: true, message: 'The user is deleted!'});
        else return  res.status(404).json({success: false, message: 'user not found!'})
    } catch (error) {
        res.status(400).json({success: false, error: error})
    }
    

})


// totall user count

router.get('/get/count', async (req, res)=>{
    try {
        const getCount = await User.countDocuments();

        if(getCount) return res.status(200).json({success: true, totall: getCount})
        else return res.status(404).json({success: false, message: 'user not found!' });
    } catch (error) {
       return res.status(400).json({success: false, error: error})
    }
    

    

})


module.exports = router;

// duplicate add houya atkaite hobe