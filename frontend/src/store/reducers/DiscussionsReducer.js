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

  FOLLOW_DISCUSSION_LOADING,
  FOLLOW_DISCUSSION_FAILURE,
  FOLLOW_CATEGORY_LOADING,
  FOLLOW_CATEGORY_FAILURE,

  ADD_DISCUSSION_LOADING, 
  ADD_DISCUSSION_SUCCESS, 
  ADD_DISCUSSION_FAILURE,

  EDIT_DISCUSSION_LOADING,
  EDIT_DISCUSSION_SUCCESS,
  EDIT_DISCUSSION_FAILURE,

  REMOVE_DISCUSSION_LOADING,
  REMOVE_DISCUSSION_SUCCESS,
  REMOVE_DISCUSSION_FAILURE,
} from '../actions/index.js';

const initialState = {
  topDiscussions: [],
  discussion: {
    posts: []
  },
  discussions: [],
  follows: {
    discussionId: []
  }
};

export const DiscussionsReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_DISCUSSION_BY_ID_SUCCESS:
      return {
        ...state,
        discussion: action.payload
      };

      case TOP_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        topDiscussions: action.payload
      };

      case GET_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        discussions: action.payload
      };

    case REMOVE_DISCUSSION_LOADING:
    case REMOVE_DISCUSSION_SUCCESS:
    case REMOVE_DISCUSSION_FAILURE:
    case EDIT_DISCUSSION_LOADING:
    case EDIT_DISCUSSION_SUCCESS:
    case EDIT_DISCUSSION_FAILURE:
    case ADD_DISCUSSION_LOADING: 
    case ADD_DISCUSSION_SUCCESS: 
    case ADD_DISCUSSION_FAILURE:
    case GET_DISCUSSION_BY_ID_LOADING:
    case GET_DISCUSSION_BY_ID_FAILURE:
    case TOP_DISCUSSIONS_LOADING:
    case TOP_DISCUSSIONS_FAILURE:
    case FOLLOW_DISCUSSION_LOADING:
    case FOLLOW_DISCUSSION_FAILURE:
    case FOLLOW_CATEGORY_LOADING:
    case FOLLOW_CATEGORY_FAILURE:
    case GET_DISCUSSIONS_LOADING:
    case GET_DISCUSSIONS_FAILURE:
    default:
      return state;
  }
};
