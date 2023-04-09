
export type AnswersRequestBody = {
  gameId: number,
  questionAnswers: QuestionAnswer[]
}

export type QuestionAnswer = {
  questionId: number,
  answer: AnswerRequest
}

export type AnswerRequest = {
  answerText?: string,
  answerBoolean?: boolean,
  answerNumber?: number,
  img?: string,
  imgFile?: File
}
