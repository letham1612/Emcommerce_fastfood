const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController'); 
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/cart', authMiddleware, cartController.addToCart);
router.get('/cart', authMiddleware, cartController.getCart);
router.delete('/cart/:product_id', authMiddleware, cartController.removeFromCart);

module.exports = router;
