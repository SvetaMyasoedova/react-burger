import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CURRENT_ORDER,
} from "../actions/wsActionTypes";
import { TWSActions } from "../actions/wsActionTypes";

type TWSState = {
  wsConnected: boolean;
  orders: [];
  currentOrder: any | null;
  total: number;
  totalToday: number;
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  currentOrder: null,
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload.currentOrder,
      };
    default:
      return state;
  }
};
