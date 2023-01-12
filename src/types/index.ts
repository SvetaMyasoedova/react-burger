import { rootReducer } from './../services/reducers/index';
import type {} from "redux-thunk/extend-redux";
import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { TActions } from "../services/actions";


export type RootState = ReturnType<typeof rootReducer>;


export type TApplicationActions = TActions;

export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type TAppDispatch= Dispatch<TApplicationActions>; 
