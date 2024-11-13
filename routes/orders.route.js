// routes/orders.js
const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/order', authMiddleware, OrdersController.createOrder);
router.get('/orders', authMiddleware, OrdersController.getOrders);
router.get('/orders/:order_id/details', authMiddleware, OrdersController.getOrderDetails);

module.exports = router;
