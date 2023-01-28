import { GET_INGREDIENTS_SUCCESS,  GET_INGREDIENTS_FAILED, GET_INGREDIENTS} from "../action-types/burger-ingredients-types";
import { Action} from "../actions/burgerIngredients";
import { TIngredient } from "../types/data";


type TDataState = {
  dataRequest: boolean;
  dataFailed: boolean;
  data: Array<TIngredient>;
} 

export const initialState: TDataState = {
  dataRequest: false,
  dataFailed: false,
  data: [],
};

export const dataReducer = (state = initialState, action: Action): TDataState => {
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
