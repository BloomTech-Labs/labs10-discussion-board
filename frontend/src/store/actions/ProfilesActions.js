import axios from 'axios';
import { backendUrl } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
// Get all profiles
export const GET_PROFILES_LOADING = 'GET_PROFILES_LOADING';
export const GET_PROFILES_SUCCESS = 'GET_PROFILES_SUCCESS';
export const GET_PROFILES_FAILURE = 'GET_PROFILES_FAILURE';

// Get single profile
export const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const GET_PROFILE_DISCUSSIONS_LOADING = 'GET_PROFILE_DISCUSSIONS_LOADING';
export const GET_PROFILE_DISCUSSIONS_SUCCESS = 'GET_PROFILE_DISCUSSIONS_SUCCESS';
export const GET_PROFILE_DISCUSSIONS_FAILURE = 'GET_PROFILE_DISCUSSIONS_FAILURE';

/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/

 // Get all profiles
 export const getProfiles = () => dispatch => {
    dispatch({ type: GET_PROFILES_LOADING});
    return axios.get(`${ backendUrl }/users`)
      .then(res => {
      dispatch({ type: GET_PROFILES_SUCCESS, payload: res.data }) }
      )
      .catch(err => dispatch({ type: GET_PROFILES_FAILURE, payload: err }));
};

// Get single profile
export const getProfile = user_id => dispatch => {
  dispatch({ type: GET_PROFILE_LOADING });
  return axios.get(`${backendUrl}/users/user/${user_id}`)
    .then(res => {
      dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PROFILE_FAILURE, payload: err }));
};

// Get all discussions by a user
export const getProfileDiscussions = user_id => dispatch => {
  dispatch({ type: GET_PROFILE_DISCUSSIONS_LOADING });
  return axios.get(`${backendUrl}/users/discussions/${user_id}`)
    .then(res => {
      dispatch({ type: GET_PROFILE_DISCUSSIONS_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PROFILE_DISCUSSIONS_FAILURE, payload: err }));
};

