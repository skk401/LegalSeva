import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import LawyerSignUp from "../mongodb/models/authuser.js";
import lawyerModel from "../mongodb/models/lawyerDetails.js";
import booking from "../mongodb/models/bookings.js";

// Candidate Signup
export const registerLawyer = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingCandidate = await LawyerSignUp.findOne({ email });

  if (existingCandidate) {
    return res.status(200).send({
      success: false,
      message: "Candidate already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;

  const candidateRegistered = await LawyerSignUp.create(req.body);

  // Generate a JWT token
  const token = jwt.sign(
    { id: candidateRegistered._id, role: "Lawyer" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const tokenWithPrefix = `0${token}`;

  // Remove sensitive information from the user object
  const userResponse = {
    _id: candidateRegistered._id,
    email: candidateRegistered.email,
    // Add any other user details you want to include in the response
  };

  // Send the response with the token and user details
  res.status(201).json({
    success: true,
    token: tokenWithPrefix,
    user: userResponse,
    message: "Signup successful",
  });
});

//CANDIDATE LOGIN
export const loginLawyer = catchAsyncErrors(async (req, res, next) => {
  let user = await LawyerSignUp.findOne({ email: req.body.email });
  if (!user) {
    return res.status(200).send({
      success: false,
      message: "User Not found",
    });
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(200).send({
      success: false,
      message: "Invalid Email or Password ",
    });
  }
  const token = jwt.sign(
    { id: user._id, role: "Lawyer" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const tokenWithPrefix = `0${token}`;
  user = user.toObject();
  user.token = token;
  user.password = undefined;
  // const options = {
  //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  //   // httpOnly: true,
  // };
  res.status(200).json({
    success: true,
    token: tokenWithPrefix,
    user,
    message: "Logged in successfully",
  });
});

export const detailsLawyer = catchAsyncErrors(async (req, res, next) => {
  const lawyer = await lawyerModel.create(req.body);

  res.status(201).json({
    success: true,
    lawyer,
  });
});

export const bookingLawyer = catchAsyncErrors(async (req, res, next) => {
  const { slot, lawyer } = req.body;
  const existingBooking = await booking.findOne({ slot: slot, lawyer: lawyer });
  if (existingBooking) {
    return res.status(200).json({
      success: false,
      msg: "Slot already Booked by another person",
    });
  }
  const book = await booking.create(req.body);

  res.status(201).json({
    success: true,
    book,
  });
});
