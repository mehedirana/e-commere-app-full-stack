const Product = require('../models/product')
const express = require('express');
const Category = require('../models/category');
const router = express.Router()

// get all product
router.get(`/`, async (req, res) => {
    let filter ={};

    if(req.query.categories){
        filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).populate('category');

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

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    })

    product = await product.save();

    if (!product) {
        return res.status(500).json({ error: 'product can not be created', success: false })
    }

    return res.status(500).json({success: true,product})
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

router.put('/:id', async (req, res) => {

    try {
        const category = await Category.findById(req.body.category)
        if (!category) return res.status(400).send('Invalid Category');


        const product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured

        }, { new: true })

        if (product) return res.status(200).json({ product, success: true })
        else return res.status(500).json({ success: false, message: 'Product not found!' })

    } catch (error) {
        return res.status(400).json({ success: false, error: error })
    }

})

// delete a product 
router.delete('/:id', async (req, res)=>{
    try {
        const product = await Product.findByIdAndRemove(req.params.id)
        if(product) return res.status(200).json({success: true, message: 'The product is deleted!'});
        else return  res.status(404).json({success: false, message: 'Product not found!'})
    } catch (error) {
        res.status(400).json({success: false, error: error})
    }
    

})


// totall product count

router.get('/get/count', async (req, res)=>{
    try {
        const getCount = await Product.countDocuments();

        if(getCount) return res.status(200).json({success: true, totall: getCount})
        else return res.status(404).json({success: false, message: 'Product not found!' });
    } catch (error) {
       return res.status(400).json({success: false, error: error})
    }
    

    

})

// get feature products

router.get('/get/feature/:count', async (req,res)=>{
    try {
        const count = req.params.count ? req.params.count : 0
        const getIsFeatured = await Product.find({isFeatured: true}).limit(+count)

        if(getIsFeatured) return res.status(200).json({success: true, products: getIsFeatured})
        else return res.status(404).json({success: false, message: 'Feature product not found!' });
    } catch (error) {
       return res.status(400).json({success: false, error: error})
    }
})

module.exports = router;