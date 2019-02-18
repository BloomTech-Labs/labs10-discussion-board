import axios	from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const HANDLE_DISCUSSION_VOTE_LOADING = 'HANDLE_DISCUSSION_VOTE_LOADING';
export const HANDLE_DISCUSSION_VOTE_SUCCESS = 'HANDLE_DISCUSSION_VOTE_SUCCESS';
export const HANDLE_DISCUSSION_VOTE_FAILURE = 'HANDLE_DISCUSSION_VOTE_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const handleDiscussionVote = (discussion_id, user_id, type) => dispatch => {
	dispatch({ type: HANDLE_DISCUSSION_VOTE_LOADING });
	const body = { discussion_id, user_id, type };
	return axios.post(`${ backendURL }/discussion-votes/`, body)
		.then(() => dispatch({ type: HANDLE_DISCUSSION_VOTE_SUCCESS }))
		.catch(err => handleError(err, HANDLE_DISCUSSION_VOTE_FAILURE)(dispatch));
};
