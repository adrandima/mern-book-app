// Importing modules
import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import { authMiddleware } from "../controllers/authController";

// Initiating the router
const bookRouter = express.Router();

// Add book
bookRouter.post("/", authMiddleware, createBook);

// Get book
bookRouter.get("/", authMiddleware, getBooks);

// Get single book
bookRouter.get("/:id", authMiddleware, getBookById);

// Update a book
bookRouter.put("/:id", authMiddleware, updateBook);

// Delete a book
bookRouter.delete("/:id", authMiddleware, deleteBook);

export { bookRouter };
