import {createFeatureSelector, createSelector} from "@ngrx/store";
import {GameState} from "../states/game-state";

const featureKey = "game";

export const selectGameState = createFeatureSelector<GameState>(featureKey);

export const selectGameStateStatuses = createSelector(
  selectGameState,
  (state: GameState) => state.teamGameStatus
);
