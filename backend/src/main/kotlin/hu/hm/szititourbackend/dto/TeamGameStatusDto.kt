package hu.hm.szititourbackend.dto

import com.sun.org.apache.xpath.internal.operations.Bool
import hu.hm.szititourbackend.datamodel.PlaceStatus
import sun.security.ec.point.ProjectivePoint.Mutable
import java.sql.Timestamp
import java.time.Instant

class TeamGameStatusDto(

    val id: Int = 0,
    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    var placeStatuses: MutableList<PlaceStatusDto> = mutableListOf<PlaceStatusDto>(),

    val gameId: Int = 0,
    val teamId: Int = 0
)

class PlaceStatusDto (
    var placeId: Int = 0,
    var reached: Boolean = false,
    var reachedAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var qAnswers: MutableList<QAnswers> = mutableListOf()
)

class QAnswers (
    var question: QuestionDtoNoAnswers,
    var answer: AnswerDto?
)