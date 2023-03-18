package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.GameActiveDto
import hu.hm.szititourbackend.dto.GameDto
import hu.hm.szititourbackend.dto.GameOnlyBasicDto
import hu.hm.szititourbackend.enum.UserApplicationStatus
import hu.hm.szititourbackend.exception.CustomException
import org.springframework.http.HttpStatus
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

@Entity
class Game(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    @Column(unique = true)
    val title: String = "",
    val dateStart: Timestamp = Timestamp(Instant.now().epochSecond),
    val dateEnd: Timestamp = Timestamp(Instant.now().epochSecond),
    var img: String = "",
    var active: Boolean = false,

    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),


    @OneToMany(mappedBy = "game", cascade = [CascadeType.PERSIST, CascadeType.REMOVE])
    val places: MutableList<Place> = mutableListOf(),

    @OneToMany(mappedBy = "game", cascade = [CascadeType.PERSIST, CascadeType.REMOVE])
    val applications: MutableList<Application> = mutableListOf(),

    @OneToMany(mappedBy = "game", cascade = [CascadeType.PERSIST, CascadeType.REMOVE])
    val teamGameStatuses: MutableList<TeamGameStatus> = mutableListOf()

)

fun Game.convertToDto(): GameDto {
    return GameDto(
        id = this.id,
        title = this.title,
        dateStart = this.dateStart,
        dateEnd = this.dateEnd,
        img = this.img,
        createdAt = this.createdAt,
        updatedAt = this.updatedAt,
        places = this.places.convertToDto(),
        applications = this.applications.convertToDto(),
        active = this.active
    )
}

fun MutableList<Game>.convertToDto(): MutableList<GameDto> {
    val dtos = mutableListOf<GameDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}

fun Game.convertToBasicDto(teamId: Int): GameOnlyBasicDto {
    var userStatus = UserApplicationStatus.none
    val application = this.applications.find { it.team.id == teamId }
    if (application !== null) {
        userStatus = when (application.accepted) {
            null -> UserApplicationStatus.applied
            true -> UserApplicationStatus.accepted
            false -> UserApplicationStatus.declined
        }
    }
    return GameOnlyBasicDto(
        this.id,
        this.title,
        this.dateStart,
        this.dateEnd,
        this.img,
        this.createdAt,
        this.updatedAt,
        userApplied = userStatus,
        active = this.active
    )
}

fun MutableList<Game>.convertToBasicDto(teamId: Int): MutableList<GameOnlyBasicDto> {
    val dtos = mutableListOf<GameOnlyBasicDto>()
    this.forEach {
        dtos.add(it.convertToBasicDto(teamId))
    }
    return dtos
}

fun Game.convertToActiveDto(teamId: Int): GameActiveDto {
    val status = this.teamGameStatuses.find { it.team.id == teamId }
        ?: throw CustomException("No game status for this teamid", HttpStatus.BAD_REQUEST)
    return GameActiveDto(
        this.id,
        this.title,
        this.dateStart,
        this.dateEnd,
        this.img,
        this.createdAt,
        this.updatedAt,
        this.places.convertToActiveDto(status)
    )
}