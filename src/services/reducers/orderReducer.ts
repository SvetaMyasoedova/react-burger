// import {
//   GET_ORDER,
//   GET_ORDER_SUCCESS,
//   GET_ORDER_FAILED,
//   CLEAR_ORDER

// } from "../actions/burgerConstructor";


import { ActionOrderType, ActionOrder } from "../actions/burgerConstructor";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  createdOrder: null,
};


export const orderReducer = (state = initialState, action: ActionOrder) => {
  switch (action.type) {
    case ActionOrderType.GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case ActionOrderType.GET_ORDER_SUCCESS: {
      return {
        ...state,
        createdOrder: action.createdOrder,
        orderRequest: false,
      };
    }
    case ActionOrderType.GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case ActionOrderType.CLEAR_ORDER: {
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
