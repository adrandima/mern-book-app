import Book from "../models/Book";

export const getBooksFromDB = async (page, limit) => {
  return await Book.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("author")
    .exec();
};

export const getBookByIdFromDB = async (bookId) => {
  return await Book.findById(bookId).populate("author").exec();
};

export const createBookInDB = async (name, isbn, authorId) => {
  const newBook = new Book({ name, isbn, author: authorId });
  return await newBook.save();
};

export const updateBookInDB = async (bookId, updateData) => {
  return await Book.findByIdAndUpdate(bookId, updateData, {
    new: true,
  }).exec();
};

export const deleteBookFromDB = async (bookId) => {
  return await Book.findByIdAndDelete(bookId).exec();
};

// Helper function to find the author of the book
export const findBookAuthor = async (bookId) => {
  const book = await Book.findById(bookId).exec();
  return book ? book.author : null;
};
