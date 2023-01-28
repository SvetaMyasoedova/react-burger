import {
  сurrentIngredientReducer,
  initialState,
} from "./сurrentIngredientReducer";
import * as actions from "../action-types/сurrent-ingredient-types";

const TEST_CURRENT_INGREDIENT = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  name: "Краторная булка N-200i",
  price: 1255,
  proteins: 80,
  type: "bun",
  __v: 0,
  _id: "60d3b41abdacab0026a733c6",
};

describe("currentIngredient reducer", () => {
  it("should return the initial state", () => {
    expect(сurrentIngredientReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle CURRENT_INGREDIENT", () => {
    expect(
      сurrentIngredientReducer(initialState, {
        type: actions.CURRENT_INGREDIENT,
        currentIngredient: TEST_CURRENT_INGREDIENT,
      })
    ).toEqual({
      ...initialState,
      currentIngredient: TEST_CURRENT_INGREDIENT,
    });
  });

  it("should handle CLEAR_CURRENT_INGREDIENT", () => {
    expect(
      сurrentIngredientReducer(initialState, {
        type: actions.CLEAR_CURRENT_INGREDIENT,
        currentIngredient: null,
      })
    ).toEqual({
      ...initialState,
      currentIngredient: null,
    });
  });
});
