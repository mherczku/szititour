import {Question, QuestionNoAnswer} from "./question";

export type Place = {
  id: number,
  name: string,
  img?: string,
  address: string,
  latitude: number,
  longitude: number,
  questions: Question[],
  gameId: number,
  riddleWarning?: boolean
}

export type ActivePlace = {
  id: number,
  selectable: boolean,
  name: string,
  img?: string,
  questions: QuestionNoAnswer[],
}
