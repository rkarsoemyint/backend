import express from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import { getProducts, createProduct } from '../controllers/productController';

const router = express.Router();

// --- Product Routes ---
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

// --- Category Routes ---
router.get('/categories', async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});
router.post('/categories', async (req, res) => {
  try {
    const newCat = new Category(req.body);
    await newCat.save();
    res.json(newCat);
  } catch (err) {
    res.status(500).json({ message: "Error creating category" });
  }
});
router.delete('/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category" });
  }
});

export default router;