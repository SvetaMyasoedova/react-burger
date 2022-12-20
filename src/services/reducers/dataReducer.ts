// import {
//   GET_INGREDIENTS,
//   GET_INGREDIENTS_FAILED,
//   GET_INGREDIENTS_SUCCESS,
// } from "../actions/burgerIngredients";
import { Action, ActionType  } from "../actions/burgerIngredients";

const initialState = {
  dataRequest: false,
  dataFailed: false,
  data: [],
};

export const dataReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_INGREDIENTS: {
      return {
        ...state,
        dataRequest: true,
        dataFailed: false,
      };
    }
    case ActionType.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        dataRequest: false,
      };
    }
    case ActionType.GET_INGREDIENTS_FAILED: {
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
