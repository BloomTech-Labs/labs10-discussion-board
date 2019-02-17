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

/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/
export const getProfiles = () => dispatch => {
    dispatch({ type: GET_PROFILES_LOADING});
    return axios.get(`${ backendUrl }/users`)
      .then(res => {
      dispatch({ type: GET_PROFILES_SUCCESS, payload: res.data }) }
      )
      .catch(err => dispatch({ type: GET_PROFILES_FAILURE, payload: err }));
};

export const getProfile = id => dispatch => {
  dispatch({ type: GET_PROFILE_LOADING });
  return axios.get(`${backendUrl}/users/${id}`)
    .then(res => {
      console.log('res', res.data)
      dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PROFILE_FAILURE, payload: err }));
};