import { orderReducer, initialState } from "./orderReducer";
import * as actions from "../action-types/burger-constructor-types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { ORDER_URL } from "../../utils/urls";
import { getOrder } from "../actions/burgerConstructor";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const TEST_ORDER_BODY = {
  success: true,
  name: "Space флюоресцентный бургер",
  order: { number: 2406 },
};

describe("async actions getOrder", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_ORDER_SUCCESS", () => {
    fetchMock.postOnce(ORDER_URL, {
      body: TEST_ORDER_BODY,
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=utf-8",
      },
    });

    const expectedActions = [
      { type: actions.GET_ORDER },
      {
        type: actions.GET_ORDER_SUCCESS,
        createdOrder: TEST_ORDER_BODY.order,
      },
    ];

    const initMockStore = {
      orderRequest: false,
      orderFailed: false,
      createdOrder: null,
      constructorIngredients: [
        {
          _id: "60d3b41abdacab0026a733cc",
          name: "Соус Spicy-X",
          type: "sauce",
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: "https://code.s3.yandex.net/react/code/sauce-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          __v: 0,
        },
      ],
      constructorBun: {
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
    };
    const store = mockStore({ constructorReducer: initMockStore });

    return store.dispatch(getOrder()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("order reducer", () => {
	it("should return the initial state", () => {
	  expect(orderReducer(undefined, {})).toEqual(initialState);
	});
 
	it("should handle GET_ORDER_FAILED", () => {
	  expect(
		orderReducer(initialState, {
			type: actions.GET_ORDER_FAILED,
		 })
	  ).toEqual({
		 ...initialState,
		 orderFailed: true,
        orderRequest: false,
	  });
	});

	it("should handle CLEAR_ORDER", () => {
		expect(
		 orderReducer(initialState, {
			 type: actions.CLEAR_ORDER,
		  })
		).toEqual({
		  ...initialState,
		  createdOrder: null,
		});
	 });


 });
