import { REGISTER_URL } from "../../utils/urls";
import { setCookie } from "../../utils/cookie";
import { checkReponse } from "../../utils/refreshToken";
import { Dispatch } from "redux";

export const GET_REGISTER: "GET_REGISTER" = "GET_REGISTER";
export const GET_REGISTER_FAILED: "GET_REGISTER_FAILED" = "GET_REGISTER_FAILED";
export const GET_REGISTER_SUCCESS: "GET_REGISTER_SUCCESS" = "GET_REGISTER_SUCCESS";

interface actionRegisterPending {
  readonly type: typeof GET_REGISTER;
}
interface actionRegisterSuccess {
  readonly type: typeof GET_REGISTER_SUCCESS;
  email: string;
  name: string;
}
interface actionRegisterFail {
  readonly type: typeof GET_REGISTER_FAILED;
}

export type ActionRegister =
  | actionRegisterPending
  | actionRegisterSuccess
  | actionRegisterFail;

const getRegister = (
  email: string,
  password: string,
  userName: string
): any => {
  return function (dispatch: Dispatch<ActionRegister>) {
    dispatch({
      type: GET_REGISTER,
    });

    fetch(REGISTER_URL, {
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
        name: userName,
      }),
    })
      .then(checkReponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_REGISTER_SUCCESS,
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
            type: GET_REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_REGISTER_FAILED,
        });
      });
  };
};
export default getRegister;
