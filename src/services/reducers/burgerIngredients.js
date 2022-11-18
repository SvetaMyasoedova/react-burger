import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CURRENT_INGREDIENT,
} from "../actions/burgerIngredients";

import { ingredienstsUrl } from "../../utils/urls";

const initialState = {
  dataRequest: false,
  dataFailed: false,
  data: [],
  currentIngredient: {},
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
 
