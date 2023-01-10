import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import { rootReducer } from "./services/reducers";
import { BrowserRouter as Router } from "react-router-dom";
import { socketMiddleware } from "./services/middlewares/socketMiddleware";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CURRENT_ORDER,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "./services/actions/wsActionTypes";
import {
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CURRENT_ORDER,
  WS_PROFILE_GET_MESSAGE,
  WS_PROFILE_SEND_MESSAGE,
} from "./services/actions/wsProfileActionTypes";
import { getCookie } from "./utils/cookie";
import { WS_All_ORDERS_URL, WS_PROFILE_ORDERS_URL } from "./utils/urls";

const wsFeedType = {
  wsConnectionStart: WS_CONNECTION_START,
  wsConnectionSuccess: WS_CONNECTION_SUCCESS,
  wsConnectionError: WS_CONNECTION_ERROR,
  wsConnectionClosed: WS_CONNECTION_CLOSED,
  wsGetMessage: WS_GET_MESSAGE,
  wsSendMessage: WS_SEND_MESSAGE,
  wsCurrentOrder: WS_CURRENT_ORDER,
};

const wsProfileType = {
  wsConnectionStart: WS_PROFILE_CONNECTION_START,
  wsConnectionSuccess: WS_PROFILE_CONNECTION_SUCCESS,
  wsConnectionError: WS_PROFILE_CONNECTION_ERROR,
  wsConnectionClosed: WS_PROFILE_CONNECTION_CLOSED,
  wsGetMessage: WS_PROFILE_GET_MESSAGE,
  wsSendMessage: WS_PROFILE_SEND_MESSAGE,
  wsCurrentOrder: WS_PROFILE_CURRENT_ORDER,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(WS_All_ORDERS_URL, wsFeedType),
      socketMiddleware(
        `${WS_PROFILE_ORDERS_URL}?token=${getCookie("token")}`,
        wsProfileType
      )
    )
  )
);


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
