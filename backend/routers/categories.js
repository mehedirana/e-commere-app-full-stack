const Category = require('../models/category');
const express = require('express');
const category = require('../models/category');
const router = express.Router();

router.get('/', async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false })
    }

    res.send(categoryList);

})


router.get('/:id', async (req, res) => {
    // const category = await Category.findById(req.params.id);

    // if(!category){
    //     return res.status(500).send({success: false,messgae: 'The category of the given ID was not found!'})
    // }

    // res.status(200).send({success: true, category})

    Category.findById(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, category })
        }
        else {
            return res.status(404).json({ success: false, message: 'The category of the given ID was not found!' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })

    category = await category.save();

    if (!category) return res.status(404).send({ message: 'Category cannot be created', success: false })
    res.status(200).send({ category, success: true })

})


router.put('/:id', async (req, res) => {
    // const category = await Category.findByIdAndUpdate(req.params.id,{
    //     name: req.body.name,
    //     icon: req.body.icon,
    //     color: req.body.color
    // })

    // if(!category){
    //     return res.status(400).send({success: false, message:'the category can not be updated'})
    // }

    // res.send({category, success: true})
    Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }).then(category => {
        if (category) {
           return  res.status(200).json({category, success: true })
        }
        else {
            return res.status(404).json({ success: false, message: 'Category not found!' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })

})

router.delete('/:id', async (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'The category is deleted!' })
        }
        else {
            return res.status(404).json({ success: false, message: 'Category not found!' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})

module.exports = router;