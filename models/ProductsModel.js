const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ID_Product: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    }, 
    { timestamps: true });

module.exports = mongoose.model('Products', ProductSchema);
