const model = require('../models'); 
const FavouriteProduct = model.FavouriteProduct
const User = model.AuthUser
const Product = model.Product



exports.createFavouriteProduct = async (req, res) => {
  try {
        const user = await User.findByPk(req.user.userId);
        if (!user) {
          return res.status(404).send('User not found');
        }
        const product = await Product.findByPk(req.params.product_id);
        if (!product) {
          return res.status(404).send('Product not found');
        }
  
        const existingProduct = await FavouriteProduct.findOne({where:{product_id:product.id}});
        console.log(existingProduct)
        if (existingProduct) {
          return res.status(400).json({ message: 'Product already in Your Favirite list' });
        }
  
        const favorite = await FavouriteProduct.create({
          user_id: user.id,
          product_id: product.id,
        })
        res.status(201).json({ message: 'Product added in Your Favourite list',favorite});
  } catch (error) {
        console.error('Error adding product to Favirite list:', error);
        res.status(500).json({ error: 'Failed to adding product to Favourite list.' });
  }
};


exports.getUserFavouriteProduct = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const userfavProducts = await FavouriteProduct.findAll({where: { user_id : user_id }});
        res.status(200).json({ message: 'Your Favourite list',userfavProducts });
    } catch (error) {
        console.error('Error retrieving favourite products:', error);
        res.status(500).json({ error: 'Failed to retrieve favourite products.' });
    }
};


exports.deleteFavouriteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const userfavProducts = await FavouriteProduct.findByPk(id);
      
      if (!userfavProducts) {
        return res.status(404).json({ error: 'product not found in favourite list.' });
      }
      await userfavProducts.destroy();
      res.json({success:`favourite product '${userfavProducts.product_id}' was deleted!`});
    } catch (error) {
      console.error('Error deleting favourite product:', error);
      res.status(500).json({ error: 'Failed to delete favourite product.' });
    }
  };