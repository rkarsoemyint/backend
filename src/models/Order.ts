import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: Number },
  customerName: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);