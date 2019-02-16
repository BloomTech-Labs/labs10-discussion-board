import axios from 'axios';
import {backendUrl} from '../../globals/globals.js';


export const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const getProfile = id => dispatch => {
  dispatch({ type: GET_PROFILE_LOADING});
  return axios.get(`${ backendUrl}/users/${id}`)
    .then(res => {
    console.log('profile action', res.data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data }) }
    )
    .catch(err => dispatch({ type: GET_PROFILE_FAILURE, payload: err }));
};
