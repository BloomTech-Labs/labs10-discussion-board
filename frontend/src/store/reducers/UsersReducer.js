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
  FOLLOW_CATEGORY_SUCCESS,

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

  STRIPE_PAYMENT_LOADING,
  STRIPE_PAYMENT_SUCCESS,
  STRIPE_PAYMENT_FAILURE,

  SEND_PW_RESET_EMAIL_LOADING,
  SEND_PW_RESET_EMAIL_SUCCESS,
  SEND_PW_RESET_EMAIL_FAILURE,

  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  DELETE_ACCOUNT_LOADING,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
} from '../actions/index.js';

const initialState = {
  user_id: 0,
  avatar: null,
  username: '',
  loggingInLoadingMessage: false,
  registerLoadingMessage: false,
  userExistsLoadingMessage: false,
  emailExistsLoadingMessage: false,
  stripePaymentLoadingMessage: false,
  isUsernameTaken: false,
  isEmailTaken: false,
  isLoggedIn: false,
  error: '',
  message: '',
  discussions: [],
  discussionFollows: [],
  isAuth0: false,
  categoryFollows: [],
  stripePaymentInfo: []
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

    case RESET_PASSWORD_SUCCESS:
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
        categoryFollows: action.payload.categoryFollows,
        loggingInLoadingMessage: false,
        isAuth0: action.payload.isAuth0,
        message: action.payload.message,
        isLoggedIn: true
      };

    // FOLLOW DISCUSSION
    case FOLLOW_DISCUSSION_SUCCESS:
      return {
        ...state,
        discussionFollows: action.payload
      };

    // FOLLOW CATEGORY
    case FOLLOW_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryFollows: action.payload
      }
    case USER_AUTH0_LOGIN_FAILURE:
    case USER_LOG_BACK_IN_FAILURE:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loggingInLoadingMessage: false,
        isLoggedIn: false
      };

    // Register
    case USER_REGISTER_LOADING:
      return {
        ...state,
        registerLoadingMessage: true,
        isLoggedIn: false
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
        isLoggedIn: true
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        registerLoadingMessage: false,
        error: action.payload,
        isLoggedIn: false
      };

    case USER_SIGNOUT_SUCCESS:
      return initialState;

    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...initialState,
        message: state.message,
      }

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

    case SEND_PW_RESET_EMAIL_SUCCESS:
    case EMAIL_CONFIRM_SUCCESS:
    case UPDATE_EMAIL_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };

    case STRIPE_PAYMENT_LOADING:
      return {
        ...state,
        stripePaymentLoadingMessage: true,
      }
    case STRIPE_PAYMENT_SUCCESS:
      return {
        ...state,
        stripePaymentInfo: action.payload,
        stripePaymentLoadingMessage: false,
      }
    case STRIPE_PAYMENT_FAILURE:
      return {
        ...state,
        stripePaymentLoadingMessage: false
      }

    case DELETE_ACCOUNT_LOADING:
    case DELETE_ACCOUNT_FAILURE:
    case UPLOAD_AVATAR_URL_LOADING:
    case UPLOAD_AVATAR_LOADING:
    case USER_LOG_BACK_IN_LOADING:
    case PASSWORD_UPDATE_LOADING:
    case PASSWORD_UPDATE_SUCCESS:
    case PASSWORD_UPDATE_FAILURE:
    case RESET_PASSWORD_LOADING:
    case RESET_PASSWORD_FAILURE:
    case SEND_PW_RESET_EMAIL_LOADING:
    case SEND_PW_RESET_EMAIL_FAILURE:
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
