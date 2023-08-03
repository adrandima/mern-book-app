// authorRoutes.js
import express from "express";
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
} from "./authorController";
import { authMiddleware } from "../controllers/authController";
const authorRoutes = express.Router();

authorRoutes.get("/authors", authMiddleware, getAuthors);
authorRoutes.get("/author/:id", authMiddleware, getAuthorById);
authorRoutes.post("/author", authMiddleware, createAuthor);
authorRoutes.put("/author/:id", authMiddleware, updateAuthor);

export { authorRoutes };
