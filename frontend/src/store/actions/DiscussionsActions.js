import axios	from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const TOP_DISCUSSIONS_LOADING = 'TOP_DISCUSSIONS_LOADING';
export const TOP_DISCUSSIONS_SUCCESS = 'TOP_DISCUSSIONS_SUCCESS';
export const TOP_DISCUSSIONS_FAILURE = 'TOP_DISCUSSIONS_FAILURE';

export const GET_DISCUSSIONS_LOADING = 'GET_DISCUSSIONS_LOADING';
export const GET_DISCUSSIONS_SUCCESS = 'GET_DISCUSSIONS_SUCCESS';
export const GET_DISCUSSIONS_FAILURE = 'GET_DISCUSSIONS_FAILURE';

export const GET_DISCUSSION_BY_ID_LOADING = 'GET_DISCUSSION_BY_ID_LOADING';
export const GET_DISCUSSION_BY_ID_SUCCESS = 'GET_DISCUSSION_BY_ID_SUCCESS';
export const GET_DISCUSSION_BY_ID_FAILURE = 'GET_DISCUSSION_BY_ID_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const getTopDiscussions = () => dispatch => {
	dispatch({ type: TOP_DISCUSSIONS_LOADING });
	return axios.get(`${backendURL }/discussions/top-daily`)
		.then(res => dispatch({ type: TOP_DISCUSSIONS_SUCCESS, payload: res.data }))
		.catch(err => handleError(err, TOP_DISCUSSIONS_FAILURE)(dispatch));
};

export const getDiscussionById = id => dispatch => {
	dispatch({ type: GET_DISCUSSION_BY_ID_LOADING });
	return axios.get(`${ backendURL }/discussions/discussion/${ id }`)
		.then(res => dispatch({ type: GET_DISCUSSION_BY_ID_SUCCESS, payload: res.data[0] }))
		.catch(err => handleError(err, GET_DISCUSSION_BY_ID_FAILURE)(dispatch));
};

export const getDiscussionsByCat = (id) => dispatch => {
	dispatch({ type: GET_DISCUSSIONS_LOADING });
	return axios.get(`${backendURL}/discussions/category/${id}`)
		.then(res => dispatch({ type: GET_DISCUSSIONS_SUCCESS, payload: res.data }))
		.catch(err => console.log(err));
};
