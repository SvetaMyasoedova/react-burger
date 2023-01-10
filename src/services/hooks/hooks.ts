
import type {} from "redux-thunk/extend-redux";

import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";

import { TAppDispatch, RootState, TAppThunk } from "../../types";




export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
// export const useDispatch: () => TAppDispatch = dispatchHook;
export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>(); 