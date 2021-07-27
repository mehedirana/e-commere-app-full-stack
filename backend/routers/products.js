const Product = require('../models/product')
const express = require('express');
// const category = require('../models/category');
const Category = require('../models/category');
const router = express.Router()


router.get(`/`, async (req, res) => {
    const productList = await Product.find().populate('category');

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send({ productList, success: true })
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) res.status(500).json({ success: false, error: 'Product not found' })

        res.send({ product, success: true })

    } catch (err) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

})
router.post(`/`, async(req, res) => {

    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Invalid Category')

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

    if(!product){
        return res.status(500).json({error: 'product can be created',success: false})
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

module.exports = router;