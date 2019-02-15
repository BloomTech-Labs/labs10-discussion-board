import {
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SIGNOUT_SUCCESS
} from '../actions/index.js';

const initialState = {
  user_id: 0,
  isLoggedIn: false,
  loggingInLoadingMessage: false,
  loggingOutLoadingMessage: false,
  token: '',
  error: null
};

export const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case USER_LOGIN_LOADING:
      return {
        ...state,
        loggingInLoadingMessage: true,
        error: null
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user_id: action.payload.id,
        isLoggedIn: true,
        loggingInLoadingMessage: false,
        token: action.payload.token,
        error: null
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loggingInLoadingMessage: false,
        error: action.payload
      };
    // Signout
    case USER_SIGNOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
