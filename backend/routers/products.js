const Product = require('../models/product')
const express = require('express');
// const category = require('../models/category');
const Category = require('../models/category');
const router = express.Router()

// get all product
router.get(`/`, async (req, res) => {
    const productList = await Product.find().populate('category');

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send({ productList, success: true })
})

// get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category')
        if (!product) res.status(500).json({ success: false, error: 'Product not found' })

        res.send({ product, success: true })

    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

})

// post a product
router.post(`/`, async (req, res) => {

    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        // images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        // isFeatured: req.body.isFeatured,
        // dateCreated: req.body.dateCreated
    })

    product = await product.save();

    if (!product) {
        return res.status(500).json({ error: 'product can be created', success: false })
    }

    return res.send(product)
    // product.save().then((createdProduct => {
    //     res.status(201).json({ createdProduct, success: true })
    // })).catch((err) => {
    //     res.status(500).json({
    //         error: err,
    //         success: false
    //     })
    // })
})

// update a product

router.put('/:id', async (res, req) => {
    try {
        const category = await Category.findById(req.body.category)
        if (!category) return res.status(400).send('Invalid Category');
        
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            // images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,

        }, { new: true })

        if (product) return res.status(200).json({ product, success: true })
        else return res.status(404).json({ success: false, message: 'Product not found!' })

    } catch (error) {
        return res.status(400).json({ success: false, error: error })
    }

})

module.exports = router;