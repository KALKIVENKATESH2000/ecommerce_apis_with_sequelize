const modal = require('../models');
const Cart = modal.Cart
const User = modal.AuthUser
const Product = modal.Product
const ProductVariant = modal.ProductVariant
const FavouriteProduct = modal.FavouriteProduct


exports.AddProductToCart = async (req,res) => {
    try{
        let user_id  = req.user.userId
        if(req.body.qunantity!=undefined && req.body.product_id!=undefined && req.body.product_variant_id!=undefined && req.body.qunantity!='' && req.body.product_id!='' && req.body.product_variant_id!=''){
            let FavDelete = await FavouriteProduct.destroy({where:{user_id:req.user.userId,product_id:req.body.product_id}});
            let Check_existed =  await Cart.count({
                where:{
                    product_id           : req.body.product_id,
                    product_variant_id   : req.body.product_variant_id,
                    user_id              : user_id
                }
            });
            if(Check_existed>0){
                var Check_Staus =  await Cart.findOne({
                    where:{
                        product_id           : req.body.product_id,
                        product_variant_id   : req.body.product_variant_id,
                        user_id              : user_id
                    }
                });
                Check_Staus.qunantity = req.body.qunantity
                Check_Staus.save();
                var Products = Check_Staus;
            }else{
                let added_date = new Date();
                const cart_product = await Cart.create({
                    product_id           : req.body.product_id,
                    product_variant_id   : req.body.product_variant_id,
                    user_id              : user_id,
                    qunantity            : req.body.qunantity,
                    added_date           : added_date
                    
                });
                var Products = cart_product;
            }
            res.status(200).send({message:'Product added to cart successfully.', Products, });
        }else{
            res.status(201).send({message:'All the * fields were required'});
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart.' });
    }
};

  
// Get the user's cart contents and calculate the total amount
exports.getUserCart = async (req, res) => {
    try {
        const user_id = req.user.userId 
    
        // Retrieve all items in the user's cart
        const user_cart = await Cart.findAll({
                where: { user_id },
                include: [
                    {
                        model: User,
                        attributes: ['id','username']
                    },
                    {
                        model: Product,
                        attributes:{exclude:['createdAt', 'updatedAt']}
                    },
                    {
                        model: ProductVariant,
                        attributes:{exclude:['createdAt', 'updatedAt']},
                    }
                ],
        });
    
        // Calculate the total amount of the cart
        let totalAmount = 0;
        user_cart.forEach((item) => {
            // Assuming you have a "price" attribute in the Product model
            totalAmount += item.quantity * item.Product;
        });
    
        res.status(200).json({ user_cart, totalAmount });
    } catch (error) {
        console.error('Error retrieving cart contents:', error);
        res.status(500).json({ error: 'Failed to retrieve cart contents.' });
    }
};
  

// Remove an item from the user's cart
exports.removeCartProduct = async (req, res) => {
    try {
      const { cart_product_id } = req.params;
      const cartProduct = await Cart.findByPk(cart_product_id);
  
      if (!cartProduct) {
        return res.status(404).json({ message: 'Cart product not found.' });
      }
      await cartProduct.destroy({where:{
        id  :cart_product_id
      }});
  
      res.status(200).json({ message: 'Cart product removed successfully.' });
    } catch (error) {
      console.error('Error removing cart product:', error);
      res.status(500).json({ error: 'Failed to remove cart product.' });
    }
};

// Update the quantity of an item in the user's cart
exports.updateCartProductQty = async (req, res) => {
    try {
        const { cart_product_id } = req.params;
        const { qunantity } = req.body;
    
        const cartProduct = await Cart.findByPk(cart_product_id);
    
        if (!cartProduct) {
            return res.status(404).json({ error: 'Cart product not found.' });
        }
  
        cartProduct.qunantity = qunantity;
        await cartProduct.save();
    
        res.status(200).json({ message: 'Cart product quantity updated successfully.', cartProduct });
    } catch (error) {
        console.error('Error updating cart product quantity:', error);
        res.status(500).json({ error: 'Failed to update cart product quantity.' });
    }
};
  