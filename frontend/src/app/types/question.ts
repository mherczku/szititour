import {QuestionType} from "../enums/question-type";

export type Question = {
  id: number,
  name: string,
  type: QuestionType,
  riddle: boolean,
  img?: string,
  placeId: number
}

export type QuestionNoAnswer = {
  id: number,
  name: string,
  type: QuestionType,
  riddle: boolean,
  img?: string,
  placeId: number
}
