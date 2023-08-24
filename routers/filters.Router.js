const express = require('express');
const router = express.Router();
const FilterControllers = require('../controllers/FilterControllers');
const verifyToken = require('../middleware')


router.get('/products', FilterControllers.FilterProducts);

module.exports = router;



