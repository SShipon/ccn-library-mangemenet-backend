const { z } = require("zod");
const Book = require("../models/book.model");

// Zod schema for book validation
const bookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  author: z.string().min(3, "Author must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  publishedYear: z.number().min(1900, "Published year must be a valid year").optional(),
  availableCopies: z.number().min(1, "Available copies must be at least 1"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5").optional(),
  status: z.enum(["pending", "approved"]),
  department: z.enum([
   "CSE", "EEE", "Civil", "Law", "English", "Business", "Mathematics", "Bangla", "Related Subjects"
  ])
});

// Create Book
exports.createBook = async (req, res) => {
  try {
    // Validate request body using Zod
    const parsed = bookSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Validation Error", errors: parsed.error.errors });
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to create book", error: error.message });
  }
};

// Get Books (with optional search)
exports.getBooks = async (req, res) => {
  try {
    const { search, category, department, title } = req.query;  
    let query = {};

   
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

  
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    
    if (department) {
      query.department = { $regex: department, $options: "i" };
    }

  
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

 
    const books = await Book.find(query);


    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "books not found", error: error.message });
  }
};

// Update Book by ID
exports.updateBook = async (req, res) => {
  try {
    // Validate request body using Zod
    const parsed = bookSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Validation Error", errors: parsed.error.errors });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};

// Delete Book by ID
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};
// Get single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book); // Returning the book details
  } catch (error) {
    res.status(500).json({ message: "Failed to get book", error: error.message });
  }
};

// Approve Book (Admin only)
exports.approveBook = async (req, res) => {
  try {
    const approvedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!approvedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(approvedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to approve book", error: error.message });
  }
};
