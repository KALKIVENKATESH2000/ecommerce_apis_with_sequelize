const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const FavouriteProductController = require('../controllers/FavouriteProductController');
const verifyToken = require('../middleware')
const multer = require('multer')


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type');

      if(isValid) {
          uploadError = null
      }
    cb(uploadError, 'media/uploads/users')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${Date.now()}-${fileName}`)
  }
})

const upload = multer({ storage: storage })

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.login);
router.post('/logout',verifyToken, AuthController.logout);
router.post('/forgot-password',verifyToken, AuthController.ForgotPassword);
router.post('/change-password',verifyToken, AuthController.ChangePassword);
router.get('/current-user', verifyToken, UserController.getCurrentUser);
router.get('/', UserController.getUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.post('/profile', verifyToken, upload.single('image'), UserController.createUserProfile);
router.get('/profile', verifyToken, UserController.getUserProfile);
router.post('/address', verifyToken, UserController.createUserAddress);
router.get('/address', verifyToken, UserController.getUserAddresses);
router.put('/address/:id', verifyToken, UserController.updateUserAddress);
router.delete('/address/:id', verifyToken, UserController.deleteUserAddress);
router.post('/address/:address_id/set-default', verifyToken, UserController.SetAsDefaultAddress);


router.post('/:product_id/favourite',verifyToken, FavouriteProductController.createFavouriteProduct);
router.get('/favourites',verifyToken, FavouriteProductController.getUserFavouriteProduct);
router.delete('/favourite/:id',verifyToken, FavouriteProductController.deleteFavouriteProduct);



module.exports = router;
