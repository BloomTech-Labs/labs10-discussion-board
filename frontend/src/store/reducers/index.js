import {
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from '../actions';

const initialState = {
  isLoggedIn: false,
  loggingInLoadingMessage: false
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_LOADING:
      return {
        ...state,
        isLoggedIn: false,
        loggingInLoadingMessage: true
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggingInLoadingMessage: false
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        loggingInLoadingMessage: false
      };
    default:
      return state;
  }
};

export default rootReducer;
