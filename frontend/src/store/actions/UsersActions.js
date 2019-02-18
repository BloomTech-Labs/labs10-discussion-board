import axios from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

// globals
const { backendUrl, auth0Domain } = require('../../globals/globals.js');

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
// Login
export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

// Log back in
export const USER_LOG_BACK_IN_LOADING = 'USER_LOG_BACK_IN_LOADING';
export const USER_LOG_BACK_IN_SUCCESS = 'USER_LOG_BACK_IN_SUCCESS';
export const USER_LOG_BACK_IN_FAILURE = 'USER_LOG_BACK_IN_FAILURE';

// Signout
export const USER_SIGNOUT_SUCCESS = 'USER_SIGNOUT_SUCCESS';

// Auth-0 Login
export const USER_AUTH0_LOGIN_LOADING = 'USER_AUTH0_LOGIN_LOADING';
export const USER_AUTH0_LOGIN_SUCCESS = 'USER_AUTH0_LOGIN_SUCCESS';
export const USER_AUTH0_LOGIN_FAILURE = 'USER_AUTH0_LOGIN_FAILURE';

// Update password
export const PASSWORD_UPDATE_LOADING = 'PASSWORD_UPDATE_LOADING';
export const PASSWORD_UPDATE_SUCCESS = 'PASSWORD_UPDATE_SUCCESS';
export const PASSWORD_UPDATE_FAILURE = 'PASSWORD_UPDATE_FAILURE';

// display errror
export const DISPLAY_ERROR = 'DISPLAY_ERROR';

/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/
export const login = creds => dispatch => {
  dispatch({ type: USER_LOGIN_LOADING });
  return axios
    .post(`${backendUrl}/auth/login`, creds)
    .then(response => {
      localStorage.setItem('symposium_token', response.data[0].token);
      localStorage.setItem('symposium_user_id', response.data[0].id);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data[0] });
    })
    .catch(err => handleError(err, USER_LOGIN_FAILURE)(dispatch));
};

export const logBackIn = (id, token) => dispatch => {
  const headers = { headers: { Authorization: token } };
  dispatch({ type: USER_LOG_BACK_IN_LOADING });
  return axios
    .post(`${backendUrl}/auth/log-back-in/${id}`, {}, headers)
    .then(res => {
      localStorage.setItem('symposium_token', res.data[0].token);
      localStorage.setItem('symposium_user_id', res.data[0].id);
      dispatch({ type: USER_LOG_BACK_IN_SUCCESS, payload: res.data[0] });
    })
    .catch(err => handleError(err, USER_LOG_BACK_IN_FAILURE)(dispatch));
};

export const auth0Login = accessToken => dispatch => {
  const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
  dispatch({ type: USER_AUTH0_LOGIN_LOADING });
  return axios
    .get(`https://${auth0Domain}/userinfo`, headers)
    .then(res => {
      const { email, name, picture } = res.data;
      const body = { email, name, picture };
      return axios
        .post(`${backendUrl}/auth/auth0-login`, body)
        .then(response => {
          localStorage.setItem('symposium_token', response.data[0].token);
          localStorage.setItem('symposium_user_id', response.data[0].id);
          return dispatch({
            type: USER_AUTH0_LOGIN_SUCCESS,
            payload: response.data[0]
          });
        })
        .catch(err => handleError(err, USER_AUTH0_LOGIN_FAILURE)(dispatch));
    })
    .catch(err => handleError(err, USER_AUTH0_LOGIN_FAILURE)(dispatch));
};

export const register = () => dispatch => {
  // tell me what to do auth0
};

export const updatePassword = (oldPassword, newPassword, toggleEditPasswordForm) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { oldPassword, newPassword };
  dispatch({ type: PASSWORD_UPDATE_LOADING });
  return axios
    .put(`${ backendUrl }/users/password/${ user_id }`, body, headers)
    .then(() => dispatch({ type: PASSWORD_UPDATE_SUCCESS }))
    .then(() => toggleEditPasswordForm())
    .catch(err => handleError(err, PASSWORD_UPDATE_FAILURE)(dispatch));
};

export const signout = () => dispatch => {
  localStorage.removeItem('symposium_token');
  localStorage.removeItem('symposium_user_id');
  localStorage.removeItem('symposium_auth0_access_token');
  localStorage.removeItem('symposium_auth0_expires_at');
  dispatch({ type: USER_SIGNOUT_SUCCESS });
  return Promise.resolve();
};

export const displayError = errMsg => dispatch => {
	dispatch({
		type: DISPLAY_ERROR,
		payload: errMsg,
	});
	return Promise.resolve();
};
