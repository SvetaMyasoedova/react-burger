import { dataReducer, initialState } from "./dataReducer";
import * as actions from "../action-types/burger-ingredients-types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { getIngredients } from "../actions/burgerIngredients";
import { INGREDIENTS_URL } from "../../utils/urls";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const TEST_BODY = {
  data: [
    {
      _id: "60d3b41abdacab0026a733c6",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
    {
      _id: "60d3b41abdacab0026a733c7",
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      __v: 0,
    },
  ],
  success: true,
};

describe("async actions getIngredients", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_INGREDIENTS_SUCCESS", () => {
    fetchMock.getOnce(INGREDIENTS_URL, {
      body: TEST_BODY,
      headers: { "content-type": "application/json; charset=utf-8" },
    });

    const expectedActions = [
      { type: actions.GET_INGREDIENTS },
      { type: actions.GET_INGREDIENTS_SUCCESS, data: TEST_BODY.data },
    ];
    const store = mockStore({
      dataRequest: false,
      dataFailed: false,
      data: [],
    });

    return store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("data reducer", () => {
  it("should return the initial state", () => {
    expect(dataReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      dataReducer(initialState, {
        type: actions.GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...initialState,
      dataFailed: true,
      dataRequest: false,
    });
  });
});
