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
});
