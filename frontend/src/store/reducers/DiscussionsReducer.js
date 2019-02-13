import {
	TOP_DISCUSSIONS_LOADING,
	TOP_DISCUSSIONS_SUCCESS,
	TOP_DISCUSSIONS_FAILURE,
} from '../actions/index.js';

const initialState = {
	topDiscussions: [],
};

export const DiscussionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOP_DISCUSSIONS_SUCCESS:
			return {
				...state,
				topDiscussions: action.payload,
			};

		case TOP_DISCUSSIONS_LOADING:
		case TOP_DISCUSSIONS_FAILURE:
		default:
		return state;
	}
};
