export const WS_PROFILE_CONNECTION_START: "WS_PROFILE_CONNECTION_START" = "WS_PROFILE_CONNECTION_START";
export const WS_PROFILE_CONNECTION_SUCCESS: "WS_PROFILE_CONNECTION_SUCCESS" =
  "WS_PROFILE_CONNECTION_SUCCESS";
export const WS_PROFILE_CONNECTION_ERROR: "WS_PROFILE_CONNECTION_ERROR" = "WS_PROFILE_CONNECTION_ERROR";
export const WS_PROFILE_CONNECTION_CLOSED: "WS_PROFILE_CONNECTION_CLOSED" =
  "WS_PROFILE_CONNECTION_CLOSED";
export const WS_PROFILE_GET_MESSAGE: "WS_PROFILE_GET_MESSAGE" = "WS_PROFILE_GET_MESSAGE";
export const WS_PROFILE_SEND_MESSAGE: "WS_PROFILE_SEND_MESSAGE" = "WS_PROFILE_SEND_MESSAGE";
export const WS_PROFILE_CURRENT_ORDER: "WS_PROFILE_CURRENT_ORDER" = "WS_PROFILE_CURRENT_ORDER";

interface wsConnectionStart {
  payload: any;
  readonly type: typeof WS_PROFILE_CONNECTION_START;
}
interface wsConnectionSuccess {
  payload: any;
  readonly type: typeof WS_PROFILE_CONNECTION_SUCCESS;
}
interface wsConnectionError {
  payload: any;
  readonly type: typeof WS_PROFILE_CONNECTION_ERROR;
}
interface wsConnectionClosed {
  payload: any;
  readonly type: typeof WS_PROFILE_CONNECTION_CLOSED;
}
interface wsGetMessage {
  payload: any;
  readonly type: typeof WS_PROFILE_GET_MESSAGE;
}
interface wsSendMessage {
  payload: any;
  readonly type: typeof WS_PROFILE_SEND_MESSAGE;
}
interface wsCurrentOrder {
  payload: any;
  readonly type: typeof WS_PROFILE_CURRENT_ORDER;
}

export type TWSProfileActions =
  | wsConnectionStart
  | wsConnectionSuccess
  | wsConnectionError
  | wsConnectionClosed
  | wsGetMessage
  | wsSendMessage
  | wsCurrentOrder;
