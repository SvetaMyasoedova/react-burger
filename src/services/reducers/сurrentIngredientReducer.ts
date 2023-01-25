import { CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from "../action-types/burger-ingredients-types";
import { ActionCurrentIngredient } from "../actions/burgerIngredients";
import { TIngredient } from "../types/data";

type TCurrentIngredientState = {
  currentIngredient: null | TIngredient;
};

const initialState: TCurrentIngredientState = {
  currentIngredient: null,
};

export const сurrentIngredientReducer = (
  state = initialState,
  action: ActionCurrentIngredient
): TCurrentIngredientState => {
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
