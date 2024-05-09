import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected in connect DB"));
  // .catch((err)=>console.error(`Error connecting to MongoDB: ${err}`))
};

export default connectDB;
