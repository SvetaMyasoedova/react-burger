import {
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions/profile";
import {
  EDIT_USER,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESS,
} from "../actions/editProfile";

import { GET_LOGIN,  GET_LOGIN_SUCCESS, GET_LOGIN_FAILED} from "../actions/login";

const initialState = {
  userRequest: false,
  userFailed: false,
  email: "",
  name: "",
  isUserLoaded: false,
  loginRequest: false,
	loginFailed: false,
	isLogin: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        email: action.email,
        name: action.name,
        isUserLoaded: true,
        userRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        email: "",
        name: "",
        isUserLoaded: false,
        isLogin: false
      };
    }
    case EDIT_USER: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    }
    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        email: action.email,
        name: action.name,
        dataRequest: false,
      };
    }
    case EDIT_USER_FAILED: {
      return {
        ...state,
        dataFailed: true,
        dataRequest: false,
      };
    }
    case GET_LOGIN: {
      return {
       ...state,
       loginRequest: true,
       loginFailed: false,
      };
     }
     case GET_LOGIN_SUCCESS: {
      return {
       ...state,
       email: action.email,
       name: action.name,
       isLogin: true,
       loginRequest: false,
      };
     }
     case GET_LOGIN_FAILED: {
      return {
       ...state,
       loginFailed: true,
       loginRequest: false,
      };
     }
    default: {
      return state;
    }
  }
};
