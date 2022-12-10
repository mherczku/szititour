package hu.hm.szititourbackend.dto


class PlaceDto(
    val id: Int = 0,
    val name: String = "",
    var img: String = "",
    val address: String = "",
    val latitude: String = "",
    val longitude: String = "",
    val questions: MutableList<QuestionDto> = mutableListOf(),
    val gameId: Int = 0
)