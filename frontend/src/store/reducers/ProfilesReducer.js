import {
    GET_PROFILES_SUCCESS,
    GET_PROFILES_LOADING,
    GET_PROFILES_FAILURE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_LOADING,
    GET_PROFILE_FAILURE,
  } from '../actions/index';
  
const initialState = {
    profiles: {
      loading: true,
      profiles: [],
    },
    singleProfileData: [],
};

export const ProfilesReducer = (state = initialState, action) =>{
  switch (action.type) {
    // Get all profiles
    case GET_PROFILES_SUCCESS:
        return {
        ...state,
        profiles: {
          loading: false,
          profiles: action.payload
        }
      };
    // Get single profile  
    case GET_PROFILE_SUCCESS:
        return {
        ...state,
        singleProfileData: action.payload
      };
    case GET_PROFILES_LOADING:
      return state;
    case GET_PROFILES_FAILURE:
      return state;
    case GET_PROFILE_LOADING:
      return state;
    case GET_PROFILE_FAILURE:
      return state;
		default:
      return state;
  } 
}