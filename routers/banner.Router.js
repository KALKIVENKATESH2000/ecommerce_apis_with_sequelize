const express = require('express');
const router = express.Router();
const BannerController = require('../controllers/BannerController');
const verifyToken = require('../middleware')


router.post('/', BannerController.createBanner);
router.get('/', BannerController.getBanners);
router.get('/:id', BannerController.getBanner);
router.put('/:id', BannerController.updateBanner);
router.delete('/:id', BannerController.deleteBanner);

module.exports = router;
