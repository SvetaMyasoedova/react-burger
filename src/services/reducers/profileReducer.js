import { GET_USER, GET_USER_FAILED, GET_USER_SUCCESS } from "../actions/profile";
	
 
 const initialState = {
	dataRequest: false,
	dataFailed: false,
	email: "",
	name: "",

 };
 
 export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
	  case GET_USER: {
		 return {
			...state,
			dataRequest: true,
			dataFailed: false,
		 };
	  }
	  case GET_USER_SUCCESS: {
		 return {
			...state,
			email: action.email,
			name: action.name,
			dataRequest: false,
		 };
	  }
	  case GET_USER_FAILED: {
		 return {
			...state,
			dataFailed: true,
			dataRequest: false,
		 };
	  }
	  default: {
		 return state;
	  }
	}
 };
 