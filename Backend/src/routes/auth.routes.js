import express from "express";
import {
  login,
  register,
  resendOTP,
  verifyEmail,
  resetPassword,
  forgotPassword,
  logout,
  adminApprove,
  forgetResendOTP,
} from "../controller/auth.controller.js";
import { uploadImage } from "../middleware/uploadImage.middleware.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();
authRoutes.get("/checkUserLogin", isAuthenticated, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});
authRoutes.post("/login", login);
authRoutes.post("/logout", isAuthenticated, logout);
authRoutes.post(
  "/register",
  uploadImage("Documents").fields([
    { name: "pan_image", maxCount: 1 },
    { name: "aadhaar_image", maxCount: 1 },
    { name: "bank_passbook_image", maxCount: 1 },
  ]),
  register
);

authRoutes.post("/verify", verifyEmail);
authRoutes.post("/resend", resendOTP);
authRoutes.post("/forget-resend-otp", forgetResendOTP);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", resetPassword);
authRoutes.post("/approve/:id", isAuthenticated, adminApprove);
export default authRoutes;
