const OrderDetail = require('../models/OrderDetailModel'); // Đảm bảo đường dẫn chính xác

// Tạo chi tiết đơn hàng mới
exports.createOrderDetail = async (req, res) => {
    try {
        const { ID_OrderDetail, ID_Order, ID_Product, quantity } = req.body;

        // Kiểm tra các giá trị có hợp lệ không
        if (!ID_OrderDetail || !ID_Order || !ID_Product || !quantity) {
            return res.status(400).json({ message: 'Tất cả các trường đều bắt buộc!' });
        }

        // Kiểm tra xem ID_OrderDetail đã tồn tại chưa
        const existingOrderDetail = await OrderDetail.findOne({ ID_OrderDetail: req.body.ID_OrderDetail });
        if (existingOrderDetail) {
            return res.status(400).json({ message: 'Chi tiết đơn hàng đã tồn tại với ID_OrderDetail: ' + req.body.ID_OrderDetail });
        }

        const orderDetail = new OrderDetail(req.body);
        await orderDetail.save();
        console.log('Order Detail created:', orderDetail);
        res.status(201).json({
            message: 'Tạo chi tiết đơn hàng thành công',
            orderDetail: orderDetail
        });
    } catch (error) {
        console.error('Error creating order detail:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả chi tiết đơn hàng
exports.getAllOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetail.find().populate('ID_Product', 'name'); // Thay thế 'name' bằng các trường bạn muốn lấy từ Product
        console.log('Retrieved all order details:', orderDetails);
        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error retrieving order details:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Lấy chi tiết đơn hàng theo ID_OrderDetail
exports.getOrderDetailById = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.findOne({ ID_OrderDetail: req.params.id }).populate('ID_Product', 'name');
        if (!orderDetail) {
            console.log('Order Detail not found with ID_OrderDetail:', req.params.id);
            return res.status(404).json({ message: 'Chi tiết đơn hàng không tồn tại' });
        }
        console.log('Retrieved order detail:', orderDetail);
        res.status(200).json(orderDetail);
    } catch (error) {
        console.error('Error retrieving order detail:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật chi tiết đơn hàng theo ID_OrderDetail
exports.updateOrderDetail = async (req, res) => {
    try {
        const updatedOrderDetail = await OrderDetail.findOneAndUpdate(
            { ID_OrderDetail: req.params.id }, // Sử dụng ID_OrderDetail để tìm kiếm
            req.body,
            { new: true }
        );
        if (!updatedOrderDetail) {
            console.log('Order Detail not found for update with ID_OrderDetail:', req.params.id);
            return res.status(404).json({ message: 'Chi tiết đơn hàng không tồn tại' });
        }
        console.log('Order Detail updated:', updatedOrderDetail);
        res.status(200).json({
            message: 'Cập nhật chi tiết đơn hàng thành công',
            orderDetail: updatedOrderDetail
        });
    } catch (error) {
        console.error('Error updating order detail:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Xóa chi tiết đơn hàng theo ID_OrderDetail
exports.deleteOrderDetail = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.findOneAndDelete({ ID_OrderDetail: req.params.id }); // Sử dụng ID_OrderDetail để tìm kiếm
        if (!orderDetail) {
            console.log('Order Detail not found for deletion with ID_OrderDetail:', req.params.id);
            return res.status(404).json({ message: 'Chi tiết đơn hàng không tồn tại' });
        }
        console.log('Order Detail deleted:', orderDetail);
        res.status(200).json({ message: 'Xóa chi tiết đơn hàng thành công', orderDetail }); // Thêm thông báo thành công
    } catch (error) {
        console.error('Error deleting order detail:', error.message);
        res.status(500).json({ message: error.message });
    }
};
