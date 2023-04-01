import {Question, QuestionNoAnswer} from "./question";

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

export type ActivePlace = {
  id: number,
  selectable: boolean,
  name: string,
  img?: string,
  questions: QuestionNoAnswer[],
}
