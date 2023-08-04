import {
  getBooksFromDB,
  getBookByIdFromDB,
  createBookInDB,
  updateBookInDB,
  deleteBookFromDB,
  findBookAuthor
} from "../db/booksDB";

import { createNewAuthor, deleteAuthorFromDB } from "../db/authorsDB";

export const getBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const books = await getBooksFromDB(page, limit);

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await getBookByIdFromDB(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { name, isbn, author } = req.body;

    // Call the createAuthor function to create a new author and get the authorId
    const savedAuthor = await createNewAuthor({
      first_name: author.first_name,
      last_name: author.last_name,
    });
    const authorId = savedAuthor._id;

    // Create a new book and associate it with the newly created author
    const savedBook = await createBookInDB(name, isbn, authorId);

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updateData = req.body;

    const book = await updateBookInDB(bookId, updateData);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    // Find the book by its ID and get the author's ID
    const authorId = await findBookAuthor(bookId);

    // Delete the book
    const deletedBook = await deleteBookFromDB(bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    // If the book was successfully deleted, also delete the author
    await deleteAuthorFromDB(authorId);

    res.json(deletedBook);
  } catch (error) {
    console.log("🚀 ~ file: bookController.js:95 ~ deleteBook ~ error:", error)
    res.status(500).json({ error: "Internal server error" });
  }
};
