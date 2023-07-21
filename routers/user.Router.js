const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const FavouriteProductController = require('../controllers/FavouriteProductController');
const verifyToken = require('../middleware')


router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.login);
router.post('/logout',verifyToken, AuthController.logout);
router.get('/current-user', verifyToken, UserController.getCurrentUser);
router.get('/', UserController.getUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.post('/profile', verifyToken, UserController.createUserProfile);
router.post('/address', verifyToken, UserController.createUserAddress);
router.get('/address', verifyToken, UserController.getUserAddresses);
router.put('/address/:id', verifyToken, UserController.updateUserAddress);
router.delete('/address/:id', verifyToken, UserController.deleteUserAddress);
router.post('/address/:address_id/set-default', verifyToken, UserController.SetAsDefaultAddress);


router.post('/:product_id/favourite',verifyToken, FavouriteProductController.createFavouriteProduct);
router.get('/favourites',verifyToken, FavouriteProductController.getUserFavouriteProduct);
router.delete('/favourite/:id',verifyToken, FavouriteProductController.deleteFavouriteProduct);



module.exports = router;
