import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connect database successfully!");
  } catch (e) {
    console.log(`connect database fail: ${e}`);
  }
};

export default connect;
