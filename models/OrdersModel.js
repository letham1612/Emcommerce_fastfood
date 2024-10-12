const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    ID_Order: { type: Number, required: true, unique: true },
    ID_User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
    }, 
    { timestamps: true });

module.exports = mongoose.model('Orders', OrderSchema);
