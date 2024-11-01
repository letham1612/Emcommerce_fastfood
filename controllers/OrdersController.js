const Order = require('../models/OrdersModel'); // Đảm bảo đường dẫn chính xác

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
    try {
        const { ID_Order, username, totalAmount } = req.body;

        // Kiểm tra xem ID_Order và các trường cần thiết đã có chưa
        if (!ID_Order || !username || !totalAmount) {
            return res.status(400).json({ message: 'Thiếu thông tin cần thiết: ID_Order, ID_User và totalAmount là bắt buộc' });
        }

        // Kiểm tra xem ID_Order đã tồn tại chưa
        const existingOrder = await Order.findOne({ ID_Order });
        if (existingOrder) {
            return res.status(400).json({ message: 'Đơn hàng đã tồn tại với ID_Order: ' + ID_Order });
        }

        const order = new Order(req.body);
        await order.save();
        console.log('Order created:', order);
        res.status(201).json({ message: 'Tạo đơn hàng thành công', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('ID_User', 'name email');
        console.log('Retrieved all orders:', orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ message: error.message });
    }
};

// Lấy đơn hàng theo ID_Order
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ ID_Order: req.params.id }).populate('ID_User', 'name email');
        if (!order) {
            console.log('Order not found with ID_Order:', req.params.id);
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }
        console.log('Retrieved order:', order);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật đơn hàng theo ID_Order
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { ID_Order: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOrder) {
            console.log('Order not found for update with ID_Order:', req.params.id);
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }
        console.log('Order updated:', updatedOrder);
        res.status(200).json({ message: 'Cập nhật đơn hàng thành công', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(400).json({ message: error.message });
    }
};

// Xóa đơn hàng theo ID_Order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ ID_Order: req.params.id });
        if (!order) {
            console.log('Order not found for deletion with ID_Order:', req.params.id);
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }
        console.log('Order deleted:', order);
        res.status(200).json({ message: 'Xóa đơn hàng thành công', order });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: error.message });
    }
};
