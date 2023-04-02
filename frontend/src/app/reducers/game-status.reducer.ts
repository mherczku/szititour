import {createReducer, on} from "@ngrx/store";
import {GameState} from "../types/states/game-state";
import {loadGameState} from "../actions/game-state.actions";

export const initialState: GameState = {
  teamGameStatus: null
};

export const GameStateReducer = createReducer(
  initialState,

  on(loadGameState, (state, { gameState }) => (
    { ...state,
      teamGameStatus: gameState
    }
  )),

);
