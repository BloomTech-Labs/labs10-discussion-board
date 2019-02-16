import axios	from 'axios';

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

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const getTopDiscussions = () => dispatch => {
	dispatch({ type: TOP_DISCUSSIONS_LOADING });
	return axios.get(`${backendURL }/discussions/top-daily`)
		.then(res => dispatch({ type: TOP_DISCUSSIONS_SUCCESS, payload: res.data }))
		.catch(err => console.log(err));
};

export const getDiscussionsByCat = () => dispatch => {
	dispatch({ type: GET_DISCUSSIONS_LOADING });
	return axios.get(`${backendURL}/discussions/category/:category_id`)
		.then(res => dispatch({ type: GET_DISCUSSIONS_SUCCESS, payload: res.data }))
		.catch(err => console.log(err));
}
