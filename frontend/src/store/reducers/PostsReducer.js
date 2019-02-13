import {
	TOP_POSTS_LOADING,
	TOP_POSTS_SUCCESS,
	TOP_POSTS_FAILURE,
} from '../actions/index.js';

const initialState = {
	topPosts: [],
};

export const PostsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOP_POSTS_SUCCESS:
			return {
				...state,
				topPosts: action.payload,
			};

		case TOP_POSTS_LOADING:
		case TOP_POSTS_FAILURE:
		default:
		return state;
	}
};
