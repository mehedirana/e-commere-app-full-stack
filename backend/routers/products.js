const Product = require('../models/product')
const express = require('express');
const router = express.Router()


router.get(`/`, async (req,res)=>{
    const productList = await Product.find();

    if(!productList){
        res.status(500).json({success: false})
    }
    res.send({productList, success: true})
})
router.post(`/`,(req,res)=>{

    const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category:req.body.category, 
    countInStock: req.body.countInStock,
    rating:req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured:req.body.isFeatured,
    dateCreated: req.body.dateCreated
    })
    product.save().then((createdProduct=>{
        res.status(201).json({createdProduct, success: true})
    })).catch((err)=> {
        res.status(500).json({
            error:err,
            success: false
        })
    })
})

module.exports = router;