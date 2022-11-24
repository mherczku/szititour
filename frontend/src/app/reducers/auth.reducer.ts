import {createReducer, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions'
import {AuthState} from "../interfaces/states/auth-state";

export const initialState: AuthState = {
  isLoggedIn: false,
  team: null,
}

export const AuthReducer = createReducer(
  initialState,

  on(AuthActions.login, (state, { team }) => (
    { ...state,
      isLoggedIn: true,
      team: team
    }
  )),

  on(AuthActions.logout, state => (
    { ...state,
      isLoggedIn: false,
      team: null
    }
  )),

)
