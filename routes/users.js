var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController'); 

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/changePassword', UserController.changePassword);
router.get('/', UserController.getUser);
router.post('/refresh-token',UserController.refreshAccessToken);

module.exports = router;
