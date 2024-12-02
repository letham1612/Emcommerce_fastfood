const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const reviewController = require('../controllers/reviewController')

router.post('/',authMiddleware, reviewController.addReview);

module.exports = router;
