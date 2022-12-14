import { INGREDIENTS_URL } from "../../utils/urls";
import { checkReponse } from "../../utils/refreshToken";
import { Dispatch } from "redux";
// export const GET_INGREDIENTS = "GET_INGREDIENTS";
// export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
// export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const CURRENT_INGREDIENT: "CURRENT_INGREDIENT" = "CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT: "CLEAR_CURRENT_INGREDIENT" =
  "CLEAR_CURRENT_INGREDIENT";

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
