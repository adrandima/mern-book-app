// authorRoutes.js
import express from "express";
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
} from "../controllers/authorsController";
import { authMiddleware } from "../controllers/authController";
const authorRouter = express.Router();

// Route to handle GET request for all authors.
authorRouter.get("/", authMiddleware, getAuthors);

// Route to handle GET request for a specific author by ID.
authorRouter.get("/:id", authMiddleware, getAuthorById);

// Route to handle POST request for creating a new author.
authorRouter.post("/", authMiddleware, createAuthor);

// Route to handle PUT request for updating an existing author by ID.
authorRouter.put("/:id", authMiddleware, updateAuthor);

export { authorRouter };
