import { ORDER_URL } from "../../utils/urls";
import { checkReponse } from "../../utils/refreshToken";
import { Dispatch } from "redux";
import { TIngredient } from "../types/data";

export const CONSTRUCTOR_BUN = "CONSTRUCTOR_BUN";
export const CONSTRUCTOR_MAIN = "CONSTRUCTOR_MAIN";
export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";
export const SORTABLE_INGREDIENT = "SORTABLE_INGREDIENT";

// export const GET_ORDER = "GET_ORDER";
// export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
// export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
// export const CLEAR_ORDER = "CLEAR_ORDER";

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export enum ActionOrderType {
  GET_ORDER = "GET_ORDER",
  GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS",
  GET_ORDER_FAILED = "GET_ORDER_FAILED",
  CLEAR_ORDER = "CLEAR_ORDER",
}

interface actionOrderPending {
  type: ActionOrderType.GET_ORDER;
}

interface actionOrderSuccess {
  type: ActionOrderType.GET_ORDER_SUCCESS;
  createdOrder: any;
}

interface actionOrderFail {
  type: ActionOrderType.GET_ORDER_FAILED;
}

interface IClearOrder {
  type: ActionOrderType.CLEAR_ORDER;
}

export type ActionOrder = actionOrderPending | actionOrderSuccess | actionOrderFail | IClearOrder;

export function getOrder(): any {
  return function (dispatch: Dispatch<ActionOrder>, getState: any) {
    dispatch({
      type: ActionOrderType.GET_ORDER,
    });
    const orderIds = getState().constructorReducer.constructorIngredients.map(
      (item: TIngredient) => item._id
    );
    orderIds.unshift(getState().constructorReducer.constructorBun._id);
    orderIds.push(getState().constructorReducer.constructorBun._id);

    fetch(ORDER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: orderIds,
      }),
    })
      .then(checkReponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ActionOrderType.GET_ORDER_SUCCESS,
            createdOrder: res.order,
          });
        } else {
          dispatch({
            type: ActionOrderType.GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ActionOrderType.GET_ORDER_FAILED,
        });
      });
  };
}
