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

authorRouter.get("/authors", authMiddleware, getAuthors);
authorRouter.get("/author/:id", authMiddleware, getAuthorById);
authorRouter.post("/author", authMiddleware, createAuthor);
authorRouter.put("/author/:id", authMiddleware, updateAuthor);

export { authorRouter };
