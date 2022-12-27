import { GET_REGISTER, GET_REGISTER_FAILED, GET_REGISTER_SUCCESS } from "../actions/register";

import { ActionRegister } from "../actions/register";

const initialState = {
	registerRequest: false,
	registerFailed: false,
	email: "",
	name: "",
 };

 export const registerReducer = (state = initialState, action: ActionRegister) => {
	switch (action.type) {
	  case GET_REGISTER: {
		 return {
			...state,
			registerRequest: true,
			registerFailed: false,
		 };
	  }
	  case GET_REGISTER_SUCCESS: {
		 return {
			...state,
			email: action.email,
			name: action.name,
			registerRequest: false,
		 };
	  }
	  case GET_REGISTER_FAILED: {
		 return {
			...state,
			registerFailed: true,
			registerRequest: false,
		 };
	  }
	  default: {
		 return state;
	  }
	}
 };


