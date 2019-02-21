import axios from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const GET_CATEGORIES_LOADING = 'GET_CATEGORIES_LOADING';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

export const FOLLOW_CATEGORY_LOADING = 'FOLLOW_CATEGORY_LOADING';
export const FOLLOW_CATEGORY_SUCCESS = 'FOLLOW_CATEGORY_SUCCESS';
export const FOLLOW_CATEGORY_FAILURE = 'FOLLOW_CATEGORY_FAILURE';


/***************************************************************************************************
 ********************************************* Action Creators *************************************
 **************************************************************************************************/

export const getCategories = () => dispatch => {
  dispatch({ type: GET_CATEGORIES_LOADING });
  return axios.get(`${backendURL}/categories`)
    .then(res => dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, GET_CATEGORIES_FAILURE)(dispatch));
};

export const followCategory = (category_id, user_id, followed, historyPush) => dispatch => {
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { category_id, followed };
  dispatch({ type: FOLLOW_CATEGORY_LOADING });
  return axios.post(`${backendURL}/category-follows/${user_id}/${category_id}`, body, headers)
    .then((res) => dispatch({ type: FOLLOW_CATEGORY_SUCCESS, payload: res.data }))
    .then(() => historyPush('/'))
    .then(() => historyPush(`/discussions/category/${category_id}`))
    .catch(err => handleError(err, FOLLOW_CATEGORY_FAILURE)(dispatch));
};