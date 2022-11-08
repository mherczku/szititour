import {QuestionType} from "../enums/question-type";

export interface Question {
  id: number,
  name: string,
  type: QuestionType,
  isRiddle: boolean,
  img?: string,
  placeId: number
}
