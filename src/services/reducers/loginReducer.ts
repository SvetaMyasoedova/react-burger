import {
  GET_LOGIN,
  GET_LOGIN_FAILED,
  GET_LOGIN_SUCCESS,
} from "../actions/login";
import { ActionLogin } from "../actions/login";

type TLoginState = {
  loginRequest: boolean;
  loginFailed: boolean;
  email: string;
  name: string;
  isLogin: boolean;
} 

const initialState: TLoginState = {
  loginRequest: false,
  loginFailed: false,
  email: "",
  name: "",
  isLogin: false,
};

export const loginReducer = (state = initialState, action: ActionLogin): TLoginState => {
  switch (action.type) {
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
