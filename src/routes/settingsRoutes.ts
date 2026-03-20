import express from 'express';
import { Settings } from '../models/Settings';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({}); 
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put('/', async (req, res) => {
  try {
    const { storeName, currency, adminEmail } = req.body;
    let settings = await Settings.findOne();
    
    if (settings) {
      settings.storeName = storeName;
      settings.currency = currency;
      settings.adminEmail = adminEmail;
      await settings.save();
    } else {
      settings = await Settings.create(req.body);
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Update Error" });
  }
});

export default router;