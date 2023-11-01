package hu.hm.szititourbackend.dto.request

import hu.hm.szititourbackend.datamodel.Answer

class AnswersRequestBody (
    val gameId: Int = 0,
    val questionAnswers: List<QuestionAnswer> = listOf()
)

class QuestionAnswer(
    var questionId: Int = 0,
    var answer: Answer = Answer()
)