import { loginReducer, initialState } from "./loginReducer";
import * as actions from "../action-types/login-types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { LOGIN_URL } from "../../utils/urls";
import getLogin from "../actions/login";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const TEST_LOGIN_BODY = {
  accessToken:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODA1YWIxOWI1MThhMDAxYmI4NzhkNCIsImlhdCI6MTY3NDcwNDQ1MiwiZXhwIjoxNjc0NzA1NjUyfQ.OKCmZiobmIKg4lMc_HFNaARYRKWcQCTzoEVn_jwr1Uk",
  refreshToken:
    "b9df044c2c9cf4a3c6224e318484982170de6743885e4b3f782ccf4116d539d441fbd2111b4b25d0",
  success: true,
  user: { email: "so.myasoedova@gmail.com", name: "Sveta" },
};

const store = mockStore({
  loginRequest: false,
  loginFailed: false,
  email: "",
  name: "",
  isLogin: false,
});

describe("async actions getLogin", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_LOGIN_SUCCESS", () => {
    fetchMock.postOnce(LOGIN_URL, {
      body: TEST_LOGIN_BODY,
      headers: {
        Accept: "application/json",
        "content-type": "application/json; charset=utf-8",
      },
    });

    const expectedActions = [
      { type: actions.GET_LOGIN },
      {
        type: actions.GET_LOGIN_SUCCESS,
        email: TEST_LOGIN_BODY.user.email,
        name: TEST_LOGIN_BODY.user.name,
      },
    ];

    return store
      .dispatch(getLogin(TEST_LOGIN_BODY.user.email, "123456"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe("login reducer", () => {
  it("should return the initial state", () => {
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_LOGIN_FAILED", () => {
    expect(
      loginReducer(initialState, {
        type: actions.GET_LOGIN_FAILED,
      })
    ).toEqual({
      ...initialState,
      loginFailed: true,
      loginRequest: false,
    });
  });
});
