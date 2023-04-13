import {ActivePlace, Place} from "./place";
import {Application} from "./application";
import {TeamGameStatus} from "./team-game-status";

export type Game = {
  id: number,
  title: string,
  dateStart: Date,
  dateEnd: Date,
  img?: string,
  places: Place[],
  applications: Application[],
  userApplied?: "accepted" | "applied" | "declined" | "none",
  active: boolean
}

export type ActiveGame = {
  id: number,
  title: string,
  dateStart: Date,
  dateEnd: Date,
  img?: string,
  places: ActivePlace[],
}

export type GameWithStatuses = {
  id: number,
  title: string,
  dateStart: Date,
  dateEnd: Date,
  img?: string,
  places: Place[],
  applications: Application[],
  active: boolean
  teamGameStatuses: TeamGameStatus[]
}
