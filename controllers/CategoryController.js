const modal = require('../models');
const Category = modal.Category
const SubCategory = modal.Subcategory

exports.createCategory = async (req, res) => {
  try {
    const { name, image, published } = req.body;
    const category = await Category.create({  name, image, published });
    res.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category.' });
  }
};

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        res.json(category);
    } catch (error) {
        console.error('Error retrieving category:', error);
        res.status(500).json({ error: 'Failed to retrieve category.' });
    }
  };

exports.getCategorys = async (req, res) => {
  try {
    const categories = await Category.findAll({include:[SubCategory]});
    res.json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json({ error: 'Failed to retrieve categories.' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {  name, image, published } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'category not found.' });
    }
    category.name = name;
    category.image = image;
    category.published = published;
    await category.save();
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category.' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    await category.destroy();
    res.json({success:`category '${category.name}' was deleted!`});
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category.' });
  }
};
