import { LOGIN_URL } from "../../utils/urls";


export const GET_LOGIN = "GET_LOGIN";
export const GET_LOGIN_FAILED = "GET_LOGIN_FAILED";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";

const getLogin = (email, password) => {
  return function (dispatch) {
    dispatch({
      type: GET_LOGIN,
    });

    fetch(LOGIN_URL, {
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
            type: GET_LOGIN_SUCCESS,
            email: res.user.email,
				name: res.user.name,
          });

			 
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
