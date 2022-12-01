package hu.hm.szititourbackend.dto

import hu.hm.szititourbackend.enum.QuestionType

class QuestionDtoNoAnswers(

    val id: Int = 0,
    val name: String = "",
    val type: QuestionType = QuestionType.shortText,
    val riddle: Boolean = false,
    val img: String = "",
    val placeId: Int = 0
)