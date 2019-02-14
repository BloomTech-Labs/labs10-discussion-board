import {
	// Actions
	USER_LOGIN_LOADING,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	// Action Creators
	register,
	login,
	logout
} from './UsersActions.js';

import {
	// Actions
	TOP_DISCUSSIONS_LOADING,
	TOP_DISCUSSIONS_SUCCESS,
	TOP_DISCUSSIONS_FAILURE,
	// Action Creators
	getTopDiscussions,
} from './DiscussionsActions.js';

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
	getProfiles
} from './ProfileActions.js';

export {
	// Discussion Actions
	TOP_DISCUSSIONS_LOADING,
	TOP_DISCUSSIONS_SUCCESS,
	TOP_DISCUSSIONS_FAILURE,

	// Users Actions
	USER_LOGIN_LOADING,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,

	// Profile Actions
	GET_PROFILES_LOADING,
	GET_PROFILES_SUCCESS,
	GET_PROFILES_FAILURE,


	// Posts Actions
	TOP_POSTS_LOADING,
	TOP_POSTS_SUCCESS,
	TOP_POSTS_FAILURE,

	// Discussion Action Creators
	getTopDiscussions,

	// Users Action Creators
	register,
	login,
	logout,

	// Profile Action Creators
	getProfiles,

	// Posts Action Creators
	getTopPosts,
};
