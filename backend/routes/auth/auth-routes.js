import express from "express";

import {
  loginUser,
  registerUser,
} from "../../controllers/auth/auth-controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
