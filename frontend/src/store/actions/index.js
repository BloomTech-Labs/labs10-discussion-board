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
  TOP_POSTS_LOADING,
  TOP_POSTS_SUCCESS,
  TOP_POSTS_FAILURE,
  // Action Creators
  getTopPosts
} from './PostsActions.js';

import {
  // Actions
  GET_PROFILES_LOADING,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAILURE,
  // Action Creators
  getProfiles
} from './ProfileActions.js';

import {
  // Actions
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SIGNOUT_SUCCESS,
  // Action Creators
  register,
  login,
  signout
} from './UsersActions.js';

export {
  //Categories Actions
  GET_CATEGORIES_LOADING,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  // Discussion Actions
  TOP_DISCUSSIONS_LOADING,
  TOP_DISCUSSIONS_SUCCESS,
  TOP_DISCUSSIONS_FAILURE,
  // Users Actions
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SIGNOUT_SUCCESS,
  // Profile Actions
  GET_PROFILES_LOADING,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAILURE,
  // Posts Actions
  TOP_POSTS_LOADING,
  TOP_POSTS_SUCCESS,
  TOP_POSTS_FAILURE,
  // Categories Action Creators
  getCategories,
  // Discussion Action Creators
  getTopDiscussions,
  // Users Action Creators
  register,
  login,
  signout,
  // Profile Action Creators
  getProfiles,
  // Posts Action Creators
  getTopPosts
};
