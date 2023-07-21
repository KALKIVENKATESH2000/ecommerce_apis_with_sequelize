const model = require('../models'); 
const Product = model.Product
const ProductVariant = model.ProductVariant
const Review = model.Review


// PRODUCTS CRUD
exports.createProduct = async (req, res) => {
  try {
    const { category_id,subcategory_id,childcategory_id, title, description, richDescription,image,images,brand_id, variants ,countInStock,rating,numReviews,reviews,published,isFeatured,isPopular } = req.body;
    const product = await Product.create({ category_id,subcategory_id,childcategory_id, title, description, richDescription,image,images,brand_id, variants ,countInStock,rating,numReviews,reviews,published,isFeatured,isPopular });
    
    // Create the variants and associate them with the product
    const createdVariants = await ProductVariant.bulkCreate(
        variants.map((variant) => ({ ...variant, product_id: product.id }))
    );

    const productWithVariants = await Product.findByPk(product.id, {
        include: ProductVariant,
    });

    res.json({ message: 'Product created successfully.', productWithVariants });
  } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product.' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAndCountAll({ include: [ProductVariant, Review],  limit: 10 });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Failed to retrieve products.' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {include:[ProductVariant ]});
    if (!product) {
      return res.status(404).json({ error: 'product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Failed to retrieve products.' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId,subcategoryId,childcategoryId, name, description, richDescription,image,images,brand,originalPrice,offerPrice, variants ,countInStock,rating,numReviews,reviews,isFeatured,isPopular } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'product not found.' });
    }
    product.categoryId = categoryId;
    product.subcategoryId = subcategoryId;
    product.childcategoryId = childcategoryId;
    product.name = name;
    product.description = description;
    product.richDescription = richDescription;
    product.image = image;
    product.images = images;
    product.brand = brand;
    product.originalPrice = originalPrice;
    product.offerPrice = offerPrice;
    product.variants = variants;
    product.countInStock = countInStock;
    product.rating = rating;
    product.numReviews = numReviews;
    product.reviews = reviews;
    product.isFeatured = isFeatured;
    product.isPopular = isPopular;
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product.' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      await product.destroy();
      res.json({success:`product '${product.name}' was deleted!`});
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product.' });
  }
};
