import express from "express";

import {
  loginUser,
  registerUser,
  logoutUser,
  authMiddleware,
  validateUser,
} from "../../controllers/auth/auth-controller.js";

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

export default router;
