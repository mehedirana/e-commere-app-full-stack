const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({

   quantity : {
       type: Number,
       required : true
   },
   product: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'OrderItem',
       required: true
   }

})

orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

orderItemSchema.set('toJSON',{
    virtuals: true
})

// const Product = 
module.exports = mongoose.model('OrderItem', orderItemSchema)