export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_CURRENT_ORDER: "WS_CURRENT_ORDER" = "WS_CURRENT_ORDER";

interface wsConnectionStart {
  payload: any;
  readonly type: typeof WS_CONNECTION_START;
}
interface wsConnectionSuccess {
  payload: any;
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface wsConnectionError {
  payload: any;
  readonly type: typeof WS_CONNECTION_ERROR;
}
interface wsConnectionClosed {
  payload: any;
  readonly type: typeof WS_CONNECTION_CLOSED;
}
interface wsGetMessage {
  payload: any;
  readonly type: typeof WS_GET_MESSAGE;
}
interface wsSendMessage {
  payload: any;
  readonly type: typeof WS_SEND_MESSAGE;
}
interface wsCurrentOrder {
  payload: any;
  readonly type: typeof WS_CURRENT_ORDER;
}

export type TWSActions =
  | wsConnectionStart
  | wsConnectionSuccess
  | wsConnectionError
  | wsConnectionClosed
  | wsGetMessage
  | wsSendMessage
  | wsCurrentOrder;
