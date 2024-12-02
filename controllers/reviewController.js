const Review = require('../models/ReviewModel');
const Product = require('../models/productsModel');

// Thêm đánh giá
exports.addReview = async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;
    const user_id = req.user.id;

    // Tạo review mới
    const review = await Review.create({ ID_Product: product_id, user_id, rating, comment });

    // Cập nhật Product
    const product = await Product.findOne({ ID_Product: product_id }); // Tìm sản phẩm theo ID_Product (number)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.reviewCount += 1;
    product.averageRating =
      (product.averageRating * (product.reviewCount - 1) + rating) / product.reviewCount;
    await product.save();

    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};