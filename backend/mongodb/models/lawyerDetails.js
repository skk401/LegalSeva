import mongoose from "mongoose";
import validator from "validator";
const lawyerModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "phone number is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    createdAt: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const lawyerDetails = mongoose.model("LawyerDetails", lawyerModel);

export default lawyerDetails;
