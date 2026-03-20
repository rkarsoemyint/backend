import express from 'express';
import Order from '../models/Order';
import Counter from '../models/Counter';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});


router.post('/', async (req, res) => {
  try {
    
    const counter = await Counter.findOneAndUpdate(
      { id: 'orderId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

   
    const newOrder = new Order({
      ...req.body,
      orderId: counter.seq 
    });

    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
});


export default router;