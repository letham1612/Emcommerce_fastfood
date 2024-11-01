const User = require('../models/UserModel'); // Đảm bảo đường dẫn đúng tới file model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, email, phoneNumber, password, resPassword } = req.body;

  if (password !== resPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
      const userExists = await User.findOne({ $or: [{ email }, { username }] });
      if (userExists) {
          return res.status(400).json({ message: 'Username or Email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
          username,
          email,
          phoneNumber,
          password: hashedPassword
      });

      const savedUser = await newUser.save();
      res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

const login = async (req, res) => {
    const { email, phoneNumber, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
  
        const secretKey = process.env.JWT_SECRET || 'default_secret_key';
        const refreshSecretKey = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_key';
  
        const token = jwt.sign({ id: user._id, username: user.username, isadmin: user.isadmin }, secretKey, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user._id, username: user.username, isadmin: user.isadmin }, refreshSecretKey, { expiresIn: '7d' });
  
        // Lưu refreshToken vào cơ sở dữ liệu
        user.refreshToken = refreshToken; 
        await user.save();
        res.json({
            message: 'Login successful',
            token,
            refreshToken,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  };
  const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    const refreshSecretKey = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_key';
  
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }
  
    try {
        // Kiểm tra refreshToken hợp lệ và lấy user ID từ đó
        const decoded = jwt.verify(refreshToken, refreshSecretKey);
        const user = await User.findById(decoded.id);
  
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
  
        // Tạo token mới
        const secretKey = process.env.JWT_SECRET || 'default_secret_key';
        const newToken = jwt.sign({ id: user._id, username: user.username, isadmin: user.isadmin }, secretKey, { expiresIn: '1h' });
  
        res.json({ token: newToken });
    } catch (err) {
        res.status(403).json({ message: 'Invalid refresh token', error: err.message });
    }
  };
  
const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword, resNewPassword } = req.body;
  if (newPassword !== resNewPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
  }

  if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters long' });
  }

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (!oldPassword || typeof oldPassword !== 'string' || oldPassword.trim().length === 0) {
          return res.status(400).json({ message: 'Current password is required and must be a non-empty string' });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid current password' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      await user.save();

      res.json({ message: 'Password updated successfully' });
  } catch (err) {
      console.error('Error updating password:', err);
      res.status(500).json({ message: 'Error updating password', error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
      const user = await User.find();
      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  getUser,
  refreshAccessToken,
};