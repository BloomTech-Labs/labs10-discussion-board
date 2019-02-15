import axios from 'axios';
const { backendUrl } = require('../../globals/globals.js');

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
// Login
export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

// Signout
export const USER_SIGNOUT_SUCCESS = 'USER_SIGNOUT_SUCCESS';

/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/
export const login = creds => dispatch => {
  dispatch({ type: USER_LOGIN_LOADING });
  return axios
    .post(`${backendUrl}/auth/login`, creds)
    .then(response => {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data[0] });
    })
    .catch(err => dispatch({ type: USER_LOGIN_FAILURE, payload: err }));
};

export const register = () => dispatch => {
  // tell me what to do auth0
};

export const signout = () => dispatch => {
  dispatch({ type: USER_SIGNOUT_SUCCESS });
};
