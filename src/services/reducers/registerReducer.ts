import { GET_REGISTER,  GET_REGISTER_FAILED, GET_REGISTER_SUCCESS} from "../action-types/register-types";

import { ActionRegister } from "../actions/register";

type TRegisterState = {
  registerRequest: boolean;
  registerFailed: boolean;
  email: string;
  name: string;
};
export const initialState: TRegisterState = {
  registerRequest: false,
  registerFailed: false,
  email: "",
  name: "",
};

export const registerReducer = (
  state = initialState,
  action: ActionRegister
): TRegisterState => {
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
