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
  TOP_DISCUSSIONS_LOADING,
  TOP_DISCUSSIONS_SUCCESS,
  TOP_DISCUSSIONS_FAILURE,
  // Action Creators
  getTopDiscussions
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
	TOP_POSTS_LOADING,
	TOP_POSTS_SUCCESS,
	TOP_POSTS_FAILURE,
	// Action Creators
	getTopPosts,
} from './PostsActions.js';

import {
  // Actions
  GET_PROFILES_LOADING,
  GET_PROFILES_SUCCESS,
	GET_PROFILES_FAILURE,
  // Action Creators
	getProfiles,
} from './ProfilesActions.js';

import {
  // Actions
	GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  // Action Creators
	getProfile,
} from './ProfileActions.js';

import {
  // Actions
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
	USER_SIGNOUT_SUCCESS,

	USER_AUTH0_LOGIN_LOADING,
	USER_AUTH0_LOGIN_SUCCESS,
	USER_AUTH0_LOGIN_FAILURE,

  // Action Creators
  register,
  login,
	signout,

	auth0Login,
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
	TOP_DISCUSSIONS_LOADING,
	TOP_DISCUSSIONS_SUCCESS,
	TOP_DISCUSSIONS_FAILURE,

	// Discussion Vote Actions
	HANDLE_DISCUSSION_VOTE_LOADING,
	HANDLE_DISCUSSION_VOTE_SUCCESS,
	HANDLE_DISCUSSION_VOTE_FAILURE,

	// Users Actions
	USER_LOGIN_LOADING,
	USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,

	USER_SIGNOUT_SUCCESS,

	USER_AUTH0_LOGIN_LOADING,
	USER_AUTH0_LOGIN_SUCCESS,
	USER_AUTH0_LOGIN_FAILURE,

	// Profile Actions
	GET_PROFILES_LOADING,
	GET_PROFILES_SUCCESS,
	GET_PROFILES_FAILURE,
	GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,


	// Posts Actions
	TOP_POSTS_LOADING,
	TOP_POSTS_SUCCESS,
	TOP_POSTS_FAILURE,

	// Categories Action Creators
	getCategories,

	// Discussion Action Creators
  getTopDiscussions,

	// Discussion Vote Action Creators
	handleDiscussionVote,

	// Users Action Creators
	register,
	login,
	signout,
	
	auth0Login,

	// Profile Action Creators
	getProfiles,
	getProfile,

	// Posts Action Creators
	getTopPosts,
};
