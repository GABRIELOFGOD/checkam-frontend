import mongoose from "mongoose";

export const mongoDbConnect = () => {
  mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection failed', err))
}
