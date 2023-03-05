package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.GameActiveDto
import hu.hm.szititourbackend.dto.GameDto
import hu.hm.szititourbackend.dto.GameOnlyBasicDto
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

    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),


    @OneToMany(mappedBy = "game", cascade = [CascadeType.PERSIST, CascadeType.REMOVE])
    val places: MutableList<Place> = mutableListOf(),

    @OneToMany(mappedBy = "game", cascade = [CascadeType.PERSIST, CascadeType.REMOVE])
    val applications: MutableList<Application> = mutableListOf(),

    )

fun Game.convertToDto(): GameDto {
    return GameDto(
        this.id,
        this.title,
        this.dateStart,
        this.dateEnd,
        this.img,
        this.createdAt,
        this.updatedAt,
        this.places.convertToDto(),
        this.applications.convertToDto()
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
    return GameOnlyBasicDto(
        this.id,
        this.title,
        this.dateStart,
        this.dateEnd,
        this.img,
        this.createdAt,
        this.updatedAt,
        userApplied = this.applications.any { it.team.id == teamId }
    )
}

fun MutableList<Game>.convertToBasicDto(teamId: Int): MutableList<GameOnlyBasicDto> {
    val dtos = mutableListOf<GameOnlyBasicDto>()
    this.forEach {
        dtos.add(it.convertToBasicDto(teamId))
    }
    return dtos
}

fun Game.convertToActiveDto(): GameActiveDto {
    return GameActiveDto(
        this.id,
        this.title,
        this.dateStart,
        this.dateEnd,
        this.img,
        this.createdAt,
        this.updatedAt,
        this.places.convertToActiveDto()
    )
}