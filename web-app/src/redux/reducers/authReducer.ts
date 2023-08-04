import {
    AuthActionTypes,
    AuthAction,
    AuthState,
  } from '../../interface/authTypes';
  
  const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case AuthActionTypes.REGISTER_REQUEST:
      case AuthActionTypes.LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
      case AuthActionTypes.REGISTER_SUCCESS:
      case AuthActionTypes.LOGIN_SUCCESS:
        return { ...state, user: action.payload, loading: false, error: null };
      case AuthActionTypes.REGISTER_FAILURE:
      case AuthActionTypes.LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case AuthActionTypes.LOGOUT:
        return { ...state, user: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  