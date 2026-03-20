import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User'; 

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "အီးမေးလ် မှားယွင်းနေပါသည်" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "ပါတ်စဝပ် မှားယွင်းနေပါသည်" });
    }

    
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error ဖြစ်နေပါသည်" });
  }
};