const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const verifyToken = require('../middleware')


router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct );

module.exports = router;
