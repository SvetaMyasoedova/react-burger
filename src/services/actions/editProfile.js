import { USER_URL } from "../../utils/urls";
import { getCookie } from "../../utils/cookie";

import { fetchWithRefresh } from "../../utils/refreshToken";
export const EDIT_USER = "EDIT_USER";
export const EDIT_USER_FAILED = "EDIT_USER_FAILED";
export const EDIT_USER_SUCCESS = "GET_EDIT_SUCCESS";

export function editUser(newName, newEmail) {
  return function (dispatch) {
    dispatch({
      type: EDIT_USER,
    });
 
   
    fetchWithRefresh(USER_URL, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
		body: JSON.stringify({
			name:newName,
			email: newEmail,
			// password: password,
		 }),
    })
      .then((res) => {
       
        if (res && res.success) {
          dispatch({
            type: EDIT_USER_SUCCESS,
            email: newEmail,
            name: newName,
          });
        } else {
          dispatch({
            type: EDIT_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: EDIT_USER_FAILED,
        });
       
       
      });
  };
}
