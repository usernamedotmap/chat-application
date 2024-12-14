import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controllers.js";
import { protectRoutes } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoutes, updateProfile);

router.get("/check", protectRoutes, checkAuth);
export default router;
