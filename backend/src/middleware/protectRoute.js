import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized this person - no Token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(404).json({
        message: "Unauthorized this user",
      });`x`
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute",error.message);
    res.status(500).json({ message: "Internal serve Error"})
  }
};
