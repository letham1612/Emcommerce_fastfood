// controllers/cartController.js
const Cart = require('../models/CartModel');

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
    try {
        const { product_id, quantity, price } = req.body;
        const user_id = req.user._id; // Giả sử user_id được lấy từ xác thực

        const cartItem = await Cart.findOne({ user_id, product_id });

        if (cartItem) {
            // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
            await Cart.create({ user_id, product_id, quantity, price });
        }
        res.status(200).json({ message: 'Thêm vào giỏ hàng thành công' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi thêm sản phẩm vào giỏ hàng' });
    }
};

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
    try {
        const user_id = req.user._id;
        const cartItems = await Cart.find({ user_id }).populate('product_id');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi lấy giỏ hàng' });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
    try {
        const { product_id } = req.params;
        const user_id = req.user._id;

        await Cart.findOneAndDelete({ user_id, product_id });
        res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi xóa sản phẩm khỏi giỏ hàng' });
    }
};
