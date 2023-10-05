package hu.hm.szititourbackend.dto


class PlaceDto(
        val id: Int = 0,
        val name: String = "",
        var img: String = "",
        val address: String = "",
        val latitude: Double = 0.0,
        val longitude: Double = 0.0,
        val questions: MutableList<QuestionDto> = mutableListOf(),
        val gameId: Int = 0,
        val riddleWarning: Boolean = false
)