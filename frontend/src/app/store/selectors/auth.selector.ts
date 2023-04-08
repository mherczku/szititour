import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "../states/auth-state";

const authFeatureKey = "auth";

export const selectAuth = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoggedIn
);

export const selectLoggedInTeam = createSelector(
  selectAuth,
  (state: AuthState) => state.team
);
