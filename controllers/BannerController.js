const modal = require('../models');
const Banner = modal.Banner


exports.createBanner = async (req, res) => {
  try {
    const { title, image, published } = req.body;
    const banner = await Banner.create({  title, image, published });
    res.json(banner);
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ error: 'Failed to create banner.' });
  }
};

exports.getBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByPk(id);
        res.json(banner);
    } catch (error) {
        console.error('Error retrieving banner:', error);
        res.status(500).json({ error: 'Failed to retrieve banner.' });
    }
  };

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.json(banners);
  } catch (error) {
    console.error('Error retrieving banners:', error);
    res.status(500).json({ error: 'Failed to retrieve banners.' });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const {  name, image, published } = req.body;
    const banner = await Banner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found.' });
    }
    banner.name = name;
    banner.image = image;
    banner.published = published;
    await banner.save();
    res.json(banner);
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ error: 'Failed to update banner.' });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ error: 'banner not found.' });
    }
    await banner.destroy();
    res.json({success:`banner '${banner.name}' was deleted!`});
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ error: 'Failed to delete banner.' });
  }
};
