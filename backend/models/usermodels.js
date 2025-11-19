const mongoose = require("mongoose");

// Email regex (standard)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password must contain:
// 1 uppercase, 1 lowercase, 1 number, 1 special char, min 8 chars
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Username must NOT start with a number
const usernameRegex = /^[A-Za-z][A-Za-z0-9_]*$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters"],
      match: [usernameRegex, "Username must not start with a number"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [emailRegex, "Invalid email format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      match: [
        passwordRegex,
        "Password must contain at least 8 characters, including uppercase, lowercase, number and special character",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
