import express from "express";
import {
  forgotPassword,
  login,
  logout,
  profile,
  register,
  resetPassword,
  updateProfile,
  changePassword,
  adminLogin,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post('/adminlogin',adminLogin)
router.get("/logout", logout);
router.get("/me", isLoggedIn, profile);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put("/update/:id", isLoggedIn, upload.single("avatar"), updateProfile);

export default router;
