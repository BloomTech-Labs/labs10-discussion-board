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
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  PASSWORD_UPDATE_LOADING,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILURE,
  UPLOAD_AVATAR_LOADING,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE,
  UPLOAD_AVATAR_URL_LOADING,
  UPLOAD_AVATAR_URL_SUCCESS,
  UPLOAD_AVATAR_URL_FAILURE,

  FOLLOW_DISCUSSION_SUCCESS,

  DISPLAY_ERROR,
  DISPLAY_MESSAGE,
  USER_EXISTS_LOADING,
  USER_EXISTS_SUCCESS,
  USER_EXISTS_FAILURE,
  EMAIL_EXISTS_LOADING,
  EMAIL_EXISTS_SUCCESS,
  EMAIL_EXISTS_FAILURE,

  EMAIL_CONFIRM_LOADING,
  EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILURE,

  UPDATE_EMAIL_LOADING,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE,
} from '../actions/index.js';

const initialState = {
  user_id: 0,
  avatar: null,
  username: '',
  loggingInLoadingMessage: false,
  registerLoadingMessage: false,
  userExistsLoadingMessage: false,
  emailExistsLoadingMessage: false,
  isUsernameTaken: false,
  isEmailTaken: false,
  error: '',
  message: '',
  discussions: [],
  discussionFollows: [],
  isAuth0: false,
};

export const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case USER_AUTH0_LOGIN_LOADING:
    case USER_LOGIN_LOADING:
      return {
        ...state,
        loggingInLoadingMessage: true,
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
        discussionFollows: action.payload.discussionFollows,
        loggingInLoadingMessage: false,
        isAuth0: action.payload.isAuth0,
        message: action.payload.message
      };
    case FOLLOW_DISCUSSION_SUCCESS:
    return {
      ...state,
      discussionFollows:action.payload
    }
    case USER_AUTH0_LOGIN_FAILURE:
    case USER_LOG_BACK_IN_FAILURE:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loggingInLoadingMessage: false
      };

    // Register
    case USER_REGISTER_LOADING:
      return {
        ...state,
        registerLoadingMessage: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        registerLoadingMessage: false,
        user_id: action.payload.id,
        avatar: action.payload.avatar,
        username: action.payload.username,
        discussions: action.payload.discussions,
        message: action.payload.message,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        registerLoadingMessage: false,
        error: action.payload
      };

    // Signout
    case USER_SIGNOUT_SUCCESS:
      return initialState;

    case DISPLAY_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case DISPLAY_MESSAGE:
      return {
        ...state,
        message: action.payload
      };

    case UPLOAD_AVATAR_URL_SUCCESS:
    case UPLOAD_AVATAR_SUCCESS:
      return { ...state, avatar: action.payload };

    case UPLOAD_AVATAR_URL_LOADING:
    case UPLOAD_AVATAR_LOADING:
    case USER_LOG_BACK_IN_LOADING:
    case PASSWORD_UPDATE_LOADING:
    case PASSWORD_UPDATE_SUCCESS:
    case PASSWORD_UPDATE_FAILURE:
      return state;

    // Is Username Taken
    case USER_EXISTS_LOADING:
      return {
        ...state,
        userExistsLoadingMessage: true,
        isUsernameTaken: false,
      };
    case USER_EXISTS_SUCCESS:
      return {
        ...state,
        userExistsLoadingMessage: false,
        isUsernameTaken: action.payload
      };
    case USER_EXISTS_FAILURE:
      return {
        ...state,
        userExistsLoadingMessage: false,
        isUsernameTaken: false,
        error: action.payload
      };

    // Is Email Taken
    case EMAIL_EXISTS_LOADING:
      return {
        ...state,
        emailExistsLoadingMessage: true,
        isEmailTaken: false,
      };
    case EMAIL_EXISTS_SUCCESS:
      return {
        ...state,
        emailExistsLoadingMessage: false,
        isEmailTaken: action.payload
      };
    case EMAIL_EXISTS_FAILURE:
      return {
        ...state,
        emailExistsLoadingMessage: false,
        isEmailTaken: false,
        error: action.payload
      };

    case EMAIL_CONFIRM_SUCCESS:
    case UPDATE_EMAIL_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };

    case UPDATE_EMAIL_LOADING:
    case UPDATE_EMAIL_FAILURE:
    case EMAIL_CONFIRM_LOADING:
    case EMAIL_CONFIRM_FAILURE:
    case UPLOAD_AVATAR_URL_FAILURE:
    case UPLOAD_AVATAR_FAILURE:
    default:
      return state;
  }
};
