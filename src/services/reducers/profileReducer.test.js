import { profileReducer, initialState } from "./profileReducer";
import * as actions from "../action-types/profile-types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { USER_URL } from "../../utils/urls";
import { getUser } from "../actions/profile";
import { getCookie } from "../../utils/cookie";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const TEST_USER_BODY = {
  success: true,
  user: { email: "so.myasoedova@gmail.com", name: "Sveta" },
};

describe("async actions getUser", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_USER_SUCCESS", () => {
    fetchMock.getOnce(USER_URL, {
      body: TEST_USER_BODY,
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + getCookie("token"),
      },
    });

    const expectedActions = [
      { type: actions.GET_USER },
      {
        type: actions.GET_USER_SUCCESS,
        email: TEST_USER_BODY.user.email,
        name: TEST_USER_BODY.user.name,
      },
    ];
    const store = mockStore({
      userRequest: false,
      userFailed: false,
      email: "",
      name: "",
      isUserLoaded: false,
      isLogin: false,
    });

    return store.dispatch(getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("profile reducer", () => {
  it("should return the initial state", () => {
    expect(profileReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_USER_FAILED", () => {
    expect(
      profileReducer(initialState, {
        type: actions.GET_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      userFailed: true,
      userRequest: false,
      isUserLoaded: true,
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      profileReducer(initialState, {
        type: actions.LOGOUT_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      email: "",
      name: "",
      isUserLoaded: false,
      isLogin: false,
    });
  });
});
