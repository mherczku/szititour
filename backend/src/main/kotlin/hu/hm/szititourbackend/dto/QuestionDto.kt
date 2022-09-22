package hu.hm.szititourbackend.dto

import hu.hm.szititourbackend.enum.QuestionType

class QuestionDto(

    val id: Int = 0,
    val name: String = "",
    val type: QuestionType = QuestionType.shortText,
    val isRiddle: Boolean = false,
    val img: String = "",

    val answers: MutableList<AnswerDto> = mutableListOf(),
    val placeId: Int = 0

)