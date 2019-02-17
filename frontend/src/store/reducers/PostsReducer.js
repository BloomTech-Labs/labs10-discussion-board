import {
	ADD_POST_LOADING,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
} from '../actions/index.js';

export const PostsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_POST_LOADING:
		case ADD_POST_SUCCESS:
		case ADD_POST_FAILURE:
		default:
		return state;
	}
};
