import { INGREDIENTS_URL } from "../../utils/urls";
import { checkReponse } from "../../utils/refreshToken";
import { Dispatch } from "redux";

// export const CURRENT_INGREDIENT= "CURRENT_INGREDIENT";
// export const CLEAR_CURRENT_INGREDIENT=
//   "CLEAR_CURRENT_INGREDIENT";

export enum ActionCurrentIngredientType {
  CURRENT_INGREDIENT = "CURRENT_INGREDIENT",
  CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT",
}

export enum ActionType {
  GET_INGREDIENTS = "GET_INGREDIENTS",
  GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS",
  GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED",
}

interface actionPending {
  type: ActionType.GET_INGREDIENTS;
}

interface actionSuccess {
  type: ActionType.GET_INGREDIENTS_SUCCESS;
  data: any;
}

interface actionFail {
  type: ActionType.GET_INGREDIENTS_FAILED;
}

interface IActionCurrentIngredient {
  type: ActionCurrentIngredientType.CURRENT_INGREDIENT
  currentIngredient: any;
}
interface IActionClearCurrentIngredient {
  type: ActionCurrentIngredientType.CLEAR_CURRENT_INGREDIENT
}

export type ActionCurrentIngredient = IActionCurrentIngredient | IActionClearCurrentIngredient;


export type Action = actionPending | actionSuccess | actionFail;

export function getIngredients(): any {
  return function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionType.GET_INGREDIENTS,
    });

    fetch(INGREDIENTS_URL)
      .then(checkReponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ActionType.GET_INGREDIENTS_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: ActionType.GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ActionType.GET_INGREDIENTS_FAILED,
        });
      });
  };
}
