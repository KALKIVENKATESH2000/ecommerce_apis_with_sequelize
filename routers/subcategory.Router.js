const express = require('express');
const router = express.Router();
const SubCategoryController = require('../controllers/SubCategoryController');
const verifyToken = require('../middleware')


router.post('/', SubCategoryController.createSubCategory);
router.get('/', SubCategoryController.getSubCategories);
router.get('/category/:category_id', SubCategoryController.getSubCategoryByCategory);
router.get('/:id', SubCategoryController.getSubCategory);
router.put('/:id', SubCategoryController.updateSubCategory);
router.delete('/:id', SubCategoryController.deleteSubCategory);

module.exports = router;
