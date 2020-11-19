const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    _id:Number,
    name: String,
    price: Number,
    image: String,
    description: String
});


module.exports = mongoose.model('Product', ProductSchema);