import {
  CONSTRUCTOR_BUN,
  CONSTRUCTOR_MAIN,
  DELETE_CONSTRUCTOR_INGREDIENT,
  SORTABLE_INGREDIENT,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from "../actions/burgerConstructor";

import { orderUrl } from "../../utils/urls";

const initialState = {
  constructorBun: null,
  constructorIngredients: [],

  orderRequest: false,
  orderFailed: false,
  createdOrder: {},
};

export function getOrder() {
  return function (dispatch, getState) {
    dispatch({
      type: GET_ORDER,
    });
    const orderIds =
      getState().constructorMainReducer.constructorIngredients.map(
        (item) => item._id
      );
    orderIds.unshift(getState().constructorBunReducer.constructorBun._id);
    orderIds.push(getState().constructorBunReducer.constructorBun._id);
    console.log(orderIds);

    fetch(orderUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: orderIds,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            createdOrder: res.order,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

export const orderReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};

export const constructorBunReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_BUN: {
      return {
        ...state,
        constructorBun: action.constructorBun,
      };
    }

    default: {
      return state;
    }
  }
};
export const constructorMainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_MAIN: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.constructorIngredient,
        ],
      };
    }

    case DELETE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter((item) => {
          return item.uuid !== action.uuid;
        }),
      };
    }

    case SORTABLE_INGREDIENT: {
      const ingredients = [...state.constructorIngredients];

      ingredients.splice(
        action.hoverIndex,
        0,
        ingredients.splice(action.dragIndex, 1)[0]
      );

      return {
        ...state,
        constructorIngredients: ingredients,
      };
    }

    default: {
      return state;
    }
  }
};
