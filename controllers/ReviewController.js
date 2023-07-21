const model = require('../models') 
const Product = model.Product
const Review = model.Review
const User = model.AuthUser


exports.createReview = async (req, res) => {
  try {
    const { product_id } = req.params;
    console.log(product_id)
    const { rating, reviewText } = req.body;
    const user_id = req.user.userId;

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    const review = await Review.create({
        rating,
        reviewText,
        product_id,
        user_id,
    });
      // product.reviews.push(review);
    const existingAverage = product.rating || 0;
    const existingCount = product.numReviews || 0;
    const newAverage = ((existingAverage * existingCount) + review.rating) / (existingCount + 1);
    const newCount = existingCount + 1;

    await Product.update(
        { rating: newAverage, numReviews: newCount },
        { where: { id: product_id } }
    );

    res.status(201).json({ message: 'review added successfully.', review });
  } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Failed to create review.' });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const user_id = req.user.userId

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userReviews = await Review.findAll({
        where:{ 
            user_id : user_id
        }
      });
    res.status(200).json({ message : 'User reviews.', userReviews});
  } catch (error) {
    console.error('Error creating User reviews:', error);
    res.status(500).json({ error: 'Failed to create User reviews.' });
  }
};