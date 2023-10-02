import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI as string;
    mongoose.connect(mongoUri, {});
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}