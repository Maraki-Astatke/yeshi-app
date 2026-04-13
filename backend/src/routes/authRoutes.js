import express from 'express';
import {
  registerUser,
  verifyEmail,
  loginUser,
  getCurrentUser,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);

export default router;