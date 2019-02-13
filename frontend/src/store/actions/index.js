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
	TOP_POSTS_LOADING,
	TOP_POSTS_SUCCESS,
	TOP_POSTS_FAILURE,
	// Action Creators
	getTopPosts,
} from './PostsActions.js';

export {
	// Users Actions
	USER_LOGIN_LOADING,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,

	// Posts Actions
	TOP_POSTS_LOADING,
	TOP_POSTS_SUCCESS,
	TOP_POSTS_FAILURE,

	// Users Action Creators
	register,
	login,
	logout,

	// Posts Action Creators
	getTopPosts,
};
