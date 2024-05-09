import express from "express";
const router = express.Router();
import { registerLawyer, loginLawyer } from "../controllers/auth.js";
//SIGNUP ROUTE FOR CANDIDATE
router.route("/registerLawyer").post(registerLawyer);
//LOGIN ROUTE FOR CANDIDATE
router.route("/loginLawyer").post(loginLawyer);

export default router;
