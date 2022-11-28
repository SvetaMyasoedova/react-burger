import { combineReducers } from "redux";
import { dataReducer } from "./dataReducer";
import { сurrentIngredientReducer } from "./сurrentIngredientReducer";
import { orderReducer } from "./orderReducer";
import { constructorReducer } from "./constructorReducer";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { profileReducer } from "./profileReducer";

export const rootReducer = combineReducers({
  dataReducer: dataReducer,
  сurrentIngredientReducer: сurrentIngredientReducer,
  orderReducer: orderReducer,
  constructorReducer: constructorReducer,
  registerReducer: registerReducer,
  loginReducer: loginReducer, 
  profileReducer: profileReducer,
});
