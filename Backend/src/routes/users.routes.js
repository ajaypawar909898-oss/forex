import express from "express";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getAllUnApprovedUsers,
  getAllUsers,
} from "../controller/users.controller.js";
const userRoutes = express.Router();

// Define user-related routes here

userRoutes.get("/", isAuthenticated, getAllUsers);
userRoutes.get("/unapprove", isAuthenticated, getAllUnApprovedUsers);
export default userRoutes;
