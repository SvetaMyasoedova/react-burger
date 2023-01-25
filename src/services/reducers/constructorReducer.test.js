import { constructorReducer, initialState } from "./constructorReducer";
import * as actions from "../action-types/burget-constructor-types";

const TEST_CONSTRUCTOR_BUN = {
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

const TEST_CONSTRUCTOR_MAIN = {
  calories: 30,
  carbohydrates: 40,
  fat: 20,
  image: "https://code.s3.yandex.net/react/code/sauce-02.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  index: 0,
  name: "Соус Spicy-X",
  price: 90,
  proteins: 30,
  type: "sauce",
  uuid: "1f4b8aad-a6a2-41f6-a89a-6f0c50ad5aed",
  __v: 0,
  _id: "60d3b41abdacab0026a733cc",
};

const TEST_CONSTRUCTOR_MAIN_COUNT = {
  "60d3b41abdacab0026a733cc": 1,
};

const DELETE_CONSTRUCTOR_INGREDIENT_STATE = {
  constructorBun: null,
  constructorIngredients: [TEST_CONSTRUCTOR_MAIN],
  ingredientsCount: TEST_CONSTRUCTOR_MAIN_COUNT,
} 

describe("constructor reducer", () => {
  it("should return the initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle CONSTRUCTOR_BUN", () => {
    expect(
      constructorReducer(initialState, {
        type: actions.CONSTRUCTOR_BUN,
        constructorBun: TEST_CONSTRUCTOR_BUN,
      })
    ).toEqual({
      ...initialState,
      constructorBun: TEST_CONSTRUCTOR_BUN,
    });
  });

  it("should handle CONSTRUCTOR_MAIN", () => {
    expect(
      constructorReducer(initialState, {
        type: actions.CONSTRUCTOR_MAIN,
        constructorIngredient: TEST_CONSTRUCTOR_MAIN,
      })
    ).toEqual({
      ...initialState,
      constructorIngredients: [TEST_CONSTRUCTOR_MAIN],
      ingredientsCount: TEST_CONSTRUCTOR_MAIN_COUNT,
    });
  });

  it("should handle DELETE_CONSTRUCTOR_INGREDIENT", () => {
    expect(
      constructorReducer(DELETE_CONSTRUCTOR_INGREDIENT_STATE, {
        type: actions.DELETE_CONSTRUCTOR_INGREDIENT,
        uuid: TEST_CONSTRUCTOR_MAIN.uuid,
        id: TEST_CONSTRUCTOR_MAIN._id
      })
    ).toEqual({
      ...DELETE_CONSTRUCTOR_INGREDIENT_STATE,
      constructorIngredients: [],
      ingredientsCount: {},
    });
  });

  


});
