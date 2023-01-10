import type { Middleware, MiddlewareAPI } from "redux";
import { TAppDispatch, RootState } from "../../types";
import { TWSActions } from "../actions/wsActionTypes";

export const socketMiddleware = (
  wsUrl: string,
  actionTypes: any
): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWSActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === actionTypes.wsConnectionStart) {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: actionTypes.wsConnectionSuccess, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: actionTypes.wsConnectionError, payload: event });
        };

        socket.onmessage = (event) => {
          const dataObj = JSON.parse(event.data);

          if (dataObj.success) {
            dispatch({ type: actionTypes.wsGetMessage, payload: dataObj });
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: actionTypes.wsConnectionClosed, payload: event });
        };

        if (type === actionTypes.wsSendMessage) {
          const message = payload;

          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
