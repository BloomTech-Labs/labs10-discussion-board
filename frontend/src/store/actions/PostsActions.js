import axios	from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const ADD_POST_LOADING = 'ADD_POST_LOADING';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const addPost = (user_id, discussion_id, postBody) => dispatch => {
	const token = localStorage.getItem('symposium_token');
	const headers = { headers: { Authorization: token } };
	const body = { discussion_id, postBody };
	dispatch({ type: ADD_POST_LOADING });
	return axios.post(`${ backendURL }/posts/${ user_id }`, body, headers)
		.then(() => dispatch({ type: ADD_POST_SUCCESS }))
		.catch(err => dispatch({ type: ADD_POST_FAILURE, payload: err }));
};
