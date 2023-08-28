const model = require('../models');
const ProductVariant =  model.ProductVariant
const Category = model.Category
const ChildCategory = model.Childcategory
const SubCategory = model.Subcategory
const { Sequelize, DataTypes } = require('sequelize');
const Product = model.Product;



exports.FilterProducts =  async (req, res) => {
    const { category_id, subcategory_id, childcategory_id, min_price, max_price } = req.query;
  
    let whereCondition = {};
  
    if (category_id) {
      whereCondition.category_id = category_id;
    }
  
    if (subcategory_id) {
      whereCondition.subcategory_id = subcategory_id;
    }
  
    if (childcategory_id) {
      whereCondition.childcategory_id = childcategory_id;
    }

    if (min_price && max_price) {
      whereCondition['$ProductVariants.offerPrice$'] = {
        [Sequelize.Op.between]: [min_price, max_price],
      };
    }
  
    try {
      const products = await Product.findAll({
        where: whereCondition,
        include: [
            { model: ProductVariant },
            { model: Category },
            { model: SubCategory },
            { model: ChildCategory },
        ],
      });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};