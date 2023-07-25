const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const verifyToken = require('../middleware')

router.post('/PlaceOrder', verifyToken, OrderController.PlaceOrder);
router.get('/MyOrders', verifyToken, OrderController.getUserOrders);
router.get('/:order_id', verifyToken, OrderController.getOrder);
router.post('/:order_id/CancelOrder', verifyToken, OrderController.CancelOrder);

module.exports = router;
