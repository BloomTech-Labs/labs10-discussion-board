import axios from 'axios';
import { backendUrl } from '../../globals/globals.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;


export const GET_PROFILES_LOADING = 'GET_PROFILE_LOADING';
export const GET_PROFILES_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILES_FAILURE = 'GET_PROFILE_FAILURE';
export const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';


export const getProfiles = () => dispatch => {
    dispatch({ type: GET_PROFILES_LOADING});
    return axios.get(`${ backendURL }/users`)
      .then(res => {
      dispatch({ type: GET_PROFILES_SUCCESS, payload: res.data }) }
      )
      .catch(err => dispatch({ type: GET_PROFILES_FAILURE, payload: err }));
};

export const getProfile = id => dispatch => {
  dispatch({ type: GET_PROFILE_LOADING });
  return axios
    .get(`${backendUrl}/users/${id}`)
    .then(res => {
      dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PROFILE_FAILURE, payload: err }));
};