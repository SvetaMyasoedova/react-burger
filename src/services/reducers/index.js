import { combineReducers } from "redux";
import { dataReducer, сurrentIngredientReducer } from "./burgerIngredients";
import { orderReducer,  cunstructorBunReducer, cunstructorMainReducer} from "./burgerConstructor";
export const rootReducer = combineReducers({
  dataReducer: dataReducer,
  сurrentIngredientReducer: сurrentIngredientReducer,
  orderReducer: orderReducer,
  cunstructorBunReducer: cunstructorBunReducer,
  cunstructorMainReducer: cunstructorMainReducer,
});
