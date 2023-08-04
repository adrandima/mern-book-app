import { Reducer } from "redux";
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
import { IAuthor } from "../../interface/book";

interface AuthorState {
  authors: IAuthor[];
  error: string | null;
  loading: boolean;
}

const initialState: AuthorState = {
  authors: [],
  error: null,
  loading: false,
};

const authorReducer: Reducer<AuthorState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTHORS_REQUEST:
    case UPDATE_AUTHOR_REQUEST:
    case DELETE_AUTHOR_REQUEST:
    case CREATE_AUTHOR_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_AUTHORS_SUCCESS:
      return { ...state, authors: action.payload, loading: false, error: null };
    case UPDATE_AUTHOR_SUCCESS:
    case DELETE_AUTHOR_SUCCESS:
    case CREATE_AUTHOR_SUCCESS:
      return { ...state, loading: false, error: null };
    case FETCH_AUTHORS_FAILURE:
    case UPDATE_AUTHOR_FAILURE:
    case DELETE_AUTHOR_FAILURE:
    case CREATE_AUTHOR_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default authorReducer;
