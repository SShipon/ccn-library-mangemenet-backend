const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"], // Title must be present
        minlength: [3, "Title must be at least 3 characters long"] // Title length validation
    },
    author: {
        type: String,
        required: [true, "Author is required"], // Author must be present
        minlength: [3, "Author must be at least 3 characters long"] // Author length validation
    },
    category: {
        type: String,
        required: [true, "Category is required"], // Category must be present
        minlength: [3, "Category must be at least 3 characters long"] // Category length validation
    },
    description: {
        type: String,
        required: false // Description is optional
    },
imageUrl: {
  type: String,
  required: false,
  validate: {
    validator: function (v) {
      // Allow empty or valid URL starting with http/https
      if (!v) return true;
      return /^https?:\/\/.+/i.test(v);
    },
    message: "Invalid image URL format",
  },
},

    publishedYear: {
        type: Number,
        min: [1900, "Published year must be a valid year"], // Published year validation
        required: false
    },
    availableCopies: {
        type: Number,
        required: [true, "Available copies are required"], // Available copies must be present
        min: [1, "Available copies must be at least 1"] // Available copies must be 1 or more
    },
    rating: {
        type: Number,
        min: [1, "Rating must be between 1 and 5"],
        max: [5, "Rating must be between 1 and 5"],
        required: false
    },
    status: {
        type: String,
        enum: ["pending", "approved"], // Status validation
        default: "pending"
    },
    department: {
        type: String,
        required: [true, "Department is required"], // Department must be present
        enum: [
            "EEE", // Electrical and Electronic Engineering
            "Civil",  // Civil Engineering
            "Law",  // Law
            "English",  // English
            "Business",  // Business Administration
            "CSE",  // Computer Science & Engineering
            "Mathematics",  // Mathematics
            "Bangla",  // Bangla
            "Related Subjects"  // Related Subjects
        ], // Enum validation for department
        message: "Invalid department"
    }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
                     






