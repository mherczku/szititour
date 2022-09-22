package hu.hm.szititourbackend.dto

class AnswerDto(

    val id: Int = 0,
    val answerText: String = "",
    val answerBoolean: Boolean = false,
    val answerNumber : Int = 0,
    val img: String = "",
    val correct: Boolean? = null,

    val teamId: Int = 0,
    val questionDtoNoAnswers: QuestionDtoNoAnswers

)
