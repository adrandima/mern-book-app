import { Dispatch } from "redux";
import axios from "axios";
import {
  FETCH_AUTHORS_REQUEST,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
  UPDATE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_FAILURE,
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  CREATE_AUTHOR_REQUEST,
  CREATE_AUTHOR_SUCCESS,
  CREATE_AUTHOR_FAILURE,
} from "../../constants/actionTypes";
import { URL } from "../../constants/config";
import { IAuthor } from "../../interface/book";

export const fetchAuthorsRequest = () => ({
  type: FETCH_AUTHORS_REQUEST,
});

export const fetchAuthorsSuccess = (authors: IAuthor[]) => ({
  type: FETCH_AUTHORS_SUCCESS,
  payload: authors,
});

export const fetchAuthorsFailure = (error: string) => ({
  type: FETCH_AUTHORS_FAILURE,
  payload: error,
});

export const updateAuthorRequest = () => ({
  type: UPDATE_AUTHOR_REQUEST,
});

export const updateAuthorSuccess = () => ({
  type: UPDATE_AUTHOR_SUCCESS,
});

export const updateAuthorFailure = (error: string) => ({
  type: UPDATE_AUTHOR_FAILURE,
  payload: error,
});

export const deleteAuthorRequest = () => ({
  type: DELETE_AUTHOR_REQUEST,
});

export const deleteAuthorSuccess = () => ({
  type: DELETE_AUTHOR_SUCCESS,
});

export const deleteAuthorFailure = (error: string) => ({
  type: DELETE_AUTHOR_FAILURE,
  payload: error,
});

export const createAuthorRequest = () => ({
  type: CREATE_AUTHOR_REQUEST,
});

export const createAuthorSuccess = () => ({
  type: CREATE_AUTHOR_SUCCESS,
});

export const createAuthorFailure = (error: string) => ({
  type: CREATE_AUTHOR_FAILURE,
  payload: error,
});

const token = localStorage.getItem("token");

export const fetchAuthors = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAuthorsRequest());

    try {
      const response = await axios.get(`${URL}/author`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(fetchAuthorsSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchAuthorsFailure(error.message));
    }
  };
};

export const updateAuthor = (author: IAuthor) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateAuthorRequest());

    try {
      await axios.put(`${URL}/author/${author._id}`, author, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateAuthorSuccess());
    } catch (error: any) {
      dispatch(updateAuthorFailure(error.message));
    }
  };
};

export const deleteAuthor = (authorId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteAuthorRequest());

    try {
      await axios.delete(`${URL}/author/${authorId}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteAuthorSuccess());
    } catch (error: any) {
      dispatch(deleteAuthorFailure(error.message));
    }
  };
};

export const createAuthor = (author: IAuthor) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAuthorRequest());

    try {
      await axios.post(`${URL}/author`, author, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(createAuthorSuccess());
    } catch (error: any) {
      dispatch(createAuthorFailure(error.message));
    }
  };
};
