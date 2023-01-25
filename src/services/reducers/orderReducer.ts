import {
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER,
} from "../action-types/burger-constructor-types";

import { ActionOrder } from "../actions/burgerConstructor";

export interface ICreatedOrder {
  number: number;
}

type TOrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  createdOrder: null | ICreatedOrder;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  createdOrder: null,
};

export const orderReducer = (
  state = initialState,
  action: ActionOrder
): TOrderState => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        createdOrder: action.createdOrder,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        createdOrder: null,
      };
    }
    default: {
      return state;
    }
  }
};
