import axios from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const HANDLE_POST_VOTE_LOADING = 'HANDLE_POST_VOTE_LOADING';
export const HANDLE_POST_VOTE_SUCCESS = 'HANDLE_POST_VOTE_SUCCESS';
export const HANDLE_POST_VOTE_FAILURE = 'HANDLE_POST_VOTE_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const handlePostVote = (post_id, user_id, type, historyPush, discussion_id) => dispatch => {
	dispatch({ type: HANDLE_POST_VOTE_LOADING });
    const body = { post_id, user_id, type };
    //Sends the post request back to postVotesRouter.js
	return axios.post(`${ backendURL }/post-votes/`, body)
		.then(() => dispatch({ type: HANDLE_POST_VOTE_SUCCESS }))
		.then(() => historyPush('/'))
		.then(() => historyPush(`/discussion/${discussion_id}`))
		.catch(err => handleError(err, HANDLE_POST_VOTE_FAILURE)(dispatch));
};
