import mongoose from "mongoose";
import validator from "validator";
const userSignUpModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    createdAt: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const userSignUp = mongoose.model("userSignUp", userSignUpModel);

export default userSignUp;
