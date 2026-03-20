import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = "mongodb+srv://admin:admin123@cluster0.fegp2my.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Atlas (Cloud) Connected Successfully!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); 
  }
};

export default connectDB;