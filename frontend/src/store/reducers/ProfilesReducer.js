import {
    GET_PROFILES_SUCCESS,
    GET_PROFILES_LOADING,
    GET_PROFILES_FAILURE,
  } from '../actions/index';
  
const initialState = {
    profiles: [],
    loading: false
};

  
export const ProfilesReducer = (state = initialState, action) =>{
  switch (action.type) {
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case GET_PROFILES_LOADING:
		case GET_PROFILES_FAILURE:
		default:
		return state;
  }
}