var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController'); // Đảm bảo đường dẫn đúng

// Route để tạo người dùng mới
router.post('/', UserController.createUser);

// Route để lấy tất cả người dùng
router.get('/', UserController.getAllUsers);

// Route để lấy người dùng theo ID
router.get('/:id', UserController.getUserById);

// Route để cập nhật người dùng theo ID
router.put('/:id', UserController.updateUser);

// Route để xóa người dùng theo ID
router.delete('/:id', UserController.deleteUser);


/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
//});

module.exports = router;
