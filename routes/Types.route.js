// routes/Types.route.js
const express = require('express');
const router = express.Router();
const TypesContrtoller = require('../controllers/TypesController');
// const authMiddleware = require('../middlewares/authMiddleware');
const { route } = require('./users');

// router.use(authMiddleware);
router.post('/', TypesContrtoller.createType);
router.get('/', TypesContrtoller.getAllTypes);
router.get('/:id', TypesContrtoller.getTypeById);
router.put('/:id', TypesContrtoller.updateType);
router.delete('/:id', TypesContrtoller.deleteType);

module.exports = router;