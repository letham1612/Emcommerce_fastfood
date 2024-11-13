// controllers/orderController.js
const Order = require('../models/OrdersModel');
const Cart = require('../models/CartModel');
const OrderDetailController = require('./orderDetailController');

// Tạo đơn hàng từ giỏ hàng
exports.createOrder = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { delivery_address } = req.body;

        // Lấy các sản phẩm trong giỏ hàng
        const cartItems = await Cart.find({ user_id });

        if (!cartItems.length) {
            return res.status(400).json({ error: 'Giỏ hàng rỗng' });
        }

        // Tính tổng giá trị đơn hàng
        const total_price = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Tạo đơn hàng mới
        const order = await Order.create({
            user_id,
            total_price,
            delivery_address,
            status: 'pending'
        });

        // Tạo chi tiết đơn hàng cho mỗi mục trong giỏ hàng
        await OrderDetailController.createOrderDetails(order._id, cartItems);

        // Xóa giỏ hàng sau khi tạo đơn hàng
        await Cart.deleteMany({ user_id });

        res.status(201).json({ message: 'Đơn hàng đã được tạo thành công', order });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi tạo đơn hàng' });
    }
};

// Lấy danh sách đơn hàng của người dùng
exports.getOrders = async (req, res) => {
    try {
        const user_id = req.user._id;
        const orders = await Order.find({ user_id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi lấy đơn hàng' });
    }
};

// Lấy chi tiết đơn hàng cụ thể (gọi tới OrderDetailController)
exports.getOrderDetails = async (req, res) => {
    try {
        const { order_id } = req.params;
        const orderDetails = await OrderDetailController.getOrderDetailsByOrderId(order_id);
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi lấy chi tiết đơn hàng' });
    }
};
