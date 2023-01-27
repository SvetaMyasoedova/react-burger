import { wsReducer, initialState } from "./wsReducer";
import * as actions from "../action-types/ws-types";

const TEST_WS = {
  success: true,
  orders: [
    {
      createdAt: "2022-11-29T10:55:23.341Z",
      ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
      name: "Флюоресцентный бургер",
      number: 31261,
      status: "done",
      updatedAt: "2022-11-29T10:55:24.041Z",
      _id: "6385e51b9b518a001bb8924a",
    },
    {
      createdAt: "2022-11-29T10:57:52.062Z",
      ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c6"],
      name: "Краторный бургер",
      number: 31265,
      status: "done",
      updatedAt: "2022-11-29T10:57:52.685Z",
      _id: "6385e5b09b518a001bb8924e",
    },
  ],
  total: 38077,
  totalToday: 233,
};

describe("ws reducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(initialState, {
        type: actions.WS_CONNECTION_SUCCESS,
        error: undefined,
        wsConnected: true,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true,
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(initialState, {
        type: actions.WS_CONNECTION_ERROR,
        error: undefined,
        wsConnected: false,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(initialState, {
        type: actions.WS_CONNECTION_CLOSED,
        error: undefined,
        wsConnected: false,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(initialState, {
        type: actions.WS_GET_MESSAGE,
        payload: TEST_WS,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      orders: TEST_WS.orders,
      total: TEST_WS.total,
      totalToday: TEST_WS.totalToday,
    });
  });
});
