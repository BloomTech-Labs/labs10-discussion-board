import axios from 'axios';

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

export const FOLLOW_DISCUSSION_LOADING = 'FOLLOW_DISCUSSION_LOADING';
export const FOLLOW_DISCUSSION_SUCCESS = 'FOLLOW_DISCUSSION_SUCCESS';
export const FOLLOW_DISCUSSION_FAILURE = 'FOLLOW_DISCUSSION_FAILURE';

export const ADD_DISCUSSION_LOADING = 'ADD_DISCUSSION_LOADING';
export const ADD_DISCUSSION_SUCCESS = 'ADD_DISCUSSION_SUCCESS';
export const ADD_DISCUSSION_FAILURE = 'ADD_DISCUSSION_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const getTopDiscussions = () => dispatch => {
  dispatch({ type: TOP_DISCUSSIONS_LOADING });
  return axios
    .get(`${backendURL}/discussions/top-daily`)
    .then(res => dispatch({ type: TOP_DISCUSSIONS_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, TOP_DISCUSSIONS_FAILURE)(dispatch));
};

export const getDiscussionById = id => dispatch => {
  dispatch({ type: GET_DISCUSSION_BY_ID_LOADING });
  return axios
    .get(`${backendURL}/discussions/discussion/${id}`)
    .then(res =>
      dispatch({ type: GET_DISCUSSION_BY_ID_SUCCESS, payload: res.data[0] })
    )
    .catch(err => handleError(err, GET_DISCUSSION_BY_ID_FAILURE)(dispatch));
};

export const getDiscussionsByCat = category_id => dispatch => {
  dispatch({ type: GET_DISCUSSIONS_LOADING });
  return axios
    .get(`${backendURL}/discussions/category/${category_id}`)
    .then(res => dispatch({ type: GET_DISCUSSIONS_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, GET_DISCUSSIONS_FAILURE)(dispatch));
};

export const followDiscussion = (
  discussion_id,
  user_id,
  followed,
  historyPush
) => dispatch => {
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { discussion_id, followed };
  dispatch({ type: FOLLOW_DISCUSSION_LOADING });
  return axios
    .post(
      `${backendURL}/discussion-follows/${user_id}/${discussion_id}`,
      body,
      headers
    )
    .then(res =>
      dispatch({ type: FOLLOW_DISCUSSION_SUCCESS, payload: res.data })
    )
    .then(() => historyPush('/'))
    .then(() => historyPush(`/discussion/${discussion_id}`))
    .catch(err => handleError(err, FOLLOW_DISCUSSION_FAILURE)(dispatch));
};

// add a discussion
export const addDiscussion = (category_id, title, dBody, historyPush) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
	const token = localStorage.getItem('symposium_token');
	const headers = { headers: { Authorization: token } };
	const body = { category_id, title, dBody };
	dispatch({ type: ADD_DISCUSSION_LOADING });
	return axios.post(`${ backendURL }/discussions/${user_id}`, body, headers)
		.then(() => dispatch({ type: ADD_DISCUSSION_SUCCESS }))
		.then(() => historyPush('/'))
		.then(() => historyPush(`/discussions/category/${ category_id }`))
		.catch(err => handleError(err, ADD_DISCUSSION_FAILURE)(dispatch));
};