import { combineReducers } from "redux";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CONSTRUCTOR_BUN,
  CONSTRUCTOR_MAIN,
  CURRENT_INGREDIENT,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from "../actions/constants";
import { ingredienstsUrl, orderUrl } from "../../utils/urls";

const initialState = {
  dataRequest: false,
  dataFailed: false,
  data: [],
  constructorBun: null,
  constructorIngredients: [],
  currentIngredient: {},
  orderRequest: false,
  orderFailed: false,
  createdOrder: {},
};

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });

    fetch(ingredienstsUrl)
      .then((res) => res.json())
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

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        dataRequest: true,
        dataFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        dataRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
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

export const сurrentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };
    }
    default: {
      return state;
    }
  }
};

export function getOrder() {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER,
    });

    fetch(orderUrl, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ingredients: [
                  "60d3b41abdacab0026a733c6",
                  "60d3b41abdacab0026a733c7",
                ],
              }),
            })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res && res.success) {

          dispatch({
            type: GET_ORDER_SUCCESS,
            createdOrder: res.order.number,
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


export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        createdOrder: action.createdOrder,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const cunstructorBunReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_BUN: {
      return {
        ...state,
        constructorBun: action.constructorBun,
      };
    }
    
   
    default: {
      return state;
    }
  }
};
export const cunstructorMainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_MAIN: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.constructorIngredients]
        //constructorIngredients: action.constructorIngredients,
      };
    }
    
   
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  dataReducer: dataReducer,
  сurrentIngredientReducer: сurrentIngredientReducer,
  orderReducer: orderReducer,
  cunstructorBunReducer: cunstructorBunReducer,
  cunstructorMainReducer: cunstructorMainReducer,
});
