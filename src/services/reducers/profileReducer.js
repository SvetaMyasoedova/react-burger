import {
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
} from "../actions/profile";
import {
  EDIT_USER,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESS,
} from "../actions/editProfile";

const initialState = {
  userRequest: false,
  userFailed: false,
  email: "",
  name: "",
  isUserLoaded: false,
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
    default: {
      return state;
    }
  }
};
