import {Place} from "./place";

export interface Game {
  id: number,
  title: string,
  dateStart: string,
  dateEnd: string,
  img?: string,
  places: Place[],
  applications: string[]
}
