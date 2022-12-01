import {QuestionType} from "../enums/question-type";

export interface Question {
  id: number,
  name: string,
  type: QuestionType,
  riddle: boolean,
  img?: string,
  placeId: number
}
