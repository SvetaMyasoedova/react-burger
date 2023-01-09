import { combineReducers } from "redux";
import { dataReducer } from "./dataReducer";
import { сurrentIngredientReducer } from "./сurrentIngredientReducer";
import { orderReducer } from "./orderReducer";
import { constructorReducer } from "./constructorReducer";
import { registerReducer } from "./registerReducer";
import { profileReducer } from "./profileReducer";
import { wsReducer } from "./wsReducer";
import { wsProfileReducer } from "./wsProfileReducer";

export const rootReducer = combineReducers({
  dataReducer: dataReducer,
  сurrentIngredientReducer: сurrentIngredientReducer,
  orderReducer: orderReducer,
  constructorReducer: constructorReducer,
  registerReducer: registerReducer,
  profileReducer: profileReducer,
  wsReducer: wsReducer,
  wsProfileReducer: wsProfileReducer,
});
