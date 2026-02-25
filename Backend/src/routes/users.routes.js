import express from "express";

import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getAllUnApprovedUsers,
  getAllUsers,
  editUserById,
  passwordChange,
  updateUserStatus,
  deleteUser
} from "../controller/users.controller.js";
const userRoutes = express.Router();

// Define user-related routes here

userRoutes.get("/", isAuthenticated, getAllUsers);
userRoutes.get("/unapprove", isAuthenticated, getAllUnApprovedUsers);
userRoutes.post("/edit", isAuthenticated, editUserById);
userRoutes.post("/password", isAuthenticated, passwordChange);
userRoutes.get("/gelAllUser", isAuthenticated, getAllUsers);
userRoutes.put("/updateUser/:id", isAuthenticated, updateUserStatus);
userRoutes.delete("/delete/:id", isAuthenticated, deleteUser);

export default userRoutes;
