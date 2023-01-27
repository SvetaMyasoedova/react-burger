import { TOrder } from "../types/order";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CURRENT_ORDER,
  WS_CLOSE_CONNECTION,
} from "../action-types/ws-types";

interface IGetMessage {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

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
  payload: IGetMessage;
  readonly type: typeof WS_GET_MESSAGE;
}
interface wsSendMessage {
  payload: any;
  readonly type: typeof WS_SEND_MESSAGE;
}
interface wsCurrentOrder {
  payload: { [key: string]: TOrder };
  readonly type: typeof WS_CURRENT_ORDER;
}

interface wsCloseConnection {
  payload: any;
  readonly type: typeof WS_CLOSE_CONNECTION;
}

export type TWSActions =
  | wsConnectionStart
  | wsConnectionSuccess
  | wsConnectionError
  | wsConnectionClosed
  | wsGetMessage
  | wsSendMessage
  | wsCurrentOrder
  | wsCloseConnection;
