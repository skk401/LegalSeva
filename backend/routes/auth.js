import express from "express";
const router = express.Router();
import {
  registerLawyer,
  loginLawyer,
  detailsLawyer,
  bookingLawyer,
} from "../controllers/auth.js";
//SIGNUP ROUTE FOR CANDIDATE
router.route("/registerLawyer").post(registerLawyer);
//LOGIN ROUTE FOR CANDIDATE
router.route("/loginLawyer").post(loginLawyer);
//New lawyer registration
router.route("/lawyerDetails").post(detailsLawyer);
//lawyer booking
router.route("/book").post(bookingLawyer);

export default router;
