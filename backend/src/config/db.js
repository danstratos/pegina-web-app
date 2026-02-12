import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nexo_games';
  await mongoose.connect(mongoUri);
  console.log('MongoDB conectado');
};
