import {
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,

  USER_SIGNOUT_SUCCESS,

  USER_AUTH0_LOGIN_LOADING,
  USER_AUTH0_LOGIN_SUCCESS,
  USER_AUTH0_LOGIN_FAILURE,
} from '../actions/index.js';

const initialState = {
  user_id: 0,
  username: '',
  isLoggedIn: false,
  loggingInLoadingMessage: false,
  error: null
};

export const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case USER_AUTH0_LOGIN_LOADING:
    case USER_LOGIN_LOADING:
      return {
        ...state,
        loggingInLoadingMessage: true,
        error: null
      };
    case USER_AUTH0_LOGIN_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user_id: action.payload.id,
        username: action.payload.username,
        isLoggedIn: true,
        loggingInLoadingMessage: false,
        error: null
      };
    case USER_AUTH0_LOGIN_FAILURE:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loggingInLoadingMessage: false,
        error: action.payload
      };

    // Signout
    case USER_SIGNOUT_SUCCESS:
      return initialState;

    case USER_AUTH0_LOGIN_LOADING:
    case USER_AUTH0_LOGIN_SUCCESS:
    case USER_AUTH0_LOGIN_FAILURE:
    default:
      return state;
  }
};
