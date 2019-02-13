import axios	from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const TOP_POSTS_LOADING = 'TOP_POSTS_LOADING';
export const TOP_POSTS_SUCCESS = 'TOP_POSTS_SUCCESS';
export const TOP_POSTS_FAILURE = 'TOP_POSTS_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const getTopPosts = () => dispatch => {
	dispatch({ type: TOP_POSTS_LOADING });
	return axios.get(`${ backendURL }/posts/top-daily`)
		.then(res => dispatch({ type: TOP_POSTS_SUCCESS, payload: res.data }))
		.catch(err => console.log(err));
};
