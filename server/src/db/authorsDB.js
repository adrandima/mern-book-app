import Author from '../models/Author';

export const getAllAuthors = async () => {
  return await Author.find().exec();
};

export const getAuthorById = async (authorId) => {
  return await Author.findById(authorId).exec();
};

export const createNewAuthor = async ({ first_name, last_name }) => {
  const newAuthor = new Author({ first_name, last_name });
  return await newAuthor.save();
};

export const updateAuthorById = async (authorId, updateData) => {
  return await Author.findByIdAndUpdate(authorId, updateData, { new: true }).exec();
};

export const deleteAuthorFromDB = async (authorId) => {
  if (authorId) {
    return await Author.findByIdAndDelete(authorId).exec();
  }
  return null;
};
