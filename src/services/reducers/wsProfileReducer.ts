import {
  TWSProfileActions,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_GET_MESSAGE,
  WS_PROFILE_CURRENT_ORDER,
} from "./../actions/wsProfileActionTypes";

type TWSProfileState = {
  wsConnected: boolean;
  orders: [];
  currentOrder: any | null;
  error?: Event;
};

const initialState: TWSProfileState = {
  wsConnected: false,
  orders: [],
  currentOrder: null,
};

export const wsProfileReducer = (state = initialState, action: TWSProfileActions) => {
  switch (action.type) {
    case WS_PROFILE_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_PROFILE_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_PROFILE_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_PROFILE_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
      };
    case WS_PROFILE_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload.currentOrder,
      };
    default:
      return state;
  }
};
