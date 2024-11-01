const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    username: { type: String , ref: 'User', required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
    }, 
    { timestamps: true });

module.exports = mongoose.model('Orders', OrderSchema);
