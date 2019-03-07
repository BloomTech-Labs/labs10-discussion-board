import {
    ADD_REPLY_LOADING,
	ADD_REPLY_SUCCESS,
	ADD_REPLY_FAILURE,
} from '../actions/index.js';

export const RepliesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_REPLY_LOADING:
        case ADD_REPLY_SUCCESS:
        case ADD_REPLY_FAILURE:
        default:
        return state;
    }
}