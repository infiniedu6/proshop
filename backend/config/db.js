import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connnected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Unable to connect ${error}`);
    process.exit(1); // kill the server if DB connection fails
  }
};

export default connectDB;
