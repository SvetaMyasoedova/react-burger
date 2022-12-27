// import {
//   GET_USER,
//   GET_USER_FAILED,
//   GET_USER_SUCCESS,
//   LOGOUT_SUCCESS,
// } from "../actions/profile";
import {
  EDIT_USER,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESS,
} from "../actions/editProfile";

import {
  GET_LOGIN,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
} from "../actions/login";

// import { GET_REGISTER, GET_REGISTER_FAILED, GET_REGISTER_SUCCESS } from "../actions/register";

import { ActionUser, ActionUserType } from "../actions/profile";
import { ActionRegister, ActionRegisterType } from "./../actions/register";
import { ActionLogin } from "../actions/login";
import { ActionEdit } from "./../actions/editProfile";
import { ActionLogout, ActionLogoutType } from "./../actions/profile";

const initialState = {
  registerRequest: false,
  registerFailed: false,
  userRequest: false,
  userFailed: false,
  email: "",
  name: "",
  isUserLoaded: false,
  loginRequest: false,
  loginFailed: false,
  isLogin: false,
};

type Action =
  | ActionUser
  | ActionRegister
  | ActionLogin
  | ActionEdit
  | ActionLogout;

export const profileReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionRegisterType.GET_REGISTER: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case ActionRegisterType.GET_REGISTER_SUCCESS: {
      return {
        ...state,
        email: action.email,
        name: action.name,
        registerRequest: false,
      };
    }
    case ActionRegisterType.GET_REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      };
    }
    case ActionUserType.GET_USER: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    }
    case ActionUserType.GET_USER_SUCCESS: {
      return {
        ...state,
        email: action.email,
        name: action.name,
        isUserLoaded: true,
        userRequest: false,
        isLogin: true,
      };
    }
    case ActionUserType.GET_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
        isUserLoaded: true,
      };
    }
    case ActionLogoutType.LOGOUT_SUCCESS: {
      return {
        ...state,
        email: "",
        name: "",
        isUserLoaded: false,
        isLogin: false,
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
