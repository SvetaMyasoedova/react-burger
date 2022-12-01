import { ORDER_URL } from "../../utils/urls";
import { checkReponse } from "../../utils/refreshToken";

export const CONSTRUCTOR_BUN = "CONSTRUCTOR_BUN";
export const CONSTRUCTOR_MAIN = "CONSTRUCTOR_MAIN";
export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";
export const SORTABLE_INGREDIENT = "SORTABLE_INGREDIENT";

export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const CLEAR_ORDER = "CLEAR_ORDER";

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export function getOrder() {
  return function (dispatch, getState) {
    dispatch({
      type: GET_ORDER,
    });
    const orderIds = getState().constructorReducer.constructorIngredients.map(
      (item) => item._id
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
