import axios	from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const TOP_DISCUSSIONS_LOADING = 'TOP_DISCUSSIONS_LOADING';
export const TOP_DISCUSSIONS_SUCCESS = 'TOP_DISCUSSIONS_SUCCESS';
export const TOP_DISCUSSIONS_FAILURE = 'TOP_DISCUSSIONS_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const getTopDiscussions = () => dispatch => {
	dispatch({ type: TOP_DISCUSSIONS_LOADING });
	return axios.get(`${ backendURL }/discussions/top-daily`)
		.then(res => dispatch({ type: TOP_DISCUSSIONS_SUCCESS, payload: res.data }))
		.catch(err => console.log(err));
};
