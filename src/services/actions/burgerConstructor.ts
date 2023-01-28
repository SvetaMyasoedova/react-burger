import { ORDER_URL } from "../../utils/urls";
import { checkReponse } from "../../utils/refreshToken";
import { Dispatch } from "redux";
import { TIngredient } from "../types/data";
import { ICreatedOrder } from "../reducers/orderReducer";
import {
  CONSTRUCTOR_BUN,
  CONSTRUCTOR_MAIN,
  DELETE_CONSTRUCTOR_INGREDIENT,
  SORTABLE_INGREDIENT,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  CLEAR_ORDER,
  CLEAR_CONSTRUCTOR,
} from "../action-types/burger-constructor-types";

interface actionConstructorBun {
  readonly type: typeof CONSTRUCTOR_BUN;
  constructorBun: null | TIngredient;
}

interface actionConstructorMain {
  readonly type: typeof CONSTRUCTOR_MAIN;
  constructorIngredient: TIngredient;
}
interface actionDeleteElement {
  uuid: string;
  id: string;
  readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
}

interface actionSortableIngredient {
  hoverIndex: number;
  dragIndex: number;
  readonly type: typeof SORTABLE_INGREDIENT;
}

interface actionClear {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

interface actionOrderPending {
  readonly type: typeof GET_ORDER;
}
interface actionOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  createdOrder: null | ICreatedOrder;
}
interface actionOrderFail {
  readonly type: typeof GET_ORDER_FAILED;
}
interface IClearOrder {
  readonly type: typeof CLEAR_ORDER;
}

export type ActionOrder =
  | actionOrderPending
  | actionOrderSuccess
  | actionOrderFail
  | IClearOrder;

export type ActionIngredient =
  | actionConstructorBun
  | actionConstructorMain
  | actionDeleteElement
  | actionSortableIngredient
  | actionClear;

export function getOrder(): any {
  return function (dispatch: Dispatch<ActionOrder>, getState: any) {
    dispatch({
      type: GET_ORDER,
    });
    const orderIds = getState().constructorReducer.constructorIngredients.map(
      (item: TIngredient) => item._id
    );
    orderIds.unshift(getState().constructorReducer.constructorBun._id);
    orderIds.push(getState().constructorReducer.constructorBun._id);

   return fetch(ORDER_URL, {
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
