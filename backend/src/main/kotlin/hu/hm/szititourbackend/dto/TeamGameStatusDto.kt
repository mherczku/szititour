package hu.hm.szititourbackend.dto

import java.sql.Timestamp
import java.time.Instant

class TeamGameStatusDto(

    val id: Int = 0,
    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    var placeStatuses: MutableList<PlaceStatusDto> = mutableListOf<PlaceStatusDto>(),

    val gameId: Int = 0,
    val teamId: Int = 0,
    val teamName: String = "",
    val lastLatitude: Double = 0.0,
    val lastLongitude: Double = 0.0
)

class PlaceStatusDto (
    var placeId: Int = 0,
    var reached: Boolean = false,
    var reachedAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var qAnswers: MutableList<AnswerDto> = mutableListOf()
)

class QAnswers (
    var question: QuestionDtoNoAnswers,
    var answer: AnswerDto?
)