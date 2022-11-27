export const GET_LOGIN = "GET_INGREDIENTS";
export const GET_REGISTER_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_REGISTER_SUCCESS = "GET_INGREDIENTS_SUCCESS";

const getRegister = (email, password, userName) => {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTER,
    });

    fetch(" https://norma.nomoreparties.space/api/auth/register", {
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