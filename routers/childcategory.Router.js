const express = require('express');
const router = express.Router();
const ChildCategoryController = require('../controllers/ChildCategoryController');
const verifyToken = require('../middleware')


router.post('/', ChildCategoryController.createChildCategory);
router.get('/', ChildCategoryController.getSubCategories);
router.get('/subcategory/:subcatId', ChildCategoryController.getChildCategoryBySubCategory);
router.get('/:id', ChildCategoryController.getChildCategory);
router.put('/:id', ChildCategoryController.updateChildCategory);
router.delete('/:id', ChildCategoryController.deleteChildCategory);

module.exports = router;
