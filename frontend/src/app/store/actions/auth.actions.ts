import {createAction, props} from "@ngrx/store";
import {Team} from "../../types/team";

export const login = createAction(
  "[Auth] Login",
  props<{ team: Team, notAuto?: boolean , pushInit?: boolean}>()
);

export const logout = createAction(
  "[Auth] Logout"
);
