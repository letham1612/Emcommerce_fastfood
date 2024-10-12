const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ID_Product: { type: Number, required: true, unique: true }, // Thay đổi từ ObjectId sang Number
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
}, 
{ timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

