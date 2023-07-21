const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const verifyToken = require('../middleware')

router.post('/PlaceOrder', verifyToken, OrderController.PlaceOrder);
router.get('/', verifyToken, OrderController.getUserOrders);
router.post('/:orderId/CancelOrder', verifyToken, OrderController.CancelOrder);

module.exports = router;
