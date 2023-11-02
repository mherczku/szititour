package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.response.AnswerDto
import hu.hm.szititourbackend.dto.response.PlaceStatusDto
import hu.hm.szititourbackend.dto.response.TeamGameStatusDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.http.HttpStatus
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

@Entity
class TeamGameStatus(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    @ElementCollection
    var placeStatuses: MutableList<PlaceStatus> = mutableListOf<PlaceStatus>(),
    var nextUnreachedPlaceIndex: Int = 2,

    @ManyToOne()
    val game: Game = Game(),

    @ManyToOne()
    val team: Team = Team()
)

@Embeddable
class PlaceStatus(
    var placeId: Int = 0,
    val orderNumber: Int = 0,
    var reached: Boolean = false,
    var reachedAt: Timestamp = Timestamp(Instant.now().epochSecond),
)

fun TeamGameStatus.convertToDto(): TeamGameStatusDto {
    return TeamGameStatusDto(
        id = this.id,
        createdAt = this.createdAt,
        updatedAt = this.updatedAt,
        gameId = this.game.id,
        teamId = this.team.id,
        teamName = this.team.name,
        placeStatuses = this.placeStatuses.convertToDto(this.team, this.game),
        lastLatitude = this.team.lastLatitude,
        lastLongitude = this.team.lastLongitude
    )
}

fun MutableList<TeamGameStatus>.convertToDto(): MutableList<TeamGameStatusDto> {
    val dtos = mutableListOf<TeamGameStatusDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}

fun PlaceStatus.convertToDto(team: Team, game: Game): PlaceStatusDto {
    val place = game.places.find { it.id == this.placeId }
        ?: throw CustomException("PlaceStatus convert error - place not found", HttpStatus.NOT_FOUND, MessageConstants.PLACE_NOT_FOUND_CONVERT)

    val qAnswers = mutableListOf<AnswerDto>()
    place.questions.forEach { question ->
        question.answers.find { it.team.id == team.id }?.convertToDto()?.let {
            qAnswers.add(
                it
            )
        }
    }

    return PlaceStatusDto(
        placeId = this.placeId,
        reached = this.reached,
        reachedAt = this.reachedAt,
        qAnswers = qAnswers
    )
}

fun MutableList<PlaceStatus>.convertToDto(team: Team, game: Game): MutableList<PlaceStatusDto> {
    val dtos = mutableListOf<PlaceStatusDto>()
    this.forEach {
        dtos.add(it.convertToDto(team, game))
    }
    return dtos
}