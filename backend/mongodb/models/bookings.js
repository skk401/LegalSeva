import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSignUp",
    },
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LawyerDetails",
    },
    slot: {
      type: String,
    },
  },
  { timestamps: true }
);

const jobApplication = mongoose.model("JobApplication", bookingSchema);

export default jobApplication;
