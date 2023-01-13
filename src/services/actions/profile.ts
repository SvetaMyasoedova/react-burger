import { USER_URL } from "../../utils/urls";
import { getCookie } from "../../utils/cookie";

import { fetchWithRefresh } from "../../utils/refreshToken";
import { Dispatch } from "redux";

export const GET_USER: "GET_USER" = "GET_USER";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";

interface actionUserPending {
  readonly type: typeof GET_USER;
}
interface actionUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  email: string;
  name: string;
}
interface actionUserFail {
  readonly type: typeof GET_USER_FAILED;
}

export type ActionUser = actionUserPending | actionUserSuccess | actionUserFail;

interface ILogout {
  readonly type: typeof LOGOUT_SUCCESS;
}
export type ActionLogout = ILogout;

export function getUser(): any {
  return function (dispatch: Dispatch<ActionUser>) {
    dispatch({
      type: GET_USER,
    });

    fetchWithRefresh(USER_URL, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getCookie("token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            email: res.user.email,
            name: res.user.name,
          });
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}
