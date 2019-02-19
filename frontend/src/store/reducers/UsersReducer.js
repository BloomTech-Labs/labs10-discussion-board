import {
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,

  USER_LOG_BACK_IN_LOADING,
  USER_LOG_BACK_IN_SUCCESS,
  USER_LOG_BACK_IN_FAILURE,

  USER_SIGNOUT_SUCCESS,

  USER_AUTH0_LOGIN_LOADING,
  USER_AUTH0_LOGIN_SUCCESS,
  USER_AUTH0_LOGIN_FAILURE,

  PASSWORD_UPDATE_LOADING,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILURE,

  UPLOAD_AVATAR_LOADING,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE,

  DISPLAY_ERROR,
  DISPLAY_MESSAGE,
} from '../actions/index.js';

const initialState = {
  user_id: 0,
  avatar: null,
  username: '',
  loggingInLoadingMessage: false,
  error: '',
  message: '',
  discussions: [],
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
    case USER_LOG_BACK_IN_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user_id: action.payload.id,
        avatar: action.payload.avatar,
        username: action.payload.username,
        discussions: action.payload.discussions,
        loggingInLoadingMessage: false,
        error: null
      };

    case UPLOAD_AVATAR_FAILURE:
    case USER_AUTH0_LOGIN_FAILURE:
    case USER_LOG_BACK_IN_FAILURE:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loggingInLoadingMessage: false,
        error: action.payload
      };

    // Signout
    case USER_SIGNOUT_SUCCESS:
      return initialState;

    case DISPLAY_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case DISPLAY_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case UPLOAD_AVATAR_SUCCESS:
      return { ...state, avatar: action.payload };

    case UPLOAD_AVATAR_LOADING:
    case USER_LOG_BACK_IN_LOADING:
    case USER_AUTH0_LOGIN_LOADING:
    case PASSWORD_UPDATE_LOADING:
    case PASSWORD_UPDATE_SUCCESS:
    case PASSWORD_UPDATE_FAILURE:
    default:
      return state;
  }
};
