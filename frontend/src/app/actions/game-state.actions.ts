import {createAction, props} from "@ngrx/store";
import {TeamGameStatus} from "../types/team-game-status";

export const loadGameState = createAction(
  "[GameState] Load",
  props<{ gameState: TeamGameStatus }>()
);
