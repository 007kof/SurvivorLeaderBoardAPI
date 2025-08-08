import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://007kof:Alexjichen98@game.eyf1pdg.mongodb.net/leaderboard')
    // await mongoose.connect('mongodb://localhost:27017/leaderboard');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
