import axios from 'axios';
const { backendUrl, auth0Domain } = require('../../globals/globals.js');

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
// Login
export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

// Signout
export const USER_SIGNOUT_SUCCESS = 'USER_SIGNOUT_SUCCESS';

// Auth-0 Login
export const USER_AUTH0_LOGIN_LOADING = 'USER_AUTH0_LOGIN_LOADING';
export const USER_AUTH0_LOGIN_SUCCESS = 'USER_AUTH0_LOGIN_SUCCESS';
export const USER_AUTH0_LOGIN_FAILURE = 'USER_AUTH0_LOGIN_FAILURE';

/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/
export const login = creds => dispatch => {
  dispatch({ type: USER_LOGIN_LOADING });
  return axios
    .post(`${backendUrl}/auth/login`, creds)
    .then(response => {
      localStorage.setItem('jwt', response.data[0].token);
      localStorage.setItem('user_id', response.data[0].id);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.removeItem('isLoginClicked');
      dispatch({ type: USER_LOGIN_SUCCESS });
    })
    .catch(err => dispatch({ type: USER_LOGIN_FAILURE, payload: err }));
};

export const auth0Login = accessToken => dispatch => {
  const headers = { headers: { Authorization: `Bearer ${ accessToken }` } };
  dispatch({ type: USER_AUTH0_LOGIN_LOADING });
  return axios
    .get(`https://${ auth0Domain }/userinfo`, headers)
    .then(res => {
      const { email, name, picture } = res.data;
      const body = { email, name, picture };
      return axios
        .post(`${backendUrl}/auth/auth0-login`, body)
        .then(response => dispatch({ type: USER_AUTH0_LOGIN_SUCCESS, payload: response.data[0] }))
        .catch(err => dispatch({ type: USER_AUTH0_LOGIN_FAILURE, payload: err }));
    })
    .catch(err => console.log(err));
};

export const register = () => dispatch => {
  // tell me what to do auth0
};

export const signout = () => dispatch => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user_id');
  localStorage.removeItem('isLoggedIn');
  dispatch({ type: USER_SIGNOUT_SUCCESS });
  return Promise.resolve();
};
