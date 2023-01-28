import { wsProfileReducer, initialState } from "./wsProfileReducer";
import * as actions from "../action-types/ws-profile-types";
import { TEST_WS } from "./wsReducer.test";

const CURRENT_ORDER = {
  currentOrder: {
    createdAt: "2022-11-29T10:55:23.341Z",
    ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
    name: "Флюоресцентный бургер",
    number: 31261,
    status: "done",
    updatedAt: "2022-11-29T10:55:24.041Z",
    _id: "6385e51b9b518a001bb8924a",
  },
};

describe("ws profile reducer", () => {
  it("should return the initial state", () => {
    expect(wsProfileReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle WS_PROFILE_CONNECTION_SUCCESS", () => {
    expect(
      wsProfileReducer(initialState, {
        type: actions.WS_PROFILE_CONNECTION_SUCCESS,
        error: undefined,
        wsConnected: true,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true,
    });
  });

  it("should handle WS_PROFILE_CONNECTION_ERROR", () => {
    expect(
      wsProfileReducer(initialState, {
        type: actions.WS_PROFILE_CONNECTION_ERROR,
        error: undefined,
        wsConnected: false,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
    });
  });

  it("should handle WS_PROFILE_CONNECTION_CLOSED", () => {
    expect(
      wsProfileReducer(initialState, {
        type: actions.WS_PROFILE_CONNECTION_CLOSED,
        error: undefined,
        wsConnected: false,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
    });
  });

  it("should handle WS_PROFILE_GET_MESSAGE", () => {
    expect(
      wsProfileReducer(initialState, {
        type: actions.WS_PROFILE_GET_MESSAGE,
        payload: TEST_WS,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      orders: TEST_WS.orders,
    });
  });

  it("should handle WS_PROFILE_CURRENT_ORDER", () => {
    expect(
      wsProfileReducer(initialState, {
        type: actions.WS_PROFILE_CURRENT_ORDER,
        payload: CURRENT_ORDER,
      })
    ).toEqual({
      ...initialState,
      currentOrder: CURRENT_ORDER.currentOrder,
    });
  });
});
