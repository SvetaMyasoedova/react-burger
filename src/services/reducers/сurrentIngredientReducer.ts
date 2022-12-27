import {
  CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
} from "../actions/burgerIngredients";

import { ActionCurrentIngredient } from "../actions/burgerIngredients";

const initialState = {
  currentIngredient: null,
};

export const сurrentIngredientReducer = (state = initialState, action: ActionCurrentIngredient) => {
  switch (action.type) {
    case CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };
    }
    case CLEAR_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }

    default: {
      return state;
    }
  }
};
