const User = require('../models/UserModel'); // Đảm bảo đường dẫn đúng tới file model

// Tạo người dùng mới
exports.createUser = async (req, res) => {
    try {
      // Kiểm tra xem ID_User đã tồn tại hay chưa
      const existingUser = await User.findOne({ ID_User: req.body.ID_User });
      if (existingUser) {
        return res.status(400).json({ message: 'ID_User đã tồn tại. Vui lòng chọn ID_User khác.' });
      }
  
      const user = new User(req.body);
      await user.save();
      console.log('User created:', user); 
      res.status(201).json({ message: 'Tạo người dùng thành công', user: user });
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(400).json({ message: error.message });
    }
  };

// Lấy tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log('Retrieved all users:', users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Lấy người dùng theo ID_User
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ ID_User: req.params.id }); // Sử dụng ID_User để tìm kiếm
    if (!user) {
      console.log('User not found with ID_User:', req.params.id);
      return res.status(404).json({ message: 'Người dùng không tìm thấy' });
    }
    console.log('Retrieved user:', user); 
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật người dùng theo ID_User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { ID_User: req.params.id }, // Sử dụng ID_User để tìm kiếm
      req.body,
      { new: true }
    );
    if (!user) {
      console.log('User not found for update with ID_User:', req.params.id);
      return res.status(404).json({ message: 'Người dùng không tìm thấy' });
    }
    console.log('User updated:', user);
    res.status(200).json({ message: 'Cập nhật người dùng thành công', user: user });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Xóa người dùng theo ID_User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ ID_User: req.params.id }); // Sử dụng ID_User để tìm kiếm
    if (!user) {
      console.log('User not found for deletion with ID_User:', req.params.id);
      return res.status(404).json({ message: 'Người dùng không tìm thấy' });
    }
    console.log('User deleted:', user);
    res.status(200).json({ message: 'Xóa người dùng thành công', user: user });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: error.message });
  }
};
