import { REGISTER_URL } from "../../utils/urls";
import { setCookie } from "../../utils/cookie";

export const GET_REGISTER = "GET_INGREDIENTS";
export const GET_REGISTER_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_REGISTER_SUCCESS = "GET_INGREDIENTS_SUCCESS";

const getRegister = (email, password, userName) => {
  return function (dispatch) {
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
      .then((res) => {
        if (!res.ok) {
          throw new Error("");
        } else {
          return res.json();
        }
      })
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
            setCookie("refreshToken", res.refreshToken);
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
