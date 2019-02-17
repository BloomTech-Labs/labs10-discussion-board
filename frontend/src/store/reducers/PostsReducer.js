import {
	ADD_POST_LOADING,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,

	EDIT_POST_LOADING,
	EDIT_POST_SUCCESS,
	EDIT_POST_FAILURE,

	REMOVE_POST_LOADING,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
} from '../actions/index.js';

export const PostsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_POST_LOADING:
		case ADD_POST_SUCCESS:
		case ADD_POST_FAILURE:
		case EDIT_POST_LOADING:
		case EDIT_POST_SUCCESS:
		case EDIT_POST_FAILURE:
		case REMOVE_POST_LOADING:
		case REMOVE_POST_SUCCESS:
		case REMOVE_POST_FAILURE:
		default:
		return state;
	}
};
