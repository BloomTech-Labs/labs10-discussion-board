import {
  // Actions
  GET_CATEGORIES_LOADING,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  // Action Creators
  getCategories
} from './CategoriesActions.js';

import {
	// Actions
		//TOP DISCUSSIONS
 	 	TOP_DISCUSSIONS_LOADING,
  		TOP_DISCUSSIONS_SUCCESS,
		TOP_DISCUSSIONS_FAILURE,
	
		//GET DISCUSSIONS
		GET_DISCUSSIONS_LOADING,
		GET_DISCUSSIONS_SUCCESS,
		GET_DISCUSSIONS_FAILURE,

		GET_DISCUSSION_BY_ID_LOADING,
		GET_DISCUSSION_BY_ID_SUCCESS,
		GET_DISCUSSION_BY_ID_FAILURE,

  // Action Creators
		getTopDiscussions,
		getDiscussionsByCat,
		getDiscussionById,
} from './DiscussionsActions.js';

import {
	// Actions
	HANDLE_DISCUSSION_VOTE_LOADING,
	HANDLE_DISCUSSION_VOTE_SUCCESS,
	HANDLE_DISCUSSION_VOTE_FAILURE,
	// Action Creators
	handleDiscussionVote,
} from './DiscussionVotesActions';

import {
	// Actions
	ADD_POST_LOADING,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,

	EDIT_POST_LOADING,
	EDIT_POST_SUCCESS,
	EDIT_POST_FAILURE,

	REMOVE_POST_LOADING,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,

	// Action Creators
	addPost,
	editPost,
	removePost,
} from './PostsActions.js';

import {
  // Actions
  GET_PROFILES_LOADING,
  GET_PROFILES_SUCCESS,
	GET_PROFILES_FAILURE,
	
	GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
	GET_PROFILE_FAILURE,
	
  // Action Creators
	getProfiles,
	getProfile,
} from './ProfilesActions.js';

import {
	// Actions
	USER_LOGIN_LOADING,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,

	USER_LOG_BACK_IN_LOADING,
	USER_LOG_BACK_IN_SUCCESS,
	USER_LOG_BACK_IN_FAILURE,

	USER_SIGNOUT_SUCCESS,

	USER_AUTH0_LOGIN_LOADING,
	USER_AUTH0_LOGIN_SUCCESS,
	USER_AUTH0_LOGIN_FAILURE,

	PASSWORD_UPDATE_LOADING,
	PASSWORD_UPDATE_SUCCESS,
	PASSWORD_UPDATE_FAILURE,

	DISPLAY_ERROR,
	DISPLAY_MESSAGE,

	// Action Creators
	register,
	login,
	signout,
	logBackIn,
	auth0Login,
	updatePassword,
	displayError,
	displayMessage,
} from './UsersActions.js';


//*************************************************************************************************
//*************************************************************************************************
//*************************************************************************************************
//*************************************************************************************************
//*************************************************************************************************


export {
	//Categories Actions
	GET_CATEGORIES_LOADING,
	GET_CATEGORIES_SUCCESS,
	GET_CATEGORIES_FAILURE,

	// Discussion Actions
	GET_DISCUSSIONS_LOADING,
	GET_DISCUSSIONS_SUCCESS,
	GET_DISCUSSIONS_FAILURE,

	TOP_DISCUSSIONS_LOADING,
	TOP_DISCUSSIONS_SUCCESS,
	TOP_DISCUSSIONS_FAILURE,

	GET_DISCUSSION_BY_ID_LOADING,
	GET_DISCUSSION_BY_ID_SUCCESS,
	GET_DISCUSSION_BY_ID_FAILURE,

	// Discussion Vote Actions
	HANDLE_DISCUSSION_VOTE_LOADING,
	HANDLE_DISCUSSION_VOTE_SUCCESS,
	HANDLE_DISCUSSION_VOTE_FAILURE,

	// Users Actions
	USER_LOGIN_LOADING,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	
	USER_LOG_BACK_IN_LOADING,
	USER_LOG_BACK_IN_SUCCESS,
	USER_LOG_BACK_IN_FAILURE,

	USER_SIGNOUT_SUCCESS,

	USER_AUTH0_LOGIN_LOADING,
	USER_AUTH0_LOGIN_SUCCESS,
	USER_AUTH0_LOGIN_FAILURE,

	PASSWORD_UPDATE_LOADING,
	PASSWORD_UPDATE_SUCCESS,
	PASSWORD_UPDATE_FAILURE,

	DISPLAY_ERROR,
	DISPLAY_MESSAGE,

	// Profile Actions
	GET_PROFILES_LOADING,
	GET_PROFILES_SUCCESS,
	GET_PROFILES_FAILURE,

	GET_PROFILE_LOADING,
	GET_PROFILE_SUCCESS,
	GET_PROFILE_FAILURE,

	// Posts Actions
	ADD_POST_LOADING,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,

	EDIT_POST_LOADING,
	EDIT_POST_SUCCESS,
	EDIT_POST_FAILURE,

	REMOVE_POST_LOADING,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,

	// Categories Action Creators
	getCategories,

	// Discussion Action Creators
	getTopDiscussions,
	getDiscussionsByCat,
	getDiscussionById,

	// Discussion Vote Action Creators
	handleDiscussionVote,

	// Users Action Creators
	register,
	login,
	signout,
	logBackIn,
	auth0Login,
	updatePassword,
	displayError,
	displayMessage,

	// Profile Action Creators
	getProfiles,
	getProfile,

	// Posts Action Creators
	addPost,
	editPost,
	removePost,
};
