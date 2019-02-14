import {
    GET_PROFILES_SUCCESS,
    GET_PROFILES_LOADING,
    GET_PROFILES_FAILURE,
  } from '../actions/index';
  
const initialState = {
    profiles: {
      loading: true,
      profiles: []
    },
};

  
export const ProfilesReducer = (state = initialState, action) =>{
  switch (action.type) {
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: {
          loading: false,
          profiles: action.payload
        }
      };

    case GET_PROFILES_LOADING:
		case GET_PROFILES_FAILURE:
		default:
		return state;
  }
}