import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "ဒီအီးမေးလ်နဲ့ အကောင့်ရှိပြီးသား ဖြစ်နေပါတယ်ဗျ။" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: "User Created Successfully!" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Registration failed! Server Error." });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1d' });
    
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err: any) {
    res.status(500).json({ message: "Login လုပ်လို့မရပါဘူးဗျ။" });
  }
});

router.put('/update-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "လက်ရှိ Password မှားနေပါတယ်ဗျ" });

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;