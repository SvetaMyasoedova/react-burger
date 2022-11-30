import { USER_URL } from "../../utils/urls";
import { getCookie } from "../../utils/cookie";

import { fetchWithRefresh } from "../../utils/refreshToken";
export const GET_USER = "GET_USER";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function getUser() {
	return function (dispatch) {
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
			Authorization:  "Bearer " + getCookie("token"),
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