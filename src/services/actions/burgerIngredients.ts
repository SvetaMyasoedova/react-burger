import { INGREDIENTS_URL } from "../../utils/urls";
import { checkReponse } from "../../utils/refreshToken";
import { Dispatch } from "redux";
import { TIngredient } from "../types/data";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../action-types/burger-ingredients-types";
import { CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from "../action-types/сurrent-ingredient-types";


interface actionPending {
  readonly type: typeof GET_INGREDIENTS;
}

interface actionSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  data: TIngredient[];
}
interface actionFail {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
interface IActionCurrentIngredient {
  readonly type: typeof CURRENT_INGREDIENT;
  currentIngredient: TIngredient;
}
interface IActionClearCurrentIngredient {
  readonly type: typeof CLEAR_CURRENT_INGREDIENT;
}

export type ActionCurrentIngredient =
  | IActionCurrentIngredient
  | IActionClearCurrentIngredient;
export type Action = actionPending | actionSuccess | actionFail;

export function getIngredients(): any {
  return function (dispatch: Dispatch<Action>) {
    dispatch({
      type: GET_INGREDIENTS,
    });

    return fetch(INGREDIENTS_URL)
      .then(checkReponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
