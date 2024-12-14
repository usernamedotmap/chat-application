import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected sa mongoDb: ${conn.connection.host}`);
  } catch (error) {
    console.error("Not connected sa mongoDb:", error);
  }
};
