import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const GET_PROFILES_LOADING = 'GET_PROFILES_LOADING';
export const GET_PROFILES_SUCCESS = 'GET_PROFILES_SUCCESS';
export const GET_PROFILES_FAILURE = 'GET_PROFILES_FAILURE';

export const getProfiles = () => dispatch => {
    dispatch({ type: GET_PROFILES_LOADING});
    return axios.get(`${ backendURL }/users`)
      .then(res => {
      dispatch({ type: GET_PROFILES_SUCCESS, payload: res.data }) }
      )
      .catch(err => dispatch({ type: GET_PROFILES_FAILURE, payload: err }));
};

