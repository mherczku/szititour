import {createAction, props} from "@ngrx/store";
import {Team} from "../types/team";

export const login = createAction(
  "[Auth] Login",
  props<{ team: Team }>()
);

export const logout = createAction(
  "[Auth] Logout"
);
