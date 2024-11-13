const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    username: { type: String , ref: 'User', required: true },
    ID_Product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    order_date: { type: Date, default: Date.now },
    delivery_address: { type: String, required: true }
    }, 
    { timestamps: true });

module.exports = mongoose.model('Orders', OrderSchema);
