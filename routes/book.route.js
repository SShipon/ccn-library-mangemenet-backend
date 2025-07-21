const express = require("express");
const { createBook, getBooks, updateBook, deleteBook, approveBook } = require("../controllers/book.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

const router = express.Router();

// Create book - logged in user
router.post("/", verifyToken, createBook);

// Get all books - public route
router.get("/", getBooks);

// Update book - logged in user
router.put("/:id", verifyToken, updateBook);

// Delete book - logged in user
router.delete("/:id", verifyToken, deleteBook);

// Approve book - only admin
router.patch("/approve/:id", verifyToken, verifyAdmin, approveBook);

module.exports = router;
