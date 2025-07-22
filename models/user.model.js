const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // Name is required
    minlength: [3, "Name must be at least 3 characters long"], // Validation: Name length
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Email is required
    unique: true, // Email must be unique
    lowercase: true, // Convert email to lowercase
    validate: {
      validator: (v) => /\S+@\S+\.\S+/.test(v), // Email format validation
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"], // Password is required
    minlength: [6, "Password must be at least 6 characters long"], // Validation: Password length
  },
  role: {
    type: String,
    enum: ["student", "admin"], // Role validation: only "student" or "admin"
    default: "student", // Default value for role is "student"
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
