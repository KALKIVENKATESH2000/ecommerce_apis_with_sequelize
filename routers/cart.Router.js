const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const verifyToken = require('../middleware')


router.post('/', verifyToken, CartController.AddProductToCart);
router.get('/', verifyToken, CartController.getUserCart);
// router.get('/:id', CartController.getProduct);
router.put('/:cart_product_id', verifyToken, CartController.updateCartProductQty);
router.delete('/:cart_product_id', verifyToken, CartController.removeCartProduct );

module.exports = router;
