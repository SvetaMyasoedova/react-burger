import { ActionIngredient, ActionOrder } from "./burgerConstructor";
import { Action, ActionCurrentIngredient } from "./burgerIngredients";
import { ActionEdit } from "./editProfile";
import { ActionLogin } from "./login";
import { ActionLogout, ActionUser } from "./profile";
import { ActionRegister } from "./register";
import { TWSActions } from "./wsActionTypes";
import { TWSProfileActions } from "./wsProfileActionTypes";

export type TActions =
  | ActionOrder
  | ActionIngredient
  | ActionCurrentIngredient
  | Action
  | ActionEdit
  | ActionLogin
  | ActionUser
  | ActionLogout
  | ActionRegister
  | TWSActions
  | TWSProfileActions;
