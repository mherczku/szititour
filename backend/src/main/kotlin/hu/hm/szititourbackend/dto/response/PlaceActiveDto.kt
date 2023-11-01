package hu.hm.szititourbackend.dto.response


class PlaceActiveDto(
    val id: Int = 0,
    val selectable: Boolean = false,
    val name: String = "",
    val img: String = "",
    val questions: MutableList<QuestionDtoNoAnswers> = mutableListOf()
)