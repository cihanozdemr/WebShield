import Brand from '../models/Brand.js';

export const addBrand = async (req, res) => {
  try {
    const { name, originalUrl, category } = req.body;

    if (!name || !originalUrl) {
      return res.status(400).json({ status: 'error' });
    }

    const newBrand = await Brand.create({
      name,
      originalUrl,
      category,
    });

    res.status(201).json({
      status: 'success',
      data: newBrand,
    });
  } catch (error) {
    res.status(500).json({ status: 'error' });
  }
};
