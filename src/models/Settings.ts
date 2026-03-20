import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  storeName: { type: String, default: "MyStore Admin" },
  currency: { type: String, default: "MMK" },
  adminEmail: { type: String, default: "admin@mystore.com" }
}, { timestamps: true });

export const Settings = mongoose.model('Settings', settingsSchema);