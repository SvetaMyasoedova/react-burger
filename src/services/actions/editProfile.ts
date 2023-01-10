import { Dispatch } from "redux";
import { USER_URL } from "../../utils/urls";
import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../../utils/refreshToken";

export const EDIT_USER: "EDIT_USER" = "EDIT_USER";
export const EDIT_USER_FAILED: "EDIT_USER_FAILED" = "EDIT_USER_FAILED";
export const EDIT_USER_SUCCESS: "GET_EDIT_SUCCESS" = "GET_EDIT_SUCCESS";

interface actionEditPending {
  readonly type: typeof EDIT_USER;
}
interface actionEditSuccess {
  readonly type: typeof EDIT_USER_SUCCESS;
  email: string;
  name: string;
}
interface actionEditFail {
  readonly type: typeof EDIT_USER_FAILED;
}

export type ActionEdit = actionEditPending | actionEditSuccess | actionEditFail;

export function editUser(newName: string, newEmail: string): any {
  return function (dispatch: Dispatch<ActionEdit>) {
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
        authorization: "Bearer " + getCookie("token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        name: newName,
        email: newEmail,
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
