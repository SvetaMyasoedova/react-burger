import { ActionIngredient } from "./../actions/burgerConstructor";
import {
  CONSTRUCTOR_BUN,
  CONSTRUCTOR_MAIN,
  DELETE_CONSTRUCTOR_INGREDIENT,
  SORTABLE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from "../actions/burgerConstructor";
import { TIngredient } from "../types/data";

const initialState = {
  constructorBun: null,
  constructorIngredients: [],
  ingredientsCount: null,
};

export const constructorReducer = (
  state = initialState,
  action: ActionIngredient
) => {
  switch (action.type) {
    case CONSTRUCTOR_BUN: {
      return {
        ...state,
        constructorBun: action.constructorBun,
      };
    }

    case CONSTRUCTOR_MAIN: {
      const newIngredientsCount: { [key: string]: number } = {
        ...(typeof state.ingredientsCount === "object"
          ? state.ingredientsCount
          : {}),
      };

      if (
        newIngredientsCount.hasOwnProperty(action.constructorIngredient._id)
      ) {
        newIngredientsCount[action.constructorIngredient._id] += 1;
      } else {
        newIngredientsCount[action.constructorIngredient._id] = 1;
      }

      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.constructorIngredient,
        ],
        ingredientsCount: newIngredientsCount,
      };
    }

    case DELETE_CONSTRUCTOR_INGREDIENT: {
      const newIngredientsCount: { [key: string]: number } = {
        ...(typeof state.ingredientsCount === "object"
          ? state.ingredientsCount
          : {}),
      };

      if (newIngredientsCount[action.id] === 1) {
        delete newIngredientsCount[action.id];
      } else {
        newIngredientsCount[action.id] -= 1;
      }

      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(
          (item: TIngredient) => {
            return item.uuid !== action.uuid;
          }
        ),
        ingredientsCount: newIngredientsCount,
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

    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorBun: null,
        constructorIngredients: [],
        ingredientsCount: null,
      };
    }
    default: {
      return state;
    }
  }
};
