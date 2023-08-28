const model = require('../models');
const Product = model.Product;
const Order = model.Order;
const OrderProduct = model.OrderProduct
const ProductVariant = model.ProductVariant
const Useraddress = model.Useraddress
const State = model.State
const User = model.AuthUser

// const OrderProduct = require('../models/OrderProduct')

// Place an order with multiple product variants and address ID
exports.PlaceOrder =  async (req, res) => {
    try {
        const user_id = req.user.userId
        const { address_id, products } = req.body;
        
        const address = await Useraddress.findByPk(address_id);

        if (!address) {
          return res.status(404).json({ error: `Address not found for ID ${address_id}.` });
        }
    
        const state = address.state;
        const stateTax = await State.findOne({ where: { name:state } });

        if (!stateTax) {
          return res.status(404).json({ error: `State tax not found for ${state}.` });
        }
        
        // Calculate the tax amount based on the total amount and tax rate
        const taxRate = stateTax.tax_rate;
        const order = await Order.create({ user_id, address_id });

        // let discountAmount = 0;
        // if (user.Coupons.length > 0) {
        // const coupon = user.Coupons[0]; // Assuming only one coupon is allowed per order

        // // Calculate the discount amount based on the coupon's discountPercentage
        // discountAmount = totalAmount * (coupon.discountPercentage / 100);
        // }
        let totalAmount = 0;
    
        for (const product of products) {
            const { productVariant_id, quantity, product_id} = product;
            const variant = await ProductVariant.findByPk(productVariant_id);
    
            if (!variant) {
            return res.status(404).json({ error: `Product variant not found for ID ${productVariant_id}.` });
            }
    
            await OrderProduct.create({
            order_id: order.id,
            product_id:product_id,
            productVariant_id: variant.id,
            quantity,
            price: variant.offerPrice,
            });
    
            totalAmount += variant.offerPrice * quantity;

    }
        if (totalAmount<=1000){
            delivery_charge = 99
        } else{
            delivery_charge = 0
        }

        taxAmount = totalAmount*taxRate
        finalAmount = totalAmount+taxAmount+delivery_charge
        order.totalAmount = totalAmount;
        order.taxAmount = taxAmount;
        order.delivery_charge = delivery_charge;
        order.finalAmount = finalAmount;
        await order.save();
    
        res.status(201).json({ message: 'Order placed successfully.', order });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order.' });
    }
};

// GET user orders
exports.getOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findOne({
        where:{
          user_id: req.user.userId,
          id     : order_id
        },
        include: [
            {
                model: User,
                attributes: ['id','username']
            },
            {
                model: Useraddress,
                attributes:{exclude:['createdAt', 'updatedAt']}
            },
            {
                model: OrderProduct,
                attributes:{exclude:['createdAt', 'updatedAt']},
                include:[
                  {
                    model:ProductVariant,
                    attributes:{exclude:['createdAt', 'updatedAt']}
                  }
                ]
            }
        ],
    });
    if (!order) {
      return res.status(404).json({ error: 'order not found.' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ error: 'Failed to retrieve order.' });
  }
};
// GET user orders
exports.getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.userId
    const { order_status } = req.query;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: `User not found for ID ${user_id}.` });
    }
    const options = {
        where: { user_id },
        include: [
            {
                model: User,
                attributes: ['id','username']
            },
            {
                model: Useraddress,
                attributes:{exclude:['createdAt', 'updatedAt']}
            },
            {
                model: OrderProduct,
                include:[
                  {
                    model:Product,
                    attributes:{exclude:['createdAt', 'updatedAt']}
                  },
                  {
                    model:ProductVariant,
                    attributes:{exclude:['createdAt', 'updatedAt']}
                  }
                ]
            }
        ],
    };

    if (order_status) {
        options.where.order_status = order_status;
    }

    const orders = await Order.findAll(options);

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Failed to fetch user orders.' });
  }
}

exports.CancelOrder =  async (req, res) => {
    try {
      const { order_id } = req.params;
      const { reason } = req.body;
  
      // Find the order by ID
      const order = await Order.findByPk(order_id);
  
      if (!order) {
        return res.status(404).json({ error: `Order not found for ID ${order_id}.` });
      }
  
      // Check if the order is already canceled
      if (order.order_status === 'Cancelled') {
        return res.status(400).json({ error: 'The order is already canceled.' });
      }
  
      // Update the order status to 'canceled'
      order.cancellationReason = reason;
      order.order_status = 'Cancelled';
      order.order_cancel_date = new Date();
      await order.save();
  
      res.status(200).json({ message: 'Order canceled successfully.', order });
    } catch (error) {
      console.error('Error canceling order:', error);
      res.status(500).json({ error: 'Failed to cancel order.' });
    }
};

  
  
  
  
