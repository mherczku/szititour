import {Place} from "./place";
import {Application} from "./application";

export type Game = {
  id: number,
  title: string,
  dateStart: Date,
  dateEnd: Date,
  img?: string,
  places: Place[],
  applications: Application[],
  userApplied?: boolean
}
