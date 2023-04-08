import {QuestionType} from "../enums/question-type";

export type TeamGameStatus = {
  id: number
  createdAt: Date
  updatedAt: Date
  placeStatuses: PlaceStatusDto[]
  gameId: number
  teamId: number
}

export type PlaceStatusDto = {
  placeId: number
  reached: boolean
  reachedAt: Date
  qanswers: AnswerDto[]
}

export type QAnswers = {
  //question: QuestionDtoNoAnswers
  answer: AnswerDto[]
}

export type AnswerDto = {
  id: number
  answerText: string
  answerBoolean: boolean
  answerNumber: number
  img: string
  correct?: boolean
  teamId: number
  questionDtoNoAnswers: QuestionDtoNoAnswers
}

export type QuestionDtoNoAnswers = {
   id: number
   name: string
   type: QuestionType
   riddle: boolean
   img?: string
   placeId: number
}
