import { LOGIN_URL } from "../../utils/urls";
import { setCookie } from "../../utils/cookie";
import { checkReponse } from "../../utils/refreshToken";
import { Dispatch } from "redux";

import {
  GET_LOGIN,
  GET_LOGIN_FAILED,
  GET_LOGIN_SUCCESS,
} from "../action-types/login-types";

interface actionLoginPending {
  readonly type: typeof GET_LOGIN;
}

interface actionLoginSuccess {
  readonly type: typeof GET_LOGIN_SUCCESS;
  email: string;
  name: string;
}

interface actionLoginFail {
  readonly type: typeof GET_LOGIN_FAILED;
}

export type ActionLogin =
  | actionLoginPending
  | actionLoginSuccess
  | actionLoginFail;

const getLogin = (email: string, password: string): any => {
  return function (dispatch: Dispatch<ActionLogin>) {
    dispatch({
      type: GET_LOGIN,
    });

    return fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },

      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(checkReponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_LOGIN_SUCCESS,
            email: res.user.email,
            name: res.user.name,
          });

          let authToken = res.accessToken;
          if (authToken.indexOf("Bearer") === 0) {
            authToken = authToken.split("Bearer ")[1];
          }
          if (authToken) {
            setCookie("token", authToken);
          }
          if (res.refreshToken) {
            localStorage.setItem("refreshToken", res.refreshToken);
          }
        } else {
          dispatch({
            type: GET_LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_LOGIN_FAILED,
        });
      });
  };
};
export default getLogin;
