package hu.hm.szititourbackend.dto


class PlaceActiveDto(
    val id: Int = 0,
    val name: String = "",
    val img: String = "",
    val questions: MutableList<QuestionDtoNoAnswers> = mutableListOf()
)