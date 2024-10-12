const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/OrderDetailController');

// Tạo chi tiết đơn hàng mới
router.post('/', orderDetailController.createOrderDetail);

// Lấy tất cả chi tiết đơn hàng
router.get('/', orderDetailController.getAllOrderDetails);

// Lấy chi tiết đơn hàng theo ID
router.get('/:id', orderDetailController.getOrderDetailById);

// Cập nhật chi tiết đơn hàng theo ID
router.put('/:id', orderDetailController.updateOrderDetail);

// Xóa chi tiết đơn hàng theo ID
router.delete('/:id', orderDetailController.deleteOrderDetail);

module.exports = router;
