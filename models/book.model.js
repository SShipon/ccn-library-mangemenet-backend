const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    description: String,
    imageUrl: String,
    publishedYear: Number,
    availableCopies: Number,
    rating: Number,
    status: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
