const model = require('../models');
const Category = model.Category
const ChildCategory = model.Childcategory
const SubCategory = model.Subcategory


exports.createSubCategory = async (req, res) => {
  try {
    const { name, image, category_id, published } = req.body;
    const subcategory = await SubCategory.create({  category_id, name, image, published });
    res.json(subcategory);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ error: 'Failed to create subcategory.' });
  }
};

exports.getSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await SubCategory.findByPk(id);
        res.json(subcategory);
    } catch (error) {
        console.error('Error retrieving subcategory:', error);
        res.status(500).json({ error: 'Failed to retrieve subcategory.' });
    }
};

exports.getSubCategoryByCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const subcategory = await SubCategory.findAll({where: { category_id : category_id }});
        res.json(subcategory);
    } catch (error) {
        console.error('Error retrieving subcategory:', error);
        res.status(500).json({ error: 'Failed to retrieve subcategory.' });
    }
};

exports.getSubCategories = async (req, res) => {
  try {
    const subcategory = await SubCategory.findAll({include:[Category]});
    res.json(subcategory);
  } catch (error) {
    console.error('Error retrieving subcategory:', error);
    res.status(500).json({ error: 'Failed to retrieve subcategory.' });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {  name, image, category_id, published } = req.body;
    const subcategory = await SubCategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({ error: 'subcategory not found.' });
    }
    subcategory.name = name;
    subcategory.image = image;
    subcategory.category_id = category_id;
    subcategory.published = published;
    await subcategory.save();
    res.json(subcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ error: 'Failed to update subcategory.' });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await SubCategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({ error: 'subcategory not found.' });
    }
    await subcategory.destroy();
    res.json({success:`subcategory '${subcategory.name}' was deleted!`});
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ error: 'Failed to delete subcategory.' });
  }
};
