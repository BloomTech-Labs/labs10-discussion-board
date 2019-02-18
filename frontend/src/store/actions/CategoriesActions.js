import axios from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const GET_CATEGORIES_LOADING = 'GET_CATEGORIES_LOADING';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';


/***************************************************************************************************
 ********************************************* Action Creators *************************************
 **************************************************************************************************/

export const getCategories = () => dispatch => {
    dispatch({ type: GET_CATEGORIES_LOADING });
    return axios.get(`${backendURL}/categories`)
        .then(res => dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data }))
        .catch(err => handleError(err, GET_CATEGORIES_FAILURE)(dispatch));
};
