import { combineReducers } from "redux";
import { dataReducer, сurrentIngredientReducer } from "./burgerIngredients";
import { orderReducer, constructorReducer } from "./burgerConstructor";
export const rootReducer = combineReducers({
  dataReducer: dataReducer,
  сurrentIngredientReducer: сurrentIngredientReducer,
  orderReducer: orderReducer,
  constructorReducer: constructorReducer,
});
