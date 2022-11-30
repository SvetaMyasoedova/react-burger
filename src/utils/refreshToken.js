import { TOKEN_URL } from "./urls";
import { setCookie } from "./cookie";

export const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);

      let authToken = refreshData.accessToken;
      if (authToken.indexOf("Bearer") === 0) {
        authToken = authToken.split("Bearer ")[1];
      }
      if (authToken) {
        setCookie("token", authToken);
      }
      //setCookie("accessToken", refreshData.accessToken);
      //options.headers.authorization = "";
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
