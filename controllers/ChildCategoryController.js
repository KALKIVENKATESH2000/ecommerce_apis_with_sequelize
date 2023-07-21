const model = require('../models');
const Category = model.Category
const ChildCategory = model.Childcategory
const SubCategory = model.Subcategory

exports.createChildCategory = async (req, res) => {
  try {
    const { name, image, subcategory_id, published } = req.body;
    const childCategory = await ChildCategory.create({  subcategory_id, name, image, published });
    res.json(childCategory);
  } catch (error) {
    console.error('Error creating childCategory:', error);
    res.status(500).json({ error: 'Failed to create childCategory.' });
  }
};

exports.getChildCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const childcategory = await ChildCategory.findByPk(id);
        res.json(childcategory);
    } catch (error) {
        console.error('Error retrieving childcategory:', error);
        res.status(500).json({ error: 'Failed to retrieve childcategory.' });
    }
};

exports.getChildCategoryBySubCategory = async (req, res) => {
    try {
        const subcategory_id = req.params.subcatId;
        const childCategory = await ChildCategory.findAll({where: { subcategory_id : subcategory_id }});
        res.json(childCategory);
    } catch (error) {
        console.error('Error retrieving childCategory:', error);
        res.status(500).json({ error: 'Failed to retrieve childCategory.' });
    }
};

exports.getSubCategories = async (req, res) => {
  try {
    const childCategory = await ChildCategory.findAll({include:[SubCategory]});
    res.json(childCategory);
  } catch (error) {
    console.error('Error retrieving childCategory:', error);
    res.status(500).json({ error: 'Failed to retrieve childCategory.' });
  }
};

exports.updateChildCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {  name, image, subcategory_id, published } = req.body;
    const childCategory = await ChildCategory.findByPk(id);
    if (!childCategory) {
      return res.status(404).json({ error: 'ChildCategory not found.' });
    }
    childCategory.name = name;
    childCategory.image = image;
    childCategory.subcategoryId = subcategoryId;
    childCategory.published = published;
    await childCategory.save();
    res.json(childCategory);
  } catch (error) {
    console.error('Error updating childCategory:', error);
    res.status(500).json({ error: 'Failed to update childCategory.' });
  }
};

exports.deleteChildCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const childCategory = await ChildCategory.findByPk(id);
    if (!childCategory) {
      return res.status(404).json({ error: 'ChildCategory not found.' });
    }
    await childCategory.destroy();
    res.json({success:`childCategory '${childCategory.name}' was deleted!`});
  } catch (error) {
    console.error('Error deleting childCategory:', error);
    res.status(500).json({ error: 'Failed to delete childCategory.' });
  }
};
