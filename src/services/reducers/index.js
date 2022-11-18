import { combineReducers } from "redux";
import { dataReducer, сurrentIngredientReducer } from "./burgerIngredients";
import {
  orderReducer,
  constructorBunReducer,
  constructorMainReducer,
} from "./burgerConstructor";
export const rootReducer = combineReducers({
  dataReducer: dataReducer,
  сurrentIngredientReducer: сurrentIngredientReducer,
  orderReducer: orderReducer,
  constructorBunReducer: constructorBunReducer,
  constructorMainReducer: constructorMainReducer,
});
