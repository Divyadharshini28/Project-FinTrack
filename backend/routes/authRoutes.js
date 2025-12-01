const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/usermodels");
const authMiddleware = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", async (req, res) => {
  console.log("Incoming signup body : ", req.body);
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// GET PROFILE
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to load profile" });
  }
});

// UPDATE PROFILE
router.put("/update", authMiddleware, async (req, res) => {
  console.log("🔥 UPDATE BODY RECEIVED:", req.body);
  console.log("🔥 USER FROM TOKEN:", req.user);

  try {
    const { username, oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // PASSWORD UPDATE
    if (newPassword && newPassword.trim() !== "") {
      console.log("🔥 Attempting password update...");

      if (!oldPassword || oldPassword.trim() === "") {
        return res.status(400).json({ message: "Old password required" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      console.log("🔥 Password match result:", isMatch);

      if (!isMatch)
        return res.status(401).json({ message: "Incorrect current password" });

      user.password = await bcrypt.hash(newPassword, 10);
      console.log("🔥 Password successfully hashed + updated");
    }

    // USERNAME UPDATE
    if (username && username !== user.username) {
      console.log("🔥 Updating username:", username);
      user.username = username;
    }

    await user.save();

    res.json({
      message: "Profile updated",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("❌ UPDATE ERROR:", err.message);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

module.exports = router;
