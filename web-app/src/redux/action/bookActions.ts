import { Dispatch } from "redux";
import axios from "axios";
import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE,
} from "../../constants/actionTypes";
import { URL } from "../../constants/config";
export interface Book {
  _id: string;
  name: string;
  isbn: string;
  publicationYear: number;
  genre: string;
}

export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST,
});

export const fetchBooksSuccess = (books: Book[]) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books,
});

export const fetchBooksFailure = (error: string) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error,
});

export const updateBookRequest = () => ({
  type: UPDATE_BOOK_REQUEST,
});

export const updateBookSuccess = () => ({
  type: UPDATE_BOOK_SUCCESS,
});

export const updateBookFailure = (error: string) => ({
  type: UPDATE_BOOK_FAILURE,
  payload: error,
});

export const deleteBookRequest = () => ({
  type: DELETE_BOOK_REQUEST,
});

export const deleteBookSuccess = () => ({
  type: DELETE_BOOK_SUCCESS,
});

export const deleteBookFailure = (error: string) => ({
  type: DELETE_BOOK_FAILURE,
  payload: error,
});

export const createBookRequest = () => ({
  type: CREATE_BOOK_REQUEST,
});

export const createBookSuccess = () => ({
  type: CREATE_BOOK_SUCCESS,
});

export const createBookFailure = (error: string) => ({
  type: CREATE_BOOK_FAILURE,
  payload: error,
});

const token = localStorage.getItem("token");

export const fetchBooks = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchBooksRequest());

    try {
      const response = await axios.get(`${URL}/book?page=1&limit=10`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(fetchBooksSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchBooksFailure(error));
    }
  };
};

export const updateBook = (book: Book) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateBookRequest());

    try {
      await axios.put(`${URL}/book/${book._id}`, book, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateBookSuccess());
    } catch (error: any) {
      dispatch(updateBookFailure(error));
    }
  };
};

export const deleteBook = (bookId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteBookRequest());

    try {
      await axios.delete(`${URL}/book/${bookId}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteBookSuccess());
    } catch (error: any) {
      dispatch(deleteBookFailure(error.message));
    }
  };
};

export const createBook = (book: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(createBookRequest());

    try {
      await axios.post(`${URL}/book`, book, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(createBookSuccess());
    } catch (error: any) {
      dispatch(createBookFailure(error.message));
    }
  };
};
