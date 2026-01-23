import express from "express";
import {
  createBank,
  getAllBanks,
  updateBank,
  deleteBank,
} from "../controller/bank.controller.js";
import { uploadImage } from "../middleware/uploadImage.middleware.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const bankRoutes = express.Router();
bankRoutes.post(
  "/",
  isAuthenticated,
  uploadImage("bank").fields([{ name: "qr_image", maxCount: 1 }]),
  createBank,
);
bankRoutes.get("/", isAuthenticated, getAllBanks);
bankRoutes.put(
  "/:id",
  isAuthenticated,
  uploadImage("bank").fields([{ name: "qr_image", maxCount: 1 }]),
  updateBank,
);
bankRoutes.delete("/:id", isAuthenticated, deleteBank);
export default bankRoutes;
