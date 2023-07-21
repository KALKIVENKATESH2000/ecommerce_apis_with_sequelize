const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const verifyToken = require('../middleware')


router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getCategorys);
router.get('/:id', CategoryController.getCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
