const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();  // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/books", require("./routes/book.route"));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);  // Exit process if DB connection fails
  }
};

// Start Server
const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

// Environment Variable Check
if (!process.env.MONGO_URL || !process.env.PORT) {
  console.error("Missing environment variables: MONGO_URL or PORT");
  process.exit(1);  // Exit if required environment variables are missing
}

// Initialize the database and start the server
connectDB().then(startServer);
