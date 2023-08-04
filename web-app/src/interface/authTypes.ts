export interface User {
  _id: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export enum AuthActionTypes {
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
}

interface RegisterRequestAction {
  type: AuthActionTypes.REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: User;
}

interface RegisterFailureAction {
  type: AuthActionTypes.REGISTER_FAILURE;
  payload: string;
}

interface LoginRequestAction {
  type: AuthActionTypes.LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailureAction {
  type: AuthActionTypes.LOGIN_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthAction =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;
