var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController'); // Đảm bảo đường dẫn đúng

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/changePassword', UserController.changePassword);
router.get('/', UserController.getUser);

module.exports = router;
