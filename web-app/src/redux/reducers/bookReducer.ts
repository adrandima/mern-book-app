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

import { IBook, BookState } from "../../interface";

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

const bookReducer = (state = initialState, action: any): BookState => {
  const { type, payload } = action;
  console.log("🚀 ~ file: bookReducer.ts:26 ~ bookReducer ~ payload:", payload);

  switch (type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, books: payload, loading: false, error: null };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: payload };
    case UPDATE_BOOK_REQUEST:
    case DELETE_BOOK_REQUEST:
    case CREATE_BOOK_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_BOOK_SUCCESS:
    case DELETE_BOOK_SUCCESS:
    case CREATE_BOOK_SUCCESS:
      return { ...state, loading: false, error: null };
    case UPDATE_BOOK_FAILURE:
    case DELETE_BOOK_FAILURE:
    case CREATE_BOOK_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default bookReducer;
