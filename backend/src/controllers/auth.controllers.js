import { generateToken } from "../lib/utils.js";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please fill-up all fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        message: "Email already exists",
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPasword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        message: "Invalid User",
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Wrong Email or Password",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Wrong Email or Password",
      });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout succesfully yours" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({
        message: "Profile pic is required",
      });
    }

    const uploadPic = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadPic.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

export const checkAuth = (req, res) => {
  try {
    if (!req.user) {
      return res.json(401).json({ message: "Unauthorized is not found " });
    }

    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
