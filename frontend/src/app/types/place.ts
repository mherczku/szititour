import {Question} from "./question";

export type Place = {
  id: number,
  name: string,
  img?: string,
  address: string,
  latitude: string,
  longitude: string,
  questions: Question[],
  gameId: number
}
