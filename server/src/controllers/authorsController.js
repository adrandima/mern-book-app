import * as authorsDB from '../db/authorsDB';

export const getAuthors = async (req, res) => {
  try {
    const authors = await authorsDB.getAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await authorsDB.getAuthorById(authorId);

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const savedAuthor = await authorsDB.createNewAuthor({ first_name, last_name });

    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const updatedAuthor = await authorsDB.updateAuthorById(authorId, req.body);

    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
