// controllers/ProductsController.js
const Product = require('../models/ProductsModel'); // Đảm bảo đường dẫn chính xác

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const { ID_Product } = req.body;

    // Kiểm tra xem sản phẩm có tồn tại với ID_Product đã cho không
    const existingProduct = await Product.findOne({ ID_Product });
    if (existingProduct) {
      console.log('ID_Product đã tồn tại:', ID_Product);
      return res.status(400).json({ message: 'ID_Product đã tồn tại, không thể thêm sản phẩm' });
    }

    const product = new Product(req.body);
    await product.save();
    console.log('Product created:', product);
    
    res.status(201).json({
      message: 'Thêm sản phẩm thành công',
      product: product 
    });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log('Retrieved all products:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error retrieving products:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Lấy sản phẩm theo ID_Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ ID_Product: req.params.id }); // Sử dụng ID_Product để tìm kiếm
    if (!product) {
      console.log('Product not found with ID_Product:', req.params.id);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Retrieved product:', product);
    res.status(200).json(product);
  } catch (error) {
    console.error('Error retrieving product:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật sản phẩm theo ID_Product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { ID_Product: req.params.id }, // Sử dụng ID_Product để tìm kiếm
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      console.log('Product not found for update with ID_Product:', req.params.id);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product updated:', updatedProduct);
    res.status(200).json({
      message: 'Cập nhật sản phẩm thành công',
      product: updatedProduct 
    });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Xóa sản phẩm theo ID_Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ ID_Product: req.params.id }); // Sử dụng ID_Product để tìm kiếm
    if (!product) {
      console.log('Product not found for deletion with ID_Product:', req.params.id);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product deleted:', product);
    res.status(200).json({ message: 'Xóa sản phẩm thành công', product }); // Thêm thông báo thành công
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: error.message });
  }
};
