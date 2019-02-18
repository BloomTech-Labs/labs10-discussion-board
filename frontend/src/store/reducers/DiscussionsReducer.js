import {
	TOP_DISCUSSIONS_LOADING,
	TOP_DISCUSSIONS_SUCCESS,
	TOP_DISCUSSIONS_FAILURE,

	GET_DISCUSSIONS_LOADING,
	GET_DISCUSSIONS_SUCCESS,
	GET_DISCUSSIONS_FAILURE,

	GET_DISCUSSION_BY_ID_LOADING,
	GET_DISCUSSION_BY_ID_SUCCESS,
	GET_DISCUSSION_BY_ID_FAILURE,
} from '../actions/index.js';

const initialState = {
	topDiscussions: [],
	discussion: {
		posts: [],
	},
	discussionsByCat: []
};

export const DiscussionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOP_DISCUSSIONS_SUCCESS:
			return {
				...state,
				topDiscussions: action.payload,
			};

		case GET_DISCUSSION_BY_ID_SUCCESS:
			return {
				...state,
				discussion: action.payload,
			};

		case GET_DISCUSSION_BY_ID_LOADING:
		case GET_DISCUSSION_BY_ID_FAILURE:
		case TOP_DISCUSSIONS_LOADING:
		case TOP_DISCUSSIONS_FAILURE:
		
		case GET_DISCUSSIONS_SUCCESS:
			return {
				...state,
				discussionsByCat: action.payload,
			};

		case GET_DISCUSSIONS_LOADING:
		case GET_DISCUSSIONS_FAILURE:
			default:
			return state;
	}
};
