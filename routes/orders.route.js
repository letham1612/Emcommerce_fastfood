// routes/orders.js
const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController'); // Đảm bảo đường dẫn chính xác

// Tạo đơn hàng mới
router.post('/', OrdersController.createOrder);

// Lấy tất cả đơn hàng
router.get('/', OrdersController.getAllOrders);

// Lấy đơn hàng theo ID
router.get('/:id', OrdersController.getOrderById);

// Cập nhật đơn hàng theo ID
router.put('/:id', OrdersController.updateOrder);

// Xóa đơn hàng theo ID
router.delete('/:id', OrdersController.deleteOrder);

module.exports = router;
