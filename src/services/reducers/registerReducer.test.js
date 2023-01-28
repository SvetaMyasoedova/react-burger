import { registerReducer, initialState } from "./registerReducer";
import * as actions from "../action-types/register-types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { REGISTER_URL } from "../../utils/urls";
import getRegister from "../actions/register";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const TEST_REGISTER_BODY = {
  success: true,
  user: { email: "tanya784@gmail.com", name: "Tanya" },
  accessToken:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDM0ZmJiOTM2YjE3MDAxYmU1NDI0NiIsImlhdCI6MTY3NDc5Mjg5MSwiZXhwIjoxNjc0Nzk0MDkxfQ.Ym31VplbKplUwUf3VRlwK8VK6JSzMAu0n9mf3c77CZs",
  refreshToken:
    "d0a1b0096d8ed3f83a1cbe7f17bf59dae931b0795606b3830e1150e9f03189f952e003b43e08ba2d",
};

describe("async actions getRegister", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_REGISTER_SUCCESS", () => {
    fetchMock.postOnce(REGISTER_URL, {
      body: TEST_REGISTER_BODY,
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=utf-8",
      },
    });

    const expectedActions = [
      { type: actions.GET_REGISTER },
      {
        type: actions.GET_REGISTER_SUCCESS,
        email: TEST_REGISTER_BODY.user.email,
        name: TEST_REGISTER_BODY.user.name,
      },
    ];

    const store = mockStore({
      registerRequest: false,
      registerFailed: false,
      email: "",
      name: "",
    });

    return store
      .dispatch(
        getRegister(
          TEST_REGISTER_BODY.user.email,
          "123456",
          TEST_REGISTER_BODY.user.name
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe("register reducer", () => {
  it("should return the initial state", () => {
    expect(registerReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_REGISTER_FAILED", () => {
    expect(
      registerReducer(initialState, {
        type: actions.GET_REGISTER_FAILED,
      })
    ).toEqual({
      ...initialState,
      registerFailed: true,
      registerRequest: false,
    });
  });
});
