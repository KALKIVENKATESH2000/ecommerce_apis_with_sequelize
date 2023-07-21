const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const verifyToken = require('../middleware')


router.post('/:product_id', verifyToken, ReviewController.createReview);
router.get('/', verifyToken, ReviewController.getUserReviews);
// router.put('/:id', ReviewController.updateUser);
// router.delete('/:id', ReviewController.deleteUser);

module.exports = router;