import { Dispatch } from 'redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  AuthActionTypes,
  AuthAction,
  User,
} from '../../interface/authTypes';

import { URL } from "../../constants/config";

export const register = (email: string, password: string) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.REGISTER_REQUEST });

  try {
    const response = await axios.post(`${URL}/auth/register`, { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);

    const user: User = jwt_decode(token);

    dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: user });
  } catch (error: any) {
    dispatch({ type: AuthActionTypes.REGISTER_FAILURE, payload: error.message });
  }
};

export const login = (email: string, password: string) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: AuthActionTypes.LOGIN_REQUEST });

  try {
    const response = await axios.post(`${URL}/auth/login`, { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);

    const user: User = jwt_decode(token);

    dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: user });
  } catch (error: any) {
    dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: error.message });
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  return { type: AuthActionTypes.LOGOUT };
};
