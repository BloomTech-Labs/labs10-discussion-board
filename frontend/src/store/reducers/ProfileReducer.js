import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_LOADING,
    GET_PROFILE_FAILURE,
  } from '../actions/index';
  
const initialState = {
    profile: []
};

  
export const ProfileReducer = (state = initialState, action) =>{
  switch (action.type) {
      case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload
      }
    case GET_PROFILE_LOADING:
      return state;
    case GET_PROFILE_FAILURE:
      return state;
		default:
		return state;
  } 
}